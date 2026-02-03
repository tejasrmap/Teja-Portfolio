
import React, { useState, useRef } from 'react';
import { PORTFOLIO_DATA as InitialData } from './constants';
import { ProjectCard } from './components/ProjectCard';
import { PortfolioData, Project, Skill, Experience, Education, CustomSection } from './types';

const App: React.FC = () => {
  const [data, setData] = useState<PortfolioData>(InitialData);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  
  const [uploadTarget, setUploadTarget] = useState<{ type: 'avatar' | 'project', id?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const updateData = (newData: PortfolioData) => {
    setData(newData);
    localStorage.setItem('portfolio_content', JSON.stringify(newData));
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAdmin(true);
      setIsLoginOpen(false);
      setPassword('');
    } else {
      alert("Invalid Access Code.");
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsEditMode(false);
  };

  const triggerImageUpload = (type: 'avatar' | 'project', id?: string) => {
    setUploadTarget({ type, id });
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && uploadTarget) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (uploadTarget.type === 'avatar') {
          updateData({ ...data, avatar: base64String });
        } else if (uploadTarget.type === 'project' && uploadTarget.id) {
          updateData({
            ...data,
            projects: data.projects.map(p => p.id === uploadTarget.id ? { ...p, image: base64String } : p)
          });
        }
        setUploadTarget(null);
      };
      reader.readAsDataURL(file);
    }
  };

  // --- List Management ---
  const addProject = () => {
    const newProject: Project = {
      id: `PROJ-${Date.now()}`,
      title: "New Project",
      description: "Brief summary.",
      longDescription: "",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800",
      tags: ["New"],
      links: { github: "#" }
    };
    updateData({ ...data, projects: [newProject, ...data.projects] });
  };

  const addSkill = () => {
    const newSkill: Skill = { 
      name: "New Skill", 
      level: 80, 
      category: "Tools", 
      icon: "fa-solid fa-cube" 
    };
    updateData({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (index: number, updates: Partial<Skill>) => {
    const newSkills = [...data.skills];
    newSkills[index] = { ...newSkills[index], ...updates };
    updateData({ ...data, skills: newSkills });
  };

  const removeSkill = (index: number) => {
    updateData({ ...data, skills: data.skills.filter((_, i) => i !== index) });
  };

  const addExperience = () => {
    const newExp: Experience = { company: "New Co", role: "Role", period: "202X-Present", description: ["Task..."] };
    updateData({ ...data, experience: [newExp, ...data.experience] });
  };

  const addEducation = () => {
    const newEdu: Education = { institution: "University", degree: "Degree Name", period: "Year-Year", description: ["Achievement..."] };
    updateData({ ...data, education: [newEdu, ...data.education] });
  };

  const addCustomSection = () => {
    const newSection: CustomSection = {
      id: `SEC-${Date.now()}`,
      title: "New Section",
      tagline: "SEC // 0X",
      accent: 'emerald',
      items: [
        { id: '1', title: 'New Entry', subtitle: 'Subtitle', period: '202X', content: ['Key achievement or detail...'] }
      ]
    };
    updateData({ ...data, customSections: [...data.customSections, newSection] });
  };

  const removeCustomSection = (id: string) => {
    updateData({ ...data, customSections: data.customSections.filter(s => s.id !== id) });
  };

  // Handle name parts for staggered layout
  const nameParts = data.name.split(' ');
  const firstName = nameParts[0] || "";
  const lastName = nameParts.slice(1).join(' ') || "";

  // Dynamic Scale Style for the massive name
  const dynamicNameStyle = {
    fontSize: `clamp(4rem, ${(data.nameScale || 1) * 11}vw, ${(data.nameScale || 1) * 15}rem)`,
    lineHeight: '0.8'
  };

  return (
    <div className="min-h-screen selection:bg-cyan-500 selection:text-black">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

      {/* Floating Capsule Nav */}
      <nav className="fixed top-6 md:top-10 left-0 right-0 z-[90] pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="liquid-glass h-12 md:h-14 rounded-full px-8 md:px-12 flex items-center justify-between pointer-events-auto border-white/20 shadow-2xl">
            <div className="hidden lg:flex gap-10 text-[7px] font-black uppercase tracking-[0.4em] text-white/40 w-1/3">
              <a href="#about" className="hover:text-cyan-400 transition-all">Origin</a>
              <a href="#projects" className="hover:text-cyan-400 transition-all">Work</a>
              <a href="#skills" className="hover:text-cyan-400 transition-all">Skills</a>
            </div>
            <div className="flex items-center justify-center flex-1">
              <span className="font-black tracking-[0.08em] text-[10px] md:text-xs uppercase text-white/90 nav-logo">
                {isEditMode ? (
                  <input value={data.name} onChange={(e) => updateData({...data, name: e.target.value.toUpperCase()})} className="bg-transparent border-b border-cyan-500/40 focus:outline-none text-center" />
                ) : data.name}
              </span>
            </div>
            <div className="hidden lg:flex items-center justify-end gap-10 text-[7px] font-black uppercase tracking-[0.4em] text-white/40 w-1/3">
              <a href="#experience" className="hover:text-cyan-400 transition-all">Log</a>
              <a href="#education" className="hover:text-fuchsia-400 transition-all">Academia</a>
            </div>
          </div>
        </div>
      </nav>

      {isAdmin && (
        <div className="fixed top-32 right-10 z-[100] flex flex-col gap-4">
           <div className="liquid-glass p-6 rounded-[2.5rem] border-white/10 flex flex-col gap-3 shadow-2xl min-w-[240px]">
             <span className="text-[9px] font-black uppercase tracking-widest text-white/30 mb-2 px-2">Control Node</span>
             <button onClick={() => setIsEditMode(!isEditMode)} className={`px-8 py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] transition-all ${isEditMode ? 'bg-fuchsia-600 text-white' : 'bg-white/5 text-cyan-400 border border-cyan-400/50'}`}>
               {isEditMode ? 'Exit Build Mode' : 'Enter Build Mode'}
             </button>
             
             {isEditMode && (
               <div className="flex flex-col gap-3 mt-2 px-2">
                 <div className="flex flex-col gap-2">
                   <div className="flex justify-between items-center text-[8px] font-black uppercase tracking-widest text-white/40">
                     <span>Name Scale</span>
                     <span>{Math.round((data.nameScale || 1) * 100)}%</span>
                   </div>
                   <input 
                    type="range" 
                    min="0.4" 
                    max="1.6" 
                    step="0.05"
                    value={data.nameScale || 1}
                    onChange={(e) => updateData({...data, nameScale: parseFloat(e.target.value)})}
                    className="w-full h-1 bg-white/10 rounded-full accent-cyan-400"
                   />
                 </div>
                 <button onClick={addCustomSection} className="px-8 py-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-cyan-500/20 transition-all mt-2">
                   + Add New Section
                 </button>
               </div>
             )}
             
             <button onClick={handleLogout} className="px-8 py-3 rounded-2xl bg-white/5 text-white/40 border border-white/10 font-black text-[10px] uppercase tracking-[0.3em] mt-4">Lock System</button>
           </div>
        </div>
      )}

      <main className="max-w-[1400px] mx-auto px-6 md:px-10 pt-32 md:pt-48 pb-20">
        
        {/* --- ABOUT --- */}
        <section id="about" className="mb-48 md:mb-64 relative min-h-[70vh] flex flex-col justify-center">
          {/* Background Layer: Profile Photo */}
          <div className="lg:absolute lg:right-0 lg:top-1/2 lg:-translate-y-1/2 w-full lg:w-2/5 flex justify-center lg:justify-end z-0">
            <div className="relative w-full max-w-[420px] lg:max-w-[550px] aspect-square lg:aspect-[4/5] xl:aspect-square">
              <div 
                onClick={() => isEditMode && triggerImageUpload('avatar')} 
                className={`relative w-full h-full rounded-[4rem] overflow-hidden group shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)] border border-white/10 ${isEditMode ? 'cursor-pointer ring-4 ring-cyan-500' : ''}`}
              >
                {isEditMode && <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/60 backdrop-blur-md text-white font-black text-[10px] text-center p-4 uppercase tracking-widest">Update Photo</div>}
                <img src={data.avatar} className="w-full h-full object-cover grayscale-[0.2] transition-all duration-1000" alt={data.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/10 to-transparent lg:hidden"></div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 liquid-glass rounded-full border-white/10 -z-10 animate-pulse hidden lg:block opacity-30"></div>
            </div>
          </div>

          {/* Foreground Layer: Text Content */}
          <div className="relative z-10 pointer-events-none lg:w-full">
            <div className="pointer-events-auto">
              <div className="inline-flex px-8 py-3 rounded-full liquid-glass mb-10 text-[11px] font-black text-cyan-400 border-cyan-400/30 tracking-[0.3em] uppercase shadow-[0_0_20px_rgba(34,211,238,0.2)]">
                {isEditMode ? (
                  <input 
                    value={data.role} 
                    onChange={(e) => updateData({...data, role: e.target.value})} 
                    className="bg-transparent border-b border-cyan-500/40 focus:outline-none w-full" 
                    placeholder="ENTER ROLE"
                  />
                ) : data.role}
              </div>

              {/* Huge Typography Overlay */}
              <div className="mb-16">
                {isEditMode ? (
                  <div className="flex flex-col gap-4">
                    <input 
                      value={firstName}
                      onChange={(e) => {
                        const newName = `${e.target.value.toUpperCase()} ${lastName}`;
                        updateData({...data, name: newName.trim()});
                      }}
                      style={dynamicNameStyle}
                      className="font-extrabold uppercase tracking-tighter bg-transparent border-b-4 border-cyan-500/20 focus:outline-none focus:border-cyan-400 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 w-full drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
                      placeholder="FIRST"
                    />
                    <input 
                      value={lastName}
                      onChange={(e) => {
                        const newName = `${firstName} ${e.target.value.toUpperCase()}`;
                        updateData({...data, name: newName.trim()});
                      }}
                      style={dynamicNameStyle}
                      className="font-extrabold uppercase tracking-tighter bg-transparent border-b-4 border-fuchsia-500/20 focus:outline-none focus:border-fuchsia-400 text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-fuchsia-300 to-cyan-400 w-full lg:ml-32 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]"
                      placeholder="LAST"
                    />
                  </div>
                ) : (
                  <h1 className="font-extrabold uppercase tracking-tighter" style={dynamicNameStyle}>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-fuchsia-400 block drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                      {firstName}
                    </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 via-fuchsia-300 to-cyan-400 block lg:-mt-12 lg:ml-32 drop-shadow-[0_20px_50px_rgba(0,0,0,1)]">
                      {lastName}
                    </span>
                  </h1>
                )}
              </div>
              
              <div className="max-w-xl lg:max-w-2xl bg-black/40 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none p-8 lg:p-0 rounded-[3rem] border border-white/10 lg:border-none">
                <div className="text-2xl md:text-3xl text-white font-bold mb-8 uppercase tracking-tight leading-none">
                  {isEditMode ? <textarea value={data.bio} onChange={(e) => updateData({...data, bio: e.target.value})} className="bg-white/5 w-full p-4 rounded-2xl" /> : data.bio}
                </div>
                <div className="text-lg md:text-xl text-white/50 leading-relaxed font-medium mb-12">
                  {isEditMode ? <textarea value={data.fullBio} onChange={(e) => updateData({...data, fullBio: e.target.value})} className="bg-white/5 w-full p-4 rounded-2xl h-48" /> : data.fullBio}
                </div>
                
                <div className="flex flex-wrap gap-10">
                  {Object.entries(data.socials).map(([key, val]) => (
                    <div key={key} className="flex flex-col gap-2 group">
                      <span className="text-[9px] font-black uppercase tracking-widest text-white/20 group-hover:text-cyan-400/50 transition-colors">{key}</span>
                      {isEditMode ? (
                        <input 
                          value={val}
                          onChange={(e) => updateData({ ...data, socials: { ...data.socials, [key]: e.target.value }})}
                          className="bg-transparent border-b border-cyan-500/30 text-xs text-cyan-400 focus:outline-none min-w-[150px]"
                          placeholder={`Your ${key} link`}
                        />
                      ) : (
                        <a href={val} target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-cyan-400 transition-all text-2xl">
                          <i className={`fa-brands fa-${key === 'email' ? 'google' : key} fa-${key === 'twitter' ? 'x-twitter' : key}`}></i>
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- PROJECTS --- */}
        <section id="projects" className="mb-64">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">STREAM // 01</span>
              <h2 className="text-6xl font-bold uppercase tracking-tighter">Artifacts</h2>
            </div>
            {isEditMode && <button onClick={addProject} className="px-8 py-4 bg-cyan-500 text-black font-black text-xs uppercase tracking-widest rounded-full">+ Inject Project</button>}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {data.projects.map(p => (
              <ProjectCard key={p.id} project={p} isEditMode={isEditMode} onUpdate={(upd) => updateData({...data, projects: data.projects.map(pj => pj.id === p.id ? {...pj, ...upd} : pj)})} onDelete={() => updateData({...data, projects: data.projects.filter(pj => pj.id !== p.id)})} onImageUpload={() => triggerImageUpload('project', p.id)} />
            ))}
          </div>
        </section>

        {/* --- SKILLS --- */}
        <section id="skills" className="mb-64">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">CORE // 02</span>
              <h2 className="text-6xl font-bold uppercase tracking-tighter">Skills Matrix</h2>
            </div>
            {isEditMode && <button onClick={addSkill} className="px-8 py-4 liquid-glass text-cyan-400 border-cyan-400/50 font-black text-xs uppercase tracking-widest rounded-full">+ Add Skill</button>}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.skills.map((skill, idx) => (
              <div key={idx} className="liquid-glass p-8 rounded-[2.5rem] border-white/5 relative group transition-all hover:border-cyan-400/30">
                {isEditMode && (
                  <button onClick={() => removeSkill(idx)} className="absolute top-4 right-4 text-fuchsia-500 hover:scale-110 transition-transform">
                    <i className="fa-solid fa-circle-xmark"></i>
                  </button>
                )}
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-cyan-400/30 transition-colors">
                    {isEditMode ? (
                      <input 
                        value={skill.icon} 
                        onChange={(e) => updateSkill(idx, { icon: e.target.value })}
                        className="bg-transparent text-[8px] w-full text-center focus:outline-none font-mono"
                        placeholder="fa-solid fa-code"
                      />
                    ) : (
                      <i className={`${skill.icon} text-cyan-400 text-xl`}></i>
                    )}
                  </div>
                  <div className="flex-1">
                    {isEditMode ? (
                      <input 
                        value={skill.name} 
                        onChange={(e) => updateSkill(idx, { name: e.target.value })}
                        className="bg-transparent border-b border-white/10 w-full text-sm font-bold uppercase tracking-widest focus:outline-none"
                      />
                    ) : (
                      <span className="text-sm font-bold uppercase tracking-widest block">{skill.name}</span>
                    )}
                    {isEditMode ? (
                      <select 
                        value={skill.category}
                        onChange={(e) => updateSkill(idx, { category: e.target.value as any })}
                        className="bg-transparent text-[8px] text-white/30 uppercase font-black tracking-widest mt-1 focus:outline-none"
                      >
                        <option value="Frontend">Frontend</option>
                        <option value="Backend">Backend</option>
                        <option value="DevOps">DevOps</option>
                        <option value="AI/ML">AI/ML</option>
                        <option value="Tools">Tools</option>
                      </select>
                    ) : (
                      <span className="text-[8px] text-white/30 uppercase font-black tracking-widest mt-1 block">{skill.category}</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-white/40">
                    <span>Proficiency</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10">
                    <div 
                      className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-400 rounded-full transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  {isEditMode && (
                    <input 
                      type="range" 
                      min="1" 
                      max="100" 
                      value={skill.level}
                      onChange={(e) => updateSkill(idx, { level: parseInt(e.target.value) })}
                      className="w-full accent-cyan-400 h-1 bg-white/10 rounded-full mt-2"
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- EXPERIENCE --- */}
        <section id="experience" className="mb-64">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="text-cyan-400 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">LOG // 03</span>
              <h2 className="text-6xl font-bold uppercase tracking-tighter">Professional Log</h2>
            </div>
            {isEditMode && <button onClick={addExperience} className="px-8 py-4 liquid-glass text-cyan-400 border-cyan-400/50 font-black text-xs uppercase tracking-widest rounded-full">+ Add Experience</button>}
          </div>
          <div className="space-y-8">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="liquid-glass p-12 rounded-[4rem] border-white/5 group relative transition-all hover:border-cyan-400/30">
                {isEditMode && <button onClick={() => updateData({...data, experience: data.experience.filter((_, i) => i !== idx)})} className="absolute top-10 right-10 text-fuchsia-500 text-[10px] font-black uppercase tracking-widest">Purge</button>}
                <div className="grid lg:grid-cols-[300px_1fr] gap-12">
                  <div>
                    <span className="text-cyan-400 font-bold text-[10px] tracking-widest uppercase mb-4 block">{isEditMode ? <input value={exp.period} onChange={(e) => { const ne = [...data.experience]; ne[idx].period = e.target.value; updateData({...data, experience: ne}); }} className="bg-transparent border-b border-white/10" /> : exp.period}</span>
                    <h3 className="text-4xl font-bold uppercase tracking-tighter">{isEditMode ? <input value={exp.company} onChange={(e) => { const ne = [...data.experience]; ne[idx].company = e.target.value; updateData({...data, experience: ne}); }} className="bg-transparent border-b border-white/10 w-full" /> : exp.company}</h3>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-4"><span className="h-px w-8 bg-cyan-500"></span>{isEditMode ? <input value={exp.role} onChange={(e) => { const ne = [...data.experience]; ne[idx].role = e.target.value; updateData({...data, experience: ne}); }} className="bg-transparent border-b border-white/10 w-full" /> : exp.role}</h4>
                    <ul className="space-y-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-white/50 text-lg flex items-start gap-4">
                          <i className="fa-solid fa-circle text-cyan-500 mt-2.5 text-[6px]"></i>
                          {isEditMode ? <textarea value={item} onChange={(e) => { const ne = [...data.experience]; ne[idx].description[i] = e.target.value; updateData({...data, experience: ne}); }} className="bg-white/5 w-full p-2 rounded-lg" /> : item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- EDUCATION --- */}
        <section id="education" className="mb-64">
          <div className="flex justify-between items-end mb-24">
            <div>
              <span className="text-fuchsia-400 font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">EDU // 04</span>
              <h2 className="text-6xl font-bold uppercase tracking-tighter">Academic Foundation</h2>
            </div>
            {isEditMode && <button onClick={addEducation} className="px-8 py-4 liquid-glass text-fuchsia-400 border-fuchsia-400/50 font-black text-xs uppercase tracking-widest rounded-full">+ Add Academic Node</button>}
          </div>
          <div className="space-y-8">
            {data.education.map((edu, idx) => (
              <div key={idx} className="liquid-glass p-12 rounded-[4rem] border-white/5 group relative transition-all hover:border-fuchsia-400/30">
                {isEditMode && <button onClick={() => updateData({...data, education: data.education.filter((_, i) => i !== idx)})} className="absolute top-10 right-10 text-fuchsia-500 text-[10px] font-black uppercase tracking-widest">Purge</button>}
                <div className="grid lg:grid-cols-[300px_1fr] gap-12">
                  <div>
                    <span className="text-fuchsia-400 font-bold text-[10px] tracking-widest uppercase mb-4 block">{isEditMode ? <input value={edu.period} onChange={(e) => { const ne = [...data.education]; ne[idx].period = e.target.value; updateData({...data, education: ne}); }} className="bg-transparent border-b border-white/10" /> : edu.period}</span>
                    <h3 className="text-4xl font-bold uppercase tracking-tighter">{isEditMode ? <input value={edu.institution} onChange={(e) => { const ne = [...data.education]; ne[idx].institution = e.target.value; updateData({...data, education: ne}); }} className="bg-transparent border-b border-white/10 w-full" /> : edu.institution}</h3>
                  </div>
                  <div>
                    <h4 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-4"><span className="h-px w-8 bg-fuchsia-400"></span>{isEditMode ? <input value={edu.degree} onChange={(e) => { const ne = [...data.education]; ne[idx].degree = e.target.value; updateData({...data, education: ne}); }} className="bg-transparent border-b border-white/10 w-full" /> : edu.degree}</h4>
                    <ul className="space-y-4">
                      {edu.description.map((item, i) => (
                        <li key={i} className="text-white/50 text-lg flex items-start gap-4">
                          <i className="fa-solid fa-graduation-cap text-fuchsia-400 mt-1.5 text-xs"></i>
                          {isEditMode ? <textarea value={item} onChange={(e) => { const ne = [...data.education]; ne[idx].description[i] = e.target.value; updateData({...data, education: ne}); }} className="bg-white/5 w-full p-2 rounded-lg" /> : item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- DYNAMIC CUSTOM SECTIONS --- */}
        {data.customSections.map((section, sIdx) => {
          const accentClass = section.accent === 'fuchsia' ? 'text-fuchsia-400' : section.accent === 'emerald' ? 'text-emerald-400' : 'text-cyan-400';
          const bgAccentClass = section.accent === 'fuchsia' ? 'bg-fuchsia-400' : section.accent === 'emerald' ? 'bg-emerald-400' : 'bg-cyan-400';
          const borderAccentClass = section.accent === 'fuchsia' ? 'border-fuchsia-400/50' : section.accent === 'emerald' ? 'border-emerald-400/50' : 'border-cyan-400/50';
          const hoverBorderClass = section.accent === 'fuchsia' ? 'hover:border-fuchsia-400/30' : section.accent === 'emerald' ? 'hover:border-emerald-400/30' : 'hover:border-cyan-400/30';

          return (
            <section key={section.id} id={section.id} className="mb-64 animate-in fade-in slide-in-from-bottom-10">
              <div className="flex justify-between items-end mb-24">
                <div>
                  <span className={`${accentClass} font-black uppercase tracking-[0.5em] text-[10px] mb-4 block`}>
                    {isEditMode ? (
                      <input 
                        value={section.tagline} 
                        onChange={(e) => {
                          const newSecs = [...data.customSections];
                          newSecs[sIdx].tagline = e.target.value;
                          updateData({...data, customSections: newSecs});
                        }}
                        className="bg-transparent border-b border-white/10 focus:outline-none"
                      />
                    ) : section.tagline}
                  </span>
                  <h2 className="text-6xl font-bold uppercase tracking-tighter">
                    {isEditMode ? (
                      <input 
                        value={section.title} 
                        onChange={(e) => {
                          const newSecs = [...data.customSections];
                          newSecs[sIdx].title = e.target.value;
                          updateData({...data, customSections: newSecs});
                        }}
                        className="bg-transparent border-b border-white/10 focus:outline-none w-full"
                      />
                    ) : section.title}
                  </h2>
                </div>
                {isEditMode && (
                  <div className="flex gap-4 items-center">
                    <select 
                      value={section.accent}
                      onChange={(e) => {
                        const newSecs = [...data.customSections];
                        newSecs[sIdx].accent = e.target.value as any;
                        updateData({...data, customSections: newSecs});
                      }}
                      className="bg-white/5 text-white/40 text-[10px] uppercase font-bold px-4 py-2 rounded-full border border-white/10 focus:outline-none"
                    >
                      <option value="cyan">Cyan</option>
                      <option value="fuchsia">Fuchsia</option>
                      <option value="emerald">Emerald</option>
                    </select>
                    <button 
                      onClick={() => {
                        const newSecs = [...data.customSections];
                        newSecs[sIdx].items.push({ id: Date.now().toString(), title: 'New Entry', subtitle: 'Subtitle', period: '202X', content: ['Detail...'] });
                        updateData({...data, customSections: newSecs});
                      }}
                      className={`px-8 py-4 liquid-glass ${accentClass} ${borderAccentClass} font-black text-xs uppercase tracking-widest rounded-full`}
                    >
                      + Add Item
                    </button>
                    <button 
                      onClick={() => removeCustomSection(section.id)}
                      className="px-6 py-4 bg-fuchsia-600/20 text-fuchsia-400 border border-fuchsia-400/30 font-black text-xs uppercase tracking-widest rounded-full"
                    >
                      Delete Section
                    </button>
                  </div>
                )}
              </div>
              <div className="space-y-8">
                {section.items.map((item, iIdx) => (
                  <div key={item.id} className={`liquid-glass p-12 rounded-[4rem] border-white/5 group relative transition-all ${hoverBorderClass}`}>
                    {isEditMode && (
                      <button 
                        onClick={() => {
                          const newSecs = [...data.customSections];
                          newSecs[sIdx].items = newSecs[sIdx].items.filter((_, idx) => idx !== iIdx);
                          updateData({...data, customSections: newSecs});
                        }} 
                        className="absolute top-10 right-10 text-fuchsia-500 text-[10px] font-black uppercase tracking-widest"
                      >
                        Remove Entry
                      </button>
                    )}
                    <div className="grid lg:grid-cols-[300px_1fr] gap-12">
                      <div>
                        <span className={`${accentClass} font-bold text-[10px] tracking-widest uppercase mb-4 block`}>
                          {isEditMode ? (
                            <input 
                              value={item.period} 
                              onChange={(e) => {
                                const newSecs = [...data.customSections];
                                newSecs[sIdx].items[iIdx].period = e.target.value;
                                updateData({...data, customSections: newSecs});
                              }}
                              className="bg-transparent border-b border-white/10"
                            />
                          ) : item.period}
                        </span>
                        <h3 className="text-4xl font-bold uppercase tracking-tighter">
                          {isEditMode ? (
                            <input 
                              value={item.title} 
                              onChange={(e) => {
                                const newSecs = [...data.customSections];
                                newSecs[sIdx].items[iIdx].title = e.target.value;
                                updateData({...data, customSections: newSecs});
                              }}
                              className="bg-transparent border-b border-white/10 w-full"
                            />
                          ) : item.title}
                        </h3>
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold text-white/90 mb-6 flex items-center gap-4">
                          <span className={`h-px w-8 ${bgAccentClass}`}></span>
                          {isEditMode ? (
                            <input 
                              value={item.subtitle} 
                              onChange={(e) => {
                                const newSecs = [...data.customSections];
                                newSecs[sIdx].items[iIdx].subtitle = e.target.value;
                                updateData({...data, customSections: newSecs});
                              }}
                              className="bg-transparent border-b border-white/10 w-full"
                            />
                          ) : item.subtitle}
                        </h4>
                        <ul className="space-y-4">
                          {item.content.map((point, pIdx) => (
                            <li key={pIdx} className="text-white/50 text-lg flex items-start gap-4">
                              <i className={`fa-solid fa-chevron-right ${accentClass} mt-2 text-[10px]`}></i>
                              {isEditMode ? (
                                <div className="flex-1 flex gap-2">
                                  <textarea 
                                    value={point} 
                                    onChange={(e) => {
                                      const newSecs = [...data.customSections];
                                      newSecs[sIdx].items[iIdx].content[pIdx] = e.target.value;
                                      updateData({...data, customSections: newSecs});
                                    }}
                                    className="bg-white/5 w-full p-2 rounded-lg text-white"
                                  />
                                  <button 
                                    onClick={() => {
                                      const newSecs = [...data.customSections];
                                      newSecs[sIdx].items[iIdx].content = newSecs[sIdx].items[iIdx].content.filter((_, idx) => idx !== pIdx);
                                      updateData({...data, customSections: newSecs});
                                    }}
                                    className="text-fuchsia-500 text-xs"
                                  ><i className="fa-solid fa-trash"></i></button>
                                </div>
                              ) : point}
                            </li>
                          ))}
                          {isEditMode && (
                            <button 
                              onClick={() => {
                                const newSecs = [...data.customSections];
                                newSecs[sIdx].items[iIdx].content.push("New point...");
                                updateData({...data, customSections: newSecs});
                              }}
                              className={`text-[10px] font-black uppercase tracking-widest ${accentClass} mt-4`}
                            >
                              + Add Detail Point
                            </button>
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          );
        })}

      </main>

      <footer className="py-20 px-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
        <div className="max-w-[1400px] mx-auto grid md:grid-cols-3 gap-16 items-center">
          <div className="flex flex-col gap-4">
            <span className="text-xl font-black tracking-tighter uppercase nav-logo">{data.name}</span>
            {!isAdmin && <button onClick={() => setIsLoginOpen(true)} className="text-white/10 hover:text-cyan-500 text-left text-[10px] uppercase tracking-widest"><i className="fa-solid fa-terminal mr-2"></i>Admin Node</button>}
          </div>
          <div className="flex justify-center">
             <div className="w-16 h-16 rounded-full liquid-glass border-white/10 flex items-center justify-center"><div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping"></div></div>
          </div>
          <div className="flex flex-col md:items-end gap-4 text-white/20 font-black text-[9px] uppercase tracking-[0.4em]">
            <span>System_v1.9_Stable</span>
          </div>
        </div>
      </footer>

      {isLoginOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/80 backdrop-blur-xl animate-in fade-in">
          <div className="w-full max-w-md liquid-glass p-12 rounded-[3.5rem] relative">
            <button onClick={() => setIsLoginOpen(false)} className="absolute top-10 right-10 text-white/30 hover:text-white transition-colors"><i className="fa-solid fa-xmark text-xl"></i></button>
            <h3 className="text-3xl font-black mb-10 uppercase tracking-tighter text-center">Initialize Admin</h3>
            <form onSubmit={handleLogin} className="space-y-8 text-center">
              <input type="password" autoFocus value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-2xl px-8 py-5 focus:outline-none text-white font-bold text-center tracking-[1em]" placeholder="••••" />
              <button type="submit" className="w-full py-5 bg-white text-black font-black rounded-2xl hover:bg-cyan-400 uppercase text-xs">Confirm Access</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
