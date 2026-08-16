const SocialConnect = require('../models/SocialConnect');
const AIService = require('./aiService');
const Article = require('../models/Article');

class SocialService {
  /**
   * Auto-posts a published article to all connected platforms where auto-post is enabled.
   * @param {Object} article - The mongoose article document
   */
  async autoPostArticle(article) {
    try {
      // 1. Fetch all connected platforms with autoPost enabled
      const activeAccounts = await SocialConnect.find({
        isConnected: true,
        autoPost: true
      });

      if (!activeAccounts || activeAccounts.length === 0) {
        console.log('[AUTO-POST]: No connected social accounts with auto-post enabled.');
        return;
      }

      console.log(`[AUTO-POST]: Found ${activeAccounts.length} active social accounts to broadcast.`);

      // 2. Get Bengali translation for captions (since the default/main language is bn)
      const bnTranslation = article.translations.get('bn') || article.translations.get(article.defaultLanguage);
      if (!bnTranslation) {
        console.warn('[AUTO-POST]: Could not find Bengali translation to generate captions.');
        return;
      }

      const title = bnTranslation.title;
      const excerpt = bnTranslation.excerpt || title;
      const slug = bnTranslation.slug;
      
      // Determine public site URL (fallback to localhost:3000)
      const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:3000';
      const articleUrl = `${siteUrl}/bn/news/${slug}`;

      // 3. Generate or Use Pre-existing Captions
      let captions = {
        facebook: '',
        twitter: '',
        whatsapp: '',
        telegram: ''
      };

      // Check if manual/preview captions exist
      let hasManualCaptions = false;
      if (article.socialCaptions) {
        for (const platform of Object.keys(captions)) {
          if (article.socialCaptions[platform] && article.socialCaptions[platform].trim().length > 0) {
            captions[platform] = article.socialCaptions[platform];
            hasManualCaptions = true;
          }
        }
      }

      if (!hasManualCaptions) {
        try {
          const aiCaptions = await AIService.generateSocialCaptions(title, excerpt, 'bn');
          captions = { ...captions, ...aiCaptions };
        } catch (aiError) {
          console.warn('[AUTO-POST]: AI Caption generation failed, using fallback templates:', aiError.message);
          captions = {
            facebook: `🚨 ব্রেকিং নিউজ | ${title}\n\nবিস্তারিত পড়ুন নির্ভীক বাংলায়: ${articleUrl} #NirbhikBangla`,
            twitter: `🚨 ${title.slice(0, 180)}...\n\nপড়ুন: ${articleUrl} #NirbhikBangla`,
            whatsapp: `📰 *নির্ভীক বাংলা*\n\n⚡ *${title}*\n\n${excerpt.slice(0, 150)}...\n\n👉 বিস্তারিত পড়ুন: ${articleUrl}`,
            telegram: `⚡ **নির্ভীক বাংলা**\n\n**${title}**\n\n${excerpt.slice(0, 200)}...\n\n📌 বিস্তারিত পড়ুন: ${articleUrl}`
          };
        }
      }

      // Ensure the article link is securely appended to each generated caption
      for (const platform of Object.keys(captions)) {
        if (captions[platform] && !captions[platform].includes(siteUrl) && !captions[platform].includes(articleUrl)) {
          captions[platform] = `${captions[platform]}\n\n🔗 বিস্তারিত পড়ুন: ${articleUrl}`;
        }
      }

      // 4. Dispatch concurrently to all active platforms
      const broadcastPromises = activeAccounts.map(async (account) => {
        const platform = account.platform;
        try {
          if (platform === 'telegram') {
            if (account.botToken && account.chatId) {
              const tgCaption = captions.telegram || captions.whatsapp || `⚡ **${title}**\n\n📌 বিস্তারিত পড়ুন: ${articleUrl}`;
              
              const hasImage = !!article.featuredImageUrl;
              const tgEndpoint = hasImage 
                ? `https://api.telegram.org/bot${account.botToken}/sendPhoto` 
                : `https://api.telegram.org/bot${account.botToken}/sendMessage`;
              
              const payload = hasImage ? {
                chat_id: account.chatId,
                photo: article.featuredImageUrl,
                caption: tgCaption.slice(0, 1024),
                parse_mode: 'Markdown'
              } : {
                chat_id: account.chatId,
                text: tgCaption,
                parse_mode: 'Markdown'
              };

              const tgRes = await fetch(tgEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
              });
              const tgData = await tgRes.json();

              if (tgData.ok) {
                console.log(`[AUTO-POST]: ✅ Successfully posted to Telegram Channel (${account.name}).`);
              } else {
                throw new Error(`Telegram API Error: ${tgData.description}`);
              }
            } else {
              console.log(`[AUTO-POST]: ⚠️ Simulated Telegram auto-post sent (No credentials).`);
            }
          } else {
            // Simulated post for Facebook, Twitter, WhatsApp, Instagram
            console.log(`[AUTO-POST]: 🚀 Successfully posted to ${account.name} (Simulated). Caption preview: "${captions[platform]?.slice(0, 40)}..."`);
          }
        } catch (postError) {
          console.error(`[AUTO-POST]: ❌ Failed to post to ${platform} (${account.name}):`, postError.message);
          throw postError; // Propagate for Promise.allSettled status
        }
      });

      // Await all dispatches to finish
      await Promise.allSettled(broadcastPromises);

      // Mark article as shared only after dispatch attempts
      article.isShared = true;
      await Article.findByIdAndUpdate(article._id, { isShared: true });
      console.log('[AUTO-POST]: Broadcast cycle complete.');
      
    } catch (globalError) {
      console.error('[AUTO-POST]: Global error in social service auto-post:', globalError.message);
    }
  }
}

module.exports = new SocialService();
