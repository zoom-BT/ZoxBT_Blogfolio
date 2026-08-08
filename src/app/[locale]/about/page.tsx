import AnimatedSection from '@/components/shared/AnimatedSection';
import { SKILLS, TIMELINE, SITE_CONFIG } from '@/lib/constants';
import SkillBars from '@/components/about/SkillBars';
import Image from 'next/image';

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = locale === 'fr'
    ? { title: 'À propos de moi', welcome: 'Bienvenue', iam: 'Je suis Balbino Tchoutzine', role: 'Élève-ingénieur ENSPY | Recherche IA (fondements, alignement, prédiction) | Speaker & Leader AI Cell', who: 'Qui suis-je ?', skills: 'Compétences Techniques', timeline: 'Parcours Académique', interests: "Centres d'Intérêt", achievements: 'Réalisations', languages: 'Langues', orgs: 'Organisations & Communautés' }
    : { title: 'About Me', welcome: 'Welcome', iam: "I'm Balbino Tchoutzine", role: 'ENSPY Engineering Student | AI Research (foundations, alignment, prediction) | Speaker & Leader AI Cell', who: 'Who am I?', skills: 'Technical Skills', timeline: 'Academic Journey', interests: 'Interests', achievements: 'Achievements', languages: 'Languages', orgs: 'Organizations & Communities' };

  const orgLogos = [
    { src: '/images/certifications/logos/logo-enspy.jpg', alt: 'ENSPY' },
    { src: '/images/certifications/logos/logo-aicell.jpg', alt: 'AI Cell ENSPY' },
    { src: '/images/certifications/logos/zindi-logo.png', alt: 'Zindi' },
    { src: '/images/certifications/logos/logo-cursor-cam.png', alt: 'Cursor' },
    { src: '/images/certifications/logos/logo_aporen.jpg', alt: 'APOREN' },
    { src: '/images/certifications/logos/GinSTEAM.jpg', alt: 'Cameroonian Girls in STEAM' },
    { src: '/images/certifications/logos/logo-society_for_Ai.jpg', alt: 'Society for AI' },
  ];

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-light)] py-20 text-white">
        <Image src="/images/about/banniere.png" alt="" fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(13,17,23,0.55), rgba(13,17,23,0.35))' }} />
        <div className="relative mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-2 text-4xl font-black md:text-5xl">{t.welcome}</h1>
          <p className="text-xl">{t.iam}</p>
          <p className="text-white/80">{t.role}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a href="/cv/Tchoutzine_Balbino_CV_Research_FR.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-bold text-[#0d1117] transition-all hover:opacity-90">
              CV FR
            </a>
            <a href="/cv/Tchoutzine_Balbino_CV_Research_EN.pdf" target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-white/40 px-5 py-2.5 text-sm font-bold text-white transition-all hover:border-white">
              CV EN
            </a>
          </div>
        </div>
      </section>

      {/* Bio */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            {/* Profile image */}
            <div className="mx-auto mb-8 h-48 w-48 overflow-hidden rounded-full border border-[var(--border-light)]">
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
                  ? "Élève-ingénieur en dernière année de Génie Informatique à l'ENSPY (Université de Yaoundé I), je construis et j'étudie l'IA à l'intersection de la recherche et de l'ingénierie : computer vision, geospatial ML, NLP low-resource, edge AI, systèmes prédictifs. Ce qui m'intéresse le plus, ce sont les concepts sous-jacents des modèles, l'alignement par fine-tuning, et les problèmes de prédiction à horizon long, comme les modèles que je développe pour prédire une conversion vers la démence 2 à 5 ans à l'avance, à partir de diagnostics et d'IRM. Je suis actuellement à la recherche de professeurs et d'équipes pour un stage de recherche à l'international, notamment vers des laboratoires comme Mila (Canada) ou G-Research (Londres)."
                  : "Final-year Computer Engineering student at ENSPY (University of Yaoundé I), I build and study AI at the intersection of research and engineering: computer vision, geospatial ML, low-resource NLP, edge AI, predictive systems. What draws me most is what's underneath the models: the underlying concepts, alignment through fine-tuning, and long-horizon prediction problems, like the models I'm developing to predict dementia conversion 2 to 5 years in advance, from diagnoses and MRI scans. I'm currently looking for professors and teams to host me for an international research internship, particularly at labs like Mila (Canada) or G-Research (London)."}
              </p>
              <p>
                {locale === 'fr'
                  ? "Je ne fais pas que coder : je transmets. Je dirige l'AI Cell ENSPY, une communauté de plus de 1 000 membres où, avec mon équipe, nous faisons vivre ML News, débats et workshops. Ambassadeur Zindi, j'interviens comme speaker sur les compétitions de Machine Learning au Cameroun, au Bénin et au Tchad, et je partage mes pratiques d'AI engineering auprès de la communauté Cursor. Avant ça, j'ai présidé APOREN, l'association de plus de 200 étudiants polytechniciens originaires du Ndé."
                  : "I don't just code: I teach. I lead AI Cell ENSPY, a community of over 1,000 members where, together with my team, we run ML News, debates, and workshops. As a Zindi Ambassador, I speak on machine learning competition best practices in Cameroon, Benin, and Chad, and I share AI engineering practices with the Cursor community. Before that, I was president of APOREN, an association of 200+ polytechnic students from the Ndé region."}
              </p>
              <p>
                {locale === 'fr'
                  ? "Sur le terrain : Gardienne, mon bouclier IA contre le cyberharcèlement, a décroché la 2ᵉ place au hackathon Girls in STEAM. J'ai terminé 2ᵉ au niveau national sur DataTour 2025. Sur Zindi, j'ai participé à plus de 19 challenges, actuellement classé dans le top 10 National. Et je suis nominé pour Africa's 100 Rising AI Developers 2026."
                  : "On the ground: Gardienne, my AI shield against cyberharassment, took 2nd place at the Girls in STEAM hackathon. I placed 2nd nationally at DataTour 2025. On Zindi, I've taken part in 19+ challenges, currently ranked in the National top 10. And I'm a nominee for Africa's 100 Rising AI Developers 2026."}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Organizations & Communities */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <AnimatedSection>
            <h2 className="mb-8 text-center text-2xl font-bold text-[var(--text-primary)]">{t.orgs}</h2>
            <div className="flex flex-wrap items-center justify-center gap-6">
              {orgLogos.map((o) => (
                <div key={o.src} className="flex h-16 w-16 items-center justify-center rounded-full bg-white p-2 shadow grayscale transition hover:grayscale-0">
                  <Image src={o.src} alt={o.alt} title={o.alt} width={64} height={64} className="h-full w-full object-contain" />
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Achievements */}
      <section className="border-b border-[var(--border-light)] py-16" style={{ background: 'var(--bg-secondary)' }}>
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <AnimatedSection className="mb-10 text-center">
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">{t.achievements}</h2>
          </AnimatedSection>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {(locale === 'fr'
              ? [
                { title: '2ᵉ place - Girls in STEAM', desc: 'Gardienne, bouclier IA contre le cyberharcèlement (2026)' },
                { title: '2ᵉ national - DataTour 2025', desc: 'Compétition Pan-Africaine (équipe CAMP)' },
                { title: '19+ challenges Zindi', desc: 'Sous le pseudo Zoom387' },
                { title: "Nominee - Africa's 100 Rising AI Developers", desc: 'Society for AI, 2026' },
              ]
              : [
                { title: '2nd place - Girls in STEAM', desc: 'Gardienne, AI shield against cyberharassment (2026)' },
                { title: '2nd nationally - DataTour 2025', desc: 'Pan-African competition (team CAMP)' },
                { title: '19+ Zindi challenges', desc: 'Under the handle Zoom387' },
                { title: "Nominee - Africa's 100 Rising AI Developers", desc: 'Society for AI, 2026' },
              ]
            ).map((a) => (
              <AnimatedSection key={a.title}>
                <div className="card h-full p-5 text-center">
                  <h4 className="mb-1 text-sm font-bold text-[var(--text-primary)]">{a.title}</h4>
                  <p className="text-xs text-[var(--text-secondary)]">{a.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
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
