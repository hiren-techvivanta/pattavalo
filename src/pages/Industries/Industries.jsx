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

gsap.registerPlugin(ScrollTrigger);

const Industries = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.1,
  //     duration: 0.8,
  //     easing: (t) => 1 - Math.pow(1 - t, 3),
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     mouseMultiplier: 1.2,
  //     smoothTouch: false,
  //     touchMultiplier: 2,
  //     infinite: false,
  //     autoResize: true,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   lenis.on('scroll', ScrollTrigger.update);
    
  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   gsap.fromTo(".fade-up-element", 
  //     { 
  //       opacity: 0,
  //       y: 30,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: ".fade-up-element",
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       }
  //     }
  //   );

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);

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
        duration: 0.6,
      },
    },
  };

  const searchVariants = {
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
        stiffness: 400,
        damping: 25,
        delay: 0.2,
      },
    },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
        duration: 0.5,
      },
    },
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Navbar navStyle={"white"} />
      </motion.div>

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
          <motion.div variants={headerVariants} className="fade-up-element">
            <motion.h1
              className="text-[#BABEC8] font-bold text-3xl md:text-4xl lg:text-5xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              Downloads
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg md:text-xl mt-2"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
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
                  scale: searchQuery ? 1.1 : 1,
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
                scale: 1.01,
                boxShadow: "0 8px 25px rgba(46, 67, 124, 0.15)",
                transition: { duration: 0.2 },
              }}
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 90 }}
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    duration: 0.3,
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 90,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.1 },
                  }}
                >
                  <IoCloseCircle className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredData.length > 0 ? (
              filteredData.map((v, i) => (
                <motion.div
                  className="flex gap-6 p-4  bg-gradient-to-br from-white to-gray-50/50 hover:shadow-lg transition-all duration-300 fade-up-element"
                  key={v.id}
                  variants={itemVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.01,
                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    },
                  }}
                  layout
                >
                  <motion.img
                    src={v.img}
                    className="w-32 h-40 lg:w-48 lg:h-60 object-cover  shadow-md"
                    alt={v.title}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.9, rotateY: -5 }}
                    animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.2,
                    }}
                    whileHover={{
                      scale: 1.01,
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
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 25,
                        delay: i * 0.1 + 0.6,
                      }}
                    >
                      <AnimatedButton
                        icon={HiDownload}
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
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
                    scale: 1.05,
                    y: -2,
                    boxShadow: "0 10px 25px rgba(46, 67, 124, 0.3)",
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
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
