# Supabase Database Schema for Vocabulary Translation

This document describes the database schema for storing vocabulary translations and definitions.

## Overview

The vocabulary data structure consists of two main tables:

- `words`: Stores basic word information and phonetics
- `definitions`: Stores individual definitions for each word (one-to-many relationship)

## Tables

### `words` Table

Stores the main word entry with phonetics.

| Column        | Type          | Constraints                              | Description                               |
| ------------- | ------------- | ---------------------------------------- | ----------------------------------------- |
| `id`          | `uuid`        | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier                         |
| `word`        | `text`        | UNIQUE, NOT NULL                         | The English word (e.g., "band")           |
| `phonetic_us` | `text`        | NULL                                     | US IPA phonetic notation (e.g., "/bænd/") |
| `phonetic_uk` | `text`        | NULL                                     | UK IPA phonetic notation (e.g., "/bænd/") |
| `created_at`  | `timestamptz` | DEFAULT `now()`                          | Record creation timestamp                 |
| `updated_at`  | `timestamptz` | DEFAULT `now()`                          | Record update timestamp                   |

**Indexes:**

- Primary key on `id`
- Unique index on `word`
- Index on `word` for faster lookups

### `definitions` Table

Stores individual definitions for each word. One word can have multiple definitions.

| Column           | Type          | Constraints                              | Description                                                     |
| ---------------- | ------------- | ---------------------------------------- | --------------------------------------------------------------- |
| `id`             | `uuid`        | PRIMARY KEY, DEFAULT `gen_random_uuid()` | Unique identifier                                               |
| `word_id`        | `uuid`        | FOREIGN KEY → `words.id`, NOT NULL       | Reference to parent word                                        |
| `part_of_speech` | `text[]`      | NOT NULL                                 | Array of parts of speech (e.g., `["noun"]`, `["verb", "noun"]`) |
| `sense_label_en` | `text`        | NOT NULL                                 | English sense label (guide word, e.g., "music", "group")        |
| `sense_label_vi` | `text`        | NOT NULL                                 | Vietnamese sense label (e.g., "âm nhạc", "nhóm")                |
| `popularity`     | `integer`     | NOT NULL, CHECK (1-5)                    | Popularity score from 1 (less common) to 5 (very common)        |
| `definition_en`  | `text`        | NOT NULL                                 | English definition                                              |
| `definition_vi`  | `text`        | NOT NULL                                 | Vietnamese translation of definition                            |
| `example_en`     | `text`        | NOT NULL                                 | English example sentence                                        |
| `example_vi`     | `text`        | NOT NULL                                 | Vietnamese translation of example                               |
| `word_vi`        | `text[]`      | NOT NULL                                 | Array of Vietnamese equivalent terms                            |
| `created_at`     | `timestamptz` | DEFAULT `now()`                          | Record creation timestamp                                       |
| `updated_at`     | `timestamptz` | DEFAULT `now()`                          | Record update timestamp                                         |

**Indexes:**

- Primary key on `id`
- Foreign key index on `word_id`
- Index on `word_id` for faster lookups
- Index on `part_of_speech` using GIN for array searches
- Index on `popularity` for filtering/sorting

**Foreign Key Constraint:**

- `word_id` references `words.id` ON DELETE CASCADE (deleting a word deletes its definitions)

## SQL Schema

```sql
-- Create words table
CREATE TABLE words (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word TEXT UNIQUE NOT NULL,
  phonetic_us TEXT,
  phonetic_uk TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create definitions table
CREATE TABLE definitions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  word_id UUID NOT NULL REFERENCES words(id) ON DELETE CASCADE,
  part_of_speech TEXT[] NOT NULL,
  sense_label_en TEXT NOT NULL,
  sense_label_vi TEXT NOT NULL,
  popularity INTEGER NOT NULL CHECK (popularity >= 1 AND popularity <= 5),
  definition_en TEXT NOT NULL,
  definition_vi TEXT NOT NULL,
  example_en TEXT NOT NULL,
  example_vi TEXT NOT NULL,
  word_vi TEXT[] NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create indexes
CREATE INDEX idx_words_word ON words(word);
CREATE INDEX idx_definitions_word_id ON definitions(word_id);
CREATE INDEX idx_definitions_part_of_speech ON definitions USING GIN(part_of_speech);
CREATE INDEX idx_definitions_popularity ON definitions(popularity);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers
CREATE TRIGGER update_words_updated_at BEFORE UPDATE ON words
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_definitions_updated_at BEFORE UPDATE ON definitions
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Data Mapping from JSON

The JSON structure from the translation script maps to the database as follows:

```json
{
  "word": "band",
  "phonetics": {
    "us": "/bænd/",
    "uk": "/bænd/"
  },
  "definitions": [
    {
      "word_vi": ["ban nhạc", "dàn nhạc"],
      "part_of_speech": ["noun"],
      "sense_label": { "en": "music", "vi": "âm nhạc" },
      "popularity": 5,
      "definition_en": "A group of musicians who play music together.",
      "definition_vi": "Một nhóm nhạc sĩ chơi nhạc cùng nhau.",
      "example_en": "The band played at the concert.",
      "example_vi": "Ban nhạc biểu diễn tại buổi hòa nhạc."
    }
  ]
}
```

**Mapping:**

- `word` → `words.word`
- `phonetics.us` → `words.phonetic_us`
- `phonetics.uk` → `words.phonetic_uk`
- Each item in `definitions` array → one row in `definitions` table
- `definitions[].word_vi` → `definitions.word_vi` (array)
- `definitions[].part_of_speech` → `definitions.part_of_speech` (array)
- `definitions[].sense_label.en` → `definitions.sense_label_en`
- `definitions[].sense_label.vi` → `definitions.sense_label_vi`
- `definitions[].popularity` → `definitions.popularity`
- `definitions[].definition_en` → `definitions.definition_en`
- `definitions[].definition_vi` → `definitions.definition_vi`
- `definitions[].example_en` → `definitions.example_en`
- `definitions[].example_vi` → `definitions.example_vi`

## Example Queries

### Get all definitions for a word

```sql
SELECT d.*, w.word, w.phonetic_us, w.phonetic_uk
FROM definitions d
JOIN words w ON d.word_id = w.id
WHERE w.word = 'band'
ORDER BY d.popularity DESC;
```

### Search words by Vietnamese term

```sql
SELECT DISTINCT w.*
FROM words w
JOIN definitions d ON w.id = d.word_id
WHERE 'ban nhạc' = ANY(d.word_vi);
```

### Get words by part of speech

```sql
SELECT DISTINCT w.word
FROM words w
JOIN definitions d ON w.id = d.word_id
WHERE 'noun' = ANY(d.part_of_speech);
```

### Get most popular definitions

```sql
SELECT w.word, d.definition_en, d.popularity
FROM definitions d
JOIN words w ON d.word_id = w.id
WHERE d.popularity >= 4
ORDER BY d.popularity DESC, w.word;
```
