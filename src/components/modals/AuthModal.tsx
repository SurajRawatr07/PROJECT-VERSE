import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  ArrowRight, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  ShieldCheck, 
  Building2,
  Eye,
  EyeOff,
  AlertCircle,
  Sparkles,
  KeyRound,
  Lock
} from 'lucide-react';
import { UserRole } from '../AuthAppView';
import { ProjectVerseBrand } from '../ProjectVerseBrand';
import { AccountIcon } from '../icons/AccountIcon';
import { 
  validateEmailFormat, 
  validateStrongPassword, 
  loginUser, 
  registerUser 
} from '../../lib/authService';

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
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('Graphic Era Hill University');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Sync initial mode / role whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialRole);
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsAuthenticating(false);
    }
  }, [isOpen, initialMode, initialRole]);

  if (!isOpen) return null;

  const roleOptions: { 
    role: UserRole; 
    label: string; 
    icon: any; 
    defaultName: string;
    demoEmail: string;
    demoPass: string;
  }[] = [
    { 
      role: 'STUDENT', 
      label: 'STUDENT', 
      icon: GraduationCap, 
      defaultName: 'Suraj Rawat',
      demoEmail: 'suraj@gehu.ac.in',
      demoPass: 'Suraj@123'
    },
    { 
      role: 'FACULTY', 
      label: 'FACULTY', 
      icon: BookOpen, 
      defaultName: 'Dr. Anil Sharma',
      demoEmail: 'anil.sharma@gehu.ac.in',
      demoPass: 'Anil@1234'
    },
    { 
      role: 'HOD', 
      label: 'HOD', 
      icon: ShieldCheck, 
      defaultName: 'Dr. Rajesh Kumar',
      demoEmail: 'rajesh.kumar@gehu.ac.in',
      demoPass: 'Rajesh@123'
    },
    { 
      role: 'ADMIN', 
      label: 'ADMIN', 
      icon: Building2, 
      defaultName: 'Admin User',
      demoEmail: 'admin@gehu.ac.in',
      demoPass: 'Admin@1234'
    },
  ];

  const currentRoleConfig = roleOptions.find((r) => r.role === selectedRole) || roleOptions[0];

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setErrorMessage(null);
  };

  const handleQuickFill = (role: UserRole) => {
    const config = roleOptions.find((r) => r.role === role);
    if (config) {
      setSelectedRole(role);
      setEmail(config.demoEmail);
      setPassword(config.demoPass);
      setFullName(config.defaultName);
      setInstitution('Graphic Era Hill University');
      setErrorMessage(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Email Format Validation
    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // 2. Password Presence
    if (!password || password.trim() === '') {
      setErrorMessage('Password is required.');
      return;
    }

    if (mode === 'register') {
      // 3. Name check
      if (!fullName || fullName.trim().length < 2) {
        setErrorMessage('Please enter your full name.');
        return;
      }

      // 4. Strong Password Check
      const passwordCheck = validateStrongPassword(password);
      if (!passwordCheck.isValid) {
        setErrorMessage(
          passwordCheck.error ||
            'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number and one special character.'
        );
        return;
      }

      // 5. Confirm Password Check
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify your password.');
        return;
      }

      // 6. Institution Check
      if (!institution || institution.trim().length < 2) {
        setErrorMessage('Please specify your institution or university.');
        return;
      }

      setIsAuthenticating(true);

      setTimeout(() => {
        const result = registerUser({
          fullName,
          email,
          password,
          role: selectedRole,
          institution
        });

        if (!result.success) {
          setIsAuthenticating(false);
          setErrorMessage(result.error || 'Registration failed. Please check your credentials.');
          return;
        }

        setIsAuthenticating(false);
        setSuccessMessage('Account registered successfully! Opening workspace...');
        setTimeout(() => {
          onAuthenticated(selectedRole);
          onClose();
        }, 600);
      }, 700);

    } else {
      // Login Mode
      setIsAuthenticating(true);

      setTimeout(() => {
        const result = loginUser(email, password, selectedRole);

        if (!result.success) {
          setIsAuthenticating(false);
          setErrorMessage(result.error || 'Invalid email or password.');
          return;
        }

        setIsAuthenticating(false);
        setSuccessMessage('Credentials verified. Entering workspace...');
        setTimeout(() => {
          onAuthenticated(selectedRole);
          onClose();
        }, 500);
      }, 700);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-2xl text-[#111111] max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {!isAuthenticating && !successMessage ? (
            <div>
              {/* Brand Header */}
              <div className="mb-4">
                <ProjectVerseBrand
                  theme="light"
                  logoSize={26}
                  textSizeClassName="text-[21px] sm:text-[23px]"
                  interactive={false}
                />
              </div>

              <div className="flex items-center gap-2 mb-1">
                <AccountIcon size={20} className="text-[#111111]" />
                <h2 className="font-display text-xl sm:text-2xl text-[#111111] font-normal">
                  {mode === 'login' ? 'Welcome back to ProjectVerse' : 'Create your ProjectVerse Account'}
                </h2>
              </div>
              <p className="text-xs text-[#4A4A4A] font-body mb-4">
                {mode === 'login'
                  ? 'Access your verified project workspace and academic credentials.'
                  : 'Connect your verified research and collaborate across institutions.'}
              </p>

              {/* Mode toggle (Sign In / Register) */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F5F5F3] border border-black/8 mb-4 text-xs font-mono-code">
                <button
                  type="button"
                  id="auth-tab-signin"
                  onClick={() => {
                    setMode('login');
                    setErrorMessage(null);
                  }}
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
                  id="auth-tab-register"
                  onClick={() => {
                    setMode('register');
                    setErrorMessage(null);
                  }}
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
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">
                    Select Workspace Role
                  </label>
                  <span className="text-[10px] text-[#737373] font-mono-code">
                    Default: {selectedRole}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                  {roleOptions.map((item) => {
                    const isSelected = selectedRole === item.role;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.role}
                        id={`auth-role-btn-${item.role.toLowerCase()}`}
                        type="button"
                        onClick={() => handleRoleChange(item.role)}
                        className={`p-2 rounded-xl border text-center flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#111111] border-[#111111] text-white font-medium shadow-xs'
                            : 'bg-[#F7F7F5] border-black/8 text-[#4A4A4A] hover:bg-[#F3F3F1] hover:text-[#111111]'
                        }`}
                      >
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-white' : 'text-[#737373]'}`} />
                        <span className="text-[10.5px] font-mono-code">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quick Demo Credentials Helper */}
              {mode === 'login' && (
                <div className="mb-4 p-2.5 rounded-xl bg-[#F7F7F5] border border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#4A4A4A]">
                    <Sparkles className="w-3.5 h-3.5 text-[#111111]" />
                    <span>Demo {selectedRole}: <strong className="text-[#111111]">{currentRoleConfig.demoEmail}</strong></span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleQuickFill(selectedRole)}
                    className="text-[11px] font-mono-code px-2 py-1 rounded bg-white hover:bg-black hover:text-white border border-black/10 text-[#111111] font-medium transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    Quick Fill
                  </button>
                </div>
              )}

              {/* Error Message Box */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2"
                >
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span className="leading-snug">{errorMessage}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3 font-body text-xs sm:text-sm">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                        Full Name
                      </label>
                      <input
                        id="auth-fullname-input"
                        type="text"
                        placeholder={`e.g. ${currentRoleConfig.defaultName}`}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                        Institution / University
                      </label>
                      <input
                        id="auth-institution-input"
                        type="text"
                        placeholder="Graphic Era Hill University"
                        value={institution}
                        onChange={(e) => setInstitution(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                    </div>
                  </>
                )}

                {/* Email Field */}
                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Institutional / Academic Email
                  </label>
                  <input
                    id="auth-email-input"
                    type="email"
                    placeholder={currentRoleConfig.demoEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-mono-code text-[#4A4A4A] font-medium">
                      Password
                    </label>
                    {mode === 'register' && (
                      <span className="text-[10px] text-[#737373] font-mono-code">
                        Min 8 chars (A-Z, a-z, 0-9, special)
                      </span>
                    )}
                  </div>
                  <div className="relative">
                    <input
                      id="auth-password-input"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={mode === 'register' ? 'Create strong password' : '••••••••'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                    <button
                      type="button"
                      id="auth-toggle-show-password"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] cursor-pointer"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field for Register */}
                {mode === 'register' && (
                  <div>
                    <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        id="auth-confirm-password-input"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Re-enter password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                      />
                      <button
                        type="button"
                        id="auth-toggle-show-confirm-password"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] cursor-pointer"
                        aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="pt-2">
                  <button
                    id="auth-submit-btn"
                    type="submit"
                    className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                  >
                    <span>{mode === 'login' ? `Sign In as ${selectedRole}` : `Register ${selectedRole} Account`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>

              <div className="mt-4 pt-3 border-t border-black/8 flex items-center justify-between text-[11px] text-[#737373] font-mono-code">
                <span>Graphic Era Hill University Node</span>
                <span>eduGAIN & SAML Compatible</span>
              </div>
            </div>
          ) : (
            <div className="py-10 text-center space-y-4">
              <div className="w-12 h-12 rounded-full bg-[#F5F5F3] border border-black/10 flex items-center justify-center text-[#111111] mx-auto animate-bounce">
                <CheckCircle2 className="w-6 h-6 text-[#111111]" />
              </div>
              <h3 className="font-display text-2xl text-[#111111]">
                {successMessage || `Opening ${selectedRole} Workspace...`}
              </h3>
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
