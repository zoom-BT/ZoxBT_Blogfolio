import { getCertifications } from '@/lib/content';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate } from '@/lib/utils';

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const certs = getCertifications(locale);
  const t = locale === 'fr'
    ? { title: 'Certifications Professionnelles', subtitle: 'Mes certifications en IA, Machine Learning et Developpement', timeline: 'Timeline de Formation', goals: 'Objectifs de Formation' }
    : { title: 'Professional Certifications', subtitle: 'My certifications in AI, Machine Learning and Development', timeline: 'Training Timeline', goals: 'Training Goals' };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--border-light)] py-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-4">
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--text-primary)]">{certs.length}</div>
            <div className="text-sm text-[var(--text-secondary)]">Certifications</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--text-primary)]">{certs.filter(c => c.provider === 'Coursera').length}</div>
            <div className="text-sm text-[var(--text-secondary)]">Coursera</div>
          </div>
        </div>
      </section>

      {/* Card Grid */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert, i) => (
              <AnimatedSection key={cert.slug} delay={i * 0.1}>
                <div className="card h-full overflow-hidden p-0">
                  {/* Header */}
                  <div className="border-b border-[var(--card-border)] bg-[var(--bg-secondary)] p-6 text-center">
                    <h3 className="text-lg font-bold text-[var(--text-primary)]">{cert.title}</h3>
                  </div>
                  {/* Body */}
                  <div className="p-6">
                    <div className="mb-3 space-y-1 text-sm text-[var(--text-secondary)]">
                      <p><strong>{locale === 'fr' ? 'Organisme' : 'Provider'}:</strong> {cert.provider}</p>
                      <p><strong>Date:</strong> {formatDate(cert.date, locale)}</p>
                      {cert.credential_id && <p><strong>ID:</strong> {cert.credential_id}</p>}
                    </div>
                    {cert.type && (
                      <span className="tag mb-3 inline-block">
                        {cert.type}
                      </span>
                    )}
                    {cert.description && (
                      <p className="mb-3 text-sm text-[var(--text-secondary)]">{cert.description}</p>
                    )}
                    {cert.skills && cert.skills.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {cert.skills.slice(0, 5).map((skill) => (
                          <span key={skill} className="tag">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}
                    {cert.certificate_url && (
                      <a href={cert.certificate_url} target="_blank" rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center text-sm font-bold text-[var(--accent-blue)] hover:underline">
                        {locale === 'fr' ? 'Voir certificat' : 'View certificate'} →
                      </a>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Training Goals */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            <h2 className="mb-6 text-2xl font-bold text-[var(--text-primary)]">{t.goals}</h2>
            <ul className="space-y-3">
              {(locale === 'fr'
                ? ['Deep Learning avance', 'NLP de pointe - Transformers, BERT, GPT', 'MLOps - Deploiement de modeles', 'Computer Vision', 'IA Responsable - Ethique et biais']
                : ['Advanced Deep Learning', 'Cutting-edge NLP - Transformers, BERT, GPT', 'MLOps - Model deployment', 'Computer Vision', 'Responsible AI - Ethics and bias']
              ).map((goal) => (
                <li key={goal} className="flex items-start gap-3 text-[var(--text-secondary)]">
                  <span className="mt-1 text-[var(--accent-blue)]">--</span>
                  {goal}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
