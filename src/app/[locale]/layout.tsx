import { ThemeProvider } from 'next-themes';
import { Inter, Merriweather } from 'next/font/google';
import type { Metadata } from 'next';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/shared/ScrollProgress';
import NavigationProgress from '@/components/shared/NavigationProgress';
import { NavigationProvider } from '@/lib/navigation';
import { SITE_CONFIG } from '@/lib/constants';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-serif' });

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const description = SITE_CONFIG.description[locale as 'fr' | 'en'] || SITE_CONFIG.description.fr;

  return {
    description,
    alternates: {
      languages: { fr: '/fr', en: '/en' },
    },
    openGraph: { description, locale: locale === 'fr' ? 'fr_FR' : 'en_US' },
    twitter: { description },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${merriweather.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" storageKey="portfolio-theme" enableSystem={false}>
          <NavigationProvider>
            <NavigationProgress />
            <ScrollProgress />
            <Navbar locale={locale} />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer locale={locale} />
          </NavigationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
