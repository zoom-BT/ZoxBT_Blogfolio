'use client';

import Link from 'next/link';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function RecentPosts({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  const title = locale === 'fr' ? 'Derniers Articles' : 'Latest Posts';
  const viewAll = locale === 'fr' ? 'Tous les articles' : 'All articles';
  const readMore = locale === 'fr' ? "Lire l'article" : 'Read article';

  return (
    <section className="border-t border-[var(--border-light)] py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto h-px w-12 bg-[var(--accent-blue)]" />
        </AnimatedSection>

        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.1}>
              <Link href={`/${locale}/blog/${post.slug}`}>
                <article className="card group h-full p-6">
                  <div className="mb-3 flex items-center gap-2 text-xs text-[var(--text-tertiary)]">
                    <time>{formatDate(post.date, locale)}</time>
                    {post.categories?.[0] && (
                      <>
                        <span>&middot;</span>
                        <span className="tag">{post.categories[0]}</span>
                      </>
                    )}
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] transition-colors group-hover:text-[var(--accent-blue)]">
                    {post.title}
                  </h3>
                  <p className="mb-4 line-clamp-3 text-sm text-[var(--text-secondary)]">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                    <span>{post.readingTime}</span>
                    <span className="font-medium text-[var(--accent-blue)] transition-transform group-hover:translate-x-1">
                      {readMore} &rarr;
                    </span>
                  </div>
                </article>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="mt-10 text-center">
          <Link
            href={`/${locale}/blog`}
            className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-medium)] px-6 py-3 text-sm font-bold text-[var(--text-primary)] transition-all hover:border-[var(--text-primary)] hover:bg-[var(--bg-primary)]"
          >
            {viewAll} &rarr;
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
