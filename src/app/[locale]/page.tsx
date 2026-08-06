import { getPosts } from '@/lib/content';
import { STATS } from '@/lib/constants';
import HeroSection from '@/components/home/HeroSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import StatsSection from '@/components/home/StatsSection';
import RecentPosts from '@/components/home/RecentPosts';
import ObjectiveSection from '@/components/home/ObjectiveSection';
import InterestsSection from '@/components/home/InterestsSection';
import QuoteBanner from '@/components/home/QuoteBanner';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getPosts(locale);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <HeroSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <StatsSection stats={STATS} locale={locale} />
      <RecentPosts posts={recentPosts} locale={locale} />
      <ObjectiveSection locale={locale} />
      <InterestsSection locale={locale} />
      <QuoteBanner />
    </>
  );
}
