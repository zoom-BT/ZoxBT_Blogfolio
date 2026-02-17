import { getResearch } from '@/lib/content';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate } from '@/lib/utils';

const researchAreas = {
  fr: [
    { title: 'Intelligence Artificielle', desc: "Developpement de modeles d'IA adaptes au contexte africain" },
    { title: 'NLP pour Langues Africaines', desc: 'Traitement automatique des langues peu dotees en ressources' },
    { title: 'Preservation Linguistique', desc: 'Technologies pour la documentation et preservation des langues' },
    { title: "IA pour l'Afrique", desc: "Applications de l'IA aux defis africains" },
  ],
  en: [
    { title: 'Artificial Intelligence', desc: 'Development of AI models adapted to the African context' },
    { title: 'NLP for African Languages', desc: 'Automatic processing of low-resource languages' },
    { title: 'Linguistic Preservation', desc: 'Technologies for language documentation and preservation' },
    { title: 'AI for Africa', desc: 'Applications of AI to African challenges' },
  ],
};

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const research = getResearch(locale);
  const areas = researchAreas[locale as 'fr' | 'en'] || researchAreas.fr;
  const t = locale === 'fr'
    ? { title: 'Recherche & Publications', subtitle: "Mes travaux de recherche en IA et NLP pour les langues africaines", domains: 'Domaines de Recherche', publications: 'Publications & Projets', interests: 'Interets de Recherche', collab: 'Collaboration' }
    : { title: 'Research & Publications', subtitle: 'My research work in AI and NLP for African languages', domains: 'Research Domains', publications: 'Publications & Projects', interests: 'Research Interests', collab: 'Collaboration' };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>
      </section>

      {/* Research Areas */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.domains}</h2>
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {areas.map((area, i) => (
              <AnimatedSection key={area.title} delay={i * 0.1}>
                <div className="card group cursor-default p-6 text-center">
                  <h3 className="mb-2 font-bold text-[var(--text-primary)]">{area.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{area.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.publications}</h2>
          </AnimatedSection>
          {research.length > 0 ? (
            <div className="space-y-6">
              {research.map((item) => (
                <AnimatedSection key={item.slug}>
                  <div className="card overflow-hidden border-t-2 border-[var(--accent-blue)] p-0">
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                      <div className="mb-3 flex flex-wrap gap-2 text-sm text-[var(--text-tertiary)]">
                        {item.authors && <span>{item.authors.join(', ')}</span>}
                        {item.date && <span>-- {formatDate(item.date, locale)}</span>}
                        {item.status && (
                          <span className="tag">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{item.excerpt}</p>
                      <Link href={`/${locale}/research/${item.slug}`}
                        className="mt-4 inline-flex items-center text-sm font-bold text-[var(--accent-blue)] hover:underline">
                        {locale === 'fr' ? 'Voir details' : 'View details'} →
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--text-tertiary)]">
              {locale === 'fr' ? 'Publications a venir.' : 'Publications coming soon.'}
            </p>
          )}
        </div>
      </section>

      {/* Research Interests */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">{t.interests}</h2>
            <ul className="space-y-3">
              {(locale === 'fr'
                ? [
                    'Traitement du Langage Naturel (NLP) pour les langues africaines peu dotees',
                    'Machine Translation entre langues africaines et langues a ressources riches',
                    'Speech Recognition et synthese vocale pour langues camerounaises',
                    'Preservation numerique des langues menacees',
                    "Applications de l'IA au developpement durable en Afrique",
                    "Ethique de l'IA dans le contexte africain",
                  ]
                : [
                    'Natural Language Processing for low-resource African languages',
                    'Machine Translation between African and high-resource languages',
                    'Speech Recognition and synthesis for Cameroonian languages',
                    'Digital preservation of endangered languages',
                    'Applications of AI for sustainable development in Africa',
                    'AI Ethics in the African context',
                  ]
              ).map((item) => (
                <li key={item} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="mt-1 text-[var(--accent-blue)]">--</span>
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
