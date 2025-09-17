import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ClipPathButton = ({
  children,
  onClick,
  className = "",
  icon: Icon,
  disabled = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative inline-flex items-center justify-center 
        px-8 py-4 h-[60px] min-w-[240px] rounded-full 
        bg-white text-black font-medium text-lg
        border border-gray-200 overflow-hidden
        disabled:opacity-50 disabled:cursor-not-allowed
        transition-all duration-300
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Main content */}
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{
          opacity: isHovered ? 0 : 1,
          y: isHovered ? -5 : 0
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
        {Icon && <Icon className="w-5 h-5" />}
      </motion.span>

      {/* Clip-path animated overlay */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-[-1px] bg-black text-white rounded-full flex items-center justify-between px-8 z-20"
            initial={{
              opacity: 0,
              clipPath: "inset(1.5rem 2rem 1.5rem calc(100% - 7.5rem) round 4.25rem)"
            }}
            animate={{
              opacity: 1,
              clipPath: "inset(0rem 0rem 0rem 0rem round 4.25rem)"
            }}
            exit={{
              opacity: 0,
              clipPath: "inset(1.5rem 2rem 1.5rem calc(100% - 7.5rem) round 4.25rem)"
            }}
            transition={{
              duration: 0.65,
              ease: [0.785, 0.135, 0.15, 0.86]
            }}
          >
            <motion.span 
              className="font-medium text-white"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.3, duration: 0.3 }}
            >
              {children}
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, x: -20, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -20, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 0.3 }}
            >
              {Icon ? (
                <Icon className="w-5 h-5 text-white" />
              ) : (
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className="w-5 h-5 text-white"
                >
                  <path 
                    d="M5 12H19M19 12L12 5M19 12L12 19" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ClipPathButton;
