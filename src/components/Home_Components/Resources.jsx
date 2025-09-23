import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import bl1 from "../../assets/images/bl1.jpg";
import bl2 from "../../assets/images/bl2.jpg";
import bl3 from "../../assets/images/bl3.jpg";
import bl4 from "../../assets/images/bl4.jpg";
import NewsCard from "../newsComponents/NewsCard";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";

const tabs = ["Latest", "Blogs", "Events", "Featured Product"];

const allNews = [
  {
    image: bl1,
    news: "Blog",
    heading: "UX review presentations ",
    details:
      "Discover how our latest innovations are transforming manufacturing efficiency across industries.",
    date: "Dec 15, 2024",
    author: "Tech Team",
  },
  {
    image: bl2,
    news: "Events",
    heading: "Industry Best Practices Guide",
    details:
      "How do you create compelling presentations that wow your colleagues and impress your managers?",
    date: "Dec 12, 2024",
    author: "John Smith",
  },
  {
    image: bl3,
    news: "Blog",
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
];

export default function Resources() {
  const [activeTab, setActiveTab] = useState("Latest");

  const headerVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.98
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

  const tabContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const tabVariants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3,
      },
    },
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: 10
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

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="w-full bg-white px-4 sm:px-8 lg:px-16 py-12">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={headerVariants}
        className="mb-8"
      >
        <motion.h2 
          className="text-[48px] sm:text-4xl lg:text-5xl font-bold text-[#2E437C]"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4 }
            }
          }}
        >
          Resources <span className="text-[#BABEC8]">& Insights</span>
        </motion.h2>
        
        <motion.p 
          className="mt-2 text-[#343434] text-sm sm:text-base"
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.4, delay: 0.2 }
            }
          }}
        >
          The latest industry news, interviews, technologies, and resources.
        </motion.p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={tabContainerVariants}
        className="relative flex justify-start gap-4 border-b w-full md:w-100 border-gray-200 mb-8 text-sm sm:text-base"
      >
        <motion.div
          className="absolute bottom-0 h-0.5 rounded-full"
          layoutId="activeTabIndicator"
          initial={false}
          animate={{
            width: `${100 / tabs.length}%`,
            x: `${tabs.indexOf(activeTab) * 100}%`,
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 30,
            duration: 0.3,
          }}
        />
        
        {tabs.map((tab, index) => (
          <motion.button
            key={tab}
            onClick={() => handleTabClick(tab)}
            variants={tabVariants}
            className={`relative pb-3 px-2 transition-colors duration-300 ${
              activeTab === tab
                ? "text-[#2E437C] font-medium"
                : "text-gray-600 hover:text-gray-800"
            }`}
            whileHover={{
              scale: 1.02,
              y: -1,
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
            <motion.span
              animate={{
                color: activeTab === tab ? "#2E437C" : "#6B7280",
              }}
              transition={{ duration: 0.2 }}
            >
              {tab}
            </motion.span>
            
            {activeTab === tab && (
              <motion.div
                className="absolute -bottom-0.5 left-0 right-0 h-0.5 bg-[#2E437C] rounded-full"
                layoutId="tabUnderline"
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
      </motion.div>

      <motion.div
        key={activeTab}
        initial="hidden"
        animate="visible"
        variants={cardGridVariants}
        className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      >
        {allNews.map((item, index) => (
          <motion.div
            key={`${activeTab}-${index}`}
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
            className="transform-gpu  border border-[#0A0D170D] rounded-[8px]"
          >
            <NewsCard props={item} />
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.8,
        }}
        className="flex justify-center mt-12"
      >
        <AnimatedButton icon={MdArrowOutward} color={"#2E437C"} hoverColor={`#2E437C`}>
           VIEW ALL RESOURCES
          </AnimatedButton>
      </motion.div>
    </div>
  );
}
