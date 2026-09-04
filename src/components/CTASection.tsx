import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onGetStartedClick: () => void;
  onHowItWorksClick?: () => void;
}

export const CTASection: React.FC<CTASectionProps> = ({
  onGetStartedClick,
}) => {
  return (
    <section id="cta" className="relative w-full py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#F7F7F5] border-t border-black/8 overflow-hidden font-serif">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        {/* Banner Card */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="card-white p-8 sm:p-12 md:p-14 relative overflow-hidden"
        >
          {/* Heading: 32–40px Desktop, 28–34px Tablet, 26–30px Mobile */}
          <h2 className="text-[26px] sm:text-[30px] md:text-[36px] text-[#111111] font-bold tracking-tight max-w-xl mx-auto leading-tight uppercase mb-3">
            Give Your Project a Future.
          </h2>

          {/* Subtitle */}
          <p className="text-[15px] sm:text-[16px] md:text-[17px] text-[#4A4A4A] max-w-md mx-auto leading-relaxed mb-8 tracking-wide">
            Build it. Prove it. Continue it.
          </p>

          {/* Button: Get Started */}
          <div className="flex items-center justify-center">
            <button
              id="cta-get-started-btn"
              onClick={onGetStartedClick}
              className="btn-primary-black px-7 py-3 rounded-full flex items-center justify-center gap-2 cursor-pointer text-[15px] sm:text-[16px] font-medium shadow-xs font-serif tracking-wide"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 text-white" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
