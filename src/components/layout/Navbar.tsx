'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import LanguageSwitcher from './LanguageSwitcher';
import { NAV_ITEMS } from '@/lib/constants';

export default function Navbar({ locale }: { locale: string }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();
  const items = NAV_ITEMS[locale] || NAV_ITEMS['fr'];

  // Only show hero-style (light text on dark) on the home page
  const isHomePage = pathname === `/${locale}` || pathname === '/' || pathname === `/${locale}/`;
  const useHeroStyle = isHomePage && !isScrolled;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          useHeroStyle
            ? 'bg-transparent'
            : 'glass shadow-sm'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          {/* Logo */}
          <Link
            href={`/${locale}`}
            className="group flex items-center gap-2 text-lg font-bold"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${
              useHeroStyle
                ? 'bg-white text-[#0d1117]'
                : 'bg-[var(--text-primary)] text-[var(--text-inverse)]'
            }`}>
              BT
            </span>
            <span className={`hidden sm:inline ${
              useHeroStyle
                ? 'text-white'
                : 'text-[var(--text-primary)]'
            }`}>
              Balbino
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden items-center gap-1 md:flex">
            {items.map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className={`relative rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                  useHeroStyle
                    ? 'text-[#8b949e] hover:text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center gap-3 md:flex">
            <LanguageSwitcher locale={locale} isHero={useHeroStyle} />
            <ThemeToggle isHero={useHeroStyle} />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="flex flex-col gap-1.5 md:hidden"
            aria-label="Menu"
          >
            <motion.span
              animate={isMobileOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className={`h-0.5 w-6 rounded ${useHeroStyle ? 'bg-white' : 'bg-[var(--text-primary)]'}`}
            />
            <motion.span
              animate={isMobileOpen ? { opacity: 0 } : { opacity: 1 }}
              className={`h-0.5 w-6 rounded ${useHeroStyle ? 'bg-white' : 'bg-[var(--text-primary)]'}`}
            />
            <motion.span
              animate={isMobileOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className={`h-0.5 w-6 rounded ${useHeroStyle ? 'bg-white' : 'bg-[var(--text-primary)]'}`}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25 }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-6 md:hidden"
            style={{ background: 'var(--bg-primary)' }}
          >
            {items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Link
                  href={`/${locale}${item.href}`}
                  onClick={() => setIsMobileOpen(false)}
                  className="text-2xl font-bold text-[var(--text-primary)] transition-colors hover:text-[var(--accent-blue)]"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
            <div className="mt-4 flex items-center gap-4">
              <LanguageSwitcher locale={locale} />
              <ThemeToggle />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
