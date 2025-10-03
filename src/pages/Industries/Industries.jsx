import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../../components/Navbar/Navbar";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";

import bl1 from "../../assets/images/bl1.jpg";
import bl2 from "../../assets/images/bl2.jpg";
import bl3 from "../../assets/images/bl3.jpg";
import bl4 from "../../assets/images/bl4.jpg";
import { HiDownload } from "react-icons/hi";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";
import { LuDownload } from "react-icons/lu";
import Seo from "../../components/common/Seo";

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const data = [
    {
      id: 1,
      img: bl1,
      title: "Vision 2025",
      destription:
        "A forward-looking brochure highlighting our roadmap, innovative goals, and the milestones we aim to achieve together.",
    },
    {
      id: 2,
      img: bl2,
      title: "Vision 2025",
      destription:
        "A forward-looking brochure highlighting our roadmap, innovative goals, and the milestones we aim to achieve together.",
    },
    {
      id: 3,
      img: bl3,
      title: "Vision 2025",
      destription:
        "A forward-looking brochure highlighting our roadmap, innovative goals, and the milestones we aim to achieve together.",
    },
    {
      id: 4,
      img: bl4,
      title: "Vision 2025",
      destription:
        "A forward-looking brochure highlighting our roadmap, innovative goals, and the milestones we aim to achieve together.",
    },
  ];

  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
  };

  const searchVariants = {
    hidden: {
      opacity: 0,
      x: 30,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  // const containerVariants = {
  //   hidden: { opacity: 0 },
  //   visible: {
  //     opacity: 1,
  //     transition: {
  //       staggerChildren: 0.08,
  //       delayChildren: 0.2,
  //     },
  //   },
  // };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.95,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
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
        duration: 0.6,
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
    <>
      <Seo
        title="Downloads | ATC Chain India"
        description="ATC Chain designs and manufactures high-quality components for the food, beverage, packaging, automotive and automation industries providing the best solution designs and after-sale support."
        url="https://www.atcchain.com/downloads"
      />

      <Navbar navStyle={"white"} />

      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 mt-10"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-6 mb-10"
          variants={containerVariants}
        >
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="fade-up-element"
          >
            <motion.h1
              className="text-[#BABEC8] font-bold text-3xl md:text-4xl lg:text-5xl"
              variants={containerVariants} 
            >
              {splitText("Downloads")}
            </motion.h1>

            <motion.p
              className="text-gray-600 text-lg md:text-xl mt-2"
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            >
              Learn more about us at your convenience
            </motion.p>
          </motion.div>

          <motion.div
            className="relative w-full md:w-80 lg:w-96"
            variants={searchVariants}
          >
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <motion.div
                animate={{
                  rotate: searchQuery ? 360 : 0,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <IoSearchOutline className="w-5 h-5 text-gray-400" />
              </motion.div>
            </div>

            <motion.input
              type="text"
              placeholder="Search downloads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-12 py-3 text-sm rounded-2xl border-2 border-gray-200 bg-gray-50/50 focus:ring-2 focus:ring-[#2E437C]/20 focus:border-[#2E437C] focus:outline-none focus:bg-white transition-all duration-300"
              whileFocus={{
                boxShadow: "0 8px 25px rgba(46, 67, 124, 0.15)",
                transition: { duration: 0.2 },
              }}
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    duration: 0.3,
                  }}
                  whileHover={{
                    rotate: 90,
                    transition: { duration: 0.2 },
                  }}
                >
                  <IoCloseCircle className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <AnimatePresence>
          <motion.div
            key={searchQuery}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
            variants={cardGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{
              once: true,
              amount: 0.1,
              margin: "-50px",
            }}
          >
            {filteredData.length > 0 ? (
              filteredData.map((v, i) => (
                <motion.div
                  className="flex gap-6 p-4 bg-gradient-to-br  hover:shadow-lg from-white to-gray-50/50 fade-up-element"
                  key={v.id}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    rotateX: -2,
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    },
                  }}
                >
                  <motion.img
                    src={v.img}
                    className="w-32 h-40 lg:w-48 lg:h-60 object-cover shadow-md"
                    alt={v.title}
                    loading="lazy"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.3,
                    }}
                    whileHover={{
                      rotateY: 5,
                      transition: { duration: 0.3 },
                    }}
                  />
                  <motion.div
                    className="flex-1 flex flex-col justify-between"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.3,
                    }}
                  >
                    <div>
                      <motion.h6
                        className="font-semibold text-lg lg:text-xl text-gray-800 mb-3"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.1 + 0.4,
                        }}
                      >
                        {v.title}
                      </motion.h6>

                      <motion.p
                        className="text-gray-600 text-sm lg:text-base leading-relaxed mb-4"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: i * 0.1 + 0.5,
                        }}
                      >
                        {v.destription}
                      </motion.p>
                    </div>

                    <motion.div
                      className="flex justify-end"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: i * 0.1 + 0.6,
                      }}
                    >
                      <AnimatedButton
                        icon={LuDownload}
                        color={"#2E437C"}
                        hoverColor={`#2E437C`}
                        px={6}
                        py={2}
                      >
                        Download
                      </AnimatedButton>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-20"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.6,
                }}
              >
                <motion.div
                  className="text-gray-300 mb-6"
                  animate={{
                    y: [0, -5, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <svg
                    className="w-20 h-20 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                    />
                  </svg>
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-gray-500 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  No downloads found
                </motion.h3>

                <motion.p
                  className="text-gray-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  No items match "{searchQuery}". Try a different search term.
                </motion.p>

                <motion.button
                  onClick={clearSearch}
                  className="px-6 py-3 bg-[#2E437C] text-white rounded-xl font-medium hover:bg-[#1E2F5C] transition-all duration-300 shadow-lg hover:shadow-xl"
                  whileHover={{
                    y: -2,
                    boxShadow: "0 10px 25px rgba(46, 67, 124, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    transition: { duration: 0.1 },
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Clear Search
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default Industries;
