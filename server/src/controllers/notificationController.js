const webpush = require('web-push');
const PushSubscription = require('../models/PushSubscription');

// Configure Web Push VAPID keys
const vapidPublicKey = process.env.VAPID_PUBLIC_KEY || 'BFUAijMPyigTPURf6oyJa9aQ3ublhlHdveqWgGC81YPbTEuY5V8A8HGKliWleYwZ_RgCQDJw27CRe2lXKsxHXyg';
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY || 'pGcjF060eEIbfo6bIX9dQzanfScPaH3IsqTpwryCpmw';
const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:contact@nirbhikbangla.com';

webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

// GET /api/v1/notifications/vapid-public-key
exports.getVapidPublicKey = (req, res) => {
  res.json({
    success: true,
    data: { publicKey: vapidPublicKey }
  });
};

// POST /api/v1/notifications/subscribe
exports.subscribe = async (req, res) => {
  try {
    const { subscription } = req.body;
    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ success: false, message: 'Invalid subscription object' });
    }

    const existing = await PushSubscription.findOne({ endpoint: subscription.endpoint });
    if (existing) {
      existing.status = 'active';
      existing.keys = subscription.keys;
      await existing.save();
      return res.json({ success: true, message: 'Subscription updated' });
    }

    await PushSubscription.create({
      endpoint: subscription.endpoint,
      keys: subscription.keys,
      userAgent: req.headers['user-agent'] || '',
      status: 'active'
    });

    res.status(201).json({ success: true, message: 'Subscribed to push notifications successfully' });
  } catch (err) {
    console.error('Push Subscribe Error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// Send Push Notification Helper Function
exports.sendPushToAllSubscribers = async (payloadData) => {
  try {
    const activeSubs = await PushSubscription.find({ status: 'active' });
    console.log(`Sending Web Push Notification to ${activeSubs.length} active subscribers...`);

    const payload = JSON.stringify({
      title: payloadData.title || 'নির্ভীক বাংলা - ব্রেকিং নিউজ',
      body: payloadData.body || 'গুরুত্বপূর্ণ সংবাদের তাত্ক্ষণিক আপডেট জানুন।',
      icon: payloadData.icon || '/favicon.ico',
      image: payloadData.image || null,
      url: payloadData.url || '/'
    });

    const sendPromises = activeSubs.map(async (sub) => {
      try {
        const pushSub = {
          endpoint: sub.endpoint,
          keys: sub.keys
        };
        await webpush.sendNotification(pushSub, payload);
        sub.lastSentAt = new Date();
        await sub.save();
      } catch (err) {
        if (err.statusCode === 404 || err.statusCode === 410) {
          console.log(`Removing expired subscription: ${sub.endpoint}`);
          await PushSubscription.deleteOne({ _id: sub._id });
        } else {
          sub.failCount = (sub.failCount || 0) + 1;
          if (sub.failCount > 5) sub.status = 'failed';
          await sub.save();
        }
      }
    });

    await Promise.all(sendPromises);
    console.log('Web Push Notifications sent successfully!');
  } catch (err) {
    console.error('Send Push Notification Error:', err);
  }
};

// POST /api/v1/notifications/send-test
exports.sendTestNotification = async (req, res) => {
  try {
    const { title, body, url } = req.body;
    await exports.sendPushToAllSubscribers({
      title: title || 'নির্ভীক বাংলা - টেস্ট নোটিফিকেশন',
      body: body || 'নতুন পোস্ট নোটিফিকেশন সফলভাবে কাজ করছে!',
      url: url || 'https://nirbhikbangla.com'
    });
    res.json({ success: true, message: 'Test notification sent to all subscribers' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
