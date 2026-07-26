import { Construction } from 'lucide-react';

export default function GenericPage({ title, description }) {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">
          {title}
        </h1>
        <p className="text-xs font-medium text-slate-500 mt-0.5">
          {description || `Manage and view ${title} section.`}
        </p>
      </div>

      <div className="bg-white p-12 rounded-2xl border border-slate-200/80 shadow-2xs flex flex-col items-center justify-center text-center py-20">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#eb1c24] flex items-center justify-center mb-4 border border-red-100">
          <Construction size={32} />
        </div>
        <h3 className="text-lg font-extrabold text-slate-900">{title} Module</h3>
        <p className="text-xs text-slate-500 max-w-sm mt-1 leading-relaxed">
          এই বিভাগটির ইউআই মকআপ প্রস্তুত রয়েছে। খুব শীঘ্রই এর এপিআই ইন্টিগ্রেশন সম্পন্ন হবে।
        </p>
      </div>
    </div>
  );
}
