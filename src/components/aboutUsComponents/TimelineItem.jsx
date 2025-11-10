import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ 
  year, 
  data, 
  isSelected, 
  onClick, 
  index = 0,
  isLast = false 
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={`
        ${!isLast ? "border-b border-gray-200" : ""} 
        py-4 sm:py-6 font-semibold text-[16px] sm:text-[16px] 
        transition-all duration-300 cursor-pointer
        ${isSelected
          ? "bg-[#2E437C] text-white shadow-inner"
          : "text-[#222222] hover:bg-[#2E437C] hover:text-white"
        }
      `}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      viewport={{ once: true }}
    >
      {year} - {data.title}
    </motion.div>
  );
};

export default TimelineItem;
