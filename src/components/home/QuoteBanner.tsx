import Image from 'next/image';

export default function QuoteBanner() {
  return (
    <section className="relative h-[40vh] min-h-[300px] overflow-hidden md:h-[50vh]">
      <Image
        src="/images/quote-future.jpg"
        alt="Your future is created by what you do today, not tomorrow"
        fill
        className="object-cover"
        sizes="100vw"
        quality={75}
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/30" />
    </section>
  );
}
