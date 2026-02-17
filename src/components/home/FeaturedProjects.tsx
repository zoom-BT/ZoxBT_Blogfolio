'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Project } from '@/lib/types';

export default function FeaturedProjects({ projects, locale }: { projects: Project[]; locale: string }) {
  const title = locale === 'fr' ? 'Projets Recents' : 'Recent Projects';
  const viewAll = locale === 'fr' ? 'Voir tous les projets' : 'View all projects';

  return (
    <section className="py-20" style={{ background: 'var(--bg-primary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto h-px w-12 bg-[var(--accent-blue)]" />
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, i) => (
            <AnimatedSection key={project.slug} delay={i * 0.1}>
              <Link href={`/${locale}/projects/${project.slug}`}>
                <div className="card group h-full overflow-hidden">
                  {/* Image placeholder */}
                  <div className="flex h-48 items-center justify-center border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
                    <div className="text-center">
                      <svg className="mx-auto mb-2 h-10 w-10 text-[var(--text-tertiary)]" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                      </svg>
                      <p className="text-xs text-[var(--text-tertiary)]">
                        {locale === 'fr' ? 'Image du projet' : 'Project image'}
                      </p>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-3 flex items-center gap-2">
                      <span className="tag">{project.category?.toUpperCase()}</span>
                      {project.featured && (
                        <span className="text-xs font-medium text-[var(--accent-warning)]">Featured</span>
                      )}
                    </div>
                    <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-blue)]">
                      {project.title}
                    </h3>
                    <p className="mb-4 line-clamp-2 text-sm text-[var(--text-secondary)]">
                      {project.excerpt}
                    </p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.slice(0, 3).map((tag) => (
                          <span key={tag} className="rounded-md px-2 py-0.5 text-xs font-medium"
                            style={{ background: 'var(--bg-tertiary)', color: 'var(--text-secondary)' }}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href={`/${locale}/projects`}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-medium)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition-all hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)]"
          >
            {viewAll} &rarr;
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
