'use client';

import AnimatedSection from '@/components/shared/AnimatedSection';

const expertiseData = {
  fr: [
    {
      title: 'Intelligence Artificielle',
      desc: "Developpement de modeles d'IA et Machine Learning pour resoudre des problemes complexes. Experience en Deep Learning, Computer Vision et reseaux de neurones.",
    },
    {
      title: 'NLP & Langues Africaines',
      desc: 'Recherche sur le traitement automatique du Medumba et autres langues camerounaises. Creation de corpus, tokenization et traduction automatique.',
    },
    {
      title: 'Developpement & Data',
      desc: 'Applications web modernes, visualisation de donnees avec Power BI, et solutions full-stack utilisant Python, JavaScript, SQL.',
    },
  ],
  en: [
    {
      title: 'Artificial Intelligence',
      desc: 'Development of AI and Machine Learning models to solve complex problems. Experience in Deep Learning, Computer Vision and neural networks.',
    },
    {
      title: 'NLP & African Languages',
      desc: 'Research on automatic processing of Medumba and other Cameroonian languages. Corpus creation, tokenization and machine translation.',
    },
    {
      title: 'Development & Data',
      desc: 'Modern web applications, data visualization with Power BI, and full-stack solutions using Python, JavaScript, SQL.',
    },
  ],
};

const icons = [
  // AI/Brain icon
  <svg key="ai" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19.8 15.3M14.25 3.104c.251.023.501.05.75.082M19.8 15.3l-1.57.393A9.065 9.065 0 0112 15a9.065 9.065 0 00-6.23.693L5 14.5m14.8.8l1.402 1.402c1.232 1.232.65 3.318-1.067 3.611A18.72 18.72 0 0112 21.75a18.72 18.72 0 01-6.363-1.106c-1.716-.293-2.3-2.379-1.067-3.611L12 15" />
  </svg>,
  // Chat/NLP icon
  <svg key="nlp" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 011.037-.443 48.282 48.282 0 005.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
  </svg>,
  // Code icon
  <svg key="code" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
  </svg>,
];

export default function ExpertiseSection({ locale }: { locale: string }) {
  const items = expertiseData[locale as 'fr' | 'en'] || expertiseData.fr;
  const title = locale === 'fr' ? 'Mon Expertise' : 'My Expertise';

  return (
    <section className="border-t border-[var(--border-light)] py-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto h-px w-12 bg-[var(--accent-blue)]" />
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.15}>
              <div className="card group cursor-default p-8">
                <div className="mb-4 text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-blue)]">
                  {icons[i]}
                </div>
                <h3 className="mb-3 text-lg font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
