You are a dictionary data expert specializing in English-to-Vietnamese translation. Take the "RAW DATA" provided below and convert it into a single, valid JSON object based on the "Key rules" and "JSON schema".

**CRITICAL OUTPUT REQUIREMENT:**

- **ONLY JSON:** Your response must be **ONLY** a valid JSON object. Do NOT include markdown code blocks (```json), explanations, greetings, or any other text.
- **Start directly with `{` and end with `}`** - the response should be parseable JSON without any preprocessing.

**CRITICAL:** You MUST process and include **every single meaning** provided in the "RAW DATA" list. Do not miss any.

---

**WORD BEING TRANSLATED:**
[WORD_HERE]

**RAW DATA FORMAT:**
The raw data is a bulleted list where each line follows this format:
`- [popularity], [part_of_speech], [definition]`

Example:

- 5, noun, A group of musicians who play music together.
- 4, noun, A strip of material used to hold things together or decorate.

**RAW DATA:**
[PASTE RAW DATA HERE]

**Key rules to follow:**

- **Word Field:** Use the word specified above (`[WORD_HERE]`) exactly as provided for the `word` field in the JSON output.
- **Sequential Processing:** Process the items in the RAW DATA list in the order they are provided (top to bottom).
- **PRIORITY 1: COMPREHENSIVE PROCESSING (MANDATORY)**
  - The model's primary goal is to **process and include 100% of the meanings from the RAW DATA above.** Missing any item from the RAW DATA list is a critical failure.
- **PRIORITY 2: STYLING, FIELDS & CONSOLIDATION (MANDATORY)**

  - For each item in the RAW DATA, apply all formatting and styling rules.
  - **A. Required Fields:** Every definition object must contain _all_ required keys: `part_of_speech`, `word_vi`, `popularity`, `definition_en`, `definition_vi`, `example_en`, `example_vi`, `sense_label`.

  - **B. Field Content Rules:**

    - `part_of_speech`: Must be an array (e.g., `["noun"]` or `["verb", "transitive"]`). Use the exact part of speech from RAW DATA.
    - `word_vi`: Must be an array of common Vietnamese translation terms. Provide 1-3 most common translations.
    - `definition_en`: Use the exact definition from RAW DATA.
    - `definition_vi`: Translate `definition_en` to Vietnamese. Keep it clear and natural, not literal word-for-word.
    - `example_en` & `example_vi`: Must be simple, short sentences (10-15 words max). Generate relevant examples that illustrate the meaning.
    - `popularity`: Use the exact number from RAW DATA (1-5 scale).

  - **C. Phonetics (REQUIRED):**

    - You MUST generate IPA phonetic transcriptions for both US and UK pronunciations of the word.
    - Use standard IPA format: `/phonetic/`
    - If the word has multiple pronunciations, use the most common one for each accent.
    - Example: `"phonetics": { "us": "/bænd/", "uk": "/bænd/" }`

  - **D. Strict sense_label rule:**
    - (1) A `sense_label` object is **required** for every definition with both `en` and `vi` keys.
    - (2) The English label MUST be a simple, single guide word **without** parentheses (e.g., "money", "river", "mass", "rows").
    - (3) The Vietnamese label should be a simple Vietnamese word that captures the sense (e.g., "tiền", "sông", "khối", "hàng").
    - (4) **Consolidation Rule:** Do **NOT** create separate definition objects for hyper-specific sub-types. Create **only ONE** definition object for the general sense.
    - (5) **Strict Prohibition:** Do **NOT** use academic/specific domain labels (like "finance", "aviation", "aircraft"). Use simple, concrete guide words (like "money", "turn").

**The JSON schema (output this exact structure):**

```json
{
  "word": "extracted_or_inferred_word",
  "phonetics": {
    "us": "/ipa_phonetic_us/",
    "uk": "/ipa_phonetic_uk/"
  },
  "definitions": [
    {
      "word_vi": ["vietnamese_term_1", "vietnamese_term_2"],
      "part_of_speech": ["noun"],
      "sense_label": { "en": "guide_word", "vi": "từ_hướng_dẫn" },
      "popularity": 5,
      "definition_en": "English definition from raw data",
      "definition_vi": "Bản dịch tiếng Việt của định nghĩa",
      "example_en": "A short English example sentence.",
      "example_vi": "Một câu ví dụ tiếng Việt ngắn."
    }
  ]
}
```

**IMPORTANT REMINDERS:**

1. Return **ONLY** the JSON object, no markdown formatting, no code blocks.
2. Process **ALL** items from RAW DATA - do not skip any.
3. Generate phonetics for both US and UK accents using IPA format.
4. Create natural Vietnamese translations, not literal word-for-word translations.
5. Examples should be simple, clear, and demonstrate the meaning effectively.
