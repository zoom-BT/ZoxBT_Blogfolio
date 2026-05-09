import { getPosts, getPostBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import { formatDate } from '@/lib/utils';
import LikeButton from '@/components/blog/LikeButton';
import CommentSection from '@/components/blog/CommentSection';
import ShareButtons from '@/components/blog/ShareButtons';

function renderTitle(title: string) {
  const match = title.match(/TCHOUTZIFY|Tchoutzify/);
  if (!match) return title;
  const parts = title.split(match[0]);
  return (
    <>
      {parts[0]}
      <span style={{
        color: '#1DB954',
        textShadow: '0 0 12px rgba(29,185,84,0.8), 0 0 30px rgba(29,185,84,0.5), 0 0 60px rgba(29,185,84,0.25)',
      }}>
        {match[0]}
      </span>
      {parts[1]}
    </>
  );
}

export async function generateStaticParams() {
  const posts = getPosts('fr');
  return ['fr', 'en'].flatMap((locale) =>
    posts.map((p) => ({ locale, slug: p.slug }))
  );
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
  const { locale, slug } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();

  const back = locale === 'fr' ? 'Retour au blog' : 'Back to blog';

  if (post.comingSoon) {
    return (
      <div className="pt-20">
        <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
          <div className="mx-auto max-w-4xl px-4 md:px-8">
            <Link href={`/${locale}/blog`} className="mb-4 inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
              ← {back}
            </Link>
            <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
              <time>{formatDate(post.date, locale)}</time>
              {post.categories?.map((cat) => (
                <span key={cat} className="tag">{cat}</span>
              ))}
              <span className="rounded-full bg-[var(--accent-blue)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-white">
                {locale === 'fr' ? 'Bientôt' : 'Coming Soon'}
              </span>
            </div>
            <h1 className="text-3xl font-black text-[var(--text-primary)] md:text-5xl">{post.title}</h1>
          </div>
        </section>
        <section className="py-24" style={{ background: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-4xl px-4 text-center md:px-8">
            <p className="text-6xl mb-6">✍️</p>
            <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-3">
              {locale === 'fr' ? 'Article en cours de rédaction' : 'Article in progress'}
            </h2>
            <p className="text-[var(--text-secondary)]">
              {locale === 'fr'
                ? 'Cet article sera disponible très bientôt. Revenez dans quelques jours !'
                : 'This article will be available very soon. Check back in a few days!'}
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="pt-20">
      {/* Hero */}
      <section
        className="relative border-b border-[var(--border-light)] py-20 overflow-hidden"
        style={post.teaser ? { minHeight: '380px' } : { background: 'var(--bg-secondary)' }}
      >
        {post.teaser && (
          <>
            <img
              src={post.teaser}
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/55" />
          </>
        )}
        <div className="relative mx-auto max-w-2xl px-6 md:px-8">
          <Link
            href={`/${locale}/blog`}
            className={`mb-6 inline-flex items-center gap-2 text-sm ${post.teaser ? 'text-white/80 hover:text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >
            ← {back}
          </Link>
          <div className={`mb-4 flex flex-wrap items-center gap-3 text-sm ${post.teaser ? 'text-white/70' : 'text-[var(--text-secondary)]'}`}>
            <time>{formatDate(post.date, locale)}</time>
            <span>·</span>
            <span>{post.readingTime}</span>
            {post.categories?.map((cat) => (
              <span key={cat} className={post.teaser ? 'rounded border border-white/30 px-2 py-0.5 text-xs text-white/80' : 'tag'}>{cat}</span>
            ))}
          </div>
          <h1 className={`text-3xl font-black md:text-5xl leading-tight ${post.teaser ? 'text-white' : 'text-[var(--text-primary)]'}`}>
            {renderTitle(post.title)}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-2xl px-6 md:px-8">
          <article className="prose max-w-none" style={{ color: 'var(--text-primary)' }}>
            <MDXRemote source={post.content} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
          </article>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-2 border-t border-[var(--border-light)] pt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Share */}
          <ShareButtons title={post.title} slug={slug} locale={locale} />

          {/* Like */}
          <div className="mt-8 flex justify-center">
            <LikeButton slug={slug} />
          </div>

          {/* Comments */}
          <div className="mt-12">
            <CommentSection locale={locale} />
          </div>
        </div>
      </section>
    </div>
  );
}
