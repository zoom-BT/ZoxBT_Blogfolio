'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Stat } from '@/lib/types';

function Counter({ value, inView }: { value: string; inView: boolean }) {
  const num = parseInt(value.replace(/\D/g, ''));
  const suffix = value.replace(/\d/g, '');
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = num;
    const duration = 2000;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, num]);

  return (
    <span className="text-4xl font-black text-[var(--text-primary)] md:text-5xl">
      {count}{suffix}
    </span>
  );
}

export default function StatsSection({ stats, locale }: { stats: Stat[]; locale: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const title = locale === 'fr' ? 'En chiffres' : 'By the numbers';

  return (
    <section
      ref={ref}
      className="border-y border-[var(--border-light)] py-20"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-6xl px-4 text-center md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-3xl font-bold text-[var(--text-primary)] md:text-4xl"
        >
          {title}
        </motion.h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="flex flex-col items-center"
            >
              <Counter value={stat.value} inView={inView} />
              <span className="mt-2 text-sm text-[var(--text-secondary)] md:text-base">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
