import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: 'Balbino Tchoutzine | Portfolio',
    template: '%s | Balbino Tchoutzine',
  },
  description: "Etudiant en Genie Informatique - Passionne d'IA et de NLP pour les langues africaines",
  keywords: ['AI', 'NLP', 'Machine Learning', 'Portfolio', 'Cameroun', 'Medumba'],
  authors: [{ name: 'Balbino Tchoutzine' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
