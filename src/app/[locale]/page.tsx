import { getProjects } from '@/lib/content';
import { getPosts } from '@/lib/content';
import { STATS, INTERESTS, SITE_CONFIG } from '@/lib/constants';
import HeroSection from '@/components/home/HeroSection';
import ExpertiseSection from '@/components/home/ExpertiseSection';
import StatsSection from '@/components/home/StatsSection';
import FeaturedProjects from '@/components/home/FeaturedProjects';
import RecentPosts from '@/components/home/RecentPosts';
import ObjectiveSection from '@/components/home/ObjectiveSection';
import InterestsSection from '@/components/home/InterestsSection';
import QuoteBanner from '@/components/home/QuoteBanner';

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = getProjects(locale);
  const posts = getPosts(locale);
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const recentPosts = posts.slice(0, 3);

  return (
    <>
      <HeroSection locale={locale} />
      <ExpertiseSection locale={locale} />
      <StatsSection stats={STATS} locale={locale} />
      <FeaturedProjects projects={featuredProjects} locale={locale} />
      <RecentPosts posts={recentPosts} locale={locale} />
      <ObjectiveSection locale={locale} />
      <InterestsSection interests={INTERESTS} locale={locale} />
      <QuoteBanner />
    </>
  );
}
