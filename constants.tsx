
import { PortfolioData } from './types';

const DEFAULT_DATA: PortfolioData = {
  name: "TEJA GANUGULA",
  role: "Founder & Director of GT Innovix",
  avatar: "https://i.pinimg.com/736x/49/09/3c/49093cd4230d03b5f70d26483138c9e7.jpg",
  bio: "Big Data Analyst | Full Stack Developer | Founder MD Of GT Innovix LLP",
  fullBio: "I am Teja Ganugula, a Computer Science Engineering student specializing in Big Data Analytics at SRM University–AP. I am the Founder and Managing Director of GT Innovix LLP, where I actively work on transforming ideas into scalable solutions. As a team lead in multiple hackathons, I have led projects from concept to execution and presented startup pitches to diverse audiences. I am deeply interested in coding, exploring emerging technologies, and building innovative products within the entrepreneurship ecosystem. ",
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
      id: "GT-01",
      title: "CROWD MONITOR",
      description: "Built an intelligent crowd monitoring system enabling real-time analysis for safety and resource optimization.",
      longDescription: "",
      image: "https://i.pinimg.com/736x/da/a1/1b/daa11b7fd6597c08e98bd019c12e5d8e.jpg",
      tags: ["HTML", "JS", "CSS", "MongoDB", "Python"],
      links: { github: "https://github.com/tejasrmap/CrowdDetection-VibeCraft", redirect: "https://crowdmonitoring-vibecraft.netlify.app/"}
    },
    {
      id: "GT-02",
      title: "AGRIRENT SITE",
      description: "A FrontEnd Website Made Baed On HTML JS CSS for Farmers to rent Agricultura Equipment from Equipment Owners Directly without Middlemen.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/0d/53/be/0d53bea9c5f2ef597597e7dafc235d5a.jpg",
      tags: ["HTML", "JS", "CSS"],
        links: { github: "https://github.com/tejasrmap/AgriRent_Website", redirect: "https://agrirent.tiiny.site/"}
    },
    {
      id: "GT-03",
      title: "Object Detection Using Live Camera Feed",
      description: "This is made completely based on Python YOLOv8 and used Streamlit for Testing Purposes.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/1c/31/ba/1c31baaa43a760f1ae005158a5bdd040.jpg",
      tags: ["Python", "YoloV8", "Streamlit", "CV2"],
        links: { github: "https://github.com/tejasrmap/ObjectDetection-LiveFeed", redirect: "#"}
    }
  ],
  skills: [
    { name: "C", level: 96, category: "Programming", icon: "fa-solid fa-code" },
    { name: "C++", level: 98, category: "Programming", icon: "fa-solid fa-code" },
    { name: "Python", level: 94, category: "Programming", icon: "fa-solid fa-code" },
    { name: "HTML", level: 97, category: "Frontend", icon: "fa-solid fa-code" },
    { name: "JS", level: 96, category: "Frontend", icon: "fa-solid fa-code" },
    { name: "CSS", level: 98, category: "Frontend", icon: "fa-solid fa-code" },
    { name: "MySQL", level: 94, category: "DataBase", icon: "fa-solid fa-layer-group" },
    { name: "MongoDB", level: 97, category: "DataBase", icon: "fa-solid fa-layer-group" },
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
