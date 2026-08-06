'use client';

import AnimatedSection from '@/components/shared/AnimatedSection';

const interestsData = {
  fr: [
    { title: 'IA pour le développement en Afrique', desc: 'Agriculture, santé, climat, inclusion financière' },
    { title: 'Foundation models & fine-tuning', desc: 'Surtout low-resource / edge' },
    { title: 'Compétitions ML & communauté open data', desc: 'Zindi' },
    { title: 'Recherche appliquée', desc: 'Grokking, label noise, systèmes multimodaux' },
    { title: 'Transmission / teaching', desc: 'MLTS, débats, talks Bénin & Tchad' },
    { title: 'Outils AI engineering', desc: 'Cursor, agents, skills' },
    { title: 'Basketball, échecs, scrabble, lecture', desc: 'Développement personnel, business, finance' },
  ],
  en: [
    { title: 'AI for development in Africa', desc: 'Agriculture, health, climate, financial inclusion' },
    { title: 'Foundation models & fine-tuning', desc: 'Mostly low-resource / edge' },
    { title: 'ML competitions & open data community', desc: 'Zindi' },
    { title: 'Applied research', desc: 'Grokking, label noise, multimodal systems' },
    { title: 'Teaching & knowledge sharing', desc: 'MLTS, debates, talks in Benin & Chad' },
    { title: 'AI engineering tooling', desc: 'Cursor, agents, skills' },
    { title: 'Basketball, chess, scrabble, reading', desc: 'Personal development, business, finance' },
  ],
};

export default function InterestsSection({ locale }: { locale: string }) {
  const interests = interestsData[locale as 'fr' | 'en'] || interestsData.fr;
  const title = locale === 'fr' ? "Centres d'Intérêt" : 'Interests';

  return (
    <section className="border-t border-[var(--border-light)] py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto h-px w-12 bg-[var(--accent-blue)]" />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {interests.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.08}>
              <div className="card group cursor-default p-4 text-center">
                <h3 className="mb-1 text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
