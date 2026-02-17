'use client';

import { usePathname, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function LanguageSwitcher({ locale, isHero }: { locale: string; isHero?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: string) => {
    let newPath = pathname;
    if (pathname.startsWith('/fr')) {
      newPath = pathname.replace(/^\/fr/, `/${newLocale}`);
    } else if (pathname.startsWith('/en')) {
      newPath = pathname.replace(/^\/en/, `/${newLocale}`);
    } else {
      newPath = `/${newLocale}${pathname}`;
    }
    router.push(newPath);
  };

  return (
    <div className={`flex items-center gap-1 rounded-lg border p-0.5 ${
      isHero ? 'border-[#30363d]' : 'border-[var(--border-light)]'
    }`}>
      {['fr', 'en'].map((lang) => (
        <motion.button
          key={lang}
          onClick={() => switchLocale(lang)}
          className={`relative rounded-md px-2.5 py-1 text-xs font-bold uppercase transition-colors ${
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
          <span className="relative z-10">{lang.toUpperCase()}</span>
        </motion.button>
      ))}
    </div>
  );
}
