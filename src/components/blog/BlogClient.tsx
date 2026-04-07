'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { BlogPost } from '@/lib/types';
import { formatDate } from '@/lib/utils';

export default function BlogClient({ posts, locale }: { posts: BlogPost[]; locale: string }) {
  const [search, setSearch] = useState('');
  const t = locale === 'fr'
    ? { title: 'Blog & Articles', subtitle: "Partage de connaissances sur l'IA, le NLP, et mes retours d'experience", search: 'Rechercher un article...', read: 'Lire la suite', noResults: 'Aucun article trouve' }
    : { title: 'Blog & Articles', subtitle: 'Sharing knowledge about AI, NLP, and my experiences', search: 'Search articles...', read: 'Read more', noResults: 'No articles found' };

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
    p.tags?.some((tag) => tag.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-secondary)] py-16 border-b border-[var(--border-light)]">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>
      </section>

      {/* Search & Posts */}
      <section className="bg-[var(--bg-primary)] py-12">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          {/* Search */}
          <div className="mb-10 flex justify-center">
            <input
              type="text"
              placeholder={t.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full max-w-md rounded-lg border border-[var(--border-light)] bg-[var(--bg-secondary)] px-6 py-3 text-sm text-[var(--text-primary)] outline-none transition-all focus:border-[var(--accent-blue)] focus:ring-1 focus:ring-[var(--accent-blue)]"
            />
          </div>

          {/* Grid */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((post) => (
                <motion.div key={post.slug} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                  {post.comingSoon ? (
                    <article className="card h-full overflow-hidden opacity-70 cursor-default">
                      {post.teaser && (
                        <div className="h-44 w-full overflow-hidden">
                          <img src={post.teaser} alt={post.title} className="h-full w-full object-cover" />
                        </div>
                      )}
                      <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-tertiary)]">
                        <time>{formatDate(post.date, locale)}</time>
                        {post.categories?.map((cat) => (
                          <span key={cat} className="tag">{cat}</span>
                        ))}
                        <span className="ml-auto rounded-full bg-[var(--accent-blue)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                          {locale === 'fr' ? 'Bientôt' : 'Coming Soon'}
                        </span>
                      </div>
                      <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)]">{post.title}</h2>
                      <p className="mb-4 line-clamp-3 text-sm text-[var(--text-secondary)]">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                        <span>{post.readingTime}</span>
                      </div>
                      </div>
                    </article>
                  ) : (
                  <Link href={`/${locale}/blog/${post.slug}`}>
                    <article className="card group h-full overflow-hidden">
                      {post.teaser && (
                        <div className="h-44 w-full overflow-hidden">
                          <img src={post.teaser} alt={post.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        </div>
                      )}
                      <div className="p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs text-[var(--text-tertiary)]">
                        <time>{formatDate(post.date, locale)}</time>
                        {post.categories?.map((cat) => (
                          <span key={cat} className="tag">
                            {cat}
                          </span>
                        ))}
                      </div>
                      <h2 className="mb-2 text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">
                        {post.title}
                      </h2>
                      <p className="mb-4 line-clamp-3 text-sm text-[var(--text-secondary)]">{post.excerpt}</p>
                      <div className="flex items-center justify-between text-xs text-[var(--text-tertiary)]">
                        <span>{post.readingTime}</span>
                        <span className="font-medium text-[var(--accent-blue)]">{t.read} &rarr;</span>
                      </div>
                      </div>
                    </article>
                  </Link>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="py-12 text-center text-[var(--text-tertiary)]">{t.noResults}</p>
          )}
        </div>
      </section>
    </div>
  );
}
