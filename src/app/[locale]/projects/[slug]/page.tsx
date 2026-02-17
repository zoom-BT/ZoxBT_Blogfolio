import { getProjects, getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const projects = getProjects('fr');
  const locales = ['fr', 'en'];
  return locales.flatMap((locale) =>
    projects.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const project = getProjectBySlug(slug, locale);
  if (!project) notFound();

  const back = locale === 'fr' ? 'Retour aux projets' : 'Back to projects';

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Link href={`/${locale}/projects`} className="mb-4 inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            ← {back}
          </Link>
          <div className="mb-3 flex items-center gap-2">
            <span className="tag">
              {project.category?.toUpperCase()}
            </span>
            <span className="text-sm text-[var(--text-secondary)]">{formatDate(project.date, locale)}</span>
          </div>
          <h1 className="mb-4 text-3xl font-black text-[var(--text-primary)] md:text-5xl">{project.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{project.excerpt}</p>
          {project.technologies && (
            <div className="mt-4 flex flex-wrap gap-2">
              {project.technologies.map((t) => (
                <span key={t} className="rounded-md border border-[var(--border-medium)] bg-[var(--bg-primary)] px-3 py-1 text-sm text-[var(--text-secondary)]">{t}</span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Content */}
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <div className="flex gap-8">
            {/* Main content */}
            <article className="prose prose-lg max-w-none flex-1" style={{ color: 'var(--text-primary)' }}>
              <MDXRemote source={project.content} />
            </article>

            {/* Sidebar */}
            <aside className="hidden w-64 shrink-0 lg:block">
              <div className="card sticky top-24 p-6">
                <h3 className="mb-4 text-sm font-bold uppercase text-[var(--text-tertiary)]">
                  {locale === 'fr' ? 'Infos projet' : 'Project Info'}
                </h3>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[var(--text-tertiary)]">{locale === 'fr' ? 'Statut' : 'Status'}</span>
                    <p className="font-medium text-[var(--text-primary)]">{project.status || 'completed'}</p>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">Date</span>
                    <p className="font-medium text-[var(--text-primary)]">{formatDate(project.date, locale)}</p>
                  </div>
                  <div>
                    <span className="text-[var(--text-tertiary)]">{locale === 'fr' ? 'Lecture' : 'Read time'}</span>
                    <p className="font-medium text-[var(--text-primary)]">{project.readingTime}</p>
                  </div>
                </div>
                {project.github_url && (
                  <a href={project.github_url} target="_blank" rel="noopener noreferrer"
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--text-primary)] py-2 text-sm font-bold text-[var(--text-inverse)]">
                    GitHub →
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
