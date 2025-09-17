import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Navbar from "../../components/Navbar/Navbar";
import { IoSearchOutline, IoCloseCircle } from "react-icons/io5";
import NewsCard from "../../components/newsComponents/NewsCard";

// Images
import bl1 from "../../assets/images/bl1.jpg";
import bl2 from "../../assets/images/bl2.jpg";
import bl3 from "../../assets/images/bl3.jpg";
import bl4 from "../../assets/images/bl4.jpg";
import bl5 from "../../assets/images/bl5.jpg";
import bl6 from "../../assets/images/bl6.jpg";
import bl7 from "../../assets/images/bl7.jpg";
import bl8 from "../../assets/images/bl8.jpg";

import l1 from "../../assets/images/l1.png";
import l2 from "../../assets/images/l2.png";
import l3 from "../../assets/images/l3.png";
import l4 from "../../assets/images/l4.png";
import l5 from "../../assets/images/l5.png";
import l6 from "../../assets/images/l6.png";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";
import { HiDownload } from "react-icons/hi";
import AnimatedImage from "../../components/aboutUsComponents/AnimatedImage";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const News = () => {
  const [activeTab, setActiveTab] = useState("Latest");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Latest", "Blogs", "Events", "Featured Product"];

  const partners = [
    { id: 3, name: "l1", image: l1, width: 117 },
    { id: 4, name: "l2", image: l2, width: 110 },
    { id: 5, name: "l3", image: l3, width: 100 },
    { id: 6, name: "l4", image: l4, width: 200 },
    { id: 7, name: "l5", image: l5, width: 87 },
    { id: 8, name: "l6", image: l6, width: 200 },
  ];

  const allNews = [
    {
      image: bl1,
      news: "Latest",
      heading: "Revolutionary Conveyor Belt Technology",
      details:
        "Discover how our latest innovations are transforming manufacturing efficiency across industries.",
      date: "Dec 15, 2024",
      author: "Tech Team",
    },
    {
      image: bl2,
      news: "Blog",
      heading: "Industry Best Practices Guide",
      details:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      date: "Dec 12, 2024",
      author: "John Smith",
    },
    {
      image: bl3,
      news: "Events",
      heading: "Manufacturing Expo 2025",
      details:
        "Join us at the biggest manufacturing exhibition showcasing cutting-edge conveyor solutions.",
      date: "Jan 20, 2025",
      author: "Event Team",
    },
    {
      image: bl4,
      news: "Featured Product",
      heading: "Premium Modular Belt Series",
      details:
        "Our flagship product line featuring advanced materials and superior durability ratings.",
      date: "Dec 10, 2024",
      author: "Product Team",
    },
    {
      image: bl5,
      news: "Latest",
      heading: "Sustainability in Manufacturing",
      details:
        "Learn about our commitment to eco-friendly production processes and sustainable materials.",
      date: "Dec 8, 2024",
      author: "Green Team",
    },
    {
      image: bl6,
      news: "Blog",
      heading: "Maintenance Best Practices",
      details:
        "Essential tips for maintaining conveyor systems and maximizing their operational lifespan.",
      date: "Dec 5, 2024",
      author: "Maintenance Crew",
    },
    {
      image: bl7,
      news: "Events",
      heading: "Technical Workshop Series",
      details:
        "Hands-on workshops for engineers and technicians working with conveyor systems.",
      date: "Feb 15, 2025",
      author: "Training Team",
    },
    {
      image: bl8,
      news: "Featured Product",
      heading: "Smart Automation Solutions",
      details:
        "Integrated IoT sensors and monitoring systems for next-generation conveyor management.",
      date: "Dec 1, 2024",
      author: "Innovation Lab",
    },
  ];

  const clearSearch = () => {
    setSearchQuery("");
  };

  // Filter data
  const getFilteredData = () => {
    let filtered = allNews;
    if (activeTab !== "Latest") {
      filtered = filtered.filter((item) => item.news === activeTab);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.heading.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.news.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  };

  // Smooth scrolling setup - SLOWER
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.0, // Slower from 1.2
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 0.8, // Slower scroll
      smoothTouch: false,
      touchMultiplier: 1.5, // Slower touch scroll
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  // SLOWER animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 1.2, // Slower from 0.6
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.2, // Slower from 0.1
        delayChildren: 0.3, // More delay from 0.1
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60, // More movement from 40
      scale: 0.9, // More scale from 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 80, // Slower from 120
        damping: 20, // More damping from 15
        mass: 1.2, // Heavier from 0.8
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: -20 }, // More movement
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 150, // Slower from 200
        damping: 25, // More damping from 20
        duration: 0.8, // Added duration
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15,
        duration: 0.8,
      },
    },
  };

  const filteredData = getFilteredData();

  return (
    <>
      <Navbar navStyle={"white"} />

      {/* Header Section - SLOWER ANIMATIONS */}
      <motion.div
        className="w-full bg-white pt-20 md:pt-24 lg:pt-30"
        initial={{ opacity: 0, y: 30 }} // More movement
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }} // Slower from 0.8
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between py-4 space-y-4 md:space-y-0"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Tabs Navigation - SLOWER */}
            <nav className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide">
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`
                    relative pb-2 text-sm font-medium transition-colors duration-500 whitespace-nowrap flex-shrink-0
                    ${
                      activeTab === tab
                        ? "text-gray-900 border-b-2 border-gray-900"
                        : "text-gray-500 hover:text-gray-700"
                    }
                  `}
                  variants={tabVariants}
                  whileHover={{
                    y: -3, // More movement
                    transition: {
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                      duration: 0.6, // Slower hover
                    },
                  }}
                  whileTap={{
                    scale: 0.95,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ opacity: 0, x: -30 }} // More movement
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: index * 0.15, // Slower stagger from 0.1
                    duration: 0.8, // Slower from 0.5
                  }}
                >
                  {tab}

                  {/* Animated underline - SLOWER */}
                  {activeTab === tab && (
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"
                      layoutId="activeTabUnderline"
                      initial={{ scaleX: 0, opacity: 0 }}
                      animate={{ scaleX: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 200, // Slower from 300
                        damping: 35, // More damping from 30
                        duration: 0.8, // Added duration
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </nav>

            {/* Search Input - SLOWER */}
            <motion.div
              className="relative w-full md:w-64 lg:w-72"
              initial={{ opacity: 0, x: 30 }} // More movement
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5, // More delay from 0.3
                duration: 0.8, // Slower from 0.5
              }}
            >
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <motion.div
                  animate={{
                    rotate: searchQuery ? 90 : 0,
                    scale: searchQuery ? 1.1 : 1,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 200, // Slower from 300
                    damping: 30, // More damping from 25
                    duration: 0.6,
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
                className="w-full pl-10 pr-10 py-2 text-sm rounded-[22px] border border-gray-300 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-all duration-500" // Slower from 200
                whileFocus={{
                  scale: 1.02,
                  boxShadow: "0 4px 15px rgba(59, 130, 246, 0.15)",
                  borderColor: "#3b82f6",
                  transition: { duration: 0.4 }, // Slower focus
                }}
              />

              <AnimatePresence>
                {searchQuery && (
                  <motion.button
                    onClick={clearSearch}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-400" // Slower
                    initial={{ opacity: 0, scale: 0, rotate: -90 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0, rotate: 90 }}
                    transition={{
                      type: "spring",
                      stiffness: 200, // Slower from 300
                      damping: 25,
                      duration: 0.5, // Added duration
                    }}
                    whileHover={{
                      scale: 1.15, // More scale
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{
                      scale: 0.85,
                      transition: { duration: 0.2 },
                    }}
                  >
                    <IoCloseCircle className="w-4 h-4" />
                  </motion.button>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>

          {/* Search Results Indicator - SLOWER */}
          <AnimatePresence></AnimatePresence>
        </div>
      </motion.div>

      {/* Content Grid - SLOWER */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.8, // More delay from 0.4
          duration: 1.0, // Slower from 0.6
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${searchQuery}`}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial={{ y: 50 }}
            animate={{ y: 0, ease: easeInOut }}
            transition={{
              delay: 0.8,
              duration: 1.0,
            }}
            exit="hidden"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => <NewsCard props={item} />)
            ) : (
              <motion.div
                className="col-span-full text-center py-16"
                initial={{ opacity: 0, y: 40 }} // More movement
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8, // Slower from 0.5
                  delay: 0.3,
                }}
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
                  No results found
                </h3>
                <p className="text-gray-400">
                  {searchQuery
                    ? `No items match "${searchQuery}" in ${activeTab}`
                    : `No items available in ${activeTab}`}
                </p>
                {searchQuery && (
                  <motion.button
                    onClick={clearSearch}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300" // Slower
                    whileHover={{
                      scale: 1.08, // More scale from 1.05
                      transition: { duration: 0.3 },
                    }}
                    whileTap={{
                      scale: 0.92, // More scale from 0.95
                      transition: { duration: 0.2 },
                    }}
                  >
                    Clear Search
                  </motion.button>
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <motion.div
        className="container mx-auto "
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="flex justify-center" variants={fadeInUp}>
          <AnimatedButton icon={HiDownload} color={"#000"} hoverColor={`#000`}>
            Load More
          </AnimatedButton>
        </motion.div>
      </motion.div>

      {/* Partners Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <div className="overflow-hidden">
          <div className="flex">
            {[1, 2].map((set) => (
              <motion.div
                key={set}
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 40,
                  repeat: Infinity,
                  ease: "linear",
                  repeatType: "loop",
                }}
                className="flex flex-shrink-0 items-center"
              >
                {partners.map((partner) => (
                  <motion.div
                    key={`${set}-${partner.id}`}
                    className="flex-shrink-0 mx-12 px-0 md:px-5"
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="h-12 sm:h-16 lg:h-20 object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                      style={{ maxWidth: `${partner.width}px` }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default News;
