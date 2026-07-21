const Article = require('../../models/Article');
const GeminiProvider = require('./geminiProvider');

const gemini = new GeminiProvider();

class TranslationQueue {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
  }

  /**
   * Enqueue a new translation job
   */
  pushJob(articleId, targetLangs = ['en', 'hi']) {
    this.queue.push({ articleId, targetLangs, createdAt: new Date() });
    console.log(`[AI Queue]: Enqueued translation job for Article ID: ${articleId}`);
    this.processNext();
  }

  async processNext() {
    if (this.isProcessing || this.queue.length === 0) return;

    this.isProcessing = true;
    const { articleId, targetLangs } = this.queue.shift();

    try {
      console.log(`[AI Queue]: Starting async translation for Article ID: ${articleId}`);
      const article = await Article.findById(articleId);

      if (!article) {
        console.error(`[AI Queue Error]: Article ${articleId} not found.`);
        this.isProcessing = false;
        return this.processNext();
      }

      // Mark translation status as processing
      article.translationStatus = 'processing';
      await article.save();

      const bnTranslation = article.translations.get('bn');
      if (!bnTranslation) {
        console.error(`[AI Queue Error]: Article ${articleId} has no Bengali translation.`);
        article.translationStatus = 'failed';
        await article.save();
        this.isProcessing = false;
        return this.processNext();
      }

      // Execute Gemini AI translation
      const aiResponse = await gemini.autoTranslateArticle(
        {
          title: bnTranslation.title,
          slug: bnTranslation.slug,
          excerpt: bnTranslation.excerpt,
          content: bnTranslation.content,
        },
        targetLangs
      );

      let requiresManualReview = false;

      if (aiResponse?.translations) {
        for (const lang of targetLangs) {
          const aiLangData = aiResponse.translations[lang];
          if (!aiLangData) continue;

          const existingLangData = article.translations.get(lang);

          // Check Human Override Protection: if manualEdited is true, skip AI overwrite
          if (existingLangData && existingLangData.manualEdited) {
            console.log(`[AI Queue]: Skipping AI overwrite for ${lang} on Article ${articleId} (Human Edit Preserved).`);
            continue;
          }

          const confidence = aiLangData.confidence || 90;
          const isLowConfidence = confidence < 80;
          if (isLowConfidence) {
            requiresManualReview = true;
          }

          article.translations.set(lang, {
            title: aiLangData.title || bnTranslation.title,
            slug: aiLangData.slug || `${bnTranslation.slug}-${lang}`,
            excerpt: aiLangData.excerpt || bnTranslation.excerpt,
            content: aiLangData.content || bnTranslation.content,
            seo: {
              title: aiLangData.seo?.title || aiLangData.title,
              description: aiLangData.seo?.description || aiLangData.excerpt,
              keywords: aiLangData.seo?.keywords || [],
            },
            status: isLowConfidence ? 'manual_review' : 'published',
            aiGenerated: true,
            manualEdited: false,
            translationVersion: (existingLangData?.translationVersion || 0) + 1,
            confidence: confidence,
            translatedAt: new Date(),
            publishedAt: new Date(),
          });
        }
      }

      article.translationStatus = requiresManualReview ? 'manual_review' : 'completed';
      await article.save();
      console.log(`[AI Queue Success]: Article ${articleId} translation completed (Status: ${article.translationStatus}).`);
    } catch (err) {
      console.error(`[AI Queue Error]: Failed to translate Article ${articleId}:`, err);
      try {
        await Article.findByIdAndUpdate(articleId, { translationStatus: 'failed' });
      } catch (e) {
        // ignore
      }
    } finally {
      this.isProcessing = false;
      this.processNext();
    }
  }
}

module.exports = new TranslationQueue();
