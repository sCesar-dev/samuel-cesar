import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useI18n } from '../i18n/useI18n';
import { formatString } from '../i18n/translations';

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

export default function ImageCarousel({ images, altPrefix }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const { t } = useI18n();
  const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');

  const resolveUrl = (url: string) => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    return url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
  };

  if (!images || images.length === 0) return null;

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) nextImage();
      else prevImage();
    }
    setTouchStartX(null);
  };

  return (
    <div 
      className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#121216]/80 aspect-video flex items-center justify-center group transition-colors touch-pan-y"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={resolveUrl(images[currentIndex])}
          alt={`${altPrefix} (${currentIndex + 1}/${images.length})`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 w-full h-full object-contain"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-3 md:left-4 p-2 rounded-lg bg-black/60 text-white hover:bg-cyan-400 hover:text-black transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none backdrop-blur-md cursor-pointer border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center z-20"
            aria-label={t.projectDetail.prevImage}
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-3 md:right-4 p-2 rounded-lg bg-black/60 text-white hover:bg-cyan-400 hover:text-black transition-all opacity-90 md:opacity-0 md:group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400 focus:outline-none backdrop-blur-md cursor-pointer border border-white/10 min-h-[44px] min-w-[44px] flex items-center justify-center z-20"
            aria-label={t.projectDetail.nextImage}
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`min-h-[36px] min-w-[36px] flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400`}
                aria-label={formatString(t.projectDetail.goToImage, { index: idx + 1 })}
              >
                <span className={`block rounded-full transition-all ${
                  idx === currentIndex ? 'bg-cyan-400 w-5 h-2' : 'bg-white/40 hover:bg-white w-2 h-2'
                }`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
