import React from 'react';
import { motion } from 'motion/react';
import { 
  GitBranch, 
  Star, 
  ShieldCheck, 
  Users, 
  ArrowUpRight, 
  ExternalLink, 
  Layers, 
  Clock, 
  CheckCircle2,
  Hourglass,
  Sparkles
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectCardProps {
  project: ProjectItem;
  onViewProject: (project: ProjectItem) => void;
  onJoinProject: (project: ProjectItem) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onViewProject,
  onJoinProject
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-3 h-3" />
            <span>Verified</span>
          </span>
        );
      case 'Seeking Next Batch':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
            <Hourglass className="w-3 h-3" />
            <span>Seeking Batch '26</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
            <Sparkles className="w-3 h-3" />
            <span>Active</span>
          </span>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="liquid-glass rounded-2xl p-6 sm:p-7 flex flex-col justify-between border border-white/10 hover:border-indigo-400/40 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group"
    >
      <div>
        {/* Top Header: Domain & Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <span className="text-[11px] font-mono-code uppercase tracking-wider text-slate-400 font-medium">
            {project.domain}
          </span>
          {getStatusBadge(project.status)}
        </div>

        {/* Project Title */}
        <h3 className="font-body text-lg sm:text-xl font-bold text-white group-hover:text-indigo-200 transition-colors leading-snug mb-2">
          {project.title}
        </h3>

        {/* Tagline / Subtitle */}
        <p className="text-slate-300 font-body text-xs sm:text-sm leading-relaxed mb-4 line-clamp-2">
          {project.tagline}
        </p>

        {/* Institution & Department */}
        <div className="flex items-center gap-2 text-xs text-slate-400 mb-5">
          <Layers className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
          <span className="truncate">{project.institution}</span>
        </div>

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.techStack.slice(0, 4).map((tech) => (
            <span
              key={tech}
              className="text-[11px] font-mono-code px-2 py-0.5 rounded-md bg-white/5 text-slate-300 border border-white/10"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 4 && (
            <span className="text-[11px] font-mono-code px-1.5 py-0.5 rounded-md bg-white/5 text-slate-400">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>

      {/* Card Footer: Telemetry, Contributors & Action Buttons */}
      <div className="pt-4 border-t border-white/10">
        <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono-code">
          {/* GitHub Activity */}
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1 text-slate-300">
              <Star className="w-3 h-3 text-amber-400" />
              {project.githubStars}
            </span>
            <span className="inline-flex items-center gap-1 text-slate-300">
              <GitBranch className="w-3 h-3 text-indigo-400" />
              {project.githubCommits} commits
            </span>
          </div>

          {/* Lineage Batches Count */}
          <span className="inline-flex items-center gap-1 text-indigo-300 text-[11px]">
            <Clock className="w-3 h-3" />
            {project.lineageBatchesCount} Batches
          </span>
        </div>

        {/* Contributors Row & Action Buttons */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center -space-x-2">
            {project.contributors.map((c, i) => (
              <img
                key={i}
                src={c.avatar}
                alt={c.name}
                referrerPolicy="no-referrer"
                title={`${c.name} (${c.institution})`}
                className="w-7 h-7 rounded-full border-2 border-[#040714] object-cover"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              id={`card-view-${project.id}`}
              onClick={() => onViewProject(project)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-all cursor-pointer"
            >
              View Passport
            </button>
            <button
              id={`card-join-${project.id}`}
              onClick={() => onJoinProject(project)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-950 bg-white hover:bg-slate-200 transition-all cursor-pointer inline-flex items-center gap-1 shadow-sm"
            >
              <span>Join</span>
              <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
