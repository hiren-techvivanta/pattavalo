import React from 'react';
import { motion } from 'framer-motion';

const AnimatedImage = ({ 
  src, 
  alt, 
  className = "", 
  containerClassName = "",
  hoverScale = 1.05,
  variants
}) => {
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div 
      className={`overflow-hidden ${containerClassName} aspect-[4/3]`}
      variants={variants || scaleUp}
    >
      <motion.img
        src={src}
        alt={alt}
        className={`object-cover ${className}`}
        whileHover={{ scale: hoverScale }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default AnimatedImage;
