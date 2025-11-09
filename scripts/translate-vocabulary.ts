/**
 * Vocabulary Translation Script (EN → VI)
 *
 * This script translates English vocabulary words to Vietnamese by:
 * 1. Using Claude API to extract meanings and definitions
 * 2. Using DeepSeek API to format the data into structured JSON
 * 3. Saving the results directly to Supabase database (words, pronunciations, translations tables)
 *
 * The script processes words in batches to optimize API usage and avoid rate limits.
 */

import Anthropic from "@anthropic-ai/sdk";
import { createClient } from "@supabase/supabase-js";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Load environment variables from .env.local
const envLocalPath = path.join(process.cwd(), ".env.local");
const envPath = path.join(process.cwd(), ".env");

// Try .env.local first, then fallback to .env
let envResult;
if (fs.existsSync(envLocalPath)) {
  envResult = dotenv.config({ path: envLocalPath });
  if (envResult.error) {
    console.warn("Warning: Could not load .env.local file:", envResult.error.message);
  } else {
    console.log("Loaded environment variables from .env.local");
    // Debug: Show what dotenv parsed
    if (envResult.parsed) {
      const parsedKeys = Object.keys(envResult.parsed);
      console.log("Parsed keys from .env.local:", parsedKeys.join(", "));
    }
  }
} else if (fs.existsSync(envPath)) {
  envResult = dotenv.config({ path: envPath });
  if (envResult.error) {
    console.warn("Warning: Could not load .env file:", envResult.error.message);
  } else {
    console.log("Loaded environment variables from .env");
  }
} else {
  envResult = dotenv.config(); // Try default .env
  if (envResult.error) {
    console.warn("Warning: Could not load .env file:", envResult.error.message);
  }
}

// Debug: Check if API keys are loaded (without showing the actual keys)
const deepseekApiKeyExists = !!process.env.DEEPSEEK_API_KEY;
const deepseekApiKeyLength = process.env.DEEPSEEK_API_KEY?.length || 0;
const claudeApiKeyExists = !!process.env.ANTHROPIC_API_KEY;
const claudeApiKeyLength = process.env.ANTHROPIC_API_KEY?.length || 0;

// Debug: List all env vars that start with API_KEY (for debugging)
const apiKeys = Object.keys(process.env).filter((key) => key.includes("API_KEY"));
console.log("Found API_KEY environment variables in process.env:", apiKeys.join(", ") || "none");

// Check API keys before initializing clients
if (!deepseekApiKeyExists || deepseekApiKeyLength === 0) {
  console.error("\n❌ Error: DEEPSEEK_API_KEY environment variable is required");
  console.error("\nPlease check your .env.local file in the project root.");
  console.error("It should contain:");
  console.error("DEEPSEEK_API_KEY=your_api_key_here\n");
  console.error("Current .env.local path:", envLocalPath);
  process.exit(1);
}

if (!claudeApiKeyExists || claudeApiKeyLength === 0) {
  console.error("\n❌ Error: ANTHROPIC_API_KEY environment variable is required");
  console.error("\nPlease check your .env.local file in the project root.");
  console.error("It should contain:");
  console.error("ANTHROPIC_API_KEY=your_api_key_here\n");
  console.error("Current .env.local path:", envLocalPath);
  process.exit(1);
}

// DeepSeek API configuration
const DEEPSEEK_API_URL = "https://api.deepseek.com/chat/completions";
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// Claude API configuration
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Supabase configuration
// For scripts, prefer service role key (bypasses RLS) over anon key
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

// Use service role key if available (for scripts), otherwise fallback to anon key
const supabaseKey = supabaseServiceKey || supabaseAnonKey;

if (!supabaseUrl || !supabaseKey) {
  console.error("\n❌ Error: Supabase credentials are required");
  if (!supabaseServiceKey) {
    console.error(
      "⚠️  Warning: Using anon key. For scripts, consider using SUPABASE_SERVICE_ROLE_KEY"
    );
    console.error("   Service role key bypasses RLS and is safer for backend scripts.");
  }
  console.error("\nPlease set in your .env.local file:");
  console.error("  - EXPO_PUBLIC_SUPABASE_URL or SUPABASE_URL");
  console.error("  - SUPABASE_SERVICE_ROLE_KEY (recommended for scripts)");
  console.error("  - Or EXPO_PUBLIC_SUPABASE_ANON_KEY / SUPABASE_ANON_KEY (fallback)");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Configuration
// Batch size recommendation:
// - 10-15: Safe for most APIs, good balance between speed and rate limit avoidance
// - 20-30: Faster but may hit rate limits with some providers
// - 5: Very safe, slower but most reliable
// Current: 10 (balanced for 2 API calls per word: Claude + DeepSeek)
const BATCH_SIZE = 10;
const MAX_WORDS = 500; // Maximum words to process before auto-stop
const WORDS_FILE = path.join(process.cwd(), "docs", "3000_WORDS.md");
const PROMPT_1_FILE = path.join(process.cwd(), "docs", "PROMPT_1_BRAINSTORM.md");
const PROMPT_2_FILE = path.join(process.cwd(), "docs", "PROMPT_2_FORMAT.md");

// Language codes
const SOURCE_LANGUAGE = "en"; // English
const TARGET_LANGUAGE = "vi"; // Vietnamese

// Statistics tracking
interface ProcessingStats {
  totalProcessed: number; // Total words checked (including skipped)
  totalTranslated: number; // Words newly translated and saved
  totalSkipped: number; // Words that already existed in DB
  totalErrors: number; // Words that failed to process
  startTime: number;
}

// Global flag for graceful shutdown
let shouldStop = false;

/**
 * Read words from the word list file
 */
function readWords(limit?: number): string[] {
  const content = fs.readFileSync(WORDS_FILE, "utf-8");
  const words = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("#"));

  return limit ? words.slice(0, limit) : words;
}

/**
 * Read prompt template and replace placeholder
 */
function getPrompt1(word: string): string {
  const template = fs.readFileSync(PROMPT_1_FILE, "utf-8");
  return template.replace(/\[YOUR_WORD_HERE\]/g, word);
}

/**
 * Read prompt 2 template and insert word and raw data
 */
function getPrompt2(word: string, rawData: string): string {
  const template = fs.readFileSync(PROMPT_2_FILE, "utf-8");
  return template.replace(/\[WORD_HERE\]/g, word).replace(/\[PASTE RAW DATA HERE\]/g, rawData);
}

/**
 * Call Claude API with a prompt
 */
async function callClaude(prompt: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const message = await anthropic.messages.create({
        model: "claude-sonnet-4-5-20250929",
        max_tokens: 20000,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      });

      const content = message.content[0];
      if (content.type !== "text") {
        throw new Error("Unexpected response format from Claude API");
      }

      return content.text;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error("Failed to call Claude API after retries");
}

/**
 * Call DeepSeek API with a prompt
 */
async function callDeepSeek(prompt: string, retries = 3): Promise<string> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(DEEPSEEK_API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
        },
        body: JSON.stringify({
          model: "deepseek-chat",
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          max_tokens: 8192,
          stream: false,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`DeepSeek API error: ${response.status} ${errorText}`);
      }

      const data = await response.json();
      const content = data.choices[0]?.message?.content;

      if (!content) {
        throw new Error("Unexpected response format from DeepSeek API");
      }

      return content;
    } catch (error) {
      console.error(`Attempt ${attempt} failed:`, error);
      if (attempt === retries) {
        throw error;
      }
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }
  throw new Error("Failed to call DeepSeek API after retries");
}

/**
 * Check if word already exists in database with complete translations
 * Returns word ID if exists and has translations, null otherwise
 */
async function checkWordExists(word: string): Promise<string | null> {
  try {
    const wordText = word.toLowerCase();

    // Check if word exists
    const { data: wordData, error: wordError } = await supabase
      .from("words")
      .select("id")
      .eq("text", wordText)
      .eq("language_code", SOURCE_LANGUAGE)
      .single();

    if (wordError || !wordData) {
      return null; // Word doesn't exist
    }

    // Check if word has translations (most important check)
    const { data: translations, error: transError } = await supabase
      .from("translations")
      .select("id")
      .eq("source_word_id", wordData.id)
      .eq("target_language_code", TARGET_LANGUAGE)
      .limit(1);

    if (transError || !translations || translations.length === 0) {
      return null; // Word exists but no translations - need to translate
    }

    // Word exists with translations - consider it complete
    // (pronunciations are optional, so we don't require them)
    return wordData.id;
  } catch (error) {
    // If any error, assume word doesn't exist to be safe
    return null;
  }
}

/**
 * Process a single word through both prompts
 */
async function processWord(word: string): Promise<any> {
  console.log(`\nProcessing word: ${word}`);

  // Step 1: Get raw meanings from Prompt 1 (using Claude)
  console.log(`  Step 1: Getting meanings (Claude)...`);
  const prompt1 = getPrompt1(word);
  const rawMeanings = await callClaude(prompt1);
  console.log(`  ✓ Got raw meanings (${rawMeanings.length} chars)`);

  // Step 2: Convert to JSON using Prompt 2 (using DeepSeek Chat)
  console.log(`  Step 2: Converting to JSON (DeepSeek Chat)...`);
  const prompt2 = getPrompt2(word, rawMeanings);
  const jsonResponse = await callDeepSeek(prompt2);
  console.log(`  ✓ Got JSON response (${jsonResponse.length} chars)`);

  // Parse JSON from response (may have markdown code blocks)
  let jsonText = jsonResponse.trim();

  // Remove markdown code blocks if present
  if (jsonText.startsWith("```")) {
    const lines = jsonText.split("\n");
    // Remove first line (```json or ```)
    lines.shift();
    // Remove last line (```)
    if (lines[lines.length - 1].trim() === "```") {
      lines.pop();
    }
    jsonText = lines.join("\n");
  }

  const result = JSON.parse(jsonText);
  console.log(`  ✓ Parsed JSON successfully`);

  return result;
}

/**
 * Save translation result to Supabase database
 * Maps JSON structure to words, pronunciations, and translations tables
 */
async function saveToDatabase(word: string, result: any): Promise<void> {
  try {
    // Step 1: Insert or get word record
    const wordText = result.word.toLowerCase();

    // Check if word already exists
    const { data: existingWord, error: checkError } = await supabase
      .from("words")
      .select("id")
      .eq("text", wordText)
      .eq("language_code", SOURCE_LANGUAGE)
      .single();

    let wordId: string;

    if (existingWord) {
      // Word exists, use existing ID
      wordId = existingWord.id;
      console.log(`  ✓ Word already exists in database (id: ${wordId})`);
    } else {
      // Insert new word
      const { data: wordData, error: wordError } = await supabase
        .from("words")
        .insert({
          text: wordText,
          language_code: SOURCE_LANGUAGE,
          romanization: null, // Can be added later if needed
          reading: null, // Can be added later if needed
        })
        .select()
        .single();

      if (wordError) {
        throw new Error(`Failed to save word: ${wordError.message}`);
      }

      if (!wordData) {
        throw new Error("Word data not returned from database");
      }

      wordId = wordData.id;
      console.log(`  ✓ Saved word to database (id: ${wordId})`);
    }

    // Step 2: Insert pronunciations
    if (result.phonetics) {
      const pronunciations = [];

      if (result.phonetics.us) {
        pronunciations.push({
          word_id: wordId,
          accent: "us",
          phonetic: result.phonetics.us,
          audio_url: null, // Can be added later
        });
      }

      if (result.phonetics.uk) {
        pronunciations.push({
          word_id: wordId,
          accent: "uk",
          phonetic: result.phonetics.uk,
          audio_url: null, // Can be added later
        });
      }

      if (pronunciations.length > 0) {
        // Delete existing pronunciations for this word first, then insert new ones
        const { error: deleteError } = await supabase
          .from("pronunciations")
          .delete()
          .eq("word_id", wordId);

        if (deleteError) {
          console.warn(`  ⚠ Failed to delete existing pronunciations: ${deleteError.message}`);
        }

        const { error: pronError } = await supabase.from("pronunciations").insert(pronunciations);

        if (pronError) {
          console.warn(`  ⚠ Failed to save pronunciations: ${pronError.message}`);
        } else {
          console.log(`  ✓ Saved ${pronunciations.length} pronunciation(s)`);
        }
      }
    }

    // Step 3: Insert translations
    if (result.definitions && Array.isArray(result.definitions) && result.definitions.length > 0) {
      // Delete existing translations for this word first, then insert new ones
      const { error: deleteTransError } = await supabase
        .from("translations")
        .delete()
        .eq("source_word_id", wordId)
        .eq("target_language_code", TARGET_LANGUAGE);

      if (deleteTransError) {
        console.warn(`  ⚠ Failed to delete existing translations: ${deleteTransError.message}`);
      }

      const translations = result.definitions.map((def: any) => ({
        source_word_id: wordId,
        target_language_code: TARGET_LANGUAGE,
        part_of_speech: def.part_of_speech || [],
        target_words: def.word_vi || [],
        definition_source: def.definition_en || null,
        definition_target: def.definition_vi || null,
        example_source: def.example_en || null,
        example_target: def.example_vi || null,
        sense_label: def.sense_label || null,
        popularity: def.popularity || null,
      }));

      const { error: transError } = await supabase.from("translations").insert(translations);

      if (transError) {
        throw new Error(`Failed to save translations: ${transError.message}`);
      }

      console.log(`  ✓ Saved ${translations.length} translation(s)`);
    } else {
      console.warn(`  ⚠ No definitions found for word "${word}"`);
    }
  } catch (error) {
    console.error(`  ✗ Failed to save to database:`, error);
    throw error;
  }
}

/**
 * Process words in batches and return statistics
 */
async function processBatch(
  words: string[],
  batchNumber: number,
  totalBatches: number,
  stats: ProcessingStats
): Promise<ProcessingStats> {
  const batchStats = {
    translated: 0,
    skipped: 0,
    errors: 0,
  };

  console.log(`\n${"=".repeat(60)}`);
  console.log(`Processing Batch ${batchNumber}/${totalBatches} (${words.length} words)`);
  console.log(`${"=".repeat(60)}`);

  for (const word of words) {
    // Check if we should stop
    if (shouldStop) {
      console.log(`\n⚠️  Stop signal received. Finishing current batch...`);
      break;
    }

    // Check if we've reached max words limit
    if (stats.totalProcessed >= MAX_WORDS) {
      console.log(`\n✓ Reached maximum limit of ${MAX_WORDS} words. Stopping...`);
      shouldStop = true;
      break;
    }

    try {
      // Check if word already exists in database
      const existingWordId = await checkWordExists(word);

      if (existingWordId) {
        console.log(`\n⏭ Skipping "${word}" - already exists in database (id: ${existingWordId})`);
        batchStats.skipped++;
        stats.totalSkipped++;
        stats.totalProcessed++;
        continue;
      }

      // Word doesn't exist or incomplete, process it
      console.log(`\n📝 Processing "${word}" (${stats.totalProcessed + 1}/${MAX_WORDS})`);
      const result = await processWord(word);
      await saveToDatabase(word, result);

      batchStats.translated++;
      stats.totalTranslated++;
      stats.totalProcessed++;

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ✗ Failed to process "${word}":`, error);
      batchStats.errors++;
      stats.totalErrors++;
      stats.totalProcessed++;
      // Continue with next word
    }
  }

  // Display batch summary
  console.log(`\n${"-".repeat(60)}`);
  console.log(`✓ Batch ${batchNumber} completed:`);
  console.log(`  - Translated: ${batchStats.translated}`);
  console.log(`  - Skipped: ${batchStats.skipped}`);
  if (batchStats.errors > 0) {
    console.log(`  - Errors: ${batchStats.errors}`);
  }

  return stats;
}

/**
 * Format time duration
 */
function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
}

/**
 * Display statistics summary
 */
function displayStats(stats: ProcessingStats): void {
  const elapsed = Date.now() - stats.startTime;
  const avgTimePerWord = stats.totalProcessed > 0 ? elapsed / stats.totalProcessed : 0;
  const remainingWords = MAX_WORDS - stats.totalProcessed;
  const estimatedTimeRemaining = remainingWords * avgTimePerWord;

  console.log("\n" + "=".repeat(60));
  console.log("📊 PROCESSING STATISTICS");
  console.log("=".repeat(60));
  console.log(
    `Total Processed:     ${stats.totalProcessed}/${MAX_WORDS} (${(
      (stats.totalProcessed / MAX_WORDS) *
      100
    ).toFixed(1)}%)`
  );
  console.log(`  ✓ Translated:     ${stats.totalTranslated} (newly saved to database)`);
  console.log(`  ⏭ Skipped:        ${stats.totalSkipped} (already existed in database)`);
  if (stats.totalErrors > 0) {
    console.log(`  ✗ Errors:         ${stats.totalErrors}`);
  }
  console.log(`\n⏱️  Time Elapsed:     ${formatDuration(elapsed)}`);
  if (remainingWords > 0 && !shouldStop) {
    console.log(`⏳ Estimated Remaining: ${formatDuration(estimatedTimeRemaining)}`);
  }
  console.log("=".repeat(60));
}

/**
 * Main function
 */
async function main() {
  // Setup graceful shutdown handler
  process.on("SIGINT", async () => {
    console.log("\n\n⚠️  Stop signal received (Ctrl+C)");
    console.log("Finishing current batch, then stopping gracefully...\n");
    shouldStop = true;
  });

  process.on("SIGTERM", async () => {
    console.log("\n\n⚠️  Termination signal received");
    console.log("Finishing current batch, then stopping gracefully...\n");
    shouldStop = true;
  });

  console.log("=".repeat(60));
  console.log("Vocabulary Translation Script (EN → VI)");
  console.log("=".repeat(60));
  console.log("Continuous batch processing mode");
  console.log("Press Ctrl+C to stop gracefully (will finish current batch)\n");

  // Read all words (up to MAX_WORDS limit)
  const allWords = readWords();
  const words = allWords.slice(0, MAX_WORDS);

  console.log(`📚 Total words available: ${allWords.length}`);
  console.log(`🎯 Processing limit: ${MAX_WORDS} words`);
  console.log(`📦 Batch size: ${BATCH_SIZE} words per batch`);

  // Calculate batches
  const batches: string[][] = [];
  for (let i = 0; i < words.length; i += BATCH_SIZE) {
    batches.push(words.slice(i, i + BATCH_SIZE));
  }

  console.log(`📊 Total batches: ${batches.length}\n`);

  // Initialize statistics
  const stats: ProcessingStats = {
    totalProcessed: 0,
    totalTranslated: 0,
    totalSkipped: 0,
    totalErrors: 0,
    startTime: Date.now(),
  };

  // Process batches continuously
  for (let i = 0; i < batches.length; i++) {
    if (shouldStop || stats.totalProcessed >= MAX_WORDS) {
      break;
    }

    await processBatch(batches[i], i + 1, batches.length, stats);

    // Display progress after each batch
    if (i < batches.length - 1 && !shouldStop && stats.totalProcessed < MAX_WORDS) {
      displayStats(stats);
      console.log(`\n⏭ Continuing to batch ${i + 2}/${batches.length}...\n`);
    }
  }

  // Final statistics
  displayStats(stats);

  if (shouldStop) {
    console.log("\n🛑 Stopped by user");
  } else if (stats.totalProcessed >= MAX_WORDS) {
    console.log("\n✅ Reached maximum processing limit");
  } else {
    console.log("\n✅ All batches completed!");
  }

  console.log("=".repeat(60));
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
