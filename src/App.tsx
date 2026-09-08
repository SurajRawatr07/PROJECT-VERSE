import React, { useState, useEffect } from 'react';
import { Navbar, PublicPage } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { EcosystemSection } from './components/EcosystemSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { ProjectPassportSection } from './components/ProjectPassportSection';
import { ProjectLineageSection } from './components/ProjectLineageSection';
import { ProofOfWorkSection } from './components/ProofOfWorkSection';
import { CrossCampusNetworkSection } from './components/CrossCampusNetworkSection';
import { RolesSection } from './components/RolesSection';
import { FAQSection } from './components/FAQSection';
import { FinalCTASection } from './components/FinalCTASection';
import { Footer } from './components/Footer';

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
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentRole, setCurrentRole] = useState<UserRole>('STUDENT');

  // Modal states
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [isBuildModalOpen, setIsBuildModalOpen] = useState(false);
  const [joinProjectTarget, setJoinProjectTarget] = useState<ProjectItem | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isProofOfWorkOpen, setIsProofOfWorkOpen] = useState(false);

  // Check existing session on mount
  useEffect(() => {
    const session = getCurrentSession();
    if (session) {
      setCurrentRole(session.user.role);
      setIsAuthenticated(true);
    }
  }, []);

  // Handle URL path / hash smooth scrolling on initial mount or popstate
  useEffect(() => {
    const scrollToTarget = () => {
      const hash = window.location.hash.replace('#', '');
      const path = window.location.pathname.replace('/', '').toLowerCase();
      const targetId = hash || path;

      if (targetId) {
        // Map common paths to section IDs
        let elementId = targetId;
        if (targetId === 'how-it-works' || targetId === 'howitworks') elementId = 'how-it-works';
        if (targetId === 'about') elementId = 'about';
        if (targetId === 'faq') elementId = 'faq';
        if (targetId === 'home') elementId = 'home';

        setTimeout(() => {
          const el = document.getElementById(elementId);
          if (el) {
            const yOffset = -72;
            const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
          }
        }, 150);
      }
    };

    scrollToTarget();
    window.addEventListener('popstate', scrollToTarget);
    return () => window.removeEventListener('popstate', scrollToTarget);
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
    if (window.location.pathname !== '/') {
      window.history.pushState(null, '', '/');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectPage = (page: PublicPage) => {
    const element = document.getElementById(page);
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    } else if (page === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleExploreProjectVerse = () => {
    const element = document.getElementById('how-it-works');
    if (element) {
      const yOffset = -72;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // If user is inside the authenticated workspace
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-white text-[#111111] font-sans relative overflow-x-hidden">
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

  // =========================================================================
  // PUBLIC WEBSITE: SINGLE CONTINUOUS SCROLLING HOMEPAGE
  // Premium, modern, highly interactive, clean white/off-white aesthetic
  // =========================================================================
  return (
    <div className="min-h-screen bg-white text-[#111111] font-sans relative overflow-x-hidden selection:bg-black selection:text-white">
      {/* 1. Floating Pill Navbar with scroll shrink/expand */}
      <Navbar
        onSelectPage={handleSelectPage}
        onOpenLogin={handleOpenLogin}
        onOpenRegister={handleOpenRegister}
      />

      <main className="w-full">
        {/* 2. Hero Section (#home) */}
        <Hero
          onExploreClick={handleExploreProjectVerse}
          onGetStartedClick={handleOpenRegister}
        />

        {/* 3. The Problem Section (#about) */}
        <ProblemSection />

        {/* 4. ProjectVerse Solution / Ecosystem Diagram (#ecosystem) */}
        <EcosystemSection />

        {/* 5. How It Works Section (#how-it-works) */}
        <HowItWorksSection />

        {/* 6. Project Passport UI Mockup (#passport) */}
        <ProjectPassportSection />

        {/* 7. Project Lineage Timeline (#lineage) */}
        <ProjectLineageSection />

        {/* 8. Verified Proof of Work Chain (#proof-of-work) */}
        <ProofOfWorkSection />

        {/* 9. One Project. Many Campuses. (#cross-campus) */}
        <CrossCampusNetworkSection />

        {/* 10. Who Is It For? Roles Section (#roles) */}
        <RolesSection />

        {/* 11. FAQ Accordion (#faq) */}
        <FAQSection />

        {/* 12. Final CTA Section (#cta) */}
        <FinalCTASection
          onExploreClick={handleExploreProjectVerse}
          onGetStartedClick={handleOpenRegister}
        />
      </main>

      {/* 13. Minimal Premium Footer */}
      <Footer
        onSelectPage={handleSelectPage}
        onOpenLogin={handleOpenLogin}
      />

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
