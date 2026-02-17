import Image from 'next/image';

export default function QuoteBanner() {
  return (
    <section className="border-t border-[var(--border-light)] py-12" style={{ background: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <div className="relative h-[250px] overflow-hidden rounded-lg md:h-[300px]">
          <Image
            src="/images/quote-future.jpg"
            alt="Your future is created by what you do today, not tomorrow"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
            quality={75}
            loading="lazy"
          />
          <div className="absolute inset-0 rounded-lg bg-black/20" />
        </div>
      </div>
    </section>
  );
}
