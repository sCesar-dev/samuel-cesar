import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageCarouselProps {
  images: string[];
  altPrefix: string;
}

export default function ImageCarousel({ images, altPrefix }: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  return (
    <div className="relative w-full rounded-xl overflow-hidden border border-white/10 bg-[#121216]/80 aspect-video flex items-center justify-center group">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={resolveUrl(images[currentIndex])}
          alt={`${altPrefix} image ${currentIndex + 1}`}
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
            className="absolute left-4 p-2 rounded-lg bg-black/60 text-white hover:bg-cyan-400 hover:text-black transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none backdrop-blur-md cursor-pointer border border-white/10"
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          
          <button
            onClick={nextImage}
            className="absolute right-4 p-2 rounded-lg bg-black/60 text-white hover:bg-cyan-400 hover:text-black transition-all opacity-0 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none backdrop-blur-md cursor-pointer border border-white/10"
            aria-label="Próxima imagem"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer focus-visible:ring-2 focus-visible:ring-cyan-400 focus-visible:outline-none ${
                  idx === currentIndex ? 'bg-cyan-400 w-5' : 'bg-white/40 hover:bg-white'
                }`}
                aria-label={`Ir para a imagem ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
