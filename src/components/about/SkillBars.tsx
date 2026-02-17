'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SkillCategory } from '@/lib/types';

export default function SkillBars({ skills }: { skills: SkillCategory[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="grid gap-6 md:grid-cols-2">
      {skills.map((cat, ci) => (
        <motion.div
          key={cat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: ci * 0.15 }}
          className="card p-6"
        >
          <h3 className="mb-4 text-lg font-bold text-[var(--text-primary)]">
            {cat.title}
          </h3>
          <div className="space-y-4">
            {cat.skills.map((skill, si) => (
              <div key={skill.name}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="font-medium text-[var(--text-primary)]">{skill.name}</span>
                  <span className="text-[var(--text-tertiary)]">{skill.level}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-sm bg-[var(--bg-tertiary)]">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                    transition={{ duration: 1.2, delay: ci * 0.15 + si * 0.1, ease: 'easeOut' }}
                    className="h-full rounded-sm bg-[var(--accent-blue)]"
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
