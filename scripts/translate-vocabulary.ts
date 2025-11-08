import Anthropic from "@anthropic-ai/sdk";
import * as dotenv from "dotenv";
import * as fs from "fs";
import * as path from "path";

// Load environment variables
// Try .env.local first, then .env
const envLocalPath = path.join(process.cwd(), ".env.local");
const envPath = path.join(process.cwd(), ".env");

let envResult;
if (fs.existsSync(envLocalPath)) {
  envResult = dotenv.config({ path: envLocalPath });
  console.log("Loaded environment variables from .env.local");
} else if (fs.existsSync(envPath)) {
  envResult = dotenv.config({ path: envPath });
  console.log("Loaded environment variables from .env");
} else {
  envResult = dotenv.config(); // Try default .env
}

if (envResult.error) {
  console.warn("Warning: Could not load .env file:", envResult.error.message);
}

// Debug: Check if API key is loaded (without showing the actual key)
const apiKeyExists = !!process.env.ANTHROPIC_API_KEY;
const apiKeyLength = process.env.ANTHROPIC_API_KEY?.length || 0;

// Check API key before initializing client
if (!apiKeyExists || apiKeyLength === 0) {
  console.error("\n❌ Error: ANTHROPIC_API_KEY environment variable is required");
  console.error("\nPlease check your .env file in the project root.");
  console.error("It should contain:");
  console.error("ANTHROPIC_API_KEY=your_api_key_here\n");
  console.error("Current .env path:", path.join(process.cwd(), ".env"));
  process.exit(1);
}

// Initialize Claude client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Configuration
const BATCH_SIZE = 10;
const OUTPUT_DIR = path.join(process.cwd(), "output", "json");
const WORDS_FILE = path.join(process.cwd(), "docs", "3000_WORDS.md");
const PROMPT_1_FILE = path.join(process.cwd(), "docs", "PROMPT_1_BRAINSTORM.md");
const PROMPT_2_FILE = path.join(process.cwd(), "docs", "PROMPT_2_FORMAT.md");

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

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
 * Read prompt 2 template and insert raw data
 */
function getPrompt2(rawData: string): string {
  const template = fs.readFileSync(PROMPT_2_FILE, "utf-8");
  return template.replace(/\[PASTE RAW DATA HERE\]/g, rawData);
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
      if (content.type === "text") {
        return content.text;
      }
      throw new Error("Unexpected response type from Claude API");
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
 * Process a single word through both prompts
 */
async function processWord(word: string): Promise<any> {
  console.log(`\nProcessing word: ${word}`);

  // Step 1: Get raw meanings from Prompt 1
  console.log(`  Step 1: Getting meanings...`);
  const prompt1 = getPrompt1(word);
  const rawMeanings = await callClaude(prompt1);
  console.log(`  ✓ Got raw meanings (${rawMeanings.length} chars)`);

  // Step 2: Convert to JSON using Prompt 2
  console.log(`  Step 2: Converting to JSON...`);
  const prompt2 = getPrompt2(rawMeanings);
  const jsonResponse = await callClaude(prompt2);
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
 * Save JSON result to file
 */
function saveResult(word: string, result: any): void {
  const filePath = path.join(OUTPUT_DIR, `${word}.json`);
  fs.writeFileSync(filePath, JSON.stringify(result, null, 2), "utf-8");
  console.log(`  ✓ Saved to ${filePath}`);
}

/**
 * Process words in batches
 */
async function processBatch(words: string[], batchNumber: number): Promise<void> {
  console.log(`\n=== Processing Batch ${batchNumber} (${words.length} words) ===`);

  for (const word of words) {
    try {
      const result = await processWord(word);
      saveResult(word, result);

      // Small delay to avoid rate limiting
      await new Promise((resolve) => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`  ✗ Failed to process "${word}":`, error);
      // Continue with next word
    }
  }
}

/**
 * Main function
 */
async function main() {
  console.log("Starting vocabulary translation script...");
  console.log(`Output directory: ${OUTPUT_DIR}`);

  // For testing: only process first 10 words
  const words = readWords(10);
  console.log(`\nTotal words to process: ${words.length}`);
  console.log(`Words: ${words.join(", ")}`);

  // Process in batches
  const batches: string[][] = [];
  for (let i = 0; i < words.length; i += BATCH_SIZE) {
    batches.push(words.slice(i, i + BATCH_SIZE));
  }

  console.log(`\nTotal batches: ${batches.length}`);

  for (let i = 0; i < batches.length; i++) {
    await processBatch(batches[i], i + 1);
  }

  console.log("\n✓ All words processed!");
}

// Run the script
main().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
