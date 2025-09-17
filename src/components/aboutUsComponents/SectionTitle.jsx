import React from 'react';
import { motion } from 'framer-motion';

const SectionTitle = ({ 
  title, 
  subtitle, 
  description, 
  alignment = 'left',
  variants 
}) => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <motion.div 
      className={alignmentClasses[alignment]}
      variants={variants || fadeInUp}
    >
      <motion.h2
        className="text-3xl sm:text-4xl lg:text-[48px] font-[400] text-[#2E437C] mb-2 md:pt-10"
        variants={fadeInUp}
        style={{ lineHeight: "1.1" }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.h2 
          className="text-3xl sm:text-4xl lg:text-[48px] font-[700] text-[#BABEC8] mb-4 sm:mb-6"
          variants={fadeInUp}
        >
          {subtitle}
        </motion.h2>
      )}
      {description && (
        <motion.p 
          className="text-base sm:text-lg lg:text-[20px] text-[#848383] leading-relaxed opacity-60"
          variants={fadeInUp}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
};

export default SectionTitle;
