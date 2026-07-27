# 01 - Enterprise AI Services Architecture

## 1. Goal
Design a centralized, modular, scalable, and highly available Enterprise AI Engine for the Nirbhik Bangla News Platform. This AI layer serves as the unified intelligence backend that every module (Posts, Videos, Live TV, Categories, Analytics, Moderation) consumes. It guarantees consistency, rate-limiting, error-handling, and centralized prompt management.

**Core Principle**: *Never call the Gemini API directly from Business Controllers.*

## 2. Layered Architecture

The system follows a strict layered design to separate business logic, service orchestration, and AI execution.

```mermaid
flowchart TD
    A[Controllers (API Entry)] --> B[Business Services]
    B --> C[AI Services (Translation, SEO, etc.)]
    C --> D[AI Layer & Prompt Engine]
    D --> E[Gemini Provider (Safety, Cache, Retry)]
    E --> F[Google Gemini API]
```

### Layer Details:

1.  **Controllers (`server/src/controllers/`)**
    *   Accepts HTTP requests.
    *   Validates payload and checks authorization.
    *   Delegates work to Business Services.
2.  **Business Services (`server/src/services/`)**
    *   Manages database operations (MongoDB).
    *   Calls AI Services if AI generation/processing is required.
3.  **AI Services (`server/src/ai/services/`)**
    *   Specific intelligence features (e.g., `AISEOService`, `AITranslationService`).
    *   Assembles parameters for the Prompt Builder.
4.  **AI Core Layer (`server/src/ai/`)**
    *   **Prompt Engine:** Loads isolated prompt templates (`.prompt.js`).
    *   **Prompt Builder:** Injects dynamic data into prompts safely.
    *   **Validators/Parsers:** Validates inputs and sanitizes JSON outputs.
5.  **Providers (`server/src/ai/providers/`)**
    *   **GeminiProvider:** The *only* file that communicates with `@google/genai`.
    *   Handles Retry, Caching (Redis), Rate Limiting, Safety blocking, and Logging.

## 3. Directory Structure

```text
server/src/
└── ai/
    ├── providers/
    │   └── gemini.provider.js       # Core Gemini integration & retry logic
    ├── services/
    │   ├── content.ai.service.js    # AI content generation/expansion
    │   ├── seo.ai.service.js        # AI SEO metadata extraction
    │   ├── translate.ai.service.js  # Multi-lingual translations
    │   ├── summary.ai.service.js    # Multi-format summaries
    │   └── ... (Other specific services)
    ├── prompts/
    │   ├── templates/
    │   │   ├── seo.prompt.js
    │   │   ├── translate.prompt.js
    │   │   └── ...
    │   └── engine.prompt.js         # Prompt registry and loader
    ├── builders/
    │   └── prompt.builder.js        # Compiles templates with variables
    ├── validators/
    │   └── ai.validator.js          # Validates LLM outputs (JSON schema)
    ├── parsers/
    │   └── json.parser.js           # Safely extracts JSON from markdown
    ├── cache/
    │   └── ai.cache.js              # Redis cache wrapper for AI responses
    ├── queue/
    │   └── ai.queue.js              # BullMQ configuration for heavy tasks
    ├── logs/
    │   └── ai.logger.js             # Tracks tokens, latency, cost
    └── utils/
        └── ai.constants.js          # Shared enums (Models, Fallbacks)
```

## 4. Scalability & Resilience
- **Decoupled Business Logic**: Adding a new AI feature requires creating a new `.prompt.js` and an `AI*Service`. Existing business logic is unharmed.
- **Fail-safe Execution**: The Provider level ensures that if Gemini goes down, an automatic fallback (e.g., default values or cached responses) is returned.
- **Asynchronous Execution**: Heavy AI tasks (Translation, Fact Check) must run via a message queue (BullMQ/Redis) so they don't block the Node event loop.
