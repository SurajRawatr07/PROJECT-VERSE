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
    <section id="cta" className="relative w-full py-24 sm:py-32 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 overflow-hidden">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45 }}
          className="card-white p-8 sm:p-14 relative overflow-hidden"
        >
          {/* Eyebrow */}
          <span className="text-xs font-mono-code uppercase tracking-widest text-[#737373] font-semibold">
            Join the Network
          </span>

          {/* Heading */}
          <h2 className="font-display text-3xl sm:text-5xl md:text-6xl text-[#111111] font-normal max-w-2xl mx-auto leading-tight mb-4 mt-2">
            “Build Something That Continues.”
          </h2>

          {/* Supporting Text */}
          <p className="font-body text-[#4A4A4A] text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8 sm:mb-10">
            “Discover existing work. Build with the right people. Leave something valuable for the next batch.”
          </p>

          {/* Buttons: Get Started & How It Works */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              id="cta-get-started-btn"
              onClick={onGetStartedClick}
              className="btn-primary-black w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base font-medium"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              id="cta-how-it-works-btn"
              onClick={onHowItWorksClick}
              className="btn-secondary-white w-full sm:w-auto px-7 py-3.5 flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base font-medium"
            >
              <HelpCircle className="w-4 h-4 text-[#111111]" />
              <span>How It Works</span>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
