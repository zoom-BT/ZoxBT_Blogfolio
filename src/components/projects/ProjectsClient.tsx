'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedSection from '@/components/shared/AnimatedSection';
import { Project } from '@/lib/types';
import { getCategoryLabel } from '@/lib/utils';

const categories = ['all', 'ai', 'nlp', 'ml', 'competition', 'web'];

export default function ProjectsClient({ projects, locale }: { projects: Project[]; locale: string }) {
  const [filter, setFilter] = useState('all');
  const t = locale === 'fr'
    ? { title: 'Portfolio - Projets', subtitle: "Selection de mes projets en Intelligence Artificielle, NLP, et developpement.", featured: 'Projets phares', all: 'Tous les Projets', total: 'Projets', completed: 'Termines' }
    : { title: 'Portfolio - Projects', subtitle: 'Selection of my projects in Artificial Intelligence, NLP, and development.', featured: 'Featured Projects', all: 'All Projects', total: 'Projects', completed: 'Completed' };

  const filtered = filter === 'all' ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-[var(--bg-secondary)] py-16 border-b border-[var(--border-light)]">
        <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
          <h1 className="mb-4 text-4xl font-black text-[var(--text-primary)] md:text-5xl">{t.title}</h1>
          <p className="text-lg text-[var(--text-secondary)]">{t.subtitle}</p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-6">
        <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-8 px-4">
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--text-primary)]">{projects.length}</div>
            <div className="text-sm text-[var(--text-secondary)]">{t.total}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--text-primary)]">{projects.filter(p => p.featured).length}</div>
            <div className="text-sm text-[var(--text-secondary)]">{t.featured}</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-black text-[var(--text-primary)]">{projects.filter(p => p.status === 'completed').length}</div>
            <div className="text-sm text-[var(--text-secondary)]">{t.completed}</div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-[var(--bg-primary)] py-8">
        <div className="mx-auto max-w-6xl px-4 md:px-8">
          <div className="mb-8 flex flex-wrap justify-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`rounded-lg px-5 py-2 text-sm font-bold transition-all ${
                  filter === cat
                    ? 'bg-[var(--text-primary)] text-[var(--text-inverse)]'
                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {getCategoryLabel(cat, locale)}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {filtered.map((project) => (
                <motion.div
                  key={project.slug}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link href={`/${locale}/projects/${project.slug}`}>
                    <div className="card group h-full overflow-hidden p-0">
                      {/* Image placeholder */}
                      <div className="h-40 flex items-center justify-center border-b border-[var(--card-border)] bg-[var(--bg-secondary)]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="48"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-[var(--text-tertiary)]"
                        >
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </div>
                      <div className="p-6">
                        <div className="mb-3 flex items-center gap-2">
                          <span className="tag">
                            {project.category?.toUpperCase()}
                          </span>
                          {project.featured && (
                            <span className="text-xs font-medium text-[var(--text-secondary)]">Featured</span>
                          )}
                        </div>
                        <h3 className="mb-2 text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--accent-primary)]">{project.title}</h3>
                        <p className="mb-4 line-clamp-3 text-sm text-[var(--text-secondary)]">{project.excerpt}</p>
                        {project.technologies && (
                          <div className="mb-3 flex flex-wrap gap-1">
                            {project.technologies.slice(0, 4).map((t) => (
                              <span key={t} className="tag">{t}</span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          {project.github_url && (
                            <span className="text-xs text-[var(--text-tertiary)]">GitHub</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
