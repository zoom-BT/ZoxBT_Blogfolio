import ContactForm from '@/components/contact/ContactForm';
import Image from 'next/image';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { SITE_CONFIG } from '@/lib/constants';

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'fr'
    ? { title: 'Me Contacter', subtitle: "N'hésitez pas à me contacter pour toute collaboration ou question", info: 'Coordonnées', or: 'Où me retrouver' }
    : { title: 'Contact Me', subtitle: 'Feel free to reach out for any collaboration or question', info: 'Contact Info', or: 'Or find me on' };

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)] py-20 text-white">
        <Image src="/images/contact/banniere.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,17,23,0.55), rgba(13,17,23,0.35))' }} />
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black md:text-5xl">{t.title}</h1>
          <p className="text-lg text-white/80">{t.subtitle}</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto grid max-w-6xl gap-12 px-4 md:grid-cols-2 md:px-8">
          {/* Form */}
          <AnimatedSection direction="left">
            <ContactForm locale={locale} />
          </AnimatedSection>

          {/* Info */}
          <AnimatedSection direction="right">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.info}</h2>
              <div className="space-y-4">
                <a href={`mailto:${SITE_CONFIG.author.email}`} className="card flex items-center gap-4 p-4 transition-all hover:scale-[1.02]">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--text-primary)] text-[var(--text-inverse)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">Email</p>
                    <p className="font-medium text-[var(--text-primary)]">{SITE_CONFIG.author.email}</p>
                  </div>
                </a>
                <div className="card flex items-center gap-4 p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--text-primary)] text-[var(--text-inverse)]">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--text-tertiary)]">{locale === 'fr' ? 'Localisation' : 'Location'}</p>
                    <p className="font-medium text-[var(--text-primary)]">{SITE_CONFIG.author.location}</p>
                  </div>
                </div>
              </div>

              <h3 className="pt-4 text-lg font-bold text-[var(--text-primary)]">{t.or}</h3>
              <div className="flex flex-wrap items-center gap-3">
                <a href={SITE_CONFIG.social.github} target="_blank" rel="noopener noreferrer"
                  className="card flex h-14 w-14 items-center justify-center rounded-lg text-2xl transition-all hover:scale-110">
                  <svg className="h-6 w-6" fill="var(--text-primary)" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                </a>
                <a href={SITE_CONFIG.social.linkedin} target="_blank" rel="noopener noreferrer"
                  className="card flex h-14 w-14 items-center justify-center rounded-lg text-2xl transition-all hover:scale-110">
                  <svg className="h-6 w-6" fill="var(--text-primary)" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>

                {/* Photo connected via a stem to the CV buttons */}
                <span className="h-px w-4 bg-[var(--border-medium)]" aria-hidden="true" />
                <div className="h-14 w-14 flex-shrink-0 overflow-hidden rounded-full border border-[var(--border-light)]">
                  <Image src="/icon.png" alt="Balbino Tchoutzine" width={56} height={56} className="h-full w-full object-cover" />
                </div>
                <span className="h-px w-4 bg-[var(--border-medium)]" aria-hidden="true" />
                <a href="/cv/Tchoutzine_Balbino_CV_Research_FR.pdf" target="_blank" rel="noopener noreferrer"
                  className="card flex h-14 items-center justify-center rounded-lg px-4 text-sm font-bold text-[var(--text-primary)] transition-all hover:scale-105">
                  CV FR
                </a>
                <a href="/cv/Tchoutzine_Balbino_CV_Research_EN.pdf" target="_blank" rel="noopener noreferrer"
                  className="card flex h-14 items-center justify-center rounded-lg px-4 text-sm font-bold text-[var(--text-primary)] transition-all hover:scale-105">
                  CV EN
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
