
import { PortfolioData } from './types';

const DEFAULT_DATA: PortfolioData = {
  name: "TEJA GANUGULA",
  role: "Founder & Director of GT InnoX",
  avatar: "https://i.pinimg.com/736x/49/09/3c/49093cd4230d03b5f70d26483138c9e7.jpg",
  bio: "Big Data Analyst  -- Full Stack Developer  --   Founder MD Of GT InnoX LLP",
  fullBio: "I am Teja Ganugula, a Computer Science Engineering student specializing in Big Data Analytics at SRM University–AP. I am the Founder and Managing Director of GT InnoX LLP, where I actively work on transforming ideas into scalable solutions. As a team lead in multiple hackathons, I have led projects from concept to execution and presented startup pitches to diverse audiences. I am deeply interested in coding, exploring emerging technologies, and building innovative products within the entrepreneurship ecosystem. ",
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
      description: "I developed a Crowd Monitoring System during a hackathon to improve real-time crowd safety and management. The system uses computer vision and AI to analyze live video feeds and detect crowd density. It helps identify overcrowded areas and unusual movement patterns. Real-time alerts and visual insights support quick decision-making. The project demonstrates the practical use of machine learning in smart surveillance. It highlights efficient data processing, scalability, and teamwork under hackathon constraints.",
      longDescription: "",
      image: "https://i.pinimg.com/736x/da/a1/1b/daa11b7fd6597c08e98bd019c12e5d8e.jpg",
      tags: ["HTML", "JS", "CSS", "MongoDB", "Python"],
      links: { github: "https://github.com/tejasrmap/CrowdDetection-VibeCraft", redirect: "https://crowdmonitoring-vibecraft.netlify.app/"}
    },
    {
      id: "GT-02",
      title: "AGRIRENT SITE",
      description: "A responsive web application connecting farmers with premium farming equipment through an intuitive rental system. Built entirely with HTML5, CSS3, and Vanilla JavaScript, this platform features real-time inventory management, secure user authentication, and a seamless booking workflow.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/0d/53/be/0d53bea9c5f2ef597597e7dafc235d5a.jpg",
      tags: ["HTML", "JS", "CSS"],
        links: { github: "https://github.com/tejasrmap/AgriRent_Website", redirect: "https://agrirent.tiiny.site/"}
    },
    {
      id: "GT-03",
      title: "Object Detection Using Live Camera Feed",
      description: "A real-time live object detection system developed using YOLOv8 and Python, capable of identifying and tracking multiple objects through a live camera feed. The application processes video frames in real time to draw bounding boxes with class labels and confidence scores, enabling accurate and fast detection. Designed for practical use cases such as surveillance, traffic monitoring, and safety systems, the project demonstrates efficient computer vision techniques and seamless integration of deep learning models into real-time applications.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/1c/31/ba/1c31baaa43a760f1ae005158a5bdd040.jpg",
      tags: ["Python", "YoloV8", "Streamlit", "CV2"],
        links: { github: "https://github.com/tejasrmap/ObjectDetection-LiveFeed", redirect: "#"}
    },
    {
      id: "GT-04",
      title: "Offline Voice Assistant for Laptop",
      description: "Developed an offline voice-based computer control system using Python that allows users to control system functions through speech commands. The application leverages VOSK for offline speech recognition, PyAudio for real-time microphone input, and Windows system APIs to manage volume, brightness, applications, and system operations. The system operates without internet connectivity and provides a hands-free, accessible computing experience.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/ce/4f/e4/ce4fe4598da0e676193217ae87760326.jpg",
      tags: ["Python", "VOSK"],
        links: { github: "https://github.com/tejasrmap/PythonVoiceAssistant-Laptop", redirect: "#"}
    },
    {
      id: "GT-05",
      title: "PeaceXplorer - Work-Life Balancer.",
      description: "Developed PeaceXplorer, a human-centered wellbeing analysis application using Flutter that evaluates daily lifestyle balance based on work/study time, sleep, screen usage, and social interaction. The application calculates a behavioral balance score and converts it into meaningful emotional insights and real-world suggestions, encouraging users to improve human connection and mental wellness. The system stores daily reflections locally, visualizes past patterns through a calm history dashboard, and operates entirely offline without user accounts, focusing on accessibility, privacy, and mindful technology usage.",
      longDescription: ".",
      image: "https://i.pinimg.com/736x/96/45/9b/96459b7663b92bc6704a79012b184955.jpg",
      tags: ["Flutter", "Dart"],
        links: { github: "https://github.com/tejasrmap/WorkLifeBalance-C4CHackathon", redirect: "#"}
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
      company: "GT InnoX LLP",
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
