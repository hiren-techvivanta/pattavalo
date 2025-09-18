import React from "react";
import { motion } from "framer-motion";
import ConveyorImage from "../../assets/images/custom_conveyor.png";
import { FaArrowRight } from "react-icons/fa6";
export default function ExpertSolutions() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const buttonVariants = {
    // hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <section className="container min-h-screen flex flex-col-reverse mx-auto  lg:flex-row items-center justify-between px-6 md:px-0   py-0 bg-white font-articulat">
      <motion.div
        className="lg:w-1/2 w-full lg:pr-20 mb-12 lg:mb-0"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="text-[42px] md:text-[48px] lg:text-[54px] leading-tight font-bold mb-8"
          variants={itemVariants}
        >
          <span className="text-[#BABEC8] font-normal">Expert </span>
          <span className="text-[#2E437C] font-bold">
            Solutions for Custom Conveyor{" "}
          </span>
          <span className="text-[#BABEC8] font-normal">Needs.</span>
        </motion.h1>

        <motion.p
          className="text-base md:text-lg text-[#A0A3AD] mb-6 leading-relaxed font-normal"
          variants={itemVariants}
        >
          We are a team of 150+ experts leading and thriving in the
          manufacturing industry. Our large warehouse capacity facilitates
          extensive production services, enabling us to build robust products
          and machinery designed to last for generations.
        </motion.p>

        <motion.p
          className="text-base md:text-lg text-[#A0A3AD] mb-6 leading-relaxed font-normal"
          variants={itemVariants}
        >
          With expertise across multiple industries, we deliver intelligent and
          unique belt solutions tailored to your specific requirements. Our
          long-term vision is to build a customer-centric brand through
          impeccable service and quality.
        </motion.p>

        <motion.div
          className="w-2 h-[2px]  mb-8"
          variants={itemVariants}
        ></motion.div>

        {/* Button */}
        <motion.div
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          className="mt-4"
        >
          <button
            className="relative inline-flex items-center justify-center px-6 py-3 rounded-full overflow-hidden transition-all duration-[1000ms] ease-in-out group border border-[#2E437C] text-[#2E437C] font-medium text-sm tracking-wide"
            style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400 }}
          >
           
            <div className="absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#2E437C] transition-transform duration-[1200ms] ease-in-out will-change-transform group-hover:scale-[30] scale-100" />

           
            <span className="relative z-10 transition-colors duration-[800ms] group-hover:text-white">
              READ MORE
            </span>

            
            <span className="relative z-10 ml-3 h-8 w-8 overflow-hidden flex items-center justify-center">
             
              <FaArrowRight
                size={18}
                className="absolute transition-transform duration-[1000ms] ease-in-out translate-x-0 opacity-100 group-hover:translate-x-6 group-hover:opacity-0 text-white"
              />
             
              <FaArrowRight
                size={18}
                className="absolute transition-transform duration-[1000ms] ease-in-out -translate-x-6 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-white"
              />
            </span>
          </button>
        </motion.div>
      </motion.div>

      {/* Right Side Image */}
      <motion.div
        className="lg:w-1/2 w-full flex justify-center lg:justify-end "
        initial={{ opacity: 0, x: 50 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { duration: 0.8, ease: "easeOut" },
        }}
      >
        <img
          src={ConveyorImage}
          alt="Custom Conveyor"
          className="w-full   object-contain"
        />
      </motion.div>
    </section>
  );
}
