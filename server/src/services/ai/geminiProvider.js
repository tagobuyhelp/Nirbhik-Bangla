const AIProviderInterface = require('./aiProviderInterface');

class GeminiProvider extends AIProviderInterface {
  constructor(apiKey) {
    super();
    this.apiKey = apiKey || process.env.GEMINI_API_KEY;
  }

  /**
   * Professional Newsroom Multilingual Auto-Translation
   */
  async autoTranslateArticle(originalArticle, targetLanguages = ['en', 'hi']) {
    const prompt = `
You are a senior professional multilingual news editor for "Nirbhik Bangla", an AI-powered news portal.
Your task is to translate the following Bengali news article into target languages: ${targetLanguages.join(', ')}.

RULES:
1. Preserve original news meaning, journalistic tone, factual accuracy, named entities, dates, numbers, and locations.
2. Generate an SEO-friendly URL slug for each target language using lowercase hyphens (e.g., "kolkata-heavy-rain-forecast").
3. Generate SEO meta title (max 60 chars) and meta description (max 150 chars) in the target language.
4. Estimate a confidence score (0-100) based on translation precision and linguistic quality.
5. Return ONLY a valid JSON object matching the schema below, with NO extra markdown text.

ARTICLE DATA:
Title: ${originalArticle.title}
Excerpt: ${originalArticle.excerpt || ''}
Content: ${originalArticle.content || ''}

EXPECTED JSON SCHEMA:
{
  "translations": {
    "en": {
      "title": "translated title",
      "slug": "translated-slug-url",
      "excerpt": "translated summary",
      "content": "translated content body",
      "seo": {
        "title": "SEO Title",
        "description": "SEO Description",
        "keywords": ["keyword1", "keyword2"]
      },
      "confidence": 95
    },
    "hi": {
      "title": "अनुवादित शीर्षक",
      "slug": "translated-slug-url-in-hindi",
      "excerpt": "अनुवादित सारांश",
      "content": "अनुवादित सामग्री",
      "seo": {
        "title": "एसईओ शीर्षक",
        "description": "एसईओ विवरण",
        "keywords": ["कीवर्ड1", "कीवर्ड2"]
      },
      "confidence": 94
    }
  }
}
`;

    if (!this.apiKey) {
      // Mock structured AI response for development environment
      const mockResult = { translations: {} };
      
      if (targetLanguages.includes('en')) {
        mockResult.translations.en = {
          title: `[EN] ${originalArticle.title}`,
          slug: `${originalArticle.slug || 'news'}-en`,
          excerpt: originalArticle.excerpt ? `[EN] ${originalArticle.excerpt}` : `[EN Summary of ${originalArticle.title}]`,
          content: originalArticle.content ? `[EN Content] ${originalArticle.content}` : `<p>[EN News Article Body for ${originalArticle.title}]</p>`,
          seo: {
            title: `${originalArticle.title} | Nirbhik Bangla English`,
            description: `Read full story: ${originalArticle.title} on Nirbhik Bangla.`,
            keywords: ['Nirbhik Bangla', 'Latest News', 'West Bengal']
          },
          confidence: 95
        };
      }

      if (targetLanguages.includes('hi')) {
        mockResult.translations.hi = {
          title: `[HI] ${originalArticle.title}`,
          slug: `${originalArticle.slug || 'news'}-hi`,
          excerpt: originalArticle.excerpt ? `[HI] ${originalArticle.excerpt}` : `[HI Summary of ${originalArticle.title}]`,
          content: originalArticle.content ? `[HI Content] ${originalArticle.content}` : `<p>[HI News Article Body for ${originalArticle.title}]</p>`,
          seo: {
            title: `${originalArticle.title} | निर्भीक बांग्ला`,
            description: `पढ़ें पूरी खबर: ${originalArticle.title} निर्भीक बांग्ला पर।`,
            keywords: ['निर्भीक बांग्ला', 'ताजा खबर', 'पश्चिम बंगाल']
          },
          confidence: 92
        };
      }

      return mockResult;
    }

    try {
      // Production Gemini API Call using fetch REST endpoint
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${this.apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: 'application/json' }
          })
        }
      );

      const data = await response.json();
      const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      return JSON.parse(rawText);
    } catch (err) {
      console.error('[Gemini AI Translation Error]:', err);
      throw err;
    }
  }
}

module.exports = GeminiProvider;
