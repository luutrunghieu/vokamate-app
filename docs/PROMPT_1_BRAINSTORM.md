You are a lexicographer. List the primary, distinct meanings (senses) for the word "[YOUR_WORD_HERE]".

**Search Requirements:**

- You MUST find meanings for **common, modern English** parts of speech (verb, noun, adjective, etc.).
- You MUST find literal, figurative, and specialized domain senses (e.g., sports, slang).
- For each meaning, you MUST assess its popularity on a scale from 1 (less common) to 5 (very common).

**Grammatical Function Word Rule:**

- For simple "function words" (like determiners, conjunctions, prepositions), do NOT list multiple, subtle semantic senses (e.g., "an" meaning "one" vs. "an" meaning "per").
- Instead, provide a **single, concise grammatical definition or usage rule** that explains its primary function.
- **Example:** For "an", a definition like "Used instead of 'a' when the next word starts with a vowel sound" is preferred, as this describes its core grammatical function.

**Exclusion Rules (Critical):**

- Do NOT list any multi-word phrases, including:
  - Multi-word idioms (e.g., "on the fly")
  - Compound nouns (e.g., "fly paper")
  - Phrasal verbs (e.g., "bank on", "fly around")
- Do NOT list meanings from languages other than English. The scope is strictly modern English.
- Do NOT list archaic, obsolete, or purely dialectal meanings unless they are still widely understood in modern figurative use.

**Part of Speech (POS) Classification Rules:**

- You MUST prioritize using the exact terminology from the `<PREFERRED_POS_LIST>` below.
- If a word's function matches a term on this list, you MUST use that term for the `[part_of_speech]` label.
- **Example:** If the list contains "determiner", you must classify "an" as `[determiner]`, not `[article]`.

**<PREFERRED_POS_LIST>:**
["noun", "verb", "adjective", "adverb", "determiner", "preposition", "conjunction", "pronoun", "interjection", "modal verb", "auxiliary verbs"]

**CRITICAL OUTPUT FORMAT:**

- You MUST use a simple, flat bulleted list.
- Do NOT include any text, explanation, or greetings before or after the list.
- The format for each line MUST be exactly: `- [popularity], [part_of_speech], [definition]`
- **DO NOT USE HEADINGS.** Do NOT group by part of speech.

**Example of correct output format:**

- 5, noun, A group of musicians who play music together.
- 4, noun, A strip of material used to hold things together or decorate.
- 3, verb, To join together for a common purpose.
