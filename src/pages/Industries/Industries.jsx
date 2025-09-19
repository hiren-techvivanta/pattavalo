import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../../components/Navbar/Navbar";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";

import bl1 from "../../assets/images/bl1.jpg";
import bl2 from "../../assets/images/bl2.jpg";
import bl3 from "../../assets/images/bl3.jpg";
import bl4 from "../../assets/images/bl4.jpg";
import { HiDownload } from "react-icons/hi";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";

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

  // Filter data based on search query
  const filteredData = data.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.destription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
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
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const searchVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        delay: 0.3,
      },
    },
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <>
      <Navbar navStyle={"white"} />
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="flex justify-between items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={headerVariants}>
            <motion.h1
              className="text-[#BABEC8] font-[700] text-[36px]"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              Downloads
            </motion.h1>
            <motion.p
              className="text-[20px]"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            >
              Learn more about us at your convenience
            </motion.p>
          </motion.div>

          <motion.div
            className="relative w-full md:w-64 lg:w-72"
            variants={searchVariants}
          >
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <motion.div
                animate={{
                  rotate: searchQuery ? 90 : 0,
                  scale: searchQuery ? 1.1 : 1,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <IoSearchOutline className="w-4 h-4 text-gray-400" />
              </motion.div>
            </div>

            <motion.input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2 text-sm rounded-[22px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-200"
              whileFocus={{
                scale: 1.02,
                boxShadow: "0 4px 15px rgba(59, 130, 246, 0.15)",
                borderColor: "#3b82f6",
                transition: { duration: 0.2 },
              }}
            />

            <AnimatePresence>
              {searchQuery && (
                <motion.button
                  onClick={clearSearch}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  initial={{ opacity: 0, scale: 0, rotate: -90 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0, rotate: 90 }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.9,
                    transition: { duration: 0.1 },
                  }}
                >
                  <IoCloseCircle className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={searchQuery} // Re-animate when search changes
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 pt-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {filteredData.length > 0 ? (
              filteredData.map((v, i) => (
                <motion.div
                  className="w-[100%] flex gap-6 p-2"
                  key={v.id}
                  variants={itemVariants}
                  custom={i}
                  whileHover={{
                    y: -5,
                    transition: {
                      duration: 0.3,
                      ease: "easeOut",
                    },
                  }}
                  layout // Smooth layout transitions
                >
                  <motion.img
                    src={v.img}
                    className="w-[135px] h-[180px] lg:w-[200px] lg:h-[264px] object-cover"
                    alt={v.title}
                    loading="lazy"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.2,
                    }}
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.3 },
                    }}
                  />
                  <motion.div
                    className="h-[100%] relative flex-1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: i * 0.1 + 0.3,
                    }}
                  >
                    <motion.h6
                      className="font-[600] text-[16px] lg:text-[20px] pt-3"
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
                      className="text-[#667085] text-[12px] lg:text-[15px] pt-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1 + 0.5,
                      }}
                    >
                      {v.destription}
                    </motion.p>
                    <motion.div
                      className="absolute bottom-0 right-0"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.4,
                        delay: i * 0.1 + 0.6,
                        ease: "backOut",
                      }}
                    >
                      <AnimatedButton
                        icon={HiDownload}
                        color={"#2E437C"}
                        hoverColor={`#2E437C`}
                        px={6}
                        py={1}
                      >
                        Download
                      </AnimatedButton>
                    </motion.div>
                  </motion.div>
                </motion.div>
              ))
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="text-gray-400 mb-4">
                  <svg
                    className="w-16 h-16 mx-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.653M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">
                  No downloads found
                </h3>
                <p className="text-gray-400">
                  No items match "{searchQuery}". Try a different search term.
                </p>
                <motion.button
                  onClick={clearSearch}
                  className="mt-4 px-4 py-2 bg-[#2E437C] text-white rounded-lg hover:bg-[#1E2F5C] transition-colors duration-200"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.1 },
                  }}
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
