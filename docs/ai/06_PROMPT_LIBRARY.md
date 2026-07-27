# 06 - Prompt Library Definitions

A strict library outlining exactly what inputs are required and what outputs are expected.

## 1. `category.prompt.js`
*   **Input Context:** Base category name (Bangla).
*   **Processing:** Translates to English/Hindi. Generates 2 sentence description. Suggests an icon/color.
*   **Output Structure:** `{ en: { name, slug, desc }, hi: { name, slug, desc }, icon, color }`

## 2. `seo.prompt.js`
*   **Input Context:** Article Text, Language.
*   **Processing:** Extracts core theme, limits length of title (< 60 chars) and desc (< 160 chars).
*   **Output Structure:** `{ title, description, slug, canonical, schemaType, keywords }`

## 3. `factcheck.prompt.js`
*   **Input Context:** Article Text.
*   **Processing:** Identifies factual assertions. Flags potentially unverified claims.
*   **Output Structure:** `{ score, claims: [{ text, verificationRequired }], verdict, warnings }`

## 4. `rewrite.prompt.js`
*   **Input Context:** Original Text, Target Tone (Professional/Journalistic/Simple), Language.
*   **Processing:** Modifies vocabulary and sentence structure while preserving core facts.
*   **Output Structure:** `{ rewrittenText, changesMade }`

## 5. `moderation.prompt.js`
*   **Input Context:** User Comment, Article Context.
*   **Processing:** Sentiment analysis and policy violation detection.
*   **Output Structure:** `{ isApproved, score, flags: ['Hate Speech'], reasoning }`
