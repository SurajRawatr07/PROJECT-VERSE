import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar, PublicPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { ApproachFlowSection } from './components/ApproachFlowSection';
import { CoreInnovationsSection } from './components/CoreInnovationsSection';
import { TrustSection } from './components/TrustSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

// Dedicated Separate Pages
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';

// Authenticated Application
import { AuthAppView, UserRole } from './components/AuthAppView';

// Modals
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { BuildProjectModal } from './components/modals/BuildProjectModal';
import { JoinProjectModal } from './components/modals/JoinProjectModal';
import { AuthModal } from './components/modals/AuthModal';
import { ProofOfWorkModal } from './components/modals/ProofOfWorkModal';

import { ProjectItem } from './types';

function MainAppContent() {
  // Navigation View State: public pages ('home' | 'about' | 'how-it-works') or authenticated workspace
  const [currentPage, setCurrentPage] = useState<PublicPage>('home');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [joinProjectTarget, setJoinProjectTarget] = useState<ProjectItem | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isProofOfWorkOpen, setIsProofOfWorkOpen] = useState(false);

  // Authentication Handlers
  const handleOpenLogin = () => {
    setAuthMode('login');
    setIsAuthModalOpen(true);
  };

  const handleOpenRegister = () => {
    setAuthMode('register');
    setIsAuthModalOpen(true);
  };

  const handleAuthenticated = (role: UserRole) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPage = (page: PublicPage) => {
    setCurrentPage(page);
    setIsAuthenticated(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If user is inside the authenticated workspace
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0F14] text-slate-100 selection:bg-indigo-500 selection:text-white font-body relative overflow-x-hidden transition-colors duration-200">
        <AuthAppView
          initialRole={currentRole}
          onLogout={handleLogout}
          onOpenProjectDetail={(project) => setSelectedProject(project)}
          onOpenBuildProject={() => setIsBuildModalOpen(true)}
          onOpenJoinProject={(project) => setJoinProjectTarget(project)}
          onOpenProofOfWork={() => setIsProofOfWorkOpen(true)}
        />

        {/* Interactive Modals */}
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onJoinClick={(project) => setJoinProjectTarget(project)}
        />

        <BuildProjectModal
          isOpen={isBuildModalOpen}
          onClose={() => setIsBuildModalOpen(false)}
          onProjectCreated={() => setIsBuildModalOpen(false)}
        />

        <JoinProjectModal
          project={joinProjectTarget}
          onClose={() => setJoinProjectTarget(null)}
        />

        <ProofOfWorkModal
          isOpen={isProofOfWorkOpen}
          onClose={() => setIsProofOfWorkOpen(false)}
        />
      </div>
    );
  }

  // Public Website: Home, About, or How It Works
  return (
    <div className="min-h-screen bg-[#0A0F14] text-slate-100 selection:bg-indigo-500 selection:text-white font-body relative overflow-x-hidden transition-colors duration-200">
      {/* Floating Liquid-Glass Navbar */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />

      {/* Page Content Rendering */}
      {currentPage === 'home' && (
        <main>
          {/* Hero Section */}
          <Hero
            onExploreClick={() => handleSelectPage('how-it-works')}
            onGetStartedClick={handleOpenRegister}
          />

          {/* Section 2: The Problem (3 Short Points) */}
          <ProblemSection />

          {/* Section 3: What ProjectVerse Changes (From Submission to Continuation flow) */}
          <ApproachFlowSection />

          {/* Section 4: Three Core Innovations */}
          <CoreInnovationsSection />

          {/* Section 5: Trust (Proof, Not Just Claims) */}
          <TrustSection />

          {/* Section 6: Final CTA */}
          <CTASection
            onGetStartedClick={handleOpenRegister}
            onHowItWorksClick={() => handleSelectPage('how-it-works')}
          />
        </main>
      )}

      {currentPage === 'about' && (
        <AboutView
          onGetStarted={handleOpenRegister}
          onExploreHowItWorks={() => handleSelectPage('how-it-works')}
        />
      )}

      {currentPage === 'how-it-works' && (
        <HowItWorksView
          onGetStarted={handleOpenRegister}
        />
      )}

      {/* Footer */}
      <Footer onSelectPage={handleSelectPage} />

      {/* Global Interactive Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        initialMode={authMode}
        onClose={() => setIsAuthModalOpen(false)}
        onAuthenticated={handleAuthenticated}
      />

      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onJoinClick={(project) => setJoinProjectTarget(project)}
      />

      <BuildProjectModal
        isOpen={isBuildModalOpen}
        onClose={() => setIsBuildModalOpen(false)}
        onProjectCreated={() => setIsBuildModalOpen(false)}
      />

      <JoinProjectModal
        project={joinProjectTarget}
        onClose={() => setJoinProjectTarget(null)}
      />

      <ProofOfWorkModal
        isOpen={isProofOfWorkOpen}
        onClose={() => setIsProofOfWorkOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <MainAppContent />
    </ThemeProvider>
  );
}
