'use client';

import { useLanguage } from '@/context/LanguageContext';
import { ShieldAlert, Mail } from 'lucide-react';

export default function DMCAPage() {
  const { locale } = useLanguage();

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 md:px-8 font-outfit">
      <div className="max-w-[1000px] mx-auto bg-white rounded-3xl p-6 md:p-12 border border-slate-200 shadow-xs space-y-6 text-slate-700 text-xs md:text-sm leading-relaxed">
        
        <div className="border-b border-slate-100 pb-6 space-y-2">
          <div className="flex items-center gap-2 text-[#eb1c24] font-extrabold text-xs uppercase tracking-wider">
            <ShieldAlert size={18} />
            <span>Copyright & DMCA Compliance</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">
            DMCA & Copyright Infringement Policy
          </h1>
          <p className="text-slate-400 text-xs font-mono">Nirbhik Bangla Legal Rights Protection</p>
        </div>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">1. DMCA Notice of Infringement</h2>
          <p>
            Nirbhik Bangla respects the intellectual property rights of others. If you believe that your copyrighted work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our copyright agent in accordance with the Digital Millennium Copyright Act of 1998 (DMCA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">2. Submitting a Takedown Notice</h2>
          <p>To file a DMCA infringement claim, please send a written notification containing:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Identification of the copyrighted work claimed to have been infringed.</li>
            <li>Identification of the material that is claimed to be infringing and URL links.</li>
            <li>Your contact information (name, phone number, email address).</li>
            <li>A statement that you have a good faith belief that use of the material is not authorized.</li>
            <li>A physical or electronic signature of the copyright owner or authorized representative.</li>
          </ul>
        </section>

        <section className="space-y-3 border-t border-slate-100 pt-4">
          <h2 className="text-base md:text-lg font-extrabold text-slate-900">3. Designated Copyright Agent Contact</h2>
          <p>
            Please send all copyright takedown notices to our legal desk:
          </p>
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 font-bold text-slate-900 space-y-1">
            <p>Editor-in-Chief: AMAR DEB</p>
            <p>Designated DMCA Agent: Legal & Rights Manager</p>
            <p>Nirbhik Bangla Digital News Desk</p>
            <p>Email: nirvikbanglaportal@gmail.com | Phone: 033-68288835</p>
            <p>Address: NH19, ASANSOL, KALIPHARI, PASCHIM BURDWAN, WEST BENGAL, PIN 713303</p>
          </div>
        </section>

      </div>
    </div>
  );
}
