import React from 'react';
import { motion } from 'framer-motion';

const TeamCard = ({ member, index = 0 }) => {
  const scaleUp = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.6, delay: index * 0.1, ease: "easeOut" } 
    }
  };

  return (
    <motion.div 
      className="flex-shrink-0 w-[183px] md:w-64 h-80 text-center"
      variants={scaleUp}
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <motion.img 
        src={`${import.meta.env.VITE_BACKEND_URL}/${member.image}`} 
        className="w-[391px] md:w-full h-[183px] md:h-60 object-cover" 
        alt={member.name}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      />
      <motion.h6 
        className="text-[20px] font-[700] pt-3"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 + 0.3 }}
      >
        {member.name}
      </motion.h6>
      <motion.p 
        className="opacity-40"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 0.4, y: 0 }}
        transition={{ delay: index * 0.1 + 0.4 }}
      >
        {member.position}
      </motion.p>
    </motion.div>
  );
};

export default TeamCard;
