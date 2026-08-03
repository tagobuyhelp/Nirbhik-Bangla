'use client';

import { useLanguage } from '@/context/LanguageContext';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

export default function DisclaimerPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <AlertTriangle size={18} />
            <span>Legal Disclaimer</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Disclaimer - Nirbhik Bangla
          </h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: August 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. General Information Disclaimer</h2>
          <p>
            All the information on this website – <strong>https://nirbhikbangla.com</strong> – is published in good faith and for general news and information purpose only. Nirbhik Bangla does not make any warranties about the completeness, reliability, and accuracy of this information. Any action you take upon the information you find on this website is strictly at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. External Links Disclaimer</h2>
          <p>
            From our website, you can visit other websites by following hyperlinks to such external sites. While we strive to provide only quality links to useful and ethical websites, we have no control over the content and nature of these sites. These links to other websites do not imply a recommendation for all the content found on these sites.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. Fair Use Notice (Section 107)</h2>
          <p>
            Nirbhik Bangla may use copyrighted material which has not always been specifically authorized by the copyright owner. We are making such material available for news reporting, criticism, comment, teaching, and research purposes under the 'Fair Use' doctrine of copyright law.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">4. Consent & Updates</h2>
          <p>
            By using our website, you hereby consent to our disclaimer and agree to its terms. Should we update, amend or make any changes to this document, those changes will be prominently posted here.
          </p>
          <p className="font-bold text-slate-900 mt-2">
            Contact: nirvikbanglaportal@gmail.com | Phone: 033-68288835 | Editor: AMAR DEB
          </p>
        </section>

      </div>
    </div>
  );
}
