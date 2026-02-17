'use client';

import AnimatedSection from '@/components/shared/AnimatedSection';
import { Interest } from '@/lib/types';

export default function InterestsSection({ interests, locale }: { interests: Interest[]; locale: string }) {
  const title = locale === 'fr' ? "Centres d'Interet" : 'Interests';

  return (
    <section className="border-t border-[var(--border-light)] py-20" style={{ background: 'var(--bg-secondary)' }}>
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <AnimatedSection className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-bold text-[var(--text-primary)] md:text-4xl">
            {title}
          </h2>
          <div className="mx-auto h-px w-12 bg-[var(--accent-blue)]" />
        </AnimatedSection>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {interests.map((item, i) => (
            <AnimatedSection key={item.title} delay={i * 0.1}>
              <div className="card group cursor-default p-6 text-center">
                <h3 className="mb-1 text-sm font-bold text-[var(--text-primary)]">{item.title}</h3>
                <p className="text-xs text-[var(--text-secondary)]">{item.description}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
