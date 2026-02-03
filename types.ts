
export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  tags: string[];
  links: {
    github?: string;
    demo?: string;
    redirect?: string;
  };
}

export interface Skill {
  name: string;
  level: number; // 1-100
  category: 'Frontend' | 'Backend' | 'DevOps' | 'AI/ML' | 'Tools';
  icon: string;
  image?: string; // Optional image logo
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string[];
}

export interface Education {
  institution: string;
  degree: string;
  period: string;
  description: string[];
}

export interface SectionItem {
  id: string;
  title: string;
  subtitle: string;
  period: string;
  content: string[];
}

export interface CustomSection {
  id: string;
  title: string;
  tagline: string;
  accent: 'cyan' | 'fuchsia' | 'emerald';
  items: SectionItem[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface SectionHeaders {
  projects: { title: string; tagline: string };
  skills: { title: string; tagline: string };
  experience: { title: string; tagline: string };
  education: { title: string; tagline: string };
}

export interface PortfolioData {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  fullBio: string;
  nameScale?: number;
  sectionHeaders: SectionHeaders;
  projects: Project[];
  skills: Skill[];
  experience: Experience[];
  education: Education[];
  customSections: CustomSection[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
    email: string;
  };
}
