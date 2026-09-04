import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass } from 'lucide-react';

interface CTASectionProps {
  onGetStartedClick: () => void;
  onExploreProjectsClick?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onGetStartedClick,
  onExploreProjectsClick,
}) => {
  return (
    <section id="cta" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#FFFFFF] border-t border-black/8 overflow-hidden font-serif">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-white p-8 sm:p-12 md:p-14 relative overflow-hidden border border-black/8 shadow-xs"
        >
          {/* Heading */}
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] text-[#111111] font-bold tracking-tight max-w-xl mx-auto leading-tight uppercase mb-3">
            READY TO BEGIN?
          </h2>

          {/* Supporting text */}
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] max-w-lg mx-auto leading-relaxed mb-8 tracking-wide">
            Start exploring projects or register to build your Project Passport.
          </p>

          {/* Buttons: [ Get Started ↗ ]  [ Explore Projects → ] */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <button
              id="cta-get-started-btn"
              onClick={onGetStartedClick}
              className="btn-primary-black w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer text-[15px] sm:text-[16px] font-medium shadow-xs font-serif tracking-wide hover:bg-black transition-colors"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-4 h-4 text-white" />
            </button>

            {onExploreProjectsClick && (
              <button
                id="cta-explore-projects-btn"
                onClick={onExploreProjectsClick}
                className="btn-secondary-white w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer text-[15px] sm:text-[16px] font-medium shadow-xs font-serif tracking-wide border border-black/10 hover:border-black/25 transition-colors"
              >
                <span>Explore Projects</span>
                <Compass className="w-4 h-4 text-[#111111]" />
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
