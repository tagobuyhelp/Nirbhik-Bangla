'use client';

import { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export default function ArticlePhotoGallery({ images = [], lang = 'bn' }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const openLightbox = (index) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const prevImage = () => {
    setLightboxIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setLightboxIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const galleryTitle = lang === 'en' ? 'Photo Gallery' : lang === 'hi' ? 'फोटो गैलरी' : 'ফটোগ্যালারি';
  const photoCountText = lang === 'en' ? `${images.length} Photos` : lang === 'hi' ? `${images.length} तस्वीरें` : `${images.length} টি ছবি`;

  return (
    <div className="my-6 rounded-2xl border border-slate-200/80 bg-slate-50/70 p-4 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200/70 pb-3 mb-3.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#d70b18] text-white flex items-center justify-center shadow-xs">
            <Camera size={16} />
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{galleryTitle}</h3>
            <span className="text-[11px] font-semibold text-slate-500">{photoCountText}</span>
          </div>
        </div>

        <button
          onClick={() => openLightbox(0)}
          className="flex items-center gap-1.5 text-xs font-bold text-[#d70b18] hover:text-red-700 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-xl transition-all cursor-pointer"
        >
          <Maximize2 size={13} />
          <span>{lang === 'en' ? 'View All' : lang === 'hi' ? 'सभी देखें' : 'সব দেখুন'}</span>
        </button>
      </div>

      {/* Responsive Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {images.slice(0, 3).map((imgUrl, idx) => {
          const isThird = idx === 2 && images.length > 3;
          const extraCount = images.length - 3;

          return (
            <div
              key={idx}
              onClick={() => openLightbox(idx)}
              className="relative h-32 sm:h-40 rounded-xl overflow-hidden group cursor-pointer border border-slate-200/80 bg-slate-200 shadow-2xs"
            >
              <img
                src={imgUrl}
                alt={`Gallery image ${idx + 1}`}
                className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />

              {isThird && (
                <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-2xs flex flex-col items-center justify-center text-white font-extrabold p-2 text-center">
                  <span className="text-xl">+ {extraCount}</span>
                  <span className="text-[10px] uppercase tracking-wider font-bold text-red-200">
                    {lang === 'en' ? 'More Photos' : lang === 'hi' ? 'और तस्वीरें' : 'আরও ছবি'}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
          {/* Top Control Bar */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-white z-10">
            <div className="flex items-center gap-2 bg-slate-900/80 px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold shadow-md">
              <Camera size={14} className="text-[#d70b18]" />
              <span>{lightboxIndex + 1} / {images.length}</span>
            </div>

            <button
              onClick={closeLightbox}
              className="w-9 h-9 rounded-full bg-slate-900/80 hover:bg-red-600 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20 shadow-md"
              aria-label="Close gallery"
            >
              <X size={20} />
            </button>
          </div>

          {/* Previous Image Button */}
          {images.length > 1 && (
            <button
              onClick={prevImage}
              className="absolute left-3 sm:left-6 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg z-10 hover:scale-105"
              aria-label="Previous photo"
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Main Focused Image Container */}
          <div className="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center p-2">
            <img
              src={images[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-h-[75vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
            />
          </div>

          {/* Next Image Button */}
          {images.length > 1 && (
            <button
              onClick={nextImage}
              className="absolute right-3 sm:right-6 w-11 h-11 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white flex items-center justify-center transition-all cursor-pointer border border-white/20 shadow-lg z-10 hover:scale-105"
              aria-label="Next photo"
            >
              <ChevronRight size={24} />
            </button>
          )}
        </div>
      )}
    </div>
  );
}
