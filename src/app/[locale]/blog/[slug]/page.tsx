import { getPosts, getPostBySlug } from '@/lib/content';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { formatDate } from '@/lib/utils';
import LikeButton from '@/components/blog/LikeButton';
import CommentSection from '@/components/blog/CommentSection';

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

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="border-b border-[var(--border-light)] bg-[var(--bg-secondary)] py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <Link href={`/${locale}/blog`} className="mb-4 inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            ← {back}
          </Link>
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
            <time>{formatDate(post.date, locale)}</time>
            <span>--</span>
            <span>{post.readingTime}</span>
            {post.categories?.map((cat) => (
              <span key={cat} className="tag">{cat}</span>
            ))}
          </div>
          <h1 className="text-3xl font-black text-[var(--text-primary)] md:text-5xl">{post.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-12" style={{ background: 'var(--bg-primary)' }}>
        <div className="mx-auto max-w-4xl px-4 md:px-8">
          <article className="prose prose-lg max-w-none" style={{ color: 'var(--text-primary)' }}>
            <MDXRemote source={post.content} />
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
