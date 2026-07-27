# 07 - AI API Endpoints

The internal API surface exposed to the Admin Frontend for real-time AI tools.

## Base Path: `/api/v1/ai`

### 1. `POST /translate`
*   **Body:** `{ "text": "...", "fromLang": "bn", "toLang": "en" }`
*   **Response:** `{ "success": true, "data": { "translation": "..." } }`

### 2. `POST /seo/generate`
*   **Body:** `{ "text": "..." }`
*   **Response:** `{ "success": true, "data": { "title": "...", "description": "...", "keywords": [...] } }`

### 3. `POST /content/headlines`
*   **Body:** `{ "text": "...", "lang": "bn" }`
*   **Response:** `{ "success": true, "data": ["Headline 1", "Headline 2", ...] }`

### 4. `POST /content/summary`
*   **Body:** `{ "text": "...", "format": "bullet", "lang": "bn" }`
*   **Response:** `{ "success": true, "data": { "summary": "..." } }`

### 5. `POST /content/tags`
*   **Body:** `{ "text": "..." }`
*   **Response:** `{ "success": true, "data": ["tag1", "tag2"] }`

### 6. `POST /moderation/check`
*   **Body:** `{ "comment": "..." }`
*   **Response:** `{ "success": true, "data": { "isApproved": false, "reason": "Spam" } }`

### 7. `POST /analytics/recommendations`
*   **Body:** `{ "timeframe": "7d" }`
*   **Response:** `{ "success": true, "data": { "trendingTopics": [...] } }`
