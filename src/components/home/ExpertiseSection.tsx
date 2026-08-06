'use client';

import AnimatedSection from '@/components/shared/AnimatedSection';

const expertiseData = {
  fr: {
    principal: [
      { title: 'Computer Vision', desc: 'Agriculture, qualité produits, geospatial' },
      { title: 'Machine Learning appliqué / compétitif', desc: 'Compétitions data science (Zindi)' },
      { title: 'Geospatial AI & Foundation Models', desc: 'Imagerie satellite, crop mapping' },
      { title: 'NLP & low-resource', desc: 'ASR adapters, XLM-RoBERTa, langues africaines' },
      { title: 'Edge AI / on-device', desc: 'Gemma, LiteRT, offline rural' },
    ],
    secondaire: [
      { title: 'Data Science & analytics', desc: 'Time series, finance, climate' },
      { title: 'MLOps léger / APIs ML', desc: 'Django + PyTorch' },
      { title: 'Capacity building IA', desc: 'AI Cell, Zindi Ambassador, workshops' },
      { title: 'Data / BI', desc: 'Power BI, DAX' },
    ],
    principalLabel: 'Domaines principaux',
    secondaireLabel: 'Domaines secondaires',
  },
  en: {
    principal: [
      { title: 'Computer Vision', desc: 'Agriculture, product quality, geospatial' },
      { title: 'Applied / Competitive Machine Learning', desc: 'Data science competitions (Zindi)' },
      { title: 'Geospatial AI & Foundation Models', desc: 'Satellite imagery, crop mapping' },
      { title: 'NLP & Low-Resource', desc: 'ASR adapters, XLM-RoBERTa, African languages' },
      { title: 'Edge AI / On-Device', desc: 'Gemma, LiteRT, offline rural' },
    ],
    secondaire: [
      { title: 'Data Science & Analytics', desc: 'Time series, finance, climate' },
      { title: 'Lightweight MLOps / ML APIs', desc: 'Django + PyTorch' },
      { title: 'AI Capacity Building', desc: 'AI Cell, Zindi Ambassador, workshops' },
      { title: 'Data / BI', desc: 'Power BI, DAX' },
    ],
    principalLabel: 'Core Areas',
    secondaireLabel: 'Secondary Areas',
  },
};

export default function ExpertiseSection({ locale }: { locale: string }) {
  const data = expertiseData[locale as 'fr' | 'en'] || expertiseData.fr;
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

        <AnimatedSection className="mb-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-[var(--text-tertiary)]">{data.principalLabel}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data.principal.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="card group cursor-default p-5">
                  <h4 className="mb-1 font-bold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection>
          <h3 className="mb-4 mt-10 text-sm font-bold uppercase tracking-wide text-[var(--text-tertiary)]">{data.secondaireLabel}</h3>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {data.secondaire.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.08}>
                <div className="card group cursor-default p-5">
                  <h4 className="mb-1 text-sm font-bold text-[var(--text-primary)]">{item.title}</h4>
                  <p className="text-xs leading-relaxed text-[var(--text-secondary)]">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
