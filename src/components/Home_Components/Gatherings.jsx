import React from "react";
import { motion } from "framer-motion";
import next1 from "../../assets/images/next1.jpg";
import next2 from "../../assets/images/next2.jpg";
import next3 from "../../assets/images/next3.jpg";
import next4 from "../../assets/images/next4.jpg";

const events = [
  {
    id: 1,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next1,
  },
  {
    id: 2,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next2,
  },
  {
    id: 3,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next3,
  },
  {
    id: 4,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next4,
  },
];

export default function Gatherings() {
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
  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.08,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.4,
      },
    },
  };

  const cardHover = {
    hover: {
      y: -8,
      boxShadow: "0 20px 40px rgba(46, 67, 124, 0.15)",
      transition: {
        type: "spring",
        stiffness: 400,
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
    <section className="w-full px-4 md:px-10 lg:px-15 py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="container mx-auto mb-5 sm:mb-10 sm:px-6 lg:px-0 pb-1 md:text-left"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px] leading-17 md:leading-17">
          <span className="font-normal text-[#2E437C] block">
            {splitText("What's ")}
          </span>
          <span className="font-bold text-[#BABEC8] block">
            {splitText("Happening Next")}
          </span>
        </h1>
        <motion.p
          className="text-[#191919] mt-6 text-[20px] sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          Stay connected with our latest gatherings and innovations
        </motion.p>
      </motion.div>
      {/* <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"> */}
      <motion.div
        className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8"
        variants={cardGridVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial="hidden"
            whileInView="visible"
            whileHover="hover"
            viewport={{ once: true, margin: "-50px" }}
            variants={{
              ...cardVariants,
              visible: {
                ...cardVariants.visible,
                transition: {
                  ...cardVariants.visible.transition,
                  delay: index * 0.1,
                },
              },
            }}
            className="group overflow-hidden bg-white hover:bg-[#D8DEEE] border-b-2 border-transparent  hover:border-b-2 hover:border-[#2E437C]  transition-shadow duration-300 cursor-pointer"
          >
            <motion.div
              // variants={cardHover}
              className="relative"
            >
              <div className="overflow-hidden ">
                <motion.img
                  src={event.img}
                  alt={event.title}
                  variants={imageVariants}
                  className="w-full h-70 sm:h-76 md:h-80 lg:h-80 xl:h-100 2xl:h-100 object-cover p-2 "
                />
              </div>

              <motion.div
                className="flex items-center gap-4 p-4"
                initial={{ opacity: 0.8 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
              >
                <motion.div
                  className="bg-gray-100 w-14 h-14 flex flex-col items-center justify-center "
                  whileHover={{
                    backgroundColor: "#2E437C",
                    color: "#FFFFFF",
                    transition: { duration: 0.3 },
                  }}
                >
                  <p className="text-[11px] font-medium leading-tight">
                    {event.date.split(" ")[0]}
                  </p>
                  <p className="text-base font-semibold leading-tight">
                    {event.date.split(" ")[1]}
                  </p>
                </motion.div>

                <div>
                  <motion.h3
                    className="font-semibold text-gray-800 text-[15px] md:text-base"
                    whileHover={{ color: "#2E437C" }}
                    transition={{ duration: 0.2 }}
                  >
                    {event.title}
                  </motion.h3>
                  <p className="text-sm text-gray-500">{event.location}</p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
      {/* </div> */}
    </section>
  );
}
