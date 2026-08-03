const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');
const NotificationLog = require('../models/NotificationLog');

// Generate or use VAPID keys from environment variables
let vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
let vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
const vapidEmail = process.env.VAPID_EMAIL || 'mailto:contact@nirbhikbangla.com';

if (!vapidPublicKey || !vapidPrivateKey) {
  const generatedKeys = webpush.generateVAPIDKeys();
  vapidPublicKey = generatedKeys.publicKey;
  vapidPrivateKey = generatedKeys.privateKey;
}

webpush.setVapidDetails(vapidEmail, vapidPublicKey, vapidPrivateKey);

class PushNotificationService {
  getPublicKey() {
    return vapidPublicKey;
  }

  async subscribe(subscriptionData, userAgent = '') {
    const { endpoint, keys } = subscriptionData;
    if (!endpoint || !keys || !keys.p256dh || !keys.auth) {
      throw new Error('Invalid subscription data');
    }

    const deviceType = /mobile/i.test(userAgent) ? 'mobile' : /tablet/i.test(userAgent) ? 'tablet' : 'desktop';

    const sub = await PushSubscription.findOneAndUpdate(
      { endpoint },
      {
        endpoint,
        keys,
        userAgent,
        deviceType,
        status: 'active',
        failCount: 0
      },
      { upsert: true, returnDocument: 'after', runValidators: true }
    );

    return sub;
  }

  async unsubscribe(endpoint) {
    await PushSubscription.findOneAndUpdate({ endpoint }, { status: 'unsubscribed' });
    return true;
  }

  async sendBroadcast({ title, body, icon, image, url, target = 'all', createdBy = null }) {
    const activeSubs = await PushSubscription.find({ status: 'active' });
    if (activeSubs.length === 0) {
      console.log('[PUSH] No active push subscriptions found.');
      return { totalTargeted: 0, totalDelivered: 0 };
    }

    const payload = JSON.stringify({
      title: typeof title === 'object' ? (title.bn || title.en) : title,
      body: typeof body === 'object' ? (body.bn || body.en) : body,
      icon: icon || '/favicon.ico',
      image: image || '',
      url: url || '/',
      timestamp: Date.now()
    });

    let deliveredCount = 0;
    const sendPromises = activeSubs.map(async (sub) => {
      try {
        await webpush.sendNotification({
          endpoint: sub.endpoint,
          keys: sub.keys
        }, payload);

        sub.lastSentAt = new Date();
        sub.failCount = 0;
        await sub.save();
        deliveredCount++;
      } catch (err) {
        console.error(`[PUSH FAIL] Endpoint ${sub.endpoint.slice(0, 30)}... failed: ${err.statusCode || err.message}`);
        // If 404 or 410, subscription has expired / user unsubscribed from browser
        if (err.statusCode === 404 || err.statusCode === 410) {
          sub.status = 'failed';
          await sub.save();
        } else {
          sub.failCount += 1;
          if (sub.failCount >= 3) sub.status = 'failed';
          await sub.save();
        }
      }
    });

    await Promise.allSettled(sendPromises);

    // Record notification log
    const log = await NotificationLog.create({
      title: typeof title === 'object' ? title : { bn: title, en: '', hi: '' },
      body: typeof body === 'object' ? body : { bn: body, en: '', hi: '' },
      icon,
      image,
      url,
      target,
      totalTargeted: activeSubs.length,
      totalDelivered: deliveredCount,
      sentAt: new Date(),
      createdBy
    });

    return { log, totalTargeted: activeSubs.length, totalDelivered: deliveredCount };
  }

  async getStats() {
    const totalActive = await PushSubscription.countDocuments({ status: 'active' });
    const totalMobile = await PushSubscription.countDocuments({ status: 'active', deviceType: 'mobile' });
    const totalDesktop = await PushSubscription.countDocuments({ status: 'active', deviceType: 'desktop' });
    const totalLogs = await NotificationLog.countDocuments();

    return {
      totalActive,
      totalMobile,
      totalDesktop,
      totalLogs
    };
  }
}

module.exports = new PushNotificationService();
