'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ShieldCheck, Lock, FileText, Globe } from 'lucide-react';

export default function PrivacyPolicyPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <ShieldCheck size={18} />
            <span>Google AdSense Compliant Policy</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Privacy Policy - Nirbhik Bangla
          </h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: August 2026 | Effective Immediately</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. Introduction</h2>
          <p>
            At <strong>Nirbhik Bangla (nirbhikbangla.com)</strong>, accessible from https://nirbhikbangla.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by Nirbhik Bangla and how we use it.
          </p>
          <p>
            If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at <strong>info@nirbhikbangla.com</strong>.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. Google DoubleClick DART Cookie & Google AdSense</h2>
          <p>
            Google is one of a third-party vendor on our site. It also uses cookies, known as DART cookies, to serve ads to our site visitors based upon their visit to www.website.com and other sites on the internet. However, visitors may choose to decline the use of DART cookies by visiting the Google ad and content network Privacy Policy at the following URL: <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" className="text-red-600 underline">https://policies.google.com/technologies/ads</a>
          </p>
          <p>
            Some of advertisers on our site may use cookies and web beacons. Our advertising partners include:
          </p>
          <ul className="list-disc pl-5 space-y-1 font-semibold text-slate-800">
            <li>Google AdSense & Google Ad Manager</li>
            <li>Google Analytics 4 (GA4)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. Log Files</h2>
          <p>
            Nirbhik Bangla follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">4. Third Party Privacy Policies</h2>
          <p>
            Nirbhik Bangla's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">5. CCPA Privacy Rights (Do Not Sell My Personal Information)</h2>
          <p>Under the CCPA, among other rights, California consumers have the right to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
            <li>Request that a business delete any personal data about the consumer that a business has collected.</li>
            <li>Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">6. GDPR Data Protection Rights</h2>
          <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>The right to access</strong> – You have the right to request copies of your personal data.</li>
            <li><strong>The right to rectification</strong> – You have the right to request that we correct any information you believe is inaccurate.</li>
            <li><strong>The right to erasure</strong> – You have the right to request that we erase your personal data, under certain conditions.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">7. Contact Information</h2>
          <p>
            For any privacy concerns or inquiries regarding this Privacy Policy, please contact our data protection desk:
          </p>
          <p className="font-bold text-slate-900">
            Email: nirvikbanglaportal@gmail.com | Phone: 033-68288835 | Address: NH19, ASANSOL, KALIPHARI, PASCHIM BURDWAN, WEST BENGAL, PIN 713303 (Editor: AMAR DEB)
          </p>
        </section>

      </div>
    </div>
  );
}
