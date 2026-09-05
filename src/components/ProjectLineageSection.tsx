import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  GitFork, 
  ArrowDown, 
  CheckCircle2, 
  Users, 
  ArrowRight 
} from 'lucide-react';
import { SAMPLE_PROJECTS } from '../data/mockData';

interface ProjectLineageSectionProps {
  onContinueProjectClick: (projectName: string) => void;
  selectedProjectId?: string;
}

export const ProjectLineageSection: React.FC<ProjectLineageSectionProps> = ({
  onContinueProjectClick,
  selectedProjectId
}) => {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(() => {
    if (selectedProjectId) {
      const idx = SAMPLE_PROJECTS.findIndex(p => p.id === selectedProjectId);
      return idx >= 0 ? idx : 0;
    }
    return 0;
  });

  const currentProject = SAMPLE_PROJECTS[selectedProjectIndex] || SAMPLE_PROJECTS[0];

  // Default clean 3-batch progression if lineage is sparse
  const timelineNodes = [
    {
      batch: 'Batch 2024',
      phase: 'Original Base',
      added: 'Initial system architecture, core algorithms, and foundational dataset collection.',
      contributors: ['Aditya Verma', 'Rhea Chakraborty'],
      status: 'Completed'
    },
    {
      batch: 'Batch 2025',
      phase: 'Feature Expansion',
      added: 'Distributed pipeline, web interface, real-time edge processing, and API endpoints.',
      contributors: ['Kavita Rao', 'Mohit Nair'],
      status: 'Verified & Active'
    },
    {
      batch: 'Batch 2026',
      phase: 'Performance & Scale',
      added: 'Benchmarking on edge hardware, production containerization, and peer review.',
      contributors: ['Incoming Capstone Batch'],
      status: 'Open for Continuity'
    }
  ];

  return (
    <section id="lineage" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 font-serif">
      <div className="max-w-4xl mx-auto">
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <h2 className="text-[26px] sm:text-[30px] md:text-[36px] font-bold text-[#111111] tracking-tight uppercase">
            Project Lineage
          </h2>
          <p className="text-[15px] sm:text-[16px] text-[#4A4A4A] mt-2 tracking-wide">
            See how projects evolve across batches.
          </p>
        </div>

        {/* Project Selector Chips */}
        <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
          {SAMPLE_PROJECTS.slice(0, 4).map((p, idx) => (
            <button
              key={p.id}
              onClick={() => setSelectedProjectIndex(idx)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-serif transition-all cursor-pointer ${
                selectedProjectIndex === idx
                  ? 'bg-[#111111] text-white font-medium shadow-xs'
                  : 'bg-[#F7F7F5] border border-black/8 text-[#4A4A4A] hover:text-[#111111] hover:bg-[#ECECE9]'
              }`}
            >
              {p.title.split(':')[0]}
            </button>
          ))}
        </div>

        {/* Selected Project Lineage Banner */}
        <div className="card-white p-6 sm:p-7 mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border border-black/8">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#737373] block mb-1">
              Active Lineage Track
            </span>
            <h3 className="text-[19px] sm:text-[21px] font-bold text-[#111111]">
              {currentProject.title}
            </h3>
            <p className="text-xs text-[#737373] mt-0.5">
              {currentProject.institution} • Multi-Batch Academic Continuity
            </p>
          </div>

          <button
            onClick={() => onContinueProjectClick(currentProject.title)}
            className="btn-primary-black px-5 py-2 rounded-full text-xs font-medium inline-flex items-center gap-1.5 cursor-pointer shadow-xs shrink-0"
          >
            <GitFork className="w-3.5 h-3.5 text-white" />
            <span>Continue This Project</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

        {/* Visual Timeline: Batch 2024 -> Batch 2025 -> Batch 2026 */}
        <div className="flex flex-col items-center space-y-4">
          {timelineNodes.map((node, idx) => (
            <React.Fragment key={node.batch}>
              {/* Timeline Card */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="w-full card-white p-6 border border-black/8 hover:border-black/20 transition-all duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-black/6 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] sm:text-[18px] font-bold text-[#111111]">
                      {node.batch}
                    </span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#F5F5F3] border border-black/6 text-[#4A4A4A] font-medium">
                      {node.phase}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-[#111111] font-medium">{node.status}</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block mb-1">
                      What Was Added
                    </span>
                    <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] leading-relaxed">
                      {node.added}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 pt-1 text-xs text-[#737373]">
                    <Users className="w-3.5 h-3.5 text-[#111111]" />
                    <span className="font-medium text-[#111111]">Contributors:</span>
                    <span>{node.contributors.join(', ')}</span>
                  </div>
                </div>
              </motion.div>

              {/* Arrow down connector */}
              {idx < timelineNodes.length - 1 && (
                <div className="flex items-center justify-center text-[#737373] py-1">
                  <div className="w-7 h-7 rounded-full bg-[#F5F5F3] border border-black/8 flex items-center justify-center">
                    <ArrowDown className="w-3.5 h-3.5 text-[#111111]" />
                  </div>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectLineageSection;
