import React from 'react';
import { ShieldAlert, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface AccessDeniedProps {
  onGoToDashboard: () => void;
  message?: string;
}

export const AccessDenied: React.FC<AccessDeniedProps> = ({
  onGoToDashboard,
  message = "You don't have permission to access this area."
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
      className="w-full max-w-lg mx-auto my-12 p-8 sm:p-10 rounded-2xl bg-white border border-black/8 shadow-xs text-center flex flex-col items-center"
    >
      <div className="w-12 h-12 rounded-2xl bg-[#F7F7F5] border border-black/8 flex items-center justify-center text-[#111111] mb-5">
        <ShieldAlert className="w-6 h-6 text-[#111111]" />
      </div>

      <h2 className="font-display text-2xl sm:text-3xl text-[#111111] font-normal tracking-tight mb-2">
        Access Restricted
      </h2>

      <p className="text-sm text-[#4A4A4A] leading-relaxed max-w-sm mb-6 font-body">
        {message}
      </p>

      <button
        id="btn-access-denied-dashboard"
        onClick={onGoToDashboard}
        className="btn-primary-black px-6 py-2.5 rounded-xl text-xs font-medium inline-flex items-center gap-2 cursor-pointer shadow-xs"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Go to Dashboard</span>
      </button>
    </motion.div>
  );
};
