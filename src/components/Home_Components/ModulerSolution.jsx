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

 const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };
    const splitText = (text) =>
      text.split("").map((char, i) => (
        <motion.span key={i} variants={letterVariants} className="inline-block">
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ));
  return (
    <section className="container mx-auto w-full px-4 md:px-10 lg:px-5 xl:px-5 py-10 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={letterVariants}
        className="mb-8 sm:mb-12 md:text-left px-3"
      >
        <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#BABEC8] leading-snug">
          
          {splitText("Your Crafted, ")}
          <span className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#2E437C]">
            
          {splitText("Modular Solution")}

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
            className="group relative flex flex-col items-center justify-center p-5 bg-white
             transition-all duration-300 cursor-pointer overflow-hidden rounded-lg"
            style={{
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
            }}
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#2E437C] to-[#1d3b72]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Icon */}
            <motion.div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain transition-all duration-300
                 group-hover:brightness-0 group-hover:invert" 
              />
            </motion.div>

            {/* Title */} 
            <motion.p
              className="relative z-10 text-xs sm:text-sm md:text-base font-medium
               text-gray-700 group-hover:text-white transition-colors duration-300
               text-center leading-tight max-w-full"
              whileHover={{
                scale: 1.01,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
            >
              {item.title}
            </motion.p>

            {/* Bottom Border */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r
               from-[#2E437C] to-[#1d3b72]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
