import React from 'react';
import { motion } from 'framer-motion';

const StatCard = ({ number, label, index = 0 }) => {
  return (
    <motion.div 
      className="col-span-1"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.05 }}
      viewport={{ once: true }}
    >
      <motion.h2 
        className="text-4xl lg:text-[48px] font-[700] text-[#BABEC8] mb-2 sm:mb-4"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ 
          delay: index * 0.1, 
          type: "spring", 
          damping: 15,
          duration: 0.6 
        }}
        viewport={{ once: true }}
      >
        {number}
      </motion.h2>
      <p className="font-[500] text-[#2E437C] text-sm sm:text-lg lg:text-[24px]">
        {label}
      </p>
    </motion.div>
  );
};

export default StatCard;
