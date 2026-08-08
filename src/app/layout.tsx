import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Balbino Tchoutzine | Portfolio',
    template: '%s | Balbino Tchoutzine',
  },
  description: "Étudiant-ingénieur en Génie Informatique, IA appliquée : Computer Vision, Geospatial ML, NLP low-resource, Edge AI",
  keywords: ['AI', 'Computer Vision', 'Geospatial ML', 'NLP', 'Machine Learning', 'Edge AI', 'Portfolio', 'Cameroon', 'Africa'],
  authors: [{ name: 'Balbino Tchoutzine' }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
