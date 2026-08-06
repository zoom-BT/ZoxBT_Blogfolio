import AnimatedSection from '@/components/shared/AnimatedSection';
import { SKILLS, TIMELINE, SITE_CONFIG } from '@/lib/constants';
import SkillBars from '@/components/about/SkillBars';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'fr'
    ? { title: 'À propos de moi', welcome: 'Bienvenue', iam: 'Je suis Balbino Tchoutzine', role: "Étudiant-ingénieur en Génie Informatique | IA appliquée : CV, Geospatial ML, NLP low-resource", who: 'Qui suis-je ?', skills: 'Compétences Techniques', timeline: 'Parcours Académique', interests: "Centres d'Intérêt", achievements: 'Réalisations', languages: 'Langues' }
    : { title: 'About Me', welcome: 'Welcome', iam: "I'm Balbino Tchoutzine", role: 'Computer Engineering Student | Applied AI: CV, Geospatial ML, Low-resource NLP', who: 'Who am I?', skills: 'Technical Skills', timeline: 'Academic Journey', interests: 'Interests', achievements: 'Achievements', languages: 'Languages' };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-2 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.welcome}</h1>
          <p className="text-xl text-[var(--text-primary)]">{t.iam}</p>
          <p className="text-[var(--text-secondary)]">{t.role}</p>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            {/* Profile image */}
            <div className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-lg border border-[var(--border-light)]">
              <Image
                src="/images/balbino.jpg"
                alt="Balbino Tchoutzine"
                width={192}
                height={192}
                className="h-full w-full object-cover"
                quality={80}
              />
            </div>

            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">{t.who}</h2>
            <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed">
              <p>
                {locale === 'fr'
                  ? "Élève-ingénieur entrant en 5ème année de Génie Informatique à l'ENSPY (École Nationale Supérieure Polytechnique de Yaoundé), je construis de l'IA appliquée : Computer Vision, Geospatial AI & foundation models, NLP low-resource et Edge AI. Mon travail sert autant des projets pour l'Afrique (agriculture, santé, climat) que des recherches appliquées plus générales, avec l'ambition de contribuer dans des équipes et laboratoires internationaux."
                  : "Incoming 5th-year Computer Engineering student at ENSPY (National Advanced School of Engineering of Yaoundé), I build applied AI: Computer Vision, Geospatial AI & foundation models, low-resource NLP, and Edge AI. My work spans projects for Africa (agriculture, health, climate) as well as more general applied research, with the ambition to contribute to international teams and labs."}
              </p>
              <p>
                {locale === 'fr'
                  ? "Mon parcours, enrichi par des certifications professionnelles (Kaggle, Coursera, IBM, Microsoft) et des engagements extrascolaires (Cellule IA, Zindi Ambassador, APOREN), m'a permis de développer des compétences solides alliant technique, recherche et leadership."
                  : 'My journey, enriched by professional certifications (Kaggle, Coursera, IBM, Microsoft) and extracurricular activities (AI Cell, Zindi Ambassador, APOREN), has allowed me to develop solid skills combining technique, research and leadership.'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Skills */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.skills}</h2>
          </AnimatedSection>
          <SkillBars skills={SKILLS} />
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection className="mb-10">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.timeline}</h2>
          </AnimatedSection>
          <div className="relative border-l-2 border-[var(--accent-primary)] pl-8">
            {(TIMELINE[locale as 'fr' | 'en'] || TIMELINE.fr).map((entry, i) => (
              <AnimatedSection key={entry.title} delay={i * 0.15} direction="left">
                <div className="relative mb-10">
                  {/* Dot */}
                  <div className="absolute -left-[41px] top-1 h-4 w-4 rounded-lg border-4 border-[var(--bg-primary)]"
                    style={{ background: 'var(--accent-primary)', boxShadow: '0 0 0 3px var(--accent-primary)' }} />
                  <div className="card p-6">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-sm font-bold text-[var(--accent-primary)]">{entry.period}</span>
                      {entry.status && entry.status !== '—' && (
                        <span className="tag">{entry.status}</span>
                      )}
                    </div>
                    <h3 className="mt-1 text-lg font-bold text-[var(--text-primary)]">{entry.title}</h3>
                    <p className="text-sm font-medium text-[var(--text-secondary)]">{entry.institution}</p>
                    <p className="mt-2 text-sm text-[var(--text-tertiary)]">{entry.description}</p>
                    {entry.focus && (
                      <p className="mt-1 text-xs text-[var(--text-tertiary)]"><strong>Focus:</strong> {entry.focus}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Languages */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">{t.languages}</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {[
                { lang: locale === 'fr' ? 'Francais' : 'French', level: locale === 'fr' ? 'Langue maternelle' : 'Native' },
                { lang: locale === 'fr' ? 'Anglais' : 'English', level: locale === 'fr' ? 'Courant' : 'Fluent' },
                { lang: 'Medumba', level: locale === 'fr' ? 'Langue maternelle' : 'Native' },
              ].map((l) => (
                <div key={l.lang} className="card p-4 text-center">
                  <h4 className="font-bold text-[var(--text-primary)]">{l.lang}</h4>
                  <p className="text-sm text-[var(--text-secondary)]">{l.level}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
