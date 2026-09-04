import React, { useState, useEffect } from 'react';
import { Navbar, PublicPage } from './components/Navbar';
import { SplashIntro } from './components/SplashIntro';
import { Hero } from './components/Hero';
import { HowProjectVerseWorksSection } from './components/HowProjectVerseWorksSection';
import { CoreInnovationsSection } from './components/CoreInnovationsSection';
import { TrustSection } from './components/TrustSection';
import { FAQSection } from './components/FAQSection';
import { CTASection } from './components/CTASection';
import { Footer } from './components/Footer';

// Dedicated Separate Pages
import { AboutView } from './components/AboutView';
import { HowItWorksView } from './components/HowItWorksView';

// Authenticated Application
import { AuthAppView, UserRole } from './components/AuthAppView';
import { getCurrentSession, clearSession } from './lib/authService';

// Modals
import { ProjectDetailModal } from './components/modals/ProjectDetailModal';
import { BuildProjectModal } from './components/modals/BuildProjectModal';
import { JoinProjectModal } from './components/modals/JoinProjectModal';
import { AuthModal } from './components/modals/AuthModal';
import { ProofOfWorkModal } from './components/modals/ProofOfWorkModal';

import { ProjectItem } from './types';

export default function App() {
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

  // Splash intro state (shows when website opens, exactly 3 seconds)
  const [showSplash, setShowSplash] = useState<boolean>(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  // Check existing session on mount
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setCurrentRole(session.user.role);
      setIsAuthenticated(true);
    }
  }, []);

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
    setIsAuthModalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLogout = () => {
    clearSession();
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
      <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-body relative overflow-x-hidden">
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
    <div className="min-h-screen bg-[#FFFFFF] text-[#111111] font-body relative overflow-x-hidden">
      {/* Brand Introduction Splash Sequence */}
      {showSplash && <SplashIntro onComplete={handleSplashComplete} />}

      {/* Floating Navbar */}
      <Navbar
        currentPage={currentPage}
        onSelectPage={handleSelectPage}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />

      {/* Page Content Rendering */}
      {currentPage === 'home' && (
        <main>
          {/* Section 1: Hero */}
          <Hero
            onExploreClick={() => handleSelectPage('how-it-works')}
            onGetStartedClick={handleOpenRegister}
          />

          {/* Section 2: Built Around Your Project & 6-Step How ProjectVerse Works */}
          <HowProjectVerseWorksSection
            onGetStartedClick={handleOpenRegister}
            onExploreProjectsClick={() => handleSelectPage('how-it-works')}
          />

          {/* Section 3: Core Features / Innovations */}
          <CoreInnovationsSection />

          {/* Section 4: Trust & Verification */}
          <TrustSection />

          {/* Section 5: Frequently Asked Questions */}
          <FAQSection />

          {/* Section 6: Final Ready To Begin? CTA */}
          <CTASection
            onGetStartedClick={handleOpenRegister}
            onExploreProjectsClick={() => handleSelectPage('how-it-works')}
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
          onExploreProjects={() => handleSelectPage('home')}
        />
      )}

      {/* Footer (Section: #F7F7F5) */}
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
