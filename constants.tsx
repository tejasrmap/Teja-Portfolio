
import { PortfolioData } from './types';

const DEFAULT_DATA: PortfolioData = {
  name: "TEJA GANUGULA",
  role: "Founder & Director of GT Innovix",
  avatar: "https://i.pinimg.com/736x/95/d8/9f/95d89fd418c11c77e6fe2e91c3723e69.jpg",
  bio: "Big Data Analyst | Full Stack Developer | Founder MD Of GT Innovix LLP",
  fullBio: "I am a BTech Computer Science Engineering (Big Data Analytics) student at SRM University – AP who is deeply interested in learning, building, and innovating through technology. As the founder of GT Innovix, I focus on creating software solutions that are practical, scalable, and aligned with real-world needs.\n\nMy areas of interest include full stack development, data analytics, and problem-solving through technology. I enjoy experimenting with new tools, frameworks, and ideas, and I constantly challenge myself to improve both my technical and analytical skills.\n\nI strongly believe that technology has the power to create meaningful impact. My goal is to continuously grow as a developer and contribute to projects that combine innovation, efficiency, and real-world value.",
  nameScale: 1,
  sectionHeaders: {
    projects: { title: "PROJECTS", tagline: "// 01" },
    skills: { title: "SKILLS", tagline: "// 02" },
    experience: { title: "EXPERIENCE", tagline: "// 03" },
    education: { title: "EDUCATION", tagline: "EDU // 04" }
  },
  socials: {
    github: "https://github.com/tejasrmap",
    linkedin: "https://linkedin.com/in/tejaganugula",
    twitter: "https://x.com/tejagtax?s=11",
    email: "tejag.vijay@gmail.com"
  },
  projects: [
    {
      id: "SRM-01",
      title: "CROWD MONITOR",
      description: "Proprietary internal architecture for scalable data processing and AI integration.",
      longDescription: "Innovix Core is the backbone of GT Innovix's software suite. It manages complex data streams and provides a unified interface for generative AI models to interact with legacy systems.",
      image: "https://i.pinimg.com/736x/da/a1/1b/daa11b7fd6597c08e98bd019c12e5d8e.jpg",
      tags: ["System Architecture", "AI", "Big Data"],
      links: { github: "https://github.com/tejasrmap/CrowdDetection-VibeCraft", redirect: "https://crowdmonitoring-vibecraft.netlify.app/"}
    },
    {
      id: "SRM-02",
      title: "AGRIRENT SITE",
      description: "A FrontEnd Website Made Baed On HTML JS CSS for Farmers to rent Agricultura Equipment from Equipment Owners Directly without Middlemen.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/0d/53/be/0d53bea9c5f2ef597597e7dafc235d5a.jpg",
      tags: ["HTML", "JS", "CSS"],
        links: { github: "https://github.com/tejasrmap/AgriRent_Website", redirect: "https://agrirent.tiiny.site/"}
    }
  ],
  skills: [
    { name: "C", level: 96, category: "Programming", icon: "fa-solid fa-chart-network" },
    { name: "C++", level: 98, category: "Programming", icon: "fa-solid fa-code" },
    { name: "Python", level: 94, category: "Programming", icon: "fa-solid fa-layer-group" },
    { name: "HTML", level: 97, category: "Frontend", icon: "fa-brands fa-react" },
    { name: "JS", level: 96, category: "Frontend", icon: "fa-solid fa-chart-network" },
    { name: "CSS", level: 98, category: "Frontend", icon: "fa-solid fa-code" },
    { name: "MySQL", level: 94, category: "DataBase", icon: "fa-solid fa-layer-group" },
    { name: "MongoDB", level: 97, category: "DataBase", icon: "fa-brands fa-react" },
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
        "CGPA = 8.20 (Till Date)"
      ]
    },
    {
      institution: "Narayana Junior College - Gudivada",
      degree: "MPC - Intermediate",
      period: "2022 - 2024",
      description: [
        "TOTAL = 896 / 1000",
        "PERCENTAGE = 89.6 %"
      ]
    },
    {
      institution: "Ravindra Bharathi School - Gudivada",
      degree: "SSC",
      period: "2022",
      description: [
        "TOTAL = 482 / 600 - 80 %",
        "PERCENTAGE = 80.0 %"
      ]
      
    },
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
      if (parsed.nameScale === undefined) parsed.nameScale = 1;
      if (!parsed.sectionHeaders) parsed.sectionHeaders = DEFAULT_DATA.sectionHeaders;
      return parsed;
    } catch (e) {
      return DEFAULT_DATA;
    }
  }
  return DEFAULT_DATA;
};

export const PORTFOLIO_DATA = getInitialData();
