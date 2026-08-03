'use client';

import { useLanguage } from '@/context/LanguageContext';
import { FileText, ShieldAlert } from 'lucide-react';

export default function TermsPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <FileText size={18} />
            <span>Legal Agreement</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            Terms & Conditions - Nirbhik Bangla
          </h1>
          <p className="text-slate-400 text-xs font-mono">Last Updated: August 2026</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>Nirbhik Bangla (nirbhikbangla.com)</strong>, you agree to be bound by these Terms and Conditions of Use. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. Intellectual Property & License</h2>
          <p>
            Unless otherwise stated, Nirbhik Bangla and/or its licensors own the intellectual property rights for all material on Nirbhik Bangla. All intellectual property rights are reserved. You may access this for your own personal use subjected to restrictions set in these terms and conditions.
          </p>
          <p className="font-bold text-slate-900">You must not:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Republish material from Nirbhik Bangla without explicit written consent.</li>
            <li>Sell, rent, or sub-license material from Nirbhik Bangla.</li>
            <li>Reproduce, duplicate or copy material for commercial gain.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. User Conduct & Comments</h2>
          <p>
            Parts of this website offer an opportunity for users to post opinions and information. Nirbhik Bangla does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Nirbhik Bangla. We reserve the right to monitor and remove any comments deemed inappropriate, offensive, or infringing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">4. Disclaimer of Liability</h2>
          <p>
            The materials on Nirbhik Bangla's website are provided on an 'as is' basis. Nirbhik Bangla makes no warranties, expressed or implied, and hereby disclaims all other warranties including, without limitation, implied warranties or conditions of merchantability or fitness for a particular purpose.
          </p>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">5. Governing Law & Jurisdiction</h2>
          <p>
            These terms and conditions are governed by and construed in accordance with the laws of India, and any legal matters shall fall under the exclusive jurisdiction of the courts in Kolkata, West Bengal.
          </p>
          <p className="font-bold text-slate-900 mt-2">
            Contact Email: nirvikbanglaportal@gmail.com | Phone: 033-68288835 | Editor: AMAR DEB
          </p>
        </section>

      </div>
    </div>
  );
}
