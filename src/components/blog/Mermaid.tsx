'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

let idCounter = 0;

const PALETTES = {
  light: {
    accent: '#0070f3',
    bgSecondary: '#fafafa',
    textPrimary: '#171717',
    borderLight: '#e5e5e5',
  },
  dark: {
    accent: '#58a6ff',
    bgSecondary: '#161b22',
    textPrimary: '#e6edf3',
    borderLight: '#21262d',
  },
};

export default function Mermaid({ chart }: { chart: string }) {
  const { resolvedTheme } = useTheme();
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    let cancelled = false;
    idCounter += 1;
    const id = `mermaid-${idCounter}`;
    const { accent, bgSecondary, textPrimary, borderLight } = PALETTES[isDark ? 'dark' : 'light'];

    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        securityLevel: 'strict',
        flowchart: { curve: 'basis', padding: 16 },
        themeVariables: {
          fontFamily: 'var(--font-sans), Inter, sans-serif',
          primaryColor: bgSecondary,
          primaryTextColor: textPrimary,
          primaryBorderColor: accent,
          lineColor: accent,
          secondaryColor: bgSecondary,
          tertiaryColor: bgSecondary,
          textColor: textPrimary,
          mainBkg: bgSecondary,
          nodeBorder: accent,
          clusterBkg: bgSecondary,
          clusterBorder: borderLight,
          edgeLabelBackground: bgSecondary,
          fontSize: '15px',
        },
      });
      mermaid
        .render(id, chart.trim())
        .then(({ svg }) => {
          if (!cancelled) setSvg(svg);
        })
        .catch((err) => {
          if (!cancelled) setError(String(err));
        });
    });

    return () => {
      cancelled = true;
    };
  }, [chart, isDark]);

  if (error) {
    return (
      <pre style={{ color: 'var(--text-secondary)', fontSize: '0.85em' }}>
        Diagram error: {error}
      </pre>
    );
  }

  return (
    <div
      style={{
        margin: '1.5em 0',
        padding: '1.5em',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-light)',
        borderRadius: '12px',
      }}
    >
      <div
        style={{ display: 'flex', justifyContent: 'center', overflowX: 'auto' }}
        dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
      />
    </div>
  );
}
