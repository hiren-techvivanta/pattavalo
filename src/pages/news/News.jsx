import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import Seo from "../../components/common/Seo";

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

  const filteredData = useMemo(() => {
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
  }, [activeTab, searchQuery]);

  // useEffect(() => {
  //   const lenis = new Lenis({
  //     lerp: 0.12,
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
  //   lenis.on("scroll", ScrollTrigger.update);
    
  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   gsap.fromTo(".fade-up-news", 
  //     { 
  //       opacity: 0,
  //       y: 30,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       stagger: 0.08,
  //       scrollTrigger: {
  //         trigger: ".fade-up-news",
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
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const searchVariants = {
    hidden: {
      opacity: 0,
      x: 20,
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
        delay: 0.3,
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

  return (
    <>
      <Seo
        title="News | ATC Chain India"
        description="ATC Chain designs and manufactures high-quality components for the food, beverage, packaging, automotive and automation industries providing the best solution designs and after-sale support."
        url="https://www.atcchain.com/news"
      />
      <motion.div
        initial="hidden"
        animate="visible"
        variants={navVariants}
      >
        <Navbar navStyle={"white"} />
      </motion.div>

      <motion.div
        className="w-full bg-gradient-to-b from-gray-50/30 to-white pt-20 md:pt-24 lg:pt-30"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row md:items-center md:justify-between py-6 space-y-6 md:space-y-0 fade-up-news"
            variants={headerVariants}
          >
            <motion.nav 
              className="flex space-x-4 md:space-x-6 lg:space-x-8 overflow-x-auto scrollbar-hide"
              variants={tabContainerVariants}
              initial="hidden"
              animate="visible"
            >
              {tabs.map((tab, index) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative pb-3 px-2 text-sm font-medium transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab
                      ? "text-[#2E437C] font-semibold"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  variants={tabVariants}
                  whileHover={{
                    y: -2,
                    scale: 1.02,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30,
                      duration: 0.2,
                    },
                  }}
                  whileTap={{
                    scale: 0.98,
                    transition: { duration: 0.1 },
                  }}
                >
                  {tab}

                  {activeTab === tab && (
                    <motion.div
                      className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#2E437C] rounded-full"
                      layoutId="activeTabUnderline"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                        duration: 0.3,
                      }}
                    />
                  )}
                </motion.button>
              ))}
            </motion.nav>

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
                placeholder="Search news & blogs..."
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
        </div>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 pb-16 sm:pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeTab}-${searchQuery}`}
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={cardGridVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => (
                <motion.div
                  key={`${item.heading}-${index}`}
                  variants={cardVariants}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                    rotateX: -2,
                    boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                    transition: {
                      type: "spring",
                      stiffness: 400,
                      damping: 25,
                      duration: 0.3,
                    },
                  }}
                  className="fade-up-news "
                >
                  <NewsCard props={item} />
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
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </motion.div>

                <motion.h3
                  className="text-xl font-semibold text-gray-500 mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  No results found
                </motion.h3>

                <motion.p
                  className="text-gray-400 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {searchQuery
                    ? `No items match "${searchQuery}" in ${activeTab}`
                    : `No items available in ${activeTab}`}
                </motion.p>

                {searchQuery && (
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
                )}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <AnimatedButton icon={HiDownload} color={"#2E437C"} hoverColor={`#2E437C`}>
            Load More
          </AnimatedButton>
        </motion.div>

        <div className="overflow-hidden rounded-2xl bg-gray-50/30 py-12">
          <motion.h3
            className="text-center text-2xl font-semibold text-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Trusted by Industry Leaders
          </motion.h3>
          
          <div className="flex">
            {[1, 2].map((set) => (
              <motion.div
                key={set}
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 25,
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
                    whileHover={{
                      scale: 1.1,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <img
                      src={partner.image}
                      alt={partner.name}
                      className="h-12 sm:h-16 lg:h-20 object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                      style={{ maxWidth: `${partner.width}px` }}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
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
    </>
  );
};

export default News;
