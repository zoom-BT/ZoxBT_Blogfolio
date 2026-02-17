import { NavItem, SkillCategory, TimelineEntry, Stat, Interest } from './types';

export const SITE_CONFIG = {
  title: 'Balbino Tchoutzine',
  subtitle: 'Portfolio & Recherche',
  description: {
    fr: "Etudiant en Genie Informatique - Passionne d'IA et de NLP",
    en: 'Computer Engineering Student - Passionate about AI and NLP',
  },
  url: 'https://balbino-tchoutzine.vercel.app',
  author: {
    name: 'Balbino Tchoutzine',
    bio: {
      fr: "Etudiant en Genie Informatique passionne par l'IA, le NLP et les technologies pour l'Afrique",
      en: 'Computer Engineering student passionate about AI, NLP, and technologies for Africa',
    },
    location: 'Cameroun',
    email: 'tchoutzine@gmail.com',
    phone: '+237 65 81 54 57',
    avatar: '/images/balbino.jpg',
  },
  social: {
    github: 'https://github.com/zoom-BT',
    linkedin: 'https://linkedin.com/in/balbino-tchoutzine',
    twitter: 'https://x.com/tchoutzine',
  },
};

export const NAV_ITEMS: Record<string, NavItem[]> = {
  fr: [
    { label: 'Accueil', href: '/' },
    { label: 'Projets', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Recherche', href: '/research' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'A propos', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
  en: [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Research', href: '/research' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ],
};

export const SKILLS: SkillCategory[] = [
  {
    title: 'Langages',
    skills: [
      { name: 'Python', level: 90 },
      { name: 'JavaScript', level: 75 },
      { name: 'C/C++', level: 70 },
      { name: 'Java', level: 65 },
    ],
  },
  {
    title: 'IA & ML',
    skills: [
      { name: 'TensorFlow/Keras', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'Scikit-learn', level: 85 },
      { name: 'NLP (NLTK, spaCy)', level: 80 },
    ],
  },
  {
    title: 'Web',
    skills: [
      { name: 'HTML/CSS', level: 85 },
      { name: 'React', level: 70 },
      { name: 'Node.js', level: 65 },
      { name: 'Django/Flask', level: 75 },
    ],
  },
  {
    title: 'Outils',
    skills: [
      { name: 'Power BI & DAX', level: 80 },
      { name: 'SQL', level: 85 },
      { name: 'Git/GitHub', level: 85 },
      { name: 'Maple', level: 75 },
    ],
  },
];

export const TIMELINE: TimelineEntry[] = [
  {
    period: 'Sept 2024 - Present',
    title: 'Genie Informatique (3eme annee cycle ingenieur)',
    institution: 'ENSPY - Ecole Nationale Superieure Polytechnique de Yaounde',
    description: 'Specialisation en Intelligence Artificielle, Machine Learning et traitement du langage naturel.',
    focus: 'Deep Learning, NLP, Computer Vision, Data Science',
  },
  {
    period: 'Sept 2022 - Juin 2024',
    title: 'Classe Preparatoire Integree (2 ans)',
    institution: 'ENSPY - Ecole Nationale Superieure Polytechnique de Yaounde',
    description: 'Formation intensive en Mathematiques, Sciences Physiques et Informatique.',
    focus: 'Mathematiques avancees, Physique, Algorithmique, Programmation',
  },
  {
    period: 'Sept 2015 - Juin 2022',
    title: 'Baccalaureat ESG Serie C',
    institution: 'Lycee Classique de Bangante',
    description: 'Serie C (Mathematiques et Sciences Physiques)',
    focus: 'Mathematiques, Physique, Chimie, Informatique',
  },
];

export const STATS: Stat[] = [
  { value: '15+', label: 'Certifications' },
  { value: '10+', label: 'Projets IA/ML' },
  { value: '2', label: 'Challenges gagnes' },
  { value: '3', label: 'Langues parlees' },
];

export const INTERESTS: Interest[] = [
  { icon: '', title: 'Basketball', description: "Passion pour le sport d'equipe et la strategie" },
  { icon: '', title: 'Echecs & Scrabble', description: 'Jeux de reflexion et strategie mentale' },
  { icon: '', title: 'Lecture', description: 'Developpement personnel, business et finance' },
  { icon: '', title: 'Tech for Africa', description: "Solutions technologiques pour l'Afrique" },
];

export const PROJECT_CATEGORIES = ['all', 'ai', 'nlp', 'ml', 'competition', 'web'] as const;
