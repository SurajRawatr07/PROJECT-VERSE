import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, HelpCircle } from 'lucide-react';

interface CTASectionProps {
  onGetStartedClick: () => void;
  onHowItWorksClick: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onGetStartedClick,
  onHowItWorksClick
}) => {
  return (
    <section id="cta" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#0A0F14] border-t border-white/5 overflow-hidden transition-colors duration-300">
      {/* Subtle Ambient Radial Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-indigo-600/[0.05] dark:bg-indigo-600/[0.07] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="liquid-glass-elevated rounded-3xl p-8 sm:p-14 border border-white/12 shadow-2xl relative overflow-hidden"
        >
          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-white font-normal max-w-2xl mx-auto leading-tight mb-4">
            “Build Something That Continues.”
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-slate-300/90 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
            “Discover existing work. Build with the right people. Leave something valuable for the next batch.”
          </p>

          {/* Buttons: Get Started & How It Works */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              id="cta-get-started-btn"
              onClick={onGetStartedClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-white text-[#0A0F14] font-medium text-sm sm:text-base hover:bg-slate-100 shadow-xl shadow-white/10 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-[#0A0F14]" />
            </button>

            <button
              id="cta-how-it-works-btn"
              onClick={onHowItWorksClick}
              className="w-full sm:w-auto px-7 py-3.5 rounded-full liquid-glass text-white font-medium text-sm sm:text-base hover:bg-white/10 border-white/20 hover:border-white/30 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 text-indigo-400 dark:text-indigo-300" />
              <span>How It Works</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
