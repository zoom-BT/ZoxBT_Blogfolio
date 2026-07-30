'use client';

import { useRef } from 'react';

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByOneSlide = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const slide = track.querySelector<HTMLElement>('[data-slide]');
    const slideWidth = slide ? slide.offsetWidth + 16 : track.clientWidth * 0.85;
    track.scrollBy({ left: direction * slideWidth, behavior: 'smooth' });
  };

  return (
    <div style={{ position: 'relative', margin: '1.5em 0' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          WebkitOverflowScrolling: 'touch',
          padding: '0 4px 8px',
        }}
      >
        {images.map((img, i) => (
          <div
            key={i}
            data-slide
            style={{
              flex: '0 0 auto',
              width: 'min(85%, 420px)',
              scrollSnapAlign: 'start',
            }}
          >
            <div
              style={{
                height: '360px',
                background: 'var(--bg-secondary)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <img
                src={img.src}
                alt={img.alt}
                style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
              />
            </div>
            {img.caption && (
              <p style={{ marginTop: '0.5em', fontWeight: 700, fontSize: '0.95em' }}>
                {img.caption}
              </p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        aria-label="Previous"
        onClick={() => scrollByOneSlide(-1)}
        style={{
          position: 'absolute',
          left: '4px',
          top: '160px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontSize: '18px',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ‹
      </button>
      <button
        type="button"
        aria-label="Next"
        onClick={() => scrollByOneSlide(1)}
        style={{
          position: 'absolute',
          right: '4px',
          top: '160px',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          border: 'none',
          background: 'rgba(0,0,0,0.55)',
          color: '#fff',
          fontSize: '18px',
          lineHeight: 1,
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        ›
      </button>
    </div>
  );
}
