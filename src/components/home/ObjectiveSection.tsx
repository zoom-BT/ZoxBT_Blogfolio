'use client';

import Link from 'next/link';
import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';

export default function ObjectiveSection({ locale }: { locale: string }) {
  const t = locale === 'fr'
    ? {
        title: 'Mon Objectif',
        text: "Contribuer a la democratisation de l'IA en Afrique et developper des technologies qui valorisent nos langues et notre patrimoine culturel. Je souhaite poursuivre mes recherches au niveau international tout en restant ancre dans les realites africaines.",
        cta1: 'En savoir plus',
        cta2: 'Me contacter',
      }
    : {
        title: 'My Objective',
        text: 'Contributing to the democratization of AI in Africa and developing technologies that value our languages and cultural heritage. I wish to pursue my research at the international level while staying grounded in African realities.',
        cta1: 'Learn more',
        cta2: 'Contact me',
      };

  return (
    <section className="relative border-t border-[var(--border-light)] py-20" style={{ background: 'var(--bg-primary)' }}>
      {/* Subtle circuit background */}
      <div className="circuit-grid absolute inset-0 opacity-20" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection>
          <div className="grid items-center gap-12 md:grid-cols-2">
            {/* Left: Astronaut image */}
            <div className="relative mx-auto w-full max-w-md overflow-hidden rounded-lg">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/images/astronaut.jpg"
                  alt="Astronaut - Reaching for the stars"
                  fill
                  className="object-cover rounded-lg"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={75}
                  loading="lazy"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Right: Text content */}
            <div className="text-center md:text-left">
              <h2 className="mb-6 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">{t.title}</h2>
              <p className="mb-8 text-lg leading-relaxed text-[var(--text-secondary)] md:text-xl" style={{ lineHeight: 1.8 }}>
                {t.text}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                <Link
                  href={`/${locale}/about`}
                  className="inline-flex items-center gap-2 rounded-lg bg-[var(--text-primary)] px-6 py-3 text-sm font-bold text-[var(--text-inverse)] transition-all hover:opacity-90"
                >
                  {t.cta1} &rarr;
                </Link>
                <Link
                  href={`/${locale}/contact`}
                  className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-medium)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition-all hover:border-[var(--text-primary)]"
                >
                  {t.cta2}
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
