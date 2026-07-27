# 05 - AI Workflow (Caching & Queues)

## 1. Caching Strategy
Never call Gemini repeatedly for the exact same input. This saves cost, speeds up the UI, and prevents rate limiting.

### Redis Cache
*   **Cache Key:** `sha256(systemPrompt + userTemplate + variables)`
*   **TTL (Time To Live):** 24-48 hours depending on the operation. (Translations can be cached longer; trending keywords might expire sooner).
*   **Bypass Flag:** Allow manual overrides (e.g., "Regenerate" button in UI) via a `bypassCache=true` parameter.

## 2. Queueing (BullMQ / Redis)
Heavy AI operations must run in a queue. If an editor translates a 2,000-word article to 3 different languages, it will take significant time. The HTTP response must not hang.

### Queue Setup (`ai/queue/ai.queue.js`)
*   `TranslationQueue`
*   `SEOQueue`
*   `SummaryQueue`
*   `FactCheckQueue`
*   `BackgroundJobQueue` (e.g., bulk tagging old articles)

### Workflow Example: Auto-Translate Post

1.  **Editor** clicks "Publish" on a Bangla post.
2.  **Controller** saves the Bangla post to DB.
3.  **Controller** dispatches a Job to `TranslationQueue`: `{ postId, targetLangs: ['en', 'hi'] }`
4.  **API Response** is sent immediately: `200 OK (Post published, translations processing)`
5.  **Queue Worker** picks up the job.
6.  **Worker** calls `AITranslationService`.
7.  **Service** calls `PromptBuilder` -> `GeminiProvider`.
8.  **Worker** updates the Post in the DB with the translations upon completion.
