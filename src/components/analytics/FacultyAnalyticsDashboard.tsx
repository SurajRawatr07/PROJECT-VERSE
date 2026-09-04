import React, { useState } from 'react';
import {
  BarChart3,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Eye,
  MessageSquare,
  FileCheck2,
  Users
} from 'lucide-react';
import { ProjectItem } from '../../types';
import { getAllFeedbacks } from '../../lib/feedbackService';

interface FacultyAnalyticsDashboardProps {
  projects: ProjectItem[];
  onSelectProject?: (project: ProjectItem) => void;
  onReviewProject?: (project: ProjectItem) => void;
}

export const FacultyAnalyticsDashboard: React.FC<FacultyAnalyticsDashboardProps> = ({
  projects,
  onSelectProject,
  onReviewProject
}) => {
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('ALL');
  const feedbacks = getAllFeedbacks();

  // Top Statistics matching user requirements
  const stats = [
    { label: 'Projects Under Review', value: '4', note: 'Awaiting rubric sign-off' },
    { label: 'Pending Verifications', value: '2', note: 'Institutional seal queue' },
    { label: 'Department Statistics', value: `${projects.length || 18}`, note: 'Active capstones' },
    { label: 'Feedback Requests', value: `${feedbacks.length || 5}`, note: 'Student queries' }
  ];

  const filteredProjects = selectedDomainFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.domain === selectedDomainFilter);

  return (
    <div className="space-y-6 font-serif">
      {/* Page Header */}
      <div className="border-b border-black/8 pb-4">
        <h1 className="text-[26px] sm:text-[32px] font-bold text-[#111111] uppercase tracking-tight">
          Faculty Dashboard
        </h1>
        <p className="text-[14px] sm:text-[15px] text-[#4A4A4A] mt-1">
          Evaluation and verification portal for academic advisors.
        </p>
      </div>

      {/* 4 Simple Stats with Clear Labels */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((st, idx) => (
          <div key={idx} className="card-white p-5 border border-black/8">
            <span className="text-xs font-bold text-[#737373] uppercase tracking-wider block">
              {st.label}
            </span>
            <p className="text-[32px] font-bold text-[#111111] leading-none my-2">
              {st.value}
            </p>
            <span className="text-xs text-[#737373]">
              {st.note}
            </span>
          </div>
        ))}
      </div>

      {/* Projects Under Review List */}
      <div className="card-white p-6 border border-black/8">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/6">
          <h2 className="text-[18px] font-bold text-[#111111]">
            Projects Under Review
          </h2>
          <span className="text-xs text-[#737373]">
            {filteredProjects.length} projects in queue
          </span>
        </div>

        <div className="space-y-3">
          {filteredProjects.slice(0, 4).map((p) => (
            <div
              key={p.id}
              className="p-4 rounded-xl bg-[#FBFBFA] border border-black/6 hover:border-black/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-black/5 text-[#4A4A4A] font-medium">
                    Batch {p.academicYear}
                  </span>
                  <span className="text-xs text-[#737373]">{p.institution}</span>
                </div>
                <h3 className="text-[16px] font-bold text-[#111111] mt-1">
                  {p.title}
                </h3>
                <p className="text-xs text-[#4A4A4A] line-clamp-1 mt-0.5">
                  {p.tagline || p.description}
                </p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
                {onReviewProject && (
                  <button
                    onClick={() => onReviewProject(p)}
                    className="btn-primary-black px-3.5 py-1.5 rounded-xl text-xs font-medium cursor-pointer"
                  >
                    Review Rubric
                  </button>
                )}
                {onSelectProject && (
                  <button
                    onClick={() => onSelectProject(p)}
                    className="px-3.5 py-1.5 rounded-xl bg-white border border-black/10 hover:bg-[#F5F5F3] text-xs font-medium text-[#111111] cursor-pointer"
                  >
                    View
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FacultyAnalyticsDashboard;
