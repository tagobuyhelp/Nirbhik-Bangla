# 02 - AI Services Matrix

The AI Layer is broken down into domain-specific services to enforce single-responsibility and reusability. 

## Core Services

### 1. `AITranslationService`
*   **Purpose:** Multi-lingual content translation maintaining journalistic tone.
*   **Input:** Source Language (e.g., Bangla), Target Languages (English, Hindi).
*   **Outputs:** Translated Title, Slug, Excerpt, Content, Meta Title, Meta Description, Keywords.
*   **Usage:** Automatically triggers when a Category, Post, or Video is published in the primary language.

### 2. `AISEOService`
*   **Purpose:** Search Engine Optimization generation.
*   **Outputs:** SEO Title, Meta Description, Slug, Canonical URL, Schema.org Markup, Keywords, Readability Score, SEO Actionable Suggestions.

### 3. `AIHeadlineService`
*   **Purpose:** Content hooks and titles.
*   **Outputs:** 5 Alternate Headlines, Breaking News Headline, SEO Headline, Facebook Headline, YouTube Title (if applicable).

### 4. `AISummaryService`
*   **Purpose:** Content summarization for different consumption mediums.
*   **Outputs:** Short Summary (1 line), Medium Summary (1 paragraph), Long Summary, Bullet Points, Tweet Summary.

### 5. `AIFactCheckService`
*   **Purpose:** Misinformation detection and credibility scoring.
*   **Outputs:** Extracted Claims, Required Sources, Confidence Score (0-100), Misinformation Warnings.

### 6. `AIRewriteService` & `AIExpandService`
*   **Rewrite Modes:** Professional, Simple, Journalistic, Neutral, Formal, Short, Long.
*   **Expand Targets:** Paragraphs, Articles, Bullet points, Research points.

### 7. `AIKeywordService` & `AITagService`
*   **Keywords:** Primary, Secondary, Long Tail, LSI, Trending.
*   **Tags:** 10 Smart Tags, Category Suggestions mapping.

### 8. `AIImageAltService`
*   **Purpose:** Accessibility and Image SEO.
*   **Outputs:** SEO Friendly Alt Text, Caption, Detailed Description.

### 9. `AICommentModerationService`
*   **Purpose:** Automated community management.
*   **Detection:** Spam, Abuse, Threats, Politics, Religion, Adult Content, Hate Speech, Fake News.
*   **Outputs:** Moderation Score, Flag Reasons, Auto-Approve/Reject decision.

## Specialized Services

### 10. `AILiveTVService` & `AIVideoService`
*   **Live TV AI:** Live Title, Description, Thumbnail Text, SEO, Replay Summary, Event Highlights.
*   **Video AI:** Title, Description, Tags, YouTube Chapters, Summary, Thumbnail Hook Text.

### 11. `AIAnalyticsService`
*   **Purpose:** Predictive analytics and content strategy.
*   **Analysis:** Trending Topics, Popular Categories, Best Time To Publish, User Behaviour, AI Recommendations for Journalists.
