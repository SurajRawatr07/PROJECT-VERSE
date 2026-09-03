import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileText,
  Award,
  BookOpen,
  ArrowUpRight,
  Filter,
  Eye,
  MessageSquare
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

  // Rubric averages
  const rubricMetrics = [
    { label: 'Technical Depth & Architecture', score: '9.4', max: '10', trend: '+0.6 vs last batch' },
    { label: 'Implementation Quality & Git Commits', score: '8.8', max: '10', trend: '+1.2 vs last batch' },
    { label: 'Documentation & Reproducibility', score: '8.2', max: '10', trend: '+0.3 vs last batch' },
    { label: 'Innovation & Research Synergy', score: '9.1', max: '10', trend: '+0.8 vs last batch' }
  ];

  // Domain breakdown
  const domainCounts: Record<string, number> = {};
  projects.forEach((p) => {
    domainCounts[p.domain] = (domainCounts[p.domain] || 0) + 1;
  });

  const domains = Object.keys(domainCounts);

  const filteredProjects = selectedDomainFilter === 'ALL'
    ? projects
    : projects.filter((p) => p.domain === selectedDomainFilter);

  return (
    <div className="space-y-6">
      {/* Rubric Evaluation Benchmarks */}
      <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#111111]" />
              <h3 className="text-sm font-semibold text-[#111111]">Capstone Rubric Benchmarking</h3>
            </div>
            <p className="text-xs text-[#737373] mt-0.5">Aggregated faculty evaluations across NAAC Criterion 2.6.2 learning outcomes.</p>
          </div>
          <span className="text-[11px] font-mono-code px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
            Academic Performance Index: 9.1 / 10
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rubricMetrics.map((rubric, idx) => (
            <div key={idx} className="p-4 rounded-xl bg-[#FBFBFA] border border-black/6">
              <span className="text-[11px] font-mono-code text-[#737373] line-clamp-1">{rubric.label}</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-[#111111]">{rubric.score}</span>
                <span className="text-xs text-[#737373]">/{rubric.max}</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-medium mt-1 block">{rubric.trend}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Domain Distribution & Feedback Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Domain Distribution */}
        <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs lg:col-span-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#111111]" />
                <h3 className="text-sm font-semibold text-[#111111]">Domain Concentrations</h3>
              </div>
              <span className="text-[10px] font-mono-code text-[#737373]">{domains.length} Clusters</span>
            </div>

            <div className="space-y-3">
              {domains.map((dom) => {
                const count = domainCounts[dom];
                const percentage = Math.round((count / projects.length) * 100);
                return (
                  <div key={dom} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-[#111111]">{dom}</span>
                      <span className="text-[#737373] font-mono-code">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-[#F5F5F3] h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-[#111111] h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-black/8 text-[11px] text-[#737373] flex items-center justify-between">
            <span>Interdisciplinary Synergy</span>
            <span className="font-mono-code text-emerald-700 font-semibold">High (78%)</span>
          </div>
        </div>

        {/* Live Feedback Dispatches & Review History */}
        <div className="bg-white rounded-2xl p-6 border border-black/8 shadow-xs lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#111111]" />
              <h3 className="text-sm font-semibold text-[#111111]">Recent Feedback Logs Dispatched</h3>
            </div>
            <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-[#F7F7F5] border border-black/5 text-[#4A4A4A]">
              {feedbacks.length} Advices Recorded
            </span>
          </div>

          {feedbacks.length === 0 ? (
            <div className="p-8 text-center rounded-xl bg-[#FBFBFA] border border-dashed border-black/10">
              <p className="text-xs text-[#737373]">No faculty feedback issued yet. Use the "Feedback" button on any pending project in the review queue below.</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[220px] overflow-y-auto pr-1">
              {feedbacks.slice(0, 5).map((fb) => (
                <div key={fb.id} className="p-3.5 rounded-xl bg-[#FBFBFA] border border-black/6 flex items-start justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-[#111111]">{fb.projectTitle}</span>
                      <span className="text-[10px] font-mono-code text-[#737373]">
                        {new Date(fb.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-[#4A4A4A] line-clamp-2 italic">"{fb.message}"</p>
                  </div>
                  <span className={`text-[10px] font-mono-code px-2 py-0.5 rounded-full shrink-0 font-medium ${
                    fb.read ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'
                  }`}>
                    {fb.read ? 'Acknowledged' : 'Sent'}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
