import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomHeading } from "../common/CustomHeading";
import Loader from "../common/Loader";
import CateComponent from "./modulerSolution/CateComponent";

export default function ModulerSolution() {
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

  return (
    <>
      <section className="container mx-auto grid-center-box-100 px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="my-auto md:text-left px-0"
        >
          <h2 className="text-[40px] md:text-[100px] font-[500] text-[#BABEC8] leading-[55px] md:leading-[98px] text-center md:text-start">
            <CustomHeading title="Your Crafted, " className="font-[500]" />
            <CustomHeading
              title="Modular Solution"
              className="font-[500] text-[#2E437C]"
            />
          </h2>
        </motion.div>

        <CateComponent />
      </section>
    </>
  );
}
