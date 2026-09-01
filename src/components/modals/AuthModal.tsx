import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { UserRole } from '../AuthAppView';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  initialRole?: UserRole;
  onClose: () => void;
  onAuthenticated: (role: UserRole) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  initialRole = 'STUDENT',
  onClose,
  onAuthenticated
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('');
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  if (!isOpen) return null;

  const roleOptions: { role: UserRole; label: string; icon: any }[] = [
    { role: 'STUDENT', label: 'STUDENT', icon: GraduationCap },
    { role: 'FACULTY', label: 'FACULTY', icon: BookOpen },
    { role: 'HOD', label: 'HOD', icon: ShieldCheck },
    { role: 'ADMIN', label: 'ADMIN', icon: Building2 },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setTimeout(() => {
      setIsAuthenticating(false);
      onAuthenticated(selectedRole);
      onClose();
    }, 900);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#040714]/85 backdrop-blur-xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-md liquid-glass-elevated rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl bg-[#080d1e]/95 text-slate-100"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          {!isAuthenticating ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2 mb-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-xs font-bold shadow-inner">
                  <Layers className="w-3.5 h-3.5" />
                </div>
                <span className="font-semibold text-white tracking-wider text-sm font-body">
                  PROJECT<span className="text-indigo-400">VERSE</span>
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-white font-normal mb-1">
                {mode === 'login' ? 'Academic Login' : 'Join ProjectVerse'}
              </h2>
              <p className="text-xs text-slate-400 font-body mb-5">
                {mode === 'login'
                  ? 'Access your verified project workspace and academic credentials.'
                  : 'Connect your verified research and collaborate across institutions.'}
              </p>

              {/* Mode toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-black/40 border border-white/10 mb-4 text-xs font-mono-code">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                    mode === 'login' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-1.5 rounded-lg transition-all cursor-pointer ${
                    mode === 'register' ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Role Selection (STUDENT, FACULTY, HOD, ADMIN) */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono-code text-slate-400 uppercase mb-1.5">
                  Select Workspace Role
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {roleOptions.map((item) => {
                    const isSelected = selectedRole === item.role;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.role}
                        type="button"
                        onClick={() => setSelectedRole(item.role)}
                        className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-indigo-500/20 border-indigo-400 text-white font-semibold'
                            : 'bg-black/30 border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-indigo-400' : 'text-slate-500'}`} />
                        <span className="text-[11px]">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 font-body text-xs sm:text-sm">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono-code text-slate-300 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Devansh Kulkarni"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-slate-300 mb-1">
                        Institution / University
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IIT Bombay / MIT"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Institutional / Academic Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-slate-300 mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-black/50 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-400 text-xs"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2.5 px-4 rounded-xl bg-white text-slate-950 hover:bg-slate-100 font-semibold text-xs transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{mode === 'login' ? `Sign In as ${selectedRole}` : `Create ${selectedRole} Profile`}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-3 border-t border-white/10 text-center text-[11px] text-slate-500 font-mono-code">
                Institutional OAuth SSO • eduGAIN & SAML Compatible
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400 mx-auto animate-pulse">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h3 className="font-display text-2xl text-white">Opening {selectedRole} Workspace...</h3>
              <p className="text-xs text-slate-300">
                Synchronizing credentials with ProjectVerse Ledger.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
