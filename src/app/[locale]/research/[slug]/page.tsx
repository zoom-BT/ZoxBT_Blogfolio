import { getResearch, getResearchBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/utils';

export async function generateStaticParams() {
  const items = getResearch('fr');
  return ['fr', 'en'].flatMap((locale) => items.map((r) => ({ locale, slug: r.slug })));
}

export default async function ResearchDetailPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const item = getResearchBySlug(slug, locale);
  if (!item) notFound();

  return (
    <div className="pt-20">
      <section
        className="relative overflow-hidden py-16 text-white"
        style={item.teaser ? undefined : { background: 'linear-gradient(135deg, #1e3c72, #2a5298)' }}
      >
        {item.teaser && (
          <>
            <Image src={item.teaser} alt={item.title} fill priority sizes="100vw" className="object-cover object-left-top" />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(30,60,114,0.85), rgba(42,82,152,0.85))' }} />
          </>
        )}
        <div className="relative mx-auto max-w-4xl px-4 md:px-8">
          <Link href={`/${locale}/research`} className="mb-4 inline-flex items-center gap-2 text-white/70 hover:text-white">← {locale === 'fr' ? 'Retour' : 'Back'}</Link>
          <h1 className="mb-4 text-3xl font-black md:text-5xl">{item.title}</h1>
          <div className="flex flex-wrap gap-3 text-sm text-white/70">
            {item.authors && <span>{item.authors.join(', ')}</span>}
            <span>• {formatDate(item.date, locale)}</span>
            {item.status && <span className="rounded-full bg-white/20 px-3 py-0.5 text-xs">{item.status}</span>}
          </div>
        </div>
      </section>
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <article className="prose prose-lg max-w-none" style={{ color: 'var(--text-primary)' }}>
            <MDXRemote source={item.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] }, blockJS: false }} />
          </article>
        </div>
      </section>
    </div>
  );
}
