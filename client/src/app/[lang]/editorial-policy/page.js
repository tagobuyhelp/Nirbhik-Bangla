'use client';

import { useLanguage } from '@/context/LanguageContext';
import { Award, CheckCircle, FileCheck, RefreshCw } from 'lucide-react';

export default function EditorialPolicyPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <Award size={18} />
            <span>Journalistic Ethics & Standards</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Editorial Policy & Fact-Checking Standards
          </h1>
          <p className="text-slate-400 text-xs font-mono">Nirbhik Bangla Newsroom Code of Ethics</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. Commitment to Truth & Independence</h2>
          <p>
            At <strong>Nirbhik Bangla</strong>, editorial independence and accuracy are paramount. Our journalists operate free from political, commercial, or third-party influence. Every news report published on our platform undergoes strict verification before release.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. Fact-Checking Methodology</h2>
          <p>Our editorial team follows a multi-tier fact-checking process:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Primary Source Verification:</strong> We prioritize eyewitness testimony, official documents, and verified audio-video footage.</li>
            <li><strong>Cross-Referencing:</strong> Unverified claims are corroborated with multiple independent sources.</li>
            <li><strong>Expert Review:</strong> Complex legal, medical, or technical developments are reviewed by industry domain experts.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. Correction & Retraction Policy</h2>
          <p>
            Nirbhik Bangla believes in transparent accountability. If a factual error or typo occurs in any article:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Minor typos are corrected promptly.</li>
            <li>Factual corrections are noted at the bottom of the article with a clear 'Correction Notice'.</li>
            <li>If a story is proven fundamentally false, it will be formally retracted with a publicly logged explanation.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">4. Report a Correction</h2>
          <p>
            If you spot any inaccuracy in our news reporting, please alert our editorial desk immediately:
          </p>
          <p className="font-bold text-slate-900">
            Email: nirvikbanglaportal@gmail.com | Phone: 033-68288835 | Editor-in-Chief: AMAR DEB
          </p>
        </section>

      </div>
    </div>
  );
}
