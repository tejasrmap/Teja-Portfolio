
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  isEditMode?: boolean;
  onUpdate?: (updates: Partial<Project>) => void;
  onDelete?: () => void;
  onImageUpload?: () => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  isEditMode = false, 
  onUpdate,
  onDelete,
  onImageUpload
}) => {
  const handleRedirect = () => {
    if (project.links.demo) {
      window.open(project.links.demo, '_blank', 'noopener,noreferrer');
    } else if (project.links.github) {
      window.open(project.links.github, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="group buoyant liquid-glass rounded-[3rem] overflow-hidden p-6 flex flex-col h-full specular-border relative transition-all duration-500 hover:border-cyan-500/20">
      {isEditMode && (
        <button 
          onClick={onDelete}
          className="absolute top-8 right-8 z-20 w-10 h-10 bg-fuchsia-600 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform active:scale-90"
          title="Remove Project"
        >
          <i className="fa-solid fa-trash-can"></i>
        </button>
      )}

      {/* Glossy Preview / Upload Zone */}
      <div 
        onClick={() => isEditMode && onImageUpload?.()}
        className={`aspect-video rounded-[2.5rem] overflow-hidden mb-8 relative shadow-inner ${isEditMode ? 'cursor-pointer' : ''}`}
      >
        <img 
          src={project.image} 
          alt={project.title} 
          className={`w-full h-full object-cover transition-all duration-1000 ${isEditMode ? 'grayscale-[0.5]' : 'group-hover:scale-110 group-hover:rotate-1'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60"></div>
        
        {isEditMode ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm opacity-100 transition-opacity p-4 text-center">
             <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center mb-4 border border-white/20">
               <i className="fa-solid fa-image text-cyan-400 text-xl"></i>
             </div>
             <span className="font-black text-[9px] uppercase tracking-[0.3em] text-white">Upload Screenshot</span>
             <span className="text-[7px] text-white/40 uppercase tracking-widest mt-2">Click to replace image</span>
          </div>
        ) : (
          <div className="absolute top-6 left-6 flex gap-3">
            <div className="px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-[10px] font-bold tracking-widest uppercase shadow-lg">
              {project.id}
            </div>
          </div>
        )}
      </div>

      <div className="px-4 flex flex-col flex-1">
        <h3 className="text-3xl font-extrabold mb-4 tracking-tight group-hover:text-cyan-400 transition-colors uppercase">
          {isEditMode ? (
            <input 
              value={project.title} 
              onChange={(e) => onUpdate?.({ title: e.target.value })}
              className="bg-transparent border-b border-cyan-500/20 w-full focus:outline-none text-cyan-400 font-extrabold uppercase"
              placeholder="Artifact Title"
            />
          ) : project.title}
        </h3>
        <p className="text-white/60 text-sm mb-8 leading-relaxed font-medium line-clamp-2">
          {isEditMode ? (
            <textarea 
              value={project.description} 
              onChange={(e) => onUpdate?.({ description: e.target.value })}
              className="bg-white/5 border border-cyan-500/20 w-full p-3 rounded-xl text-cyan-400 focus:outline-none text-xs h-20"
              placeholder="Brief summary of the build..."
            />
          ) : project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tags.map((tag, idx) => (
            <span key={idx} className="text-[10px] font-bold bg-white/5 text-white/80 px-4 py-1.5 rounded-full border border-white/10 uppercase tracking-widest flex items-center gap-2">
              {isEditMode ? (
                <>
                  <input 
                    value={tag} 
                    onChange={(e) => {
                      const newTags = [...project.tags];
                      newTags[idx] = e.target.value;
                      onUpdate?.({ tags: newTags });
                    }}
                    className="bg-transparent border-none focus:outline-none w-20 text-cyan-400"
                  />
                  <button 
                    onClick={() => {
                      const newTags = project.tags.filter((_, i) => i !== idx);
                      onUpdate?.({ tags: newTags });
                    }}
                    className="hover:text-fuchsia-500"
                  >
                    <i className="fa-solid fa-xmark text-[8px]"></i>
                  </button>
                </>
              ) : tag}
            </span>
          ))}
          {isEditMode && (
             <button 
              onClick={() => onUpdate?.({ tags: [...project.tags, "new"] })}
              className="text-[10px] font-bold bg-cyan-500/10 text-cyan-400 px-4 py-1.5 rounded-full border border-cyan-500/20 uppercase tracking-widest hover:bg-cyan-500/20"
             >
               + Tag
             </button>
          )}
        </div>

        <div className="mt-auto flex flex-col pt-8 border-t border-white/10 gap-4">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <i className="fa-brands fa-github text-white/40 text-lg"></i>
              {isEditMode ? (
                 <input 
                  value={project.links.github || ''} 
                  onChange={(e) => onUpdate?.({ links: { ...project.links, github: e.target.value } })}
                  className="bg-white/5 border border-cyan-500/20 text-[9px] text-cyan-400 focus:outline-none w-full px-2 py-1 rounded"
                  placeholder="GitHub Link (https://...)"
                 />
              ) : (
                <a href={project.links.github} target="_blank" rel="noreferrer" className="text-[10px] text-white/30 hover:text-white transition-colors uppercase tracking-widest font-black">Source Code</a>
              )}
            </div>
            {isEditMode && (
              <div className="flex items-center gap-3">
                <i className="fa-solid fa-link text-white/40 text-lg"></i>
                <input 
                  value={project.links.demo || ''} 
                  onChange={(e) => onUpdate?.({ links: { ...project.links, demo: e.target.value } })}
                  className="bg-white/5 border border-cyan-500/20 text-[9px] text-cyan-400 focus:outline-none w-full px-2 py-1 rounded"
                  placeholder="Demo Link (https://...)"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={handleRedirect}
              className="h-12 w-12 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all shadow-md active:scale-95 disabled:opacity-20 disabled:cursor-not-allowed"
              title="Visit Artifact"
              disabled={!project.links.demo && !project.links.github}
            >
              <i className="fa-solid fa-arrow-up-right-from-square text-xs"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
