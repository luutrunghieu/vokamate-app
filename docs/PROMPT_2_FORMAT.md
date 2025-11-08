You are a dictionary data expert. Take the "RAW DATA" provided below and convert it into a single, valid JSON object based on the "Key rules" and "JSON schema".

**CRITICAL:** You MUST process and include **every single meaning** provided in the "RAW DATA" list. Do not miss any.

---

Example of expected raw data format:
[popularity], [part_of_speech], [definition]

**RAW DATA:**
[PASTE RAW DATA HERE]

**Key rules to follow:**

- **JSON Only:** The entire response must be a single, valid JSON object. No extraneous text or formatting.
- **Sequential Processing:** Process the items in the RAW DATA list in the order they are provided (top to bottom).
- **PRIORITY 1: COMPREHENSIVE PROCESSING (MANDATORY)**
  - The model's primary goal is to **process and include 100% of the meanings from the RAW DATA above.** Missing any item from the RAW DATA list is a critical failure.
- **PRIORITY 2: STYLING, FIELDS & CONSOLIDATION (MANDATORY)**
  - For each item in the RAW DATA, apply all formatting and styling rules.
  - **A. Required Fields:** Every definition object must contain _all_ six keys: `part_of_speech`, `word_vi`, `popularity` ,`definition_en`, `definition_vi`, `example_en`, `example_vi`.
  - **B. Field Content:**
    - `part_of_speech`: Must be an array (e.g., `["noun"]`).
    - `word_vi`: Must be an array of common Vietnamese terms.
    - `example_en` & `example_vi`: Must be simple, short sentences.
  - **C. Strict sense_label rule:**
    - (1) A `sense_label` object is **required** for every definition. The model MUST **generate** this label based on the definition's content.
    - (2) The value MUST be a simple, single guide word **without** parentheses (e.g., "money", "river", "mass", "rows").
    - (3) **Consolidation Rule (No Sub-definitions):** Do **NOT** create separate definition objects for hyper-specific sub-types (like "rowing" or "keyboard"). Create **only ONE** definition object for the general sense (e.g., "rows") and keep its `definition_en` text general (e.g., "A row of similar objects...").
    - (4) **Strict Prohibition:** Do **NOT** use academic/specific fields (like "finance", "aviation", "aircraft"). Use simple, concrete guide words (like "money", "turn"). Violating this is a styling failure.

**The JSON schema:**

```json
{
  "word": "[WORD_HERE]",
  "phonetics": {
    "us": "/<US_IPA_HERE>/",
    "uk": "/<UK_IPA_HERE>/"
  },
  "definitions": [
    {
      "word_vi": ["<list_of_vietnamese_equivalent_terms>"],
      "part_of_speech": ["part_of_speech_1"],
      "sense_label": { "en": "sense_label_1", "vi": "nhan_nghia_1" },
      "popularity": <Popularity_point_1>,
      "definition_en": "<English_definition_for_noun>",
      "definition_vi": "<Vietnamese_translation_of_definition>",
      "example_en": "<Short_and_simple_English_example>",
      "example_vi": "<Vietnamese_translation_of_example>"
    },
    {
      "word_vi": ["<list_of_vietnamese_equivalent_terms>"],
      "part_of_speech": ["part_of_speech_2"],
      "sense_label": { "en": "sense_label_2", "vi": "nhan_nghia_2" },
      "popularity": <Popularity_point_2>,
      "definition_en": "<English_definition_for_verb>",
      "definition_vi": "<Vietnamese_translation_of_definition>",
      "example_en": "<Short_and_simple_English_example>",
      "example_vi": "<Vietnamese_translation_of_example>"
    }
  ]
}
```
