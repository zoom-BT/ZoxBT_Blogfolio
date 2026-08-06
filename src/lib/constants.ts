import { NavItem, SkillCategory, TimelineEntry, Stat } from './types';

export const SITE_CONFIG = {
  title: 'Balbino Tchoutzine',
  subtitle: 'Portfolio & Recherche',
  description: {
    fr: "Étudiant-ingénieur en Génie Informatique · IA appliquée : Computer Vision, Geospatial ML, NLP low-resource, Edge AI",
    en: 'Computer Engineering Student · Applied AI: Computer Vision, Geospatial ML, Low-resource NLP, Edge AI',
  },
  url: 'https://balbino-tchoutzine.vercel.app',
  author: {
    name: 'Balbino Tchoutzine',
    bio: {
      fr: "Étudiant-ingénieur en Génie Informatique (ENSPY), je construis de l'IA appliquée au développement : Computer Vision, Geospatial ML et NLP low-resource, avec un intérêt particulier pour l'Afrique",
      en: 'Computer Engineering student at ENSPY, building applied AI for development across computer vision, geospatial ML, and low-resource NLP, with a particular focus on Africa',
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
    { label: 'À propos', href: '/about' },
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

export const TIMELINE: Record<'fr' | 'en', TimelineEntry[]> = {
  fr: [
    {
      period: 'Attendu juin 2027',
      title: "Diplôme d'ingénieur",
      institution: 'ENSPY - Université de Yaoundé I',
      description: "Diplôme d'ingénieur en Génie Informatique",
      focus: '',
      status: '—',
    },
    {
      period: '2026 - 2027',
      title: 'Cycle ingénieur GI - ING-5',
      institution: 'ENSPY - Université de Yaoundé I',
      description: 'Dernière année du cycle ingénieur, spécialisation et projet de fin d\'études.',
      focus: "Stage de recherche en cours : prédiction multimodale de conversion MCI → démence (NACC, ADNI, Framingham)",
      status: 'En cours (entrant)',
    },
    {
      period: '2025 - 2026',
      title: 'Cycle ingénieur GI - ING-4',
      institution: 'ENSPY - Université de Yaoundé I',
      description: 'Approfondissement IA/data, génie logiciel et systèmes.',
      focus: 'Machine Learning, Analyse de données, Informatique décisionnelle, Systèmes multi-agents, Recherche opérationnelle',
      status: 'Terminé · GPA 3.02/4.0',
    },
    {
      period: '2024 - 2025',
      title: 'Cycle ingénieur GI - ING-3',
      institution: 'ENSPY - Université de Yaoundé I',
      description: 'Socle informatique, mathématique et premières briques IA.',
      focus: 'Systèmes formels et bases de l\'IA, Data Science, Bases de données, Algorithmique, Programmation objet',
      status: 'Terminé',
    },
    {
      period: '2022 - 2024',
      title: 'Classes préparatoires intégrées',
      institution: 'ENSPY - Université de Yaoundé I',
      description: 'Formation intensive en mathématiques, sciences physiques et informatique.',
      focus: 'Mathématiques (algèbre, analyse, probabilités, géométrie), Physique, Algorithmique, C, Python',
      status: 'Terminé',
    },
    {
      period: '2015 - 2022',
      title: 'Baccalauréat Série C',
      institution: 'Lycée Classique de Bangangté',
      description: 'Série C (Mathématiques et Sciences Physiques)',
      focus: 'Mathématiques, Physique, Chimie',
      status: 'Obtenu (juin 2022)',
    },
  ],
  en: [
    {
      period: 'Expected June 2027',
      title: 'Engineering Degree',
      institution: 'ENSPY - University of Yaoundé I',
      description: 'Engineering degree in Computer Engineering',
      focus: '',
      status: '—',
    },
    {
      period: '2026 - 2027',
      title: 'Computer Engineering - Year 5 (ING-5)',
      institution: 'ENSPY - University of Yaoundé I',
      description: 'Final year of the engineering program, specialization and capstone project.',
      focus: 'Ongoing research internship: multimodal prediction of MCI-to-dementia conversion (NACC, ADNI, Framingham)',
      status: 'Incoming / in progress',
    },
    {
      period: '2025 - 2026',
      title: 'Computer Engineering - Year 4 (ING-4)',
      institution: 'ENSPY - University of Yaoundé I',
      description: 'Deeper AI/data, software engineering and systems coursework.',
      focus: 'Machine Learning, Data Analysis, Business Intelligence, Multi-Agent Systems, Operations Research',
      status: 'Completed · GPA 3.02/4.0',
    },
    {
      period: '2024 - 2025',
      title: 'Computer Engineering - Year 3 (ING-3)',
      institution: 'ENSPY - University of Yaoundé I',
      description: 'CS and math foundations, first building blocks of AI.',
      focus: 'Formal Systems and Foundations of AI, Data Science, Databases, Algorithms, Object-Oriented Programming',
      status: 'Completed',
    },
    {
      period: '2022 - 2024',
      title: 'Integrated Preparatory Programme',
      institution: 'ENSPY - University of Yaoundé I',
      description: 'Intensive training in mathematics, physical sciences and computer science.',
      focus: 'Mathematics (algebra, analysis, probability, geometry), Physics, Algorithms, C, Python',
      status: 'Completed',
    },
    {
      period: '2015 - 2022',
      title: 'High School Diploma - Series C',
      institution: 'Lycée Classique de Bangangté',
      description: 'Series C (Mathematics and Physical Sciences)',
      focus: 'Mathematics, Physics, Chemistry',
      status: 'Awarded (June 2022)',
    },
  ],
};

export const STATS: Stat[] = [
  { value: '15+', label: 'Certifications' },
  { value: '10+', label: 'Projets IA/ML' },
  { value: '2', label: 'Challenges gagnés' },
  { value: '3', label: 'Langues parlées' },
];

export const PROJECT_CATEGORIES = ['all', 'ai', 'nlp', 'ml', 'competition', 'web'] as const;
