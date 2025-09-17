import React from 'react';
import { motion } from 'framer-motion';

const AnimatedSection = ({ 
  children, 
  className = "", 
  variants,
  delay = 0 
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      className={`container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-8 sm:py-12 ${className}`}
      variants={variants || containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;
