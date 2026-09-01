import { ThemeProvider } from 'next-themes';
import { Inter, Merriweather } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ScrollProgress from '@/components/shared/ScrollProgress';
import NavigationProgress from '@/components/shared/NavigationProgress';
import { NavigationProvider } from '@/lib/navigation';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const merriweather = Merriweather({ subsets: ['latin'], weight: ['700', '900'], variable: '--font-serif' });

export function generateStaticParams() {
  return [{ locale: 'fr' }, { locale: 'en' }];
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
