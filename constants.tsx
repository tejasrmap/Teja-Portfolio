import { PortfolioData } from "./types";

export const PORTFOLIO_DATA: PortfolioData = {
  name: "TEJA GANUGULA",

  role: "Big Data Analyst | Full Stack Developer | Founder MD Of GT Innovix LLP",

  avatar:
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...JRU5ErkJggg==",

  bio:
    "Big Data Analyst | Full Stack Developer | Founder MD Of GT Innovix LLP",

  fullBio:
    "I am a BTech Computer Science Engineering (Big Data Analytics) student at SRM University – AP who is deeply interested in learning, building, and innovating through technology. As the founder of GT Innovix, I focus on creating software solutions that are practical, scalable, and aligned with real-world needs.\n\nMy areas of interest include full stack development, data analytics, and problem-solving through technology. I enjoy experimenting with new tools, frameworks, and ideas, and I constantly challenge myself to improve both my technical and analytical skills.\n\nI strongly believe that technology has the power to create meaningful impact. My goal is to continuously grow as a developer and contribute to projects that combine innovation, efficiency, and real-world value.",

  nameScale: 0.5,

  socials: {
    github: "https://github.com/teja-ganugula",
    linkedin: "https://linkedin.com/in/teja-ganugula",
    twitter: "https://twitter.com/teja_ganugula",
    email: "teja@gt-innovix.com",
  },

  sectionHeaders: {
    projects: {
      title: "PROJECTS",
      tagline: "// 01",
    },
    skills: {
      title: "Skills Matrix",
      tagline: "// 02",
    },
    experience: {
      title: "EXPERIENCE",
      tagline: "// 03",
    },
    education: {
      title: "Academic",
      tagline: "// 04",
    },
  },

  projects: [
    {
      id: "INX-01",
      title: "INNOVIX_CORE",
      description:
        "Proprietary internal architecture for scalable data processing and AI integration.",
      longDescription:
        "Innovix Core is the backbone of GT Innovix's software suite. It manages complex data streams and provides a unified interface for generative AI models to interact with legacy systems.",
      image:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...JRU5ErkJggg==",
      tags: ["Data Analytics", "React", "Research"],
      links: {
        github: "https://github.com/tejasrmap/AgriRent_Website",
        demo: "https://agrirent.tiiny.site/",
      },
    },
  ],

  skills: [
    {
      name: "Big Data Analysis",
      level: 96,
      category: "AI/ML",
      icon: "fa-solid fa-chart-network",
    },
    {
      name: "Full Stack Dev",
      level: 98,
      category: "Frontend",
      icon: "fa-solid fa-code",
    },
    {
      name: "System Architecture",
      level: 94,
      category: "Backend",
      icon: "fa-solid fa-layer-group",
    },
    {
      name: "React / Next.js",
      level: 97,
      category: "Frontend",
      icon: "fa-brands fa-react",
    },
  ],

  experience: [
    {
      company: "GT Innovix LLP",
      role: "Founder & Director",
      period: "2025 - Present",
      description: [
        "Directing cross-functional engineering teams to deliver high-impact enterprise software.",
        "Architecting large-scale data processing pipelines for predictive analytics.",
        "Pioneering the integration of generative AI within core business workflows.",
      ],
    },
  ],

  education: [
    {
      institution: "SRM University AP",
      degree: "B.Tech CSE (Big Data Analytics)",
      period: "2024 - 2028",
      description: [
        "Specializing in Big Data ecosystems, Hadoop, and high-performance computing.",
        "Engaging in advanced research for data visualization and predictive modeling.",
        "CGPA = 8.20 ( Till Date ).",
      ],
    },
  ],

  customSections: [],
};
