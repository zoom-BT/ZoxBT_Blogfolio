import type { Metadata } from 'next';
import './globals.css';

const SITE_URL = 'https://zoxbt.is-a.dev';
const DEFAULT_DESCRIPTION = "Étudiant-ingénieur en Génie Informatique, IA appliquée : Computer Vision, Geospatial ML, NLP low-resource, Edge AI";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Balbino Tchoutzine | Blogfolio',
    template: '%s | Blogfolio',
  },
  description: DEFAULT_DESCRIPTION,
  keywords: ['AI', 'Computer Vision', 'Geospatial ML', 'NLP', 'Machine Learning', 'Edge AI', 'Blogfolio', 'Cameroon', 'Africa'],
  authors: [{ name: 'Balbino Tchoutzine' }],
  openGraph: {
    type: 'website',
    siteName: 'Blogfolio',
    title: 'Balbino Tchoutzine | Blogfolio',
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Balbino Tchoutzine | Blogfolio',
    description: DEFAULT_DESCRIPTION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
