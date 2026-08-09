import { getCertifications } from '@/lib/content';
import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { formatDate } from '@/lib/utils';

export default async function CertificationsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const certs = getCertifications(locale);
  const t = locale === 'fr'
    ? { title: 'Certifications Professionnelles', subtitle: 'Mes certifications en IA, Machine Learning et Développement', partners: 'Organismes de Formation' }
    : { title: 'Professional Certifications', subtitle: 'My certifications in AI, Machine Learning and Development', partners: 'Training Partners' };

  const partnerLogos = [
    { src: '/images/certifications/logos/cousera.png', alt: 'Coursera', href: 'https://www.coursera.org' },
    { src: '/images/certifications/logos/Stanford-logo-circular.jpg', alt: 'Stanford University', href: 'https://www.stanford.edu' },
    { src: '/images/certifications/logos/IBM-logo.png', alt: 'IBM', href: 'https://www.ibm.com' },
    { src: '/images/certifications/logos/zindi-logo.png', alt: 'Zindi', href: 'https://zindi.world/' },
    { src: '/images/certifications/logos/kaggle-logo.png', alt: 'Kaggle', href: 'https://www.kaggle.com' },
    { src: '/images/certifications/logos/Microsoft.png', alt: 'Microsoft', href: 'https://www.microsoft.com' },
    { src: '/images/certifications/logos/linkedin-logo-linkedin-icon-transparent-free-png.webp', alt: 'LinkedIn Learning', href: 'https://www.linkedin.com/learning/' },
    { src: '/images/certifications/logos/OpenClassroom-logo.png', alt: 'OpenClassrooms', href: 'https://openclassrooms.com' },
    { src: '/images/certifications/logos/PowerBI-logo.jpg', alt: 'Power BI', href: 'https://powerbi.microsoft.com' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)] py-20 text-white">
        <Image src="/images/certifications/banniere.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,17,23,0.55), rgba(13,17,23,0.35))' }} />
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black md:text-5xl">{t.title}</h1>
          <p className="text-lg text-white/80">{t.subtitle}</p>
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
            <div className="text-3xl font-black text-[var(--text-primary)]">{certs.filter(c => c.provider.includes('Coursera')).length}</div>
            <div className="text-sm text-[var(--text-secondary)]">Coursera</div>
          </div>
        </div>
      </section>

      {/* Card Grid */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certs.map((cert, i) => {
              const logos = cert.logo ? (Array.isArray(cert.logo) ? cert.logo : [cert.logo]) : [];
              const CardMedia = cert.certificate_url ? 'a' : 'div';
              const mediaProps = cert.certificate_url
                ? { href: cert.certificate_url, target: '_blank', rel: 'noopener noreferrer' }
                : {};
              return (
              <AnimatedSection key={cert.slug} delay={i * 0.1}>
                <div className="card h-full overflow-hidden p-0">
                  {/* Media header: certificate image + logo medallion(s), logo-only, or plain title (fallback chain) */}
                  {cert.image ? (
                    <CardMedia {...mediaProps} className="relative block h-40 w-full overflow-hidden border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
                      <Image src={cert.image} alt={cert.title} fill sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover" />
                      {logos.length > 0 && (
                        <div className="absolute -bottom-4 left-4 flex gap-1">
                          {logos.map((l) => (
                            <Image key={l} src={l} alt="" width={40} height={40} className="h-10 w-10 rounded-full border-2 border-[var(--bg-primary)] bg-white object-contain shadow-md" />
                          ))}
                        </div>
                      )}
                    </CardMedia>
                  ) : logos.length > 0 ? (
                    <CardMedia {...mediaProps} className="flex h-40 w-full items-center justify-center gap-3 border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
                      {logos.map((l) => (
                        <Image key={l} src={l} alt="" width={56} height={56} className="h-14 w-14 rounded-full bg-white object-contain p-1 shadow" />
                      ))}
                    </CardMedia>
                  ) : (
                    <div className="border-b border-[var(--card-border)] bg-[var(--bg-secondary)] p-6 text-center">
                      <h3 className="text-lg font-bold text-[var(--text-primary)]">{cert.title}</h3>
                    </div>
                  )}
                  {/* Body */}
                  <div className={logos.length > 0 && cert.image ? 'p-6 pt-7' : 'p-6'}>
                    {(cert.image || logos.length > 0) && (
                      <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)]">{cert.title}</h3>
                    )}
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
              );
            })}
          </div>
        </div>
      </section>

      {/* Training Partners */}
      <section className="py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            <h2 className="mb-8 text-center text-2xl font-bold text-[var(--text-primary)]">{t.partners}</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {partnerLogos.map((p) => (
                <a key={p.src} href={p.href} target="_blank" rel="noopener noreferrer"
                  className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2 shadow grayscale transition hover:grayscale-0">
                  <Image src={p.src} alt={p.alt} title={p.alt} width={64} height={64} className="h-full w-full object-contain" />
                </a>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

    </div>
  );
}
