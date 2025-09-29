import React from "react";
import { motion } from "framer-motion";
import ConveyorImage from "../../assets/images/custom_conveyor.png";
import { FaArrowRight } from "react-icons/fa6";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";

export default function ExpertSolutions() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const textRevealVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        mass: 0.8,
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      x: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        mass: 0.9,
        delay: 0.3,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.01,
      y: -1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        mass: 0.4,
      },
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 },
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
    <section className="container min-h-screen flex flex-col-reverse mx-auto lg:flex-row items-center justify-between w-full px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10  bg-white font-articulat">
      <motion.div
        className="
    w-full 
    max-w-[90%] sm:max-w-2xl lg:max-w-4xl
    lg:w-1/2
    lg:pr-16 xl:pr-20
    mb-10 lg:mb-0
  "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Heading */}
        <motion.h1
          variants={containerVariants}
          className="
      text-[28px] sm:text-[34px] md:text-[42px] lg:text-[50px] xl:text-[54px]
      leading-[36px] sm:leading-[44px] md:leading-[52px] lg:leading-[60px]
      font-bold mb-6 sm:mb-8
    "
        >
          <span className="text-[#BABEC8] font-normal">
            {splitText("Expert ")}
          </span>
          <span className="text-[#2E437C] font-bold">
            {splitText("Solutions for Custom Conveyor ")}
          </span>
          <span className="text-[#BABEC8] font-normal">
            {splitText("Needs.")}
          </span>
        </motion.h1>

        {/* Paragraph 1 */}
        <motion.p
          className="
      text-sm sm:text-base md:text-lg
      text-[#A0A3AD]
      mb-4 sm:mb-6
      leading-relaxed
      font-normal
    "
          variants={textRevealVariants}
        >
          We are a team of 150+ experts leading and thriving in the
          manufacturing industry. Our large warehouse capacity facilitates
          extensive production services, enabling us to build robust products
          and machinery designed to last for generations.
        </motion.p>

        {/* Paragraph 2 */}
        <motion.p
          className="
      text-sm sm:text-base md:text-lg
      text-[#A0A3AD]
      mb-4 sm:mb-6
      leading-relaxed
      font-normal
    "
          variants={textRevealVariants}
        >
          With expertise across multiple industries, we deliver intelligent and
          unique belt solutions tailored to your specific requirements. Our
          long-term vision is to build a customer-centric brand through
          impeccable service and quality.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          className="w-12 sm:w-16 md:w-20 h-[2px] bg-[#2E437C] mb-6 sm:mb-8"
          variants={textRevealVariants}
        />

        {/* Button */}
        <motion.div
          variants={textRevealVariants}
          whileHover="hover"
          whileTap="tap"
          className="mt-4"
        >
          <AnimatedButton
            icon={FaArrowRight}
            color="#2E437C"
            hoverColor="#2E437C"
          >
            READ MORE
          </AnimatedButton>
        </motion.div>
      </motion.div>

      <motion.div
        className="lg:w-1/2 w-full flex justify-center lg:justify-end"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={imageVariants}
        draggable={false}
        onContextMenu={(e) => e.preventDefault()}
      >
        <motion.img
          src={ConveyorImage}
          alt="Custom Conveyor"
          className="w-full object-contain pointer-events-none select-none"
          whileHover={{
            scale: 1.02,
            transition: {
              type: "spring",
              stiffness: 300,
              damping: 25,
              duration: 0.4,
            },
          }}
        />
      </motion.div>
    </section>
  );
}
