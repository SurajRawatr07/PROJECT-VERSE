import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Building2 
} from 'lucide-react';
import { UserRole } from '../AuthAppView';
import { ProjectVerseLogo } from '../Navbar';
import { AccountIcon } from '../icons/AccountIcon';

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
          className="fixed inset-0 bg-black/40 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-full max-w-md bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-2xl text-[#111111]"
        >
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {!isAuthenticating ? (
            <div>
              {/* Brand Header */}
              <div className="flex items-center gap-2 mb-3">
                <ProjectVerseLogo className="w-5 h-5 text-[#111111]" />
                <span className="font-display text-[18px] text-[#111111] tracking-tight">
                  PROJECT<span className="inline-block w-[0.24em]" aria-hidden="true" />VERSE
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <AccountIcon size={22} className="text-[#111111]" />
                <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal">
                  {mode === 'login' ? 'Academic Login' : 'Join ProjectVerse'}
                </h2>
              </div>
              <p className="text-xs text-[#4A4A4A] font-body mb-5">
                {mode === 'login'
                  ? 'Access your verified project workspace and academic credentials.'
                  : 'Connect your verified research and collaborate across institutions.'}
              </p>

              {/* Mode toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F5F5F3] border border-black/8 mb-4 text-xs font-mono-code">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`py-2 rounded-lg transition-all cursor-pointer text-center font-medium ${
                    mode === 'login' 
                      ? 'bg-[#111111] text-white shadow-sm font-semibold' 
                      : 'text-[#4A4A4A] hover:text-[#111111]'
                  }`}
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`py-2 rounded-lg transition-all cursor-pointer text-center font-medium ${
                    mode === 'register' 
                      ? 'bg-[#111111] text-white shadow-sm font-semibold' 
                      : 'text-[#4A4A4A] hover:text-[#111111]'
                  }`}
                >
                  Register
                </button>
              </div>

              {/* Role Selection (STUDENT, FACULTY, HOD, ADMIN) */}
              <div className="mb-4">
                <label className="block text-[11px] font-mono-code text-[#737373] uppercase mb-1.5 font-medium">
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
                            ? 'bg-[#111111] border-[#111111] text-white font-medium shadow-xs'
                            : 'bg-[#F7F7F5] border-black/8 text-[#4A4A4A] hover:bg-[#F3F3F1] hover:text-[#111111]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#737373]'}`} />
                        <span className="text-[11px] font-mono-code">{item.label}</span>
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
                      <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                        Full Name
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Devansh Kulkarni"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                        Institution / University
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. IIT Bombay / MIT"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                    </div>
                  </>
                )}

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Institutional / Academic Email
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@university.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <span>{mode === 'login' ? `Sign In as ${selectedRole}` : `Create ${selectedRole} Profile`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-3 border-t border-black/8 text-center text-[11px] text-[#737373] font-mono-code">
                Institutional OAuth SSO • eduGAIN & SAML Compatible
              </div>
            </div>
          ) : (
            <div className="py-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F3] border border-black/10 flex items-center justify-center text-[#111111] mx-auto animate-pulse">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="font-display text-2xl text-[#111111]">Opening {selectedRole} Workspace...</h3>
              <p className="text-xs text-[#4A4A4A]">
                Synchronizing credentials with ProjectVerse Ledger.
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
