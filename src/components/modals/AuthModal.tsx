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
  Lock,
  Check,
  BadgeCheck,
  KeyRound,
  FileCheck,
  Server,
  MailCheck,
  UploadCloud,
  FileText,
  Clock,
  Briefcase,
  ChevronRight,
  RefreshCw,
  Award,
  Layers,
  ArrowLeft
} from 'lucide-react';
import { UserRole } from '../AuthAppView';
import { ProjectVerseBrand } from '../ProjectVerseBrand';
import { AccountIcon } from '../icons/AccountIcon';
import { DocumentUploadDropzone } from '../verification/DocumentUploadDropzone';
import { 
  validateEmailFormat, 
  validateStrongPassword, 
  evaluatePasswordStrength,
  isInstitutionalEmail,
  loginUser, 
  registerUser,
  RegisterUserParams,
  submitVerificationDocument
} from '../../lib/authService';
import { StudentType, DocumentType } from '../../types';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  initialRole?: UserRole;
  onClose: () => void;
  onAuthenticated: (role: UserRole) => void;
}

type RegistrationStep = 'ACCOUNT_FORM' | 'EMAIL_OTP' | 'DOCUMENT_UPLOAD' | 'SUMMARY_SUCCESS';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  initialRole = 'STUDENT',
  onClose,
  onAuthenticated
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [selectedRole, setSelectedRole] = useState<UserRole>(initialRole);
  const [studentType, setStudentType] = useState<StudentType>('CURRENT_STUDENT');
  const [regStep, setRegStep] = useState<RegistrationStep>('ACCOUNT_FORM');
  
  // Common Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [institution, setInstitution] = useState('Graphic Era Hill University');
  const [department, setDepartment] = useState('Dept of Computer Science & Engineering');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [skills, setSkills] = useState('React, TypeScript, Python');
  const [course, setCourse] = useState('B.Tech Computer Science & Engineering');

  // Student (Current) Specific Fields
  const [rollNumber, setRollNumber] = useState('GEHU/2023/CS/104');
  const [batch, setBatch] = useState('2023–2027');

  // Alumni Specific Fields
  const [graduationYear, setGraduationYear] = useState('2024');
  const [currentOrganization, setCurrentOrganization] = useState('NVIDIA Robotics / Research');
  const [currentJobRole, setCurrentJobRole] = useState('Software Engineer & Research Fellow');
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/alumni-researcher');
  const [portfolioUrl, setPortfolioUrl] = useState('https://github.com/alumni-researcher');

  // Faculty Specific Fields
  const [facultyId, setFacultyId] = useState('EMP-GEHU-FAC-409');
  const [designation, setDesignation] = useState('Associate Professor & Research Advisor');
  const [researchSpecialization, setResearchSpecialization] = useState('Artificial Intelligence, Edge Computing');

  // HOD Specific Fields
  const [hodFacultyId, setHodFacultyId] = useState('HOD-CSE-001');
  const [departmentToken, setDepartmentToken] = useState('GEHU-HOD-CSE-2025');

  // OTP Simulation State
  const [enteredOtp, setEnteredOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('849201');
  const [otpTimer, setOtpTimer] = useState(60);
  const [otpVerified, setOtpVerified] = useState(false);

  // Document Upload State
  const [uploadedDoc, setUploadedDoc] = useState<{
    documentType: DocumentType;
    fileName: string;
    fileSize: string;
  } | null>(null);

  // UI / Error state
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  // Sync initial state on open
  useEffect(() => {
    if (isOpen) {
      setMode(initialMode);
      setSelectedRole(initialRole);
      setRegStep('ACCOUNT_FORM');
      setErrorMessage(null);
      setSuccessMessage(null);
      setIsAuthenticating(false);
      setOtpVerified(false);
      setEnteredOtp('');
      setUploadedDoc(null);
    }
  }, [isOpen, initialMode, initialRole]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any = null;
    if (regStep === 'EMAIL_OTP' && otpTimer > 0) {
      interval = setInterval(() => {
        setOtpTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [regStep, otpTimer]);

  if (!isOpen) return null;

  const roleConfigs: { 
    role: UserRole; 
    label: string; 
    icon: any; 
    defaultName: string;
    demoEmail: string;
    demoPass: string;
    description: string;
  }[] = [
    { 
      role: 'STUDENT', 
      label: 'STUDENT', 
      icon: GraduationCap, 
      defaultName: 'Suraj Rawat',
      demoEmail: 'suraj@gehu.ac.in',
      demoPass: 'Suraj@123',
      description: 'Current student or alumni leading capstone projects and research.'
    },
    { 
      role: 'FACULTY', 
      label: 'FACULTY', 
      icon: BookOpen, 
      defaultName: 'Dr. Anil Sharma',
      demoEmail: 'anil.sharma@gehu.ac.in',
      demoPass: 'Anil@1234',
      description: 'Academic guide performing peer reviews and cryptographic rubric sign-offs.'
    },
    { 
      role: 'HOD', 
      label: 'HOD', 
      icon: ShieldCheck, 
      defaultName: 'Dr. Rajesh Kumar',
      demoEmail: 'rajesh.kumar@gehu.ac.in',
      demoPass: 'Rajesh@123',
      description: 'Department head approving capstone registries and NAAC/ABET governance.'
    },
    { 
      role: 'ADMIN', 
      label: 'ADMIN', 
      icon: Building2, 
      defaultName: 'Admin User',
      demoEmail: 'admin@gehu.ac.in',
      demoPass: 'Admin@1234',
      description: 'National ledger administrator for federated node verification.'
    },
  ];

  const currentRoleConfig = roleConfigs.find((r) => r.role === selectedRole) || roleConfigs[0];
  const passwordStrength = evaluatePasswordStrength(password);
  const isDomainAcademic = isInstitutionalEmail(email);

  const handleRoleChange = (newRole: UserRole) => {
    setSelectedRole(newRole);
    setErrorMessage(null);
  };

  const handleQuickFill = (role: UserRole, type?: StudentType) => {
    const config = roleConfigs.find((r) => r.role === role);
    if (config) {
      setSelectedRole(role);
      setEmail(config.demoEmail);
      setPassword(config.demoPass);
      setConfirmPassword(config.demoPass);
      setFullName(config.defaultName);
      setInstitution('Graphic Era Hill University');
      setDepartment('Dept of Computer Science & Engineering');
      setCourse('B.Tech Computer Science & Engineering');
      
      if (role === 'STUDENT') {
        const targetType = type || studentType;
        setStudentType(targetType);
        if (targetType === 'ALUMNI') {
          setRollNumber('GEHU/2020/CS/042');
          setGraduationYear('2024');
          setEmail('suraj.alumni@gehu.ac.in');
          setCurrentOrganization('NVIDIA Autonomous Vehicles');
          setCurrentJobRole('Systems Engineer');
        } else {
          setRollNumber('GEHU/2023/CS/104');
          setBatch('2023–2027');
          setEmail('suraj@gehu.ac.in');
        }
      } else if (role === 'FACULTY') {
        setFacultyId('EMP-GEHU-FAC-409');
        setDesignation('Associate Professor & Research Advisor');
        setResearchSpecialization('Artificial Intelligence, Edge Computing');
      } else if (role === 'HOD') {
        setHodFacultyId('HOD-CSE-001');
        setDepartmentToken('GEHU-HOD-CSE-2025');
      }
      
      setErrorMessage(null);
    }
  };

  // Step 1 validation
  const handleValidateAccountForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // 1. Email format
    const emailCheck = validateEmailFormat(email);
    if (!emailCheck.isValid) {
      setErrorMessage(emailCheck.error || 'Please enter a valid email address.');
      return;
    }

    // 2. Password presence
    if (!password || password.trim() === '') {
      setErrorMessage('Password is required.');
      return;
    }

    if (mode === 'register') {
      if (selectedRole === 'ADMIN') {
        setErrorMessage('Administrator accounts cannot be registered publicly. Please sign in with root credentials.');
        return;
      }

      if (!fullName || fullName.trim().length < 2) {
        setErrorMessage('Please enter your full name (minimum 2 characters).');
        return;
      }

      const passwordCheck = validateStrongPassword(password);
      if (!passwordCheck.isValid) {
        setErrorMessage(
          passwordCheck.error ||
            'Password must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character.'
        );
        return;
      }

      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify your password confirmation.');
        return;
      }

      if (!institution || institution.trim().length < 2) {
        setErrorMessage('Please specify your institution or university.');
        return;
      }

      if (selectedRole === 'STUDENT') {
        if (!rollNumber || rollNumber.trim().length < 3) {
          setErrorMessage('Please enter your student roll number / enrollment ID.');
          return;
        }
        if (studentType === 'CURRENT_STUDENT' && !batch) {
          setErrorMessage('Please enter your academic cohort / batch (e.g. 2023–2027).');
          return;
        }
        if (studentType === 'ALUMNI' && !graduationYear) {
          setErrorMessage('Please specify your year of graduation (e.g. 2024).');
          return;
        }
      } else if (selectedRole === 'FACULTY') {
        if (!facultyId || facultyId.trim().length < 2) {
          setErrorMessage('Please enter your Faculty / Employee ID.');
          return;
        }
        if (!designation || designation.trim().length < 2) {
          setErrorMessage('Please provide your academic designation.');
          return;
        }
      } else if (selectedRole === 'HOD') {
        if (!hodFacultyId || hodFacultyId.trim().length < 2) {
          setErrorMessage('Please enter your Department Head ID.');
          return;
        }
        if (!departmentToken || departmentToken.trim().length < 3) {
          setErrorMessage('Please enter your Institutional Department Authorization Token.');
          return;
        }
      }

      // Proceed to Step 2 (Email OTP Verification)
      setRegStep('EMAIL_OTP');
      setOtpTimer(60);
      setGeneratedOtp('849201');
      setEnteredOtp('');

    } else {
      // Login Mode
      setIsAuthenticating(true);
      setTimeout(() => {
        const result = loginUser(email, password);

        if (!result.success || !result.session) {
          setIsAuthenticating(false);
          setErrorMessage(result.error || 'Invalid email or password.');
          return;
        }

        const trueRole = result.session.user.role;
        setSuccessMessage(`Identity verified. Entering ${trueRole} Workspace...`);
        setTimeout(() => {
          onAuthenticated(trueRole);
          onClose();
        }, 800);
      }, 650);
    }
  };

  // Step 2: Handle OTP Submit
  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (enteredOtp.trim() !== generatedOtp && enteredOtp.trim() !== '123456') {
      setErrorMessage('Invalid 6-digit OTP. Please enter the code sent to your email or use the quick-fill code.');
      return;
    }

    setOtpVerified(true);

    if (selectedRole === 'STUDENT') {
      // Advance to Step 3: Document Upload for Students / Alumni
      setTimeout(() => {
        setRegStep('DOCUMENT_UPLOAD');
      }, 400);
    } else {
      // Finalize Registration for Faculty / HOD
      finalizeRegistration(null);
    }
  };

  // Step 3: Finalize registration with or without document
  const finalizeRegistration = (docData: { documentType: DocumentType; fileName: string; fileSize: string } | null) => {
    setIsAuthenticating(true);
    setErrorMessage(null);

    const skillsArray = skills.split(',').map((s) => s.trim()).filter(Boolean);

    const registerPayload: RegisterUserParams = {
      fullName,
      email,
      password,
      role: selectedRole,
      institution,
      department,
      studentType: selectedRole === 'STUDENT' ? studentType : undefined,
      rollNumber: selectedRole === 'STUDENT' ? rollNumber : undefined,
      batch: selectedRole === 'STUDENT' && studentType === 'CURRENT_STUDENT' ? batch : undefined,
      graduationYear: selectedRole === 'STUDENT' && studentType === 'ALUMNI' ? graduationYear : undefined,
      currentOrganization: selectedRole === 'STUDENT' && studentType === 'ALUMNI' ? currentOrganization : undefined,
      currentJobRole: selectedRole === 'STUDENT' && studentType === 'ALUMNI' ? currentJobRole : undefined,
      linkedIn: selectedRole === 'STUDENT' && studentType === 'ALUMNI' ? linkedinUrl : undefined,
      portfolio: selectedRole === 'STUDENT' && studentType === 'ALUMNI' ? portfolioUrl : undefined,
      course: selectedRole === 'STUDENT' ? course : undefined,
      skills: selectedRole === 'STUDENT' ? skillsArray : undefined,
      facultyId: selectedRole === 'FACULTY' ? facultyId : selectedRole === 'HOD' ? hodFacultyId : undefined,
      designation: selectedRole === 'FACULTY' ? designation : undefined,
      researchAreas: selectedRole === 'FACULTY' ? researchSpecialization.split(',').map(s => s.trim()) : undefined,
      departmentToken: selectedRole === 'HOD' ? departmentToken : undefined,
      documentType: docData?.documentType,
      documentFileName: docData?.fileName,
      documentFileSize: docData?.fileSize
    };

    setTimeout(() => {
      const result = registerUser(registerPayload);

      if (!result.success) {
        setIsAuthenticating(false);
        setErrorMessage(result.error || 'Registration failed. Please review your details.');
        return;
      }

      setRegStep('SUMMARY_SUCCESS');
      setIsAuthenticating(false);
    }, 750);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/45 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 12 }}
          transition={{ duration: 0.22 }}
          className="relative z-10 w-full max-w-xl bg-white rounded-3xl p-6 sm:p-8 border border-black/10 shadow-2xl text-[#111111] max-h-[92vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#F5F5F3] hover:bg-[#ECECE9] border border-black/8 flex items-center justify-center text-[#4A4A4A] hover:text-[#111111] transition-all cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Brand Header */}
          <div className="mb-4">
            <ProjectVerseBrand
              theme="light"
              logoSize={26}
              textSizeClassName="text-[21px] sm:text-[23px]"
              interactive={false}
            />
          </div>

          {/* ========================================================================= */}
          {/* LOGIN MODE */}
          {/* ========================================================================= */}
          {mode === 'login' ? (
            <div>
              <div className="flex items-center gap-2 mb-1">
                <AccountIcon size={20} className="text-[#111111]" />
                <h2 className="font-display text-xl sm:text-2xl text-[#111111] font-normal">
                  Academic Workspace Sign In
                </h2>
              </div>
              <p className="text-xs text-[#4A4A4A] font-body mb-4 leading-relaxed">
                Access your cryptographically signed project passports, academic lineage trees, and verified ledger records.
              </p>

              {/* Mode Toggle */}
              <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F5F5F3] border border-black/8 mb-4 text-xs font-mono-code">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className="py-2 rounded-lg bg-[#111111] text-white shadow-xs font-semibold cursor-pointer text-center"
                >
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('register');
                    setRegStep('ACCOUNT_FORM');
                    setErrorMessage(null);
                  }}
                  className="py-2 rounded-lg text-[#4A4A4A] hover:text-[#111111] cursor-pointer text-center font-medium"
                >
                  Register
                </button>
              </div>

              {/* Role Selection Tabs */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-[11px] font-mono-code text-[#737373] uppercase font-medium">
                    Select Portal Role
                  </label>
                  <span className="text-[10px] text-[#737373] font-mono-code">
                    Active: {selectedRole}
                  </span>
                </div>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                  {roleConfigs.map((item) => {
                    const isSelected = selectedRole === item.role;
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.role}
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

              {/* Quick Fill Bar */}
              <div className="mb-4 p-2.5 rounded-xl bg-[#F7F7F5] border border-black/8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 text-[11px] text-[#4A4A4A]">
                  <Sparkles className="w-3.5 h-3.5 text-[#111111] shrink-0" />
                  <span className="truncate">
                    Demo {selectedRole}: <strong className="text-[#111111]">{currentRoleConfig.demoEmail}</strong>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleQuickFill(selectedRole)}
                  className="text-[11px] font-mono-code px-2.5 py-1 rounded bg-white hover:bg-[#111111] hover:text-white border border-black/10 text-[#111111] font-medium transition-colors cursor-pointer self-start sm:self-auto shrink-0 shadow-xs"
                >
                  Quick Fill Demo
                </button>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {successMessage && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{successMessage}</span>
                </div>
              )}

              {/* Sign In Form */}
              <form onSubmit={handleValidateAccountForm} className="space-y-3 font-body text-xs sm:text-sm">
                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Institutional Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder={currentRoleConfig.demoEmail}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAuthenticating}
                    className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                  >
                    <span>{isAuthenticating ? 'Authenticating...' : `Sign In as ${selectedRole}`}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-white" />
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* ========================================================================= */
            /* MULTI-STEP REGISTRATION PIPELINE */
            /* ========================================================================= */
            <div>
              {/* Registration Pipeline Step Indicators */}
              <div className="mb-4">
                <div className="flex items-center justify-between pb-2 border-b border-black/8 text-[11px] font-mono-code text-[#737373]">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      regStep === 'ACCOUNT_FORM' ? 'bg-[#111111] text-white' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {regStep === 'ACCOUNT_FORM' ? '1' : '✓'}
                    </span>
                    <span className={regStep === 'ACCOUNT_FORM' ? 'text-[#111111] font-semibold' : ''}>Account</span>
                  </div>

                  <ChevronRight className="w-3.5 h-3.5 text-black/20" />

                  <div className="flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      regStep === 'EMAIL_OTP' ? 'bg-[#111111] text-white' : regStep === 'DOCUMENT_UPLOAD' || regStep === 'SUMMARY_SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-black/5 text-[#737373]'
                    }`}>
                      {regStep === 'DOCUMENT_UPLOAD' || regStep === 'SUMMARY_SUCCESS' ? '✓' : '2'}
                    </span>
                    <span className={regStep === 'EMAIL_OTP' ? 'text-[#111111] font-semibold' : ''}>Email OTP</span>
                  </div>

                  {selectedRole === 'STUDENT' && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 text-black/20" />
                      <div className="flex items-center gap-1.5">
                        <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                          regStep === 'DOCUMENT_UPLOAD' ? 'bg-[#111111] text-white' : regStep === 'SUMMARY_SUCCESS' ? 'bg-emerald-100 text-emerald-800' : 'bg-black/5 text-[#737373]'
                        }`}>
                          {regStep === 'SUMMARY_SUCCESS' ? '✓' : '3'}
                        </span>
                        <span className={regStep === 'DOCUMENT_UPLOAD' ? 'text-[#111111] font-semibold' : ''}>Document</span>
                      </div>
                    </>
                  )}

                  <ChevronRight className="w-3.5 h-3.5 text-black/20" />

                  <div className="flex items-center gap-1.5">
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      regStep === 'SUMMARY_SUCCESS' ? 'bg-emerald-700 text-white' : 'bg-black/5 text-[#737373]'
                    }`}>
                      ★
                    </span>
                    <span className={regStep === 'SUMMARY_SUCCESS' ? 'text-emerald-800 font-semibold' : ''}>Verified</span>
                  </div>
                </div>
              </div>

              {/* Mode Toggle */}
              {regStep === 'ACCOUNT_FORM' && (
                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-[#F5F5F3] border border-black/8 mb-4 text-xs font-mono-code">
                  <button
                    type="button"
                    onClick={() => {
                      setMode('login');
                      setErrorMessage(null);
                    }}
                    className="py-2 rounded-lg text-[#4A4A4A] hover:text-[#111111] cursor-pointer text-center font-medium"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('register')}
                    className="py-2 rounded-lg bg-[#111111] text-white shadow-xs font-semibold cursor-pointer text-center"
                  >
                    Register
                  </button>
                </div>
              )}

              {/* STEP 1: ACCOUNT DETAILS */}
              {regStep === 'ACCOUNT_FORM' && (
                <div>
                  {/* Role Selector */}
                  <div className="mb-4">
                    <label className="block text-[11px] font-mono-code text-[#737373] uppercase font-medium mb-1.5">
                      Select Academic Role
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                      {roleConfigs.map((item) => {
                        const isSelected = selectedRole === item.role;
                        const Icon = item.icon;
                        return (
                          <button
                            key={item.role}
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

                  {/* Admin lockout notice */}
                  {selectedRole === 'ADMIN' ? (
                    <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/10 text-xs space-y-3 mb-4">
                      <div className="flex items-start gap-2.5">
                        <Lock className="w-4 h-4 text-[#111111] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-semibold text-[#111111]">Centralized Node Provisioning</h4>
                          <p className="text-[#4A4A4A] mt-1 leading-relaxed">
                            National Ledger Administrator accounts cannot be self-registered publicly. Root credentials are generated and signed directly by the Institutional Node Governance office.
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setMode('login');
                          setSelectedRole('ADMIN');
                        }}
                        className="btn-primary-black w-full py-2.5 rounded-xl text-xs font-medium cursor-pointer"
                      >
                        Sign In with Admin Credentials
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* If Student Role Selected: Show Student Type Selector */}
                      {selectedRole === 'STUDENT' && (
                        <div className="mb-4">
                          <label className="block text-[11px] font-mono-code text-[#4A4A4A] uppercase font-semibold mb-1.5">
                            Account Type *
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setStudentType('CURRENT_STUDENT');
                                handleQuickFill('STUDENT', 'CURRENT_STUDENT');
                              }}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                studentType === 'CURRENT_STUDENT'
                                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                                  : 'bg-[#F7F7F5] text-[#4A4A4A] border-black/8 hover:bg-[#F3F3F1] hover:text-[#111111]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1 font-semibold text-xs">
                                <GraduationCap className="w-4 h-4" />
                                <span>CURRENT STUDENT</span>
                              </div>
                              <p className={`text-[10.5px] leading-tight ${studentType === 'CURRENT_STUDENT' ? 'text-white/80' : 'text-[#737373]'}`}>
                                Enrolled in an active degree program; build & collaborate on capstones.
                              </p>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                setStudentType('ALUMNI');
                                handleQuickFill('STUDENT', 'ALUMNI');
                              }}
                              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                                studentType === 'ALUMNI'
                                  ? 'bg-[#111111] text-white border-[#111111] shadow-xs'
                                  : 'bg-[#F7F7F5] text-[#4A4A4A] border-black/8 hover:bg-[#F3F3F1] hover:text-[#111111]'
                              }`}
                            >
                              <div className="flex items-center gap-1.5 mb-1 font-semibold text-xs">
                                <Briefcase className="w-4 h-4" />
                                <span>ALUMNI / PASS-OUT</span>
                              </div>
                              <p className={`text-[10.5px] leading-tight ${studentType === 'ALUMNI' ? 'text-white/80' : 'text-[#737373]'}`}>
                                Graduated student; advise upcoming batches and showcase verifiable legacy.
                              </p>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Quick Fill Button */}
                      <div className="mb-4 p-2.5 rounded-xl bg-[#F7F7F5] border border-black/8 flex items-center justify-between">
                        <span className="text-[11px] text-[#4A4A4A]">
                          Fill demo {selectedRole === 'STUDENT' ? (studentType === 'ALUMNI' ? 'Alumni' : 'Current Student') : selectedRole} data:
                        </span>
                        <button
                          type="button"
                          onClick={() => handleQuickFill(selectedRole, studentType)}
                          className="text-[11px] font-mono-code px-2.5 py-1 rounded bg-white hover:bg-[#111111] hover:text-white border border-black/10 text-[#111111] font-medium transition-colors cursor-pointer shadow-xs"
                        >
                          Quick Fill Demo
                        </button>
                      </div>

                      {errorMessage && (
                        <div className="mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                          <span>{errorMessage}</span>
                        </div>
                      )}

                      {/* Main Form Fields */}
                      <form onSubmit={handleValidateAccountForm} className="space-y-3 font-body text-xs sm:text-sm">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                            Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Suraj Rawat"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                          />
                        </div>

                        {/* STUDENT: CURRENT STUDENT FIELDS */}
                        {selectedRole === 'STUDENT' && studentType === 'CURRENT_STUDENT' && (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Roll Number / Enrollment <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="GEHU/2023/CS/104"
                                  value={rollNumber}
                                  onChange={(e) => setRollNumber(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Academic Batch / Cohort <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="2023–2027"
                                  value={batch}
                                  onChange={(e) => setBatch(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {/* STUDENT: ALUMNI FIELDS */}
                        {selectedRole === 'STUDENT' && studentType === 'ALUMNI' && (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Roll / Enrollment Number <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="GEHU/2020/CS/042"
                                  value={rollNumber}
                                  onChange={(e) => setRollNumber(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Graduation Year <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="2024"
                                  value={graduationYear}
                                  onChange={(e) => setGraduationYear(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Current Company / Org (Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="NVIDIA Robotics"
                                  value={currentOrganization}
                                  onChange={(e) => setCurrentOrganization(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Current Job Role (Optional)
                                </label>
                                <input
                                  type="text"
                                  placeholder="Systems Engineer"
                                  value={currentJobRole}
                                  onChange={(e) => setCurrentJobRole(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {/* FACULTY FIELDS */}
                        {selectedRole === 'FACULTY' && (
                          <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Faculty / Employee ID <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="EMP-GEHU-FAC-409"
                                  value={facultyId}
                                  onChange={(e) => setFacultyId(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                  Academic Designation <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="text"
                                  placeholder="Associate Professor"
                                  value={designation}
                                  onChange={(e) => setDesignation(e.target.value)}
                                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                                />
                              </div>
                            </div>
                          </>
                        )}

                        {/* HOD FIELDS */}
                        {selectedRole === 'HOD' && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            <div>
                              <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                Department Head ID <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="HOD-CSE-001"
                                value={hodFacultyId}
                                onChange={(e) => setHodFacultyId(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                                Institutional Auth Token <span className="text-red-500">*</span>
                              </label>
                              <input
                                type="text"
                                placeholder="GEHU-HOD-CSE-2025"
                                value={departmentToken}
                                onChange={(e) => setDepartmentToken(e.target.value)}
                                className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                              />
                            </div>
                          </div>
                        )}

                        {/* Institution & Department */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          <div>
                            <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                              Institution / University <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Graphic Era Hill University"
                              value={institution}
                              onChange={(e) => setInstitution(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                              Department / Branch <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              placeholder="Dept of Computer Science & Engineering"
                              value={department}
                              onChange={(e) => setDepartment(e.target.value)}
                              className="w-full px-3 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                            />
                          </div>
                        </div>

                        {/* Email Input */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-mono-code text-[#4A4A4A] font-medium">
                              Academic / Institutional Email <span className="text-red-500">*</span>
                            </label>
                            {email && (
                              <span className={`text-[10px] font-mono-code ${isDomainAcademic ? 'text-emerald-700 font-semibold' : 'text-[#737373]'}`}>
                                {isDomainAcademic ? '✓ Academic Domain Matched' : 'Standard Email (Requires Manual Doc Review)'}
                              </span>
                            )}
                          </div>
                          <input
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
                              Password <span className="text-red-500">*</span>
                            </label>
                            {password && (
                              <span
                                className="text-[10.5px] font-mono-code font-semibold"
                                style={{ color: passwordStrength.color }}
                              >
                                Strength: {passwordStrength.label}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type={showPassword ? 'text' : 'password'}
                              placeholder="Create strong password"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] cursor-pointer"
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>

                          {/* Password Strength Checklist */}
                          {password && (
                            <div className="mt-2 p-2.5 rounded-xl bg-[#F7F7F5] border border-black/8 space-y-2">
                              <div className="grid grid-cols-5 gap-1 h-1.5">
                                {[1, 2, 3, 4, 5].map((seg) => (
                                  <div
                                    key={seg}
                                    className="h-full rounded-full transition-all duration-300"
                                    style={{
                                      backgroundColor:
                                        seg <= passwordStrength.score ? passwordStrength.color : '#E5E5E5'
                                    }}
                                  />
                                ))}
                              </div>

                              <div className="grid grid-cols-2 gap-1 text-[10px] font-mono-code text-[#4A4A4A]">
                                <div>
                                  <span className={passwordStrength.checks.minLength ? 'text-emerald-700 font-bold' : 'text-[#737373]'}>
                                    {passwordStrength.checks.minLength ? '✓' : '•'} 8+ Chars
                                  </span>
                                </div>
                                <div>
                                  <span className={passwordStrength.checks.hasUppercase ? 'text-emerald-700 font-bold' : 'text-[#737373]'}>
                                    {passwordStrength.checks.hasUppercase ? '✓' : '•'} Uppercase (A-Z)
                                  </span>
                                </div>
                                <div>
                                  <span className={passwordStrength.checks.hasLowercase ? 'text-emerald-700 font-bold' : 'text-[#737373]'}>
                                    {passwordStrength.checks.hasLowercase ? '✓' : '•'} Lowercase (a-z)
                                  </span>
                                </div>
                                <div>
                                  <span className={passwordStrength.checks.hasNumber && passwordStrength.checks.hasSpecial ? 'text-emerald-700 font-bold' : 'text-[#737373]'}>
                                    {passwordStrength.checks.hasNumber && passwordStrength.checks.hasSpecial ? '✓' : '•'} Number & Symbol
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Confirm Password */}
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <label className="text-xs font-mono-code text-[#4A4A4A] font-medium">
                              Confirm Password <span className="text-red-500">*</span>
                            </label>
                            {confirmPassword && (
                              <span className={`text-[10px] font-mono-code ${password === confirmPassword ? 'text-emerald-700 font-semibold' : 'text-red-600'}`}>
                                {password === confirmPassword ? '✓ Passwords Match' : '✗ Do not match'}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              type={showConfirmPassword ? 'text' : 'password'}
                              placeholder="Re-enter password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-[#F7F7F5] border border-black/10 text-[#111111] placeholder-[#737373] focus:outline-none focus:border-[#111111] focus:bg-white text-xs transition-colors"
                            />
                            <button
                              type="button"
                              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#737373] hover:text-[#111111] cursor-pointer"
                            >
                              {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        {/* Next: Step 2 Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                          >
                            <span>Continue to Email Verification</span>
                            <ArrowRight className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </form>
                    </>
                  )}
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 2: EMAIL OTP VERIFICATION */}
              {/* ========================================================================= */}
              {regStep === 'EMAIL_OTP' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRegStep('ACCOUNT_FORM')}
                      className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
                      title="Back to account form"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h3 className="font-display text-xl text-[#111111] font-normal">
                        Verify Institutional Email
                      </h3>
                      <p className="text-xs text-[#737373]">
                        We have sent a 6-digit confirmation OTP to <strong>{email}</strong>
                      </p>
                    </div>
                  </div>

                  {/* Domain Validation Result Banner */}
                  <div className={`p-3 rounded-2xl border text-xs flex items-start gap-2.5 ${
                    isDomainAcademic
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                      : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    {isDomainAcademic ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <span className="font-semibold block">
                        {isDomainAcademic ? 'Academic Domain Recognized' : 'Personal Domain Detected'}
                      </span>
                      <p className="text-[11px] mt-0.5 leading-relaxed">
                        {isDomainAcademic
                          ? 'This email matches a certified academic domain (Graphic Era Hill University / Edu Node). Full student benefits will be staged.'
                          : 'Personal domains will require uploading an institutional student ID or enrollment certificate to receive the verified badge.'}
                      </p>
                    </div>
                  </div>

                  {/* Quick Fill OTP Banner */}
                  <div className="p-3 rounded-2xl bg-[#F7F7F5] border border-black/8 flex items-center justify-between">
                    <div className="text-xs">
                      <span className="text-[#737373]">Simulated Email Code:</span>{' '}
                      <strong className="font-mono-code text-[#111111] text-sm tracking-wider">{generatedOtp}</strong>
                    </div>
                    <button
                      type="button"
                      onClick={() => setEnteredOtp(generatedOtp)}
                      className="text-xs font-mono-code px-3 py-1.5 rounded-lg bg-[#111111] text-white hover:bg-black font-semibold cursor-pointer shadow-xs"
                    >
                      Fill Demo OTP
                    </button>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  {/* OTP Input Form */}
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <div>
                      <label className="block text-xs font-mono-code text-[#4A4A4A] mb-1 font-medium">
                        Enter 6-Digit Verification Code *
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        placeholder="849201"
                        value={enteredOtp}
                        onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                        className="w-full text-center tracking-[0.3em] font-mono-code text-lg py-3 rounded-2xl bg-[#F7F7F5] border border-black/10 text-[#111111] focus:outline-none focus:border-black focus:bg-white transition-all font-bold"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs text-[#737373] font-mono-code">
                      <span>Expires in {otpTimer}s</span>
                      <button
                        type="button"
                        onClick={() => {
                          setOtpTimer(60);
                          setGeneratedOtp(Math.floor(100000 + Math.random() * 900000).toString());
                        }}
                        className="text-[#111111] underline hover:no-underline cursor-pointer"
                      >
                        Resend Code
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={enteredOtp.length < 6}
                      className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <span>Verify Code & Proceed</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </form>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 3: DOCUMENT UPLOAD (STUDENT & ALUMNI) */}
              {/* ========================================================================= */}
              {regStep === 'DOCUMENT_UPLOAD' && (
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setRegStep('EMAIL_OTP')}
                      className="w-7 h-7 rounded-full bg-[#F5F5F3] hover:bg-[#EBEBE8] border border-black/8 flex items-center justify-center text-[#4A4A4A] cursor-pointer"
                      title="Back to OTP"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                    </button>
                    <div>
                      <h3 className="font-display text-xl sm:text-2xl text-[#111111] font-normal">
                        {studentType === 'ALUMNI' ? 'Verify Your Alumni Status' : 'Verify Your Student Status'}
                      </h3>
                      <p className="text-xs text-[#4A4A4A]">
                        Upload a valid academic document to help verify your identity and unlock signed project lineage passports.
                      </p>
                    </div>
                  </div>

                  {/* Dropzone Component */}
                  <DocumentUploadDropzone
                    studentType={studentType}
                    onFileSelected={(data) => {
                      setUploadedDoc({
                        documentType: data.documentType,
                        fileName: data.fileName,
                        fileSize: data.fileSize
                      });
                    }}
                    onFileRemoved={() => {
                      setUploadedDoc(null);
                    }}
                  />

                  {/* Submit / Skip Actions */}
                  <div className="pt-2 space-y-2">
                    <button
                      type="button"
                      onClick={() => finalizeRegistration(uploadedDoc)}
                      disabled={!uploadedDoc || isAuthenticating}
                      className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-medium flex items-center justify-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-50"
                    >
                      <span>{isAuthenticating ? 'Submitting...' : 'Upload Document & Submit for Verification'}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>

                    <button
                      type="button"
                      onClick={() => finalizeRegistration(null)}
                      disabled={isAuthenticating}
                      className="w-full py-2.5 rounded-xl bg-transparent hover:bg-[#F5F5F3] text-xs text-[#737373] hover:text-[#111111] font-medium transition-colors cursor-pointer"
                    >
                      Skip for now / Verify Later
                    </button>
                  </div>
                </div>
              )}

              {/* ========================================================================= */}
              {/* STEP 4: VERIFICATION PIPELINE SUMMARY & CONTINUITY ONBOARDING */}
              {/* ========================================================================= */}
              {regStep === 'SUMMARY_SUCCESS' && (
                <div className="py-2 space-y-5">
                  <div className="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700 mx-auto shadow-xs">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <h3 className="font-display text-2xl text-[#111111] font-normal">
                      Account Registered Successfully
                    </h3>
                    <p className="text-xs text-[#4A4A4A] max-w-md mx-auto">
                      Your institutional account for <strong>{fullName}</strong> has been created on the ProjectVerse node.
                    </p>
                  </div>

                  {/* Verification Pipeline Timeline */}
                  <div className="p-4 rounded-2xl bg-[#F7F7F5] border border-black/8 space-y-2.5 text-xs font-mono-code">
                    <span className="text-[10.5px] uppercase font-semibold text-[#737373] block mb-1">
                      Identity Verification Pipeline
                    </span>

                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">1. Account Credentials:</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Created ✓
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">2. Institutional Email Ownership:</span>
                      <span className="text-emerald-700 font-semibold flex items-center gap-1">
                        <Check className="w-3.5 h-3.5" /> Verified ✓
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">3. Academic Domain:</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        isDomainAcademic ? 'text-emerald-700' : 'text-amber-700'
                      }`}>
                        {isDomainAcademic ? <Check className="w-3.5 h-3.5" /> : <Clock className="w-3.5 h-3.5" />}
                        {isDomainAcademic ? 'Verified Domain ✓' : 'Manual Review Staged'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#4A4A4A]">4. Academic Document Status:</span>
                      <span className={`font-semibold flex items-center gap-1 ${
                        uploadedDoc ? 'text-amber-700' : 'text-[#737373]'
                      }`}>
                        {uploadedDoc ? <Clock className="w-3.5 h-3.5" /> : '•'}
                        {uploadedDoc ? 'Verification Pending ⏳' : 'Not Submitted'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-black/8">
                      <span className="text-[#111111] font-bold">Overall Account Status:</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">
                        Verification Pending
                      </span>
                    </div>
                  </div>

                  {/* Project Continuity Card */}
                  <div className="p-4 rounded-2xl bg-[#111111] text-white space-y-2 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono-code text-white/60 uppercase font-semibold">
                        PROJECT CONTINUITY
                      </span>
                      <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-white/10 text-white">
                        PROJECT VERSE
                      </span>
                    </div>
                    
                    <h4 className="text-sm font-semibold text-white">
                      {studentType === 'ALUMNI' ? 'Alumni Mentorship & Legacy' : 'Student Research & Capstone Engine'}
                    </h4>
                    
                    <p className="text-xs text-white/80 leading-relaxed">
                      {studentType === 'ALUMNI'
                        ? 'Mentor • Contribute • Share Experience — Your past milestones anchor the lineage foundation for upcoming student generations.'
                        : 'Build • Collaborate • Learn • Continue — Never build from scratch. Inherit verified codebases, collaborate across campuses, and publish cryptographic proof of work.'}
                    </p>
                  </div>

                  {/* Final Enter Button */}
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        onAuthenticated(selectedRole);
                        onClose();
                      }}
                      className="btn-primary-black w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                    >
                      <span>Enter ProjectVerse Workspace</span>
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
