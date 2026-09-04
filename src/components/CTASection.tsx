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
    <section id="cta" className="relative w-full py-20 sm:py-28 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 overflow-hidden font-serif">
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="card-white p-8 sm:p-14 relative overflow-hidden"
        >
          {/* Eyebrow */}
          <span className="text-[12px] uppercase tracking-widest text-[#737373] font-semibold">
            Join the Network
          </span>

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl text-[#111111] font-bold tracking-tight max-w-xl mx-auto leading-tight mb-4 mt-2">
            Build Something That Continues.
          </h2>

          {/* Supporting Text */}
          <p className="text-[#4A4A4A] text-sm sm:text-base max-w-lg mx-auto leading-relaxed mb-8 tracking-wide">
            Discover verified work. Connect with the right team. Hand your project forward to the next batch.
          </p>

          {/* Buttons: Get Started & How It Works */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
            <button
              id="cta-get-started-btn"
              onClick={onGetStartedClick}
              className="btn-primary-black w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base font-semibold shadow-xs font-serif tracking-wide"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>

            <button
              id="cta-how-it-works-btn"
              onClick={onHowItWorksClick}
              className="btn-secondary-white w-full sm:w-auto px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base font-semibold shadow-xs hover:border-black/20 font-serif tracking-wide"
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

export default CTASection;
