import { getProjects, getProjectBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import dynamic from 'next/dynamic';
import { formatDate } from '@/lib/utils';

const Mermaid = dynamic(() => import('@/components/blog/Mermaid'));

function Pre(props: React.ComponentProps<'pre'>) {
  const child = props.children as { props?: { className?: string; children?: unknown } } | undefined;
  const className = child?.props?.className ?? '';
  const code = String(child?.props?.children ?? '').replace(/\n$/, '');
  if (className.includes('language-mermaid')) {
    return <Mermaid chart={code} />;
  }
  return <pre {...props} />;
}

export async function generateStaticParams() {
  const projects = getProjects('fr');
  return ['fr', 'en'].flatMap((locale) =>
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
      <section
        className="relative border-b border-[var(--border-light)] py-20 overflow-hidden"
        style={project.teaser ? { minHeight: '380px' } : { background: 'var(--bg-secondary)' }}
      >
        {project.teaser && (
          <>
            <Image
              src={project.teaser}
              alt={project.title}
              fill
              priority
              sizes="100vw"
              className="object-contain object-center bg-white"
            />
            <div className="absolute inset-0 bg-black/55" />
          </>
        )}
        <div className="relative mx-auto max-w-2xl px-6 md:px-8">
          <Link
            href={`/${locale}/projects`}
            className={`mb-6 inline-flex items-center gap-2 text-sm ${project.teaser ? 'text-white/80 hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            ← {back}
          </Link>
          <div className={`mb-4 flex flex-wrap items-center gap-3 text-sm ${project.teaser ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
            <time>{formatDate(project.date, locale)}</time>
            <span>·</span>
            <span>{project.readingTime}</span>
            {project.category && (
              <span className={project.teaser ? 'rounded border border-white/30 px-2 py-0.5 text-xs text-white/80' : 'tag'}>
                {project.category}
              </span>
            )}
          </div>
          <h1 className={`text-3xl font-black md:text-5xl leading-tight ${project.teaser ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            {project.title}
          </h1>
          {project.excerpt && (
            <p className={`mt-4 text-lg ${project.teaser ? 'text-white/80' : 'text-[var(--text-secondary)]'}`}>
              {project.excerpt}
            </p>
          )}
        </div>
      </section>

      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <article className="prose max-w-none" style={{ color: 'var(--text-primary)' }}>
            <MDXRemote
              source={project.content}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }}
              components={{ Mermaid, pre: Pre }}
            />
          </article>

          {project.tags && project.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border-light)] pt-6">
              {project.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
