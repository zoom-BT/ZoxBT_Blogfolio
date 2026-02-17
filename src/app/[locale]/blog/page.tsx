import { getPosts } from '@/lib/content';
import BlogClient from '@/components/blog/BlogClient';

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getPosts(locale);

  return <BlogClient posts={posts} locale={locale} />;
}
