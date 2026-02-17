export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string, locale: string = 'fr'): string {
  return new Date(date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, string> = {
    ai: 'from-blue-500 to-purple-600',
    nlp: 'from-green-500 to-teal-600',
    ml: 'from-orange-500 to-red-600',
    web: 'from-cyan-500 to-blue-600',
    competition: 'from-yellow-500 to-orange-600',
  };
  return colors[category] || 'from-gray-500 to-gray-600';
}

export function getCategoryLabel(category: string, locale: string = 'fr'): string {
  const labels: Record<string, Record<string, string>> = {
    all: { fr: 'Tous', en: 'All' },
    ai: { fr: 'IA', en: 'AI' },
    nlp: { fr: 'NLP', en: 'NLP' },
    ml: { fr: 'Machine Learning', en: 'Machine Learning' },
    web: { fr: 'Web', en: 'Web' },
    competition: { fr: 'Competition', en: 'Competition' },
  };
  return labels[category]?.[locale] || category;
}
