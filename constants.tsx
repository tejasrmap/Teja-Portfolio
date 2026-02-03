
import { PortfolioData } from './types';

const DEFAULT_DATA: PortfolioData = {
  name: "TEJA GANUGULA",
  role: "Founder & Director of GT Innovix",
  avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=1000",
  bio: "Big Data Analyst | Full Stack Developer | Founder MD Of GT Innovix LLP",
  fullBio: "I am a BTech Computer Science Engineering (Big Data Analytics) student at SRM University – AP who is deeply interested in learning, building, and innovating through technology. As the founder of GT Innovix, I focus on creating software solutions that are practical, scalable, and aligned with real-world needs.\n\nMy areas of interest include full stack development, data analytics, and problem-solving through technology. I enjoy experimenting with new tools, frameworks, and ideas, and I constantly challenge myself to improve both my technical and analytical skills.\n\nI strongly believe that technology has the power to create meaningful impact. My goal is to continuously grow as a developer and contribute to projects that combine innovation, efficiency, and real-world value.",
  socials: {
    github: "https://github.com/teja-ganugula",
    linkedin: "https://linkedin.com/in/teja-ganugula",
    twitter: "https://twitter.com/teja_ganugula",
    email: "teja@gt-innovix.com"
  },
  projects: [
    {
      id: "INX-01",
      title: "INNOVIX_CORE",
      description: "Proprietary internal architecture for scalable data processing and AI integration.",
      longDescription: "Innovix Core is the backbone of GT Innovix's software suite. It manages complex data streams and provides a unified interface for generative AI models to interact with legacy systems.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
      tags: ["System Architecture", "AI", "Big Data"],
      links: { github: "#" }
    },
    {
      id: "SRM-02",
      title: "CAMPUS_FLOW",
      description: "A specialized analytics tool for mapping student engagement and resource allocation.",
      longDescription: "Developed as a research initiative at SRM University AP, this tool uses predictive modeling to optimize campus resource usage during peak hours.",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800",
      tags: ["Data Analytics", "React", "Research"],
      links: { github: "#" }
    }
  ],
  skills: [
    { name: "Big Data Analysis", level: 96, category: "AI/ML", icon: "fa-solid fa-chart-network" },
    { name: "Full Stack Dev", level: 98, category: "Frontend", icon: "fa-solid fa-code" },
    { name: "System Architecture", level: 94, category: "Backend", icon: "fa-solid fa-layer-group" },
    { name: "React / Next.js", level: 97, category: "Frontend", icon: "fa-brands fa-react" },
  ],
  experience: [
    {
      company: "GT Innovix LLP",
      role: "Founder & Director",
      period: "2025 - Present",
      description: [
        "Directing cross-functional engineering teams to deliver high-impact enterprise software.",
        "Architecting large-scale data processing pipelines for predictive analytics.",
        "Pioneering the integration of generative AI within core business workflows."
      ]
    }
  ],
  education: [
    {
      institution: "SRM University AP",
      degree: "B.Tech CSE (Big Data Analytics)",
      period: "2024 - 2028",
      description: [
        "Specializing in Big Data ecosystems, Hadoop, and high-performance computing.",
        "Engaging in advanced research for data visualization and predictive modeling.",
        "Active member of the Next-Gen Tech Lab."
      ]
    }
  ],
  customSections: []
};

const getInitialData = (): PortfolioData => {
  if (typeof window === 'undefined') return DEFAULT_DATA;
  const saved = localStorage.getItem('portfolio_content');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      if (!parsed.education) parsed.education = DEFAULT_DATA.education;
      if (!parsed.customSections) parsed.customSections = [];
      return parsed;
    } catch (e) {
      return DEFAULT_DATA;
    }
  }
  return DEFAULT_DATA;
};

export const PORTFOLIO_DATA = getInitialData();
