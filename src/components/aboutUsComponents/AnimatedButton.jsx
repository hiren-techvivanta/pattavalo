import React, { useState } from "react";
import { motion } from "framer-motion";

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
      style={{
        // Only apply hover effects on devices with fine pointers
        '@media (hover: hover) and (pointer: fine)': {
          '--clip-path-transition': '0.65s cubic-bezier(0.785, 0.135, 0.15, 0.86)'
        }
      }}
    >
      {/* Main content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {Icon && <Icon className="w-5 h-5" />}
      </span>

      {/* Clip-path animated overlay */}
      <motion.div
        className="absolute inset-[-1px] bg-black text-black hover:text-white hidden rounded-full hover:flex items-center justify-between px-8 z-20"
        initial={{
          clipPath: "inset(1.5rem 2rem 1.5rem calc(100% - 7.5rem) round 4.25rem)"
        }}
        animate={{
          clipPath: isHovered 
            ? "inset(0rem 0rem 0rem 0rem round 4.25rem)" 
            : "inset(1.5rem 2rem 1.5rem calc(100% - 7.5rem) round 4.25rem)"
        }}
        transition={{
          duration: 0.65,
          ease: [0.785, 0.135, 0.15, 0.86]
        }}
      >
        <motion.span 
          className="font-medium"
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20
          }}
          transition={{ delay: isHovered ? 0.3 : 0, duration: 0.3 }}
        >
          {children}
        </motion.span>
        
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0,
            x: isHovered ? 0 : -20,
            scale: isHovered ? 1 : 0.8
          }}
          transition={{ delay: isHovered ? 0.4 : 0, duration: 0.3 }}
        >
          {Icon ? (
            <Icon className="w-5 h-5" />
          ) : (
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="w-5 h-5"
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
    </motion.button>
  );
};

export default ClipPathButton;
