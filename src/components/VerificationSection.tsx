import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShieldCheck, 
  GitPullRequest, 
  GraduationCap, 
  Building2, 
  FileCheck, 
  ArrowRight, 
  CheckCircle2, 
  Lock, 
  Terminal,
  FileCode,
  Sparkles
} from 'lucide-react';

export const VerificationSection: React.FC = () => {
  const [activeTier, setActiveTier] = useState(0);

  const tiers = [
    {
      id: 'step-1',
      stage: '01',
      title: 'Student Submission',
      subtitle: 'Structured Project Metadata',
      icon: FileCode,
      desc: 'Students submit project architecture diagrams, technical specs, member contribution claims, and target problem statements into the ecosystem registry.',
      details: [
        'Structured rubric mapping',
        'Direct repository linking',
        'Team member role assignments',
        'Academic course / capstone context'
      ],
      auditOutput: 'CHECK_METADATA: PASSED [Schema v2.4 Validated]'
    },
    {
      id: 'step-2',
      stage: '02',
      title: 'GitHub Evidence',
      subtitle: 'Line-by-Line Git Telemetry',
      icon: GitPullRequest,
      desc: 'Automated CI bots audit git history, commit frequency, merged pull requests, test coverage reports, and code author attribution to eliminate ghost contributors.',
      details: [
        'Deterministic commit signing checks',
        'Automated test suite execution (CI/CD)',
        'Static analysis & code health scoring',
        'Blame attribution per team member'
      ],
      auditOutput: 'GIT_TELEMETRY: 840 Commits, 98% Health, 0 Tampering'
    },
    {
      id: 'step-3',
      stage: '03',
      title: 'Faculty Review',
      subtitle: 'Qualitative Academic Evaluation',
      icon: GraduationCap,
      desc: 'Assigned faculty mentors grade novelty, theoretical rigor, implementation depth, and documentation quality using standardized university rubrics.',
      details: [
        'Independent professor peer assessment',
        'Live hardware & simulation demo signoff',
        'Plagiarism & literature novelty check',
        'Cryptographic faculty signature hash'
      ],
      auditOutput: 'FACULTY_SIGN: Dr. S. Anand (Score 9.6/10) [SIG-VERIFIED]'
    },
    {
      id: 'step-4',
      stage: '04',
      title: 'Institution Validation',
      subtitle: 'Dean / Departmental Attestation',
      icon: Building2,
      desc: 'University academic cell or department chair certifies that the project fulfills institutional capstone criteria and grants permanent lineage rights.',
      details: [
        'Official institutional ledger registration',
        'Inter-university transfer authorization',
        'Archival in national research index',
        'Accreditation compliance token'
      ],
      auditOutput: 'INST_AUTH: IITB-DEAN-ACAD-2025-99218 [STAMPED]'
    },
    {
      id: 'step-5',
      stage: '05',
      title: 'Verified Project Passport',
      subtitle: 'Public Immutable Proof-of-Work',
      icon: ShieldCheck,
      desc: 'The project receives its immutable Project Passport ID with an exportable cryptographic record for career opportunities, grants, and next-batch inheritance.',
      details: [
        'Cryptographic QR & JSON-LD payload',
        'Exportable career proof-of-work certificate',
        'Lineage inheritance clearance for Batch \'26',
        'Permanent public link on ProjectVerse'
      ],
      auditOutput: 'STATUS: ISSUED [PASSPORT PV-2025-IITB-CS089]'
    }
  ];

  return (
    <section id="verification" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#040714] border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full liquid-glass text-xs font-mono-code text-indigo-300 mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>RIGOROUS MULTI-LAYER AUDIT PIPELINE</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal leading-[1.1]">
            Proof, Not Just Claims.
          </h2>
          <p className="text-slate-400 font-body text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Move beyond self-written resume bullet points. ProjectVerse validates engineering output through code telemetry and institutional faculty signoffs.
          </p>
        </div>

        {/* 5-Step Pipeline Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 mb-10">
          {tiers.map((tier, idx) => {
            const Icon = tier.icon;
            const isActive = activeTier === idx;
            return (
              <button
                key={tier.id}
                id={`verification-tier-${tier.id}`}
                onClick={() => setActiveTier(idx)}
                className={`p-4 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                  isActive
                    ? 'bg-indigo-950/40 border-indigo-400/60 shadow-lg shadow-indigo-500/10'
                    : 'liquid-glass border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-code text-xs text-slate-400">STAGE {tier.stage}</span>
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-400' : 'text-slate-400'}`} />
                  </div>
                  <h4 className="text-xs sm:text-sm font-bold text-white font-body">
                    {tier.title}
                  </h4>
                </div>
                <div className="mt-4 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Inspect</span>
                  <ArrowRight className="w-3 h-3 text-indigo-400" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Tier Interactive Detail Container */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTier}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="liquid-glass-elevated rounded-3xl p-6 sm:p-10 border border-white/15 shadow-2xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Description & Checklist */}
              <div className="lg:col-span-7 space-y-5">
                <div className="flex items-center gap-2.5">
                  <span className="px-2.5 py-1 rounded-md bg-indigo-500/20 text-indigo-300 font-mono-code text-xs font-bold border border-indigo-500/30">
                    STAGE {tiers[activeTier].stage} / 05
                  </span>
                  <span className="text-sm font-mono-code text-slate-400 uppercase">
                    {tiers[activeTier].subtitle}
                  </span>
                </div>

                <h3 className="font-display text-2xl sm:text-4xl text-white font-normal leading-tight">
                  {tiers[activeTier].title}
                </h3>

                <p className="text-slate-300 font-body text-sm sm:text-base leading-relaxed">
                  {tiers[activeTier].desc}
                </p>

                <div className="space-y-2.5 pt-2">
                  <span className="text-xs font-mono-code uppercase tracking-wider text-slate-400 block">
                    Verification Criteria Checked:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {tiers[activeTier].details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-2 text-xs text-slate-300 p-2 rounded-lg bg-white/5 border border-white/5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Simulated Verification Log Console */}
              <div className="lg:col-span-5 bg-black/60 rounded-2xl p-6 border border-white/10 font-mono-code text-xs text-slate-300 shadow-inner">
                <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/10 text-slate-500 text-[11px]">
                  <span className="flex items-center gap-1.5 text-slate-300">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400" />
                    VERIFICATION_NODE_AUDIT.SH
                  </span>
                  <span className="text-emerald-400 font-bold">200 OK</span>
                </div>

                <div className="space-y-2.5 text-slate-400 text-[11px] leading-relaxed">
                  <p><span className="text-indigo-400">&gt;</span> target: <span className="text-slate-200">PROJECTVERSE_NODE_IITB_01</span></p>
                  <p><span className="text-indigo-400">&gt;</span> phase: <span className="text-indigo-300">{tiers[activeTier].title}</span></p>
                  <p><span className="text-indigo-400">&gt;</span> cryptographic_proof: <span className="text-emerald-400">{tiers[activeTier].auditOutput}</span></p>
                  <p><span className="text-indigo-400">&gt;</span> timestamp: <span className="text-slate-300">2026-09-01T04:41:36Z</span></p>
                  <p><span className="text-indigo-400">&gt;</span> consensus_quorum: <span className="text-emerald-400">4/4 Institutional Validators Confirmed</span></p>
                </div>

                <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-400" />
                    SHA-256 Validated
                  </span>
                  <button
                    onClick={() => setActiveTier((prev) => (prev + 1) % tiers.length)}
                    className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
                  >
                    Next Stage <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};
