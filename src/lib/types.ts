export interface Project {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  featured: boolean;
  status: string;
  tags: string[];
  technologies: string[];
  github_url?: string;
  demo_url?: string;
  teaser?: string;
  content: string;
  readingTime: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  categories: string[];
  tags: string[];
  excerpt: string;
  teaser?: string;
  toc?: boolean;
  readingTime: string;
  content: string;
}

export interface Certification {
  slug: string;
  title: string;
  provider: string;
  date: string;
  type: string;
  icon: string;
  credential_id: string;
  certificate_url?: string;
  verify_url?: string;
  description: string;
  skills: string[];
  content: string;
}

export interface ResearchItem {
  slug: string;
  title: string;
  type: string;
  status: string;
  date: string;
  authors: string[];
  venue?: string;
  teaser?: string;
  excerpt: string;
  content: string;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface SkillCategory {
  title: string;
  icon?: string;
  skills: Skill[];
}

export interface TimelineEntry {
  period: string;
  title: string;
  institution: string;
  description: string;
  focus: string;
}

export interface Stat {
  value: string;
  label: string;
}

export interface Interest {
  icon: string;
  title: string;
  description: string;
}
