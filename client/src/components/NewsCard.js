'use client';

import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Clock, Eye, Bookmark } from 'lucide-react';

export default function NewsCard({
  article,
  variant = 'default', // 'default' | 'featured' | 'horizontal' | 'compact'
  index = 0,
}) {
  const { t, localized } = useLanguage();

  const title = localized(article?.title) || 'শিরোনাম';
  const excerpt = localized(article?.excerpt) || '';
  const categoryName = localized(article?.categoryName) || '';
  const categorySlug = article?.categorySlug || 'politics';
  const slug = article?.slug || '#';
  const authorName = article?.authorName || '';
  const timeAgo = article?.timeAgo || '২ ঘণ্টা আগে';
  const views = article?.views || 0;
  const image = article?.image || '/placeholder-news.jpg';

  const badgeColor = {
    politics: '#dc2626', sports: '#16a34a', entertainment: '#9333ea',
    business: '#2563eb', technology: '#0891b2', crime: '#dc2626',
    international: '#7c3aed', national: '#1e3a5f', state: '#ea580c',
    education: '#f59e0b', health: '#10b981', science: '#059669',
  }[categorySlug] || '#475569';

  // --- Featured / Hero Card ---
  if (variant === 'featured') {
    return (
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.05, duration: 0.5 }}
        className="relative group rounded-2xl overflow-hidden cursor-pointer"
        style={{ minHeight: 420 }}
      >
        <Link href={`/news/${slug}`} className="block relative h-full">
          {/* Image */}
          <div className="absolute inset-0 bg-gray-800">
            <div
              className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
              style={{ backgroundImage: `url('${image}')` }}
            />
            <div className="absolute inset-0" style={{ background: 'var(--gradient-card)' }} />
          </div>

          {/* Content Overlay */}
          <div className="relative h-full flex flex-col justify-end p-6 lg:p-8">
            <span
              className="inline-block self-start px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide text-white mb-3"
              style={{ background: badgeColor }}
            >
              {categoryName}
            </span>
            <h2 className="text-white text-xl lg:text-2xl font-bold leading-snug mb-2 line-clamp-3 group-hover:underline underline-offset-4 decoration-2">
              {title}
            </h2>
            {excerpt && (
              <p className="text-white/70 text-sm line-clamp-2 mb-3 max-w-xl">{excerpt}</p>
            )}
            <div className="flex items-center gap-3 text-white/60 text-xs">
              {authorName && <span>{authorName}</span>}
              <span className="flex items-center gap-1"><Clock size={12} />{timeAgo}</span>
              {views > 0 && <span className="flex items-center gap-1"><Eye size={12} />{views}</span>}
            </div>
          </div>
        </Link>
      </motion.article>
    );
  }

  // --- Horizontal Card ---
  if (variant === 'horizontal') {
    return (
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.06, duration: 0.4 }}
        className="group flex gap-4 items-start"
      >
        <Link href={`/news/${slug}`} className="shrink-0 w-28 h-20 rounded-lg overflow-hidden">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
            style={{ backgroundImage: `url('${image}')`, background: image.startsWith('/') ? '#334155' : undefined }}
          />
        </Link>
        <div className="flex-1 min-w-0">
          <span
            className="inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide text-white mb-1.5"
            style={{ background: badgeColor }}
          >
            {categoryName}
          </span>
          <Link href={`/news/${slug}`}>
            <h3
              className="text-sm font-semibold leading-snug line-clamp-2 mb-1 transition-colors duration-200 group-hover:text-[var(--brand-primary)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h3>
          </Link>
          <span className="text-[11px] flex items-center gap-1" style={{ color: 'var(--text-muted)' }}>
            <Clock size={11} />{timeAgo}
          </span>
        </div>
      </motion.article>
    );
  }

  // --- Compact Card (numbered list style) ---
  if (variant === 'compact') {
    return (
      <motion.article
        initial={{ opacity: 0, x: 15 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.08, duration: 0.35 }}
        className="group flex items-start gap-3 py-3 border-b"
        style={{ borderColor: 'var(--border-default)' }}
      >
        <span
          className="shrink-0 w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white"
          style={{ background: index < 3 ? 'var(--brand-primary)' : 'var(--text-muted)' }}
        >
          {(index + 1).toString().padStart(2, '0')}
        </span>
        <div className="flex-1 min-w-0">
          <Link href={`/news/${slug}`}>
            <h4
              className="text-sm font-semibold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[var(--brand-primary)]"
              style={{ color: 'var(--text-primary)' }}
            >
              {title}
            </h4>
          </Link>
          <span className="text-[11px] mt-0.5 block" style={{ color: 'var(--text-muted)' }}>{timeAgo}</span>
        </div>
      </motion.article>
    );
  }

  // --- Default Vertical Card ---
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="group rounded-xl overflow-hidden transition-shadow duration-300"
      style={{ background: 'var(--bg-card)', boxShadow: 'var(--shadow-sm)' }}
    >
      <Link href={`/news/${slug}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden aspect-[16/9]">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
            style={{ backgroundImage: `url('${image}')`, background: image.startsWith('/') ? '#334155' : undefined }}
          />
          <span
            className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide text-white"
            style={{ background: badgeColor }}
          >
            {categoryName}
          </span>
          {/* Bookmark icon */}
          <button
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/30 text-white/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-black/60"
            onClick={(e) => e.preventDefault()}
            aria-label="Bookmark"
          >
            <Bookmark size={14} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3
            className="font-semibold text-[15px] leading-snug line-clamp-2 mb-2 transition-colors duration-200 group-hover:text-[var(--brand-primary)]"
            style={{ color: 'var(--text-primary)' }}
          >
            {title}
          </h3>
          {excerpt && (
            <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--text-secondary)' }}>{excerpt}</p>
          )}
          <div className="flex items-center justify-between text-[11px]" style={{ color: 'var(--text-muted)' }}>
            <div className="flex items-center gap-2">
              {authorName && <span className="font-medium">{authorName}</span>}
              <span className="flex items-center gap-1"><Clock size={11} />{timeAgo}</span>
            </div>
            {views > 0 && <span className="flex items-center gap-1"><Eye size={11} />{views}</span>}
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
