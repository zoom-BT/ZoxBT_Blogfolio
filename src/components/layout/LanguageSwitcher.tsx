'use client';

import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useNavigation } from '@/lib/navigation';

export default function LanguageSwitcher({ locale, isHero }: { locale: string; isHero?: boolean }) {
  const pathname = usePathname();
  const { navigate, isPending, pendingHref } = useNavigation();

  const pathFor = (newLocale: string) => {
    if (pathname.startsWith('/fr')) return pathname.replace(/^\/fr/, `/${newLocale}`);
    if (pathname.startsWith('/en')) return pathname.replace(/^\/en/, `/${newLocale}`);
    return `/${newLocale}${pathname}`;
  };

  return (
    <div className={`flex items-center gap-1 rounded-lg border p-0.5 ${
      isHero ? 'border-[#30363d]' : 'border-[var(--border-light)]'
    }`}>
      {['fr', 'en'].map((lang) => {
        const newPath = pathFor(lang);
        const isThisPending = isPending && pendingHref === newPath;
        return (
          <motion.button
            key={lang}
            onClick={() => navigate(newPath)}
            disabled={isThisPending}
            aria-busy={isThisPending}
            className={`relative rounded-md px-2.5 py-1 text-xs font-bold uppercase transition-colors ${
              isThisPending ? 'cursor-wait opacity-60' : ''
            } ${
              locale === lang
                ? isHero ? 'text-[#0d1117]' : 'text-[var(--text-inverse)]'
                : isHero ? 'text-[#8b949e] hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
            whileTap={{ scale: 0.95 }}
          >
            {locale === lang && (
              <motion.div
                layoutId="lang-pill"
                className={`absolute inset-0 rounded-md ${isHero ? 'bg-white' : 'bg-[var(--text-primary)]'}`}
                transition={{ type: 'spring', duration: 0.5 }}
              />
            )}
            <span className="relative z-10">
              {isThisPending ? (
                <span
                  className="inline-block h-2.5 w-2.5 animate-spin rounded-full border-[1.5px] border-current border-t-transparent align-middle"
                  aria-hidden="true"
                />
              ) : (
                lang.toUpperCase()
              )}
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
