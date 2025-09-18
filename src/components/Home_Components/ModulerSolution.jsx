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
        rotate: 360,
        transition: { duration: 3, repeat: Infinity, ease: "linear" },
      },
    },
    {
      title: "CABLE DRAG CHAIN",
      icon: CHAIN,
      animation: {
        x: [0, 8, 0],
        transition: { duration: 1.5, repeat: Infinity },
      },
    },
    {
      title: "CONVEYOR COMPONENT",
      icon: CONVEYOR,
      animation: {
        y: [0, -6, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      title: "MODULAR BELT",
      icon: MODULAR,
      animation: {
        scale: [1, 1.1, 1],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      title: "SS CHAIN & SPROCKET",
      icon: SSCHAIN,
      animation: {
        rotate: [0, 8, 0, -8, 0],
        transition: { duration: 3, repeat: Infinity },
      },
    },
    {
      title: "THERMOPLASTIC CHAIN & SPROCKET",
      icon: THERMOPLASTICCHAIN,
      animation: {
        y: [0, -5, 0],
        rotate: [0, 5, 0, -5, 0],
        transition: { duration: 2.5, repeat: Infinity },
      },
    },
    {
      title: "FINGER CHAIN & ASSEMBLY",
      icon: FINGERCHAIN,
      animation: {
        scale: [1, 1.05, 1],
        transition: { duration: 1.2, repeat: Infinity },
      },
    },
    {
      title: "Z BUCKET ELEVATOR",
      icon: ZBUCKET,
      animation: {
        y: [0, -8, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
    {
      title: "WEAR STRIP",
      icon: WEARSTRIP,
      animation: {
        x: [0, 6, 0],
        transition: { duration: 1.8, repeat: Infinity },
      },
    },
    {
      title: "SPIRAL FREEZER",
      icon: SPIRALFREEZER,
      animation: {
        rotate: 360,
        transition: { duration: 8, repeat: Infinity, ease: "linear" },
      },
    },
    {
      title: "SPIRAL LOGISTICS",
      icon: SPIRALLOGISTICS,
      animation: {
        scale: [1, 1.12, 1],
        transition: { duration: 3, repeat: Infinity },
      },
    },
    {
      title: "FLEXZERO",
      icon: FLEXZERO,
      animation: {
        y: [0, -5, 0],
        rotate: [0, 3, 0, -3, 0],
        transition: { duration: 2, repeat: Infinity },
      },
    },
  ];

  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  
  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "tween",
        ease: "easeOut",
        duration: 0.3, // सिर्फ entry ke liye
      },
    },
    hover: {
      scale: 1.05,
      y: -5,
      transition: {
        type: "tween",
        ease: "easeOut", // smooth & instant
        duration: 0.15, // fast response
      },
    },
  };

 
  const titleVariants = {
    hidden: {
      opacity: 0,
      y: -40,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        delay: 0.2,
      },
    },
  };

  return (
    <section className="container mx-auto w-full px-6 md:px-0 py-12 bg-white">
      {/* Enhanced Title Animation */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={titleVariants}
        className="mb-8 sm:mb-12  md:text-left px-3"
      >
        <h2
          className="
      text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 
      font-semibold text-[#BABEC8] leading-snug
    "
        >
          Your Crafted,
          <span
            className="
        block 
        text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl
        font-semibold text-[#2E437C]
      "
          >
            Modular Solution
          </span>
        </h2>
      </motion.div>

      {/* Solutions Grid with Enhanced Animations */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
        className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-10 text-center"
      >
        {solutions.map((item, idx) => (
          <motion.div
            key={idx}
            variants={itemVariants}
            whileHover="hover"
            onHoverStart={() => setHoveredIndex(idx)}
            onHoverEnd={() => setHoveredIndex(null)}
            className={`group flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 cursor-pointer ${
              item.highlight
                ? "bg-[#1d3b72] text-white"
                : "bg-transparent hover:bg-[#1d3b72]"
            }`}
          >
            {/* Icon with zoom effect and type-specific animation */}
            <motion.div
              className="w-14 h-14 mb-3 flex items-center justify-center"
              animate={hoveredIndex === idx ? item.animation : {}}
              whileHover={{
                scale: 1.15,
                transition: {
                  type: "tween",
                  ease: "easeOut",
                  duration: 0.15,
                },
              }}
            >
              <img
                src={item.icon}
                alt={item.title}
                className={`w-full h-full object-contain transition duration-200 ${
                  item.highlight
                    ? "invert brightness-200"
                    : "group-hover:invert group-hover:brightness-200"
                }`}
              />
            </motion.div>

            <p
              className={`text-xs sm:text-sm md:text-base font-normal transition duration-300 ${
                item.highlight
                  ? "text-white"
                  : "text-gray-700 group-hover:text-white"
              }`}
            >
              {item.title}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
