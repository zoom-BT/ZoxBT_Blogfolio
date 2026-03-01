'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const codeLines = [
  'const engineer = new Balbino();',
  'engineer.field = "AI & NLP";',
  'engineer.focus = "African Languages";',
  'await engineer.build(future);',
];

function TypingEffect({ lines }: { lines: string[] }) {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayLines, setDisplayLines] = useState<string[]>([]);

  useEffect(() => {
    if (currentLine >= lines.length) return;

    const timer = setTimeout(() => {
      if (currentChar < lines[currentLine].length) {
        setCurrentChar((c) => c + 1);
      } else {
        setDisplayLines((prev) => [...prev, lines[currentLine]]);
        setCurrentLine((l) => l + 1);
        setCurrentChar(0);
      }
    }, currentChar < lines[currentLine]?.length ? 40 : 600);

    return () => clearTimeout(timer);
  }, [currentLine, currentChar, lines]);

  return (
    <div className="font-mono text-sm leading-relaxed md:text-base">
      {displayLines.map((line, i) => (
        <div key={i} className="text-[#8b949e]">
          <span className="mr-3 select-none text-[#484f58]">{i + 1}</span>
          <span>{line}</span>
        </div>
      ))}
      {currentLine < lines.length && (
        <div className="text-[#8b949e]">
          <span className="mr-3 select-none text-[#484f58]">{displayLines.length + 1}</span>
          <span>{lines[currentLine].substring(0, currentChar)}</span>
          <span className="terminal-cursor" />
        </div>
      )}
    </div>
  );
}

export default function HeroSection({ locale }: { locale: string }) {
  const t = locale === 'fr'
    ? {
      greeting: 'Salut, je suis',
      role: 'Eleve Ingenieur en Genie Informatique',
      tagline: 'IA/CV/NLP pour les langues africaines',
      cta1: 'Voir mes projets',
      cta2: 'Lire le blog',
      school: 'ENSPY Yaounde',
    }
    : {
      greeting: "Hi, I'm",
      role: 'Computer Engineering Student',
      tagline: 'CV & NLP for African Languages',
      cta1: 'View my projects',
      cta2: 'Read the blog',
      school: 'ENSPY Yaounde',
    };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0d1117]">
      {/* Circuit grid background */}
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage: 'linear-gradient(rgba(88,166,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(88,166,255,0.05) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />
      <div className="absolute inset-0 opacity-60" style={{
        backgroundImage: 'radial-gradient(circle, rgba(88,166,255,0.12) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Scan line effect */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-0 right-0 h-px bg-[#58a6ff] opacity-20"
          style={{ animation: 'scan-line 8s linear infinite' }} />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left: Text content */}
          <div>
            {/* Status badge */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 inline-flex items-center gap-2 rounded-lg border border-[#30363d] bg-[#161b22] px-3 py-1.5 text-xs font-medium text-[#8b949e]"
            >
              <span className="h-1.5 w-1.5 rounded-sm bg-[#3fb950]" />
              {t.school}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-2 text-sm font-medium text-[#8b949e]"
            >
              {t.greeting}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4 text-4xl font-black tracking-tight text-[#e6edf3] md:text-6xl lg:text-7xl"
            >
              Balbino<br />Tchoutzine
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mb-2 text-lg font-medium text-[#8b949e] md:text-xl"
            >
              {t.role}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8 text-lg font-bold text-[#58a6ff] md:text-xl"
            >
              {t.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link
                href={`/${locale}/projects`}
                className="group inline-flex items-center gap-2 rounded-lg bg-[#e6edf3] px-6 py-3 text-sm font-bold text-[#0d1117] transition-all hover:opacity-90"
              >
                {t.cta1}
                <span className="inline-block transition-transform group-hover:translate-x-1">&rarr;</span>
              </Link>
              <Link
                href={`/${locale}/blog`}
                className="inline-flex items-center gap-2 rounded-lg border border-[#30363d] px-6 py-3 text-sm font-bold text-[#e6edf3] transition-all hover:border-[#e6edf3]"
              >
                {t.cta2}
              </Link>
            </motion.div>
          </div>

          {/* Right: Terminal window */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="overflow-hidden rounded-lg border border-[#21262d] bg-[#161b22] shadow-lg">
              {/* Terminal header */}
              <div className="flex items-center gap-2 border-b border-[#21262d] bg-[#161b22] px-4 py-3">
                <div className="h-3 w-3 rounded-full bg-[#009639]" />
                <div className="h-3 w-3 rounded-full bg-[#ce1126]" />
                <div className="h-3 w-3 rounded-full bg-[#fcd116]" />
                <span className="ml-2 text-xs text-[#484f58]">~/portfolio</span>
              </div>
              {/* Terminal body */}
              <div className="bg-[#0d1117] p-6">
                <div className="mb-3 text-xs text-[#484f58]">
                  $ node engineer.js
                </div>
                <TypingEffect lines={codeLines} />
              </div>
            </div>

            {/* Tech stack tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-4 flex flex-wrap gap-2"
            >
              {['Python', 'TensorFlow', 'NLP', 'Deep Learning', 'Computer Vision'].map((tech) => (
                <span key={tech} className="inline-block rounded-lg border border-[#21262d] bg-[#161b22] px-2.5 py-0.5 text-xs font-medium text-[#8b949e]">{tech}</span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="flex flex-col items-center gap-2 text-[#484f58]"
        >
          <span className="text-xs">Scroll</span>
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
