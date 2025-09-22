import React, { useState } from "react";
import { motion } from "framer-motion";
import BEARING from "../../assets/SVG/BEARING.svg";
import CHAIN from "../../assets/SVG/DRAG CHAIN.svg";
import CONVEYOR from "../../assets/SVG/CONVEYOR COMPONENT.svg";
import MODULAR from "../../assets/SVG/MODULAR BELT.svg";
import SSCHAIN from "../../assets/SVG/SS CHAIN & SPROCKET.svg";
import THERMOPLASTICCHAIN from "../../assets/SVG/THERMO PLASTIC CHAIN.svg";
import FINGERCHAIN from "../../assets/SVG/FINGER CHAIN.svg";
import ZBUCKET from "../../assets/SVG/BUCKET.svg";
import WEARSTRIP from "../../assets/SVG/WEAR STRIP_1.svg";
import SPIRALFREEZER from "../../assets/SVG/SPPIRAL T2800.svg";
import SPIRALLOGISTICS from "../../assets/SVG/AF 400.svg";
import FLEXZERO from "../../assets/SVG/FZ 90.svg";

export default function ModulerSolution() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const solutions = [
    {
      title: "BEARING",
      icon: BEARING,
      animation: {
        rotate: [0, 360],
        transition: { duration: 3, repeat: Infinity, ease: "linear" },
      },
    },
    {
      title: "CABLE DRAG CHAIN",
      icon: CHAIN,
      animation: {
        x: [0, 3, -3, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "CONVEYOR COMPONENT",
      icon: CONVEYOR,
      animation: {
        y: [0, -2, 0, 2, 0],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "MODULAR BELT",
      icon: MODULAR,
      animation: {
        scale: [1, 1.05, 1],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "SS CHAIN & SPROCKET",
      icon: SSCHAIN,
      animation: {
        rotate: [0, 3, -3, 0],
        transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "THERMOPLASTIC CHAIN & SPROCKET",
      icon: THERMOPLASTICCHAIN,
      animation: {
        y: [0, -1, 0],
        rotate: [0, 2, 0, -2, 0],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "FINGER CHAIN & ASSEMBLY",
      icon: FINGERCHAIN,
      animation: {
        scale: [1, 1.03, 1],
        transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "Z BUCKET ELEVATOR",
      icon: ZBUCKET,
      animation: {
        y: [0, -3, 0],
        transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "WEAR STRIP",
      icon: WEARSTRIP,
      animation: {
        x: [0, 2, -2, 0],
        transition: { duration: 2.2, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "SPIRAL FREEZER",
      icon: SPIRALFREEZER,
      animation: {
        rotate: [0, 360],
        transition: { duration: 8, repeat: Infinity, ease: "linear" },
      },
    },
    {
      title: "SPIRAL LOGISTICS",
      icon: SPIRALLOGISTICS,
      animation: {
        scale: [1, 1.06, 1],
        transition: { duration: 3, repeat: Infinity, ease: "easeInOut" },
      },
    },
    {
      title: "FLEXZERO",
      icon: FLEXZERO,
      animation: {
        y: [0, -1.5, 0],
        rotate: [0, 1, 0, -1, 0],
        transition: { duration: 2.8, repeat: Infinity, ease: "easeInOut" },
      },
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 15,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        mass: 0.8,
      },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.1,
      },
    },
  };

  return (
    <section className="container mx-auto w-full px-6 md:px-0 py-12 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={titleVariants}
        className="mb-8 sm:mb-12 md:text-left px-3"
      >
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#BABEC8] leading-snug">
          Your Crafted,
          <span className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#2E437C]">
            Modular Solution
          </span>
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={containerVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 text-center"
      >
        {solutions.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            whileHover={{
              y: -2,
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              },
            }}
            className="group relative flex flex-col items-center justify-center p-5 rounded-2xl bg-white border border-gray-50 hover:border-gray-200 transition-all duration-300 cursor-pointer overflow-hidden"
            style={{
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#2E437C]/5 via-transparent to-[#1d3b72]/5 opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />

            <motion.div
              className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center"
              animate={hoveredIndex === idx ? item.animation : {}}
              whileHover={{
                scale: 1.08,
                transition: {
                  type: "spring",
                  stiffness: 600,
                  damping: 25,
                  mass: 0.4,
                },
              }}
            >
              <motion.img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain transition-all duration-300 group-hover:brightness-75"
                whileHover={{
                  filter: "brightness(0.8) saturate(1.2)",
                  transition: { duration: 0.2 },
                }}
              />
            </motion.div>

            <motion.p
              className="relative z-10 text-xs sm:text-sm md:text-base font-medium text-gray-700 transition-colors duration-300 text-center leading-tight max-w-full"
              whileHover={{
                color: "#2E437C",
                scale: 1.01,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
            >
              {item.title}
            </motion.p>

            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#2E437C] to-[#1d3b72] opacity-0 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
