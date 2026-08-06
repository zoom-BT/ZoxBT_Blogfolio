import { getResearch } from '@/lib/content';
import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate } from '@/lib/utils';

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const research = getResearch(locale);
  const t = locale === 'fr'
    ? { title: 'Recherche & Publications', subtitle: "Mes travaux de recherche en IA et NLP pour les langues africaines", interests: 'Intérêts de Recherche' }
    : { title: 'Research & Publications', subtitle: 'My research work in AI and NLP for African languages', interests: 'Research Interests' };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>
      </section>

      {/* Publications */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {research.length > 0 ? (
            <div className="space-y-6">
              {research.map((item) => (
                <AnimatedSection key={item.slug}>
                  <div className="card overflow-hidden border-t-2 border-[var(--accent-blue)] p-0 md:flex">
                    {item.teaser && (
                      <div className="flex h-64 w-full flex-shrink-0 items-center justify-center overflow-hidden bg-[var(--bg-primary)] md:h-auto md:w-96">
                        <img src={item.teaser} alt={item.title} className="h-full w-full object-contain" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="mb-2 text-xl font-bold text-[var(--text-primary)]">{item.title}</h3>
                      <div className="mb-3 flex flex-wrap gap-2 text-sm text-[var(--text-tertiary)]">
                        {item.authors && <span>{item.authors.join(', ')}</span>}
                        {item.date && <span>• {formatDate(item.date, locale)}</span>}
                        {item.status && (
                          <span className="tag">
                            {item.status}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-[var(--text-secondary)]">{item.excerpt}</p>
                      <Link href={`/${locale}/research/${item.slug}`}
                        className="mt-4 inline-flex items-center text-sm font-bold text-[var(--accent-blue)] hover:underline">
                        {locale === 'fr' ? 'Voir détails' : 'View details'} →
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <p className="text-center text-[var(--text-tertiary)]">
              {locale === 'fr' ? 'Publications à venir.' : 'Publications coming soon.'}
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
                    'Traitement du Langage Naturel (NLP) pour les langues africaines peu dotées',
                    'Machine Translation entre langues africaines et langues à ressources riches',
                    'Speech Recognition et synthèse vocale pour langues camerounaises',
                    'Préservation numérique des langues menacées',
                    "Applications de l'IA au développement durable en Afrique",
                    "Éthique de l'IA dans le contexte africain",
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
                  <svg className="mt-1 h-4 w-4 flex-shrink-0 text-[var(--accent-blue)]" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
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
