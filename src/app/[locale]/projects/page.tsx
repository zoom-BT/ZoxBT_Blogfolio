import { getProjects } from '@/lib/content';
import ProjectsClient from '@/components/projects/ProjectsClient';

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const projects = getProjects(locale);

  return <ProjectsClient projects={projects} locale={locale} />;
}
