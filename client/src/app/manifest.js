export default function manifest() {
  return {
    name: 'নির্ভীক বাংলা | Nirbhik Bangla',
    short_name: 'Nirbhik Bangla',
    description: 'পশ্চিমবঙ্গের বিশ্বস্ত সর্বশেষ সংবাদ, ব্রেকিং নিউজ ও লাইভ টিভি সম্প্রচার।',
    start_url: '/bn',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#090d16',
    icons: [
      {
        src: '/images/logos/Nirbhik-Bangla-Icon.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any maskable',
      },
      {
        src: '/images/logos/Nirbhik-Bangla-Icon.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  };
}
