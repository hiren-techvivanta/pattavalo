import React from "react";
import { motion } from "framer-motion";
import { CustomHeading } from "../../common/CustomHeading";

export default function Title({ props }) {


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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="my-auto md:text-left px-0"
      >
        <h2 className="text-[40px] md:text-[100px] font-[500] text-[#BABEC8] leading-[55px] md:leading-[98px] text-center md:text-start">
          <CustomHeading title={props.one} className="font-[500]" />
          <CustomHeading
            title={props.two}
            className="font-[500] text-[#2E437C]"
          />
        </h2>
      </motion.div>
    </>
  );
}
