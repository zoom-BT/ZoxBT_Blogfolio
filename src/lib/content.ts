import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Project, BlogPost, Certification, ResearchItem } from './types';

const contentDir = path.join(process.cwd(), 'src/content');

function getFiles(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx') || f.endsWith('.md'));
}

function parseFile<T>(filePath: string, slug: string): T & { content: string; readingTime: string } {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(raw);
  const rt = readingTime(content);
  return {
    ...data,
    slug,
    content,
    readingTime: rt.text,
  } as unknown as T & { content: string; readingTime: string };
}

export function getProjects(locale: string = 'fr'): Project[] {
  const dir = path.join(contentDir, 'projects', locale);
  const files = getFiles(dir);
  return files
    .map((f) => {
      const slug = f.replace(/\.(mdx|md)$/, '');
      return parseFile<Project>(path.join(dir, f), slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getProjectBySlug(slug: string, locale: string = 'fr'): Project | null {
  const dir = path.join(contentDir, 'projects', locale);
  const file = [`${slug}.mdx`, `${slug}.md`].find((f) => fs.existsSync(path.join(dir, f)));
  if (!file) return null;
  return parseFile<Project>(path.join(dir, file), slug);
}

export function getPosts(locale: string = 'fr'): BlogPost[] {
  const dir = path.join(contentDir, 'posts', locale);
  const files = getFiles(dir);
  return files
    .map((f) => {
      const slug = f.replace(/\.(mdx|md)$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return parseFile<BlogPost>(path.join(dir, f), slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPostBySlug(slug: string, locale: string = 'fr'): BlogPost | null {
  const dir = path.join(contentDir, 'posts', locale);
  const files = getFiles(dir);
  const file = files.find((f) => f.includes(slug));
  if (!file) return null;
  return parseFile<BlogPost>(path.join(dir, file), slug);
}

export function getCertifications(locale: string = 'fr'): Certification[] {
  const dir = path.join(contentDir, 'certifications', locale);
  const files = getFiles(dir);
  return files
    .map((f) => {
      const slug = f.replace(/\.(mdx|md)$/, '');
      return parseFile<Certification>(path.join(dir, f), slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getResearch(locale: string = 'fr'): ResearchItem[] {
  const dir = path.join(contentDir, 'research', locale);
  const files = getFiles(dir);
  return files
    .map((f) => {
      const slug = f.replace(/\.(mdx|md)$/, '');
      return parseFile<ResearchItem>(path.join(dir, f), slug);
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getResearchBySlug(slug: string, locale: string = 'fr'): ResearchItem | null {
  const dir = path.join(contentDir, 'research', locale);
  const file = [`${slug}.mdx`, `${slug}.md`].find((f) => fs.existsSync(path.join(dir, f)));
  if (!file) return null;
  return parseFile<ResearchItem>(path.join(dir, file), slug);
}
