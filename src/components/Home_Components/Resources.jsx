import React, { useState } from "react";
import { motion } from "framer-motion";
import { MdArrowOutward } from "react-icons/md";
import bl1 from "../../assets/images/bl1.jpg";
import bl2 from "../../assets/images/bl2.jpg";
import bl3 from "../../assets/images/bl3.jpg";
import bl4 from "../../assets/images/bl4.jpg";
import NewsCard from "../newsComponents/NewsCard";

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

  return (
    <div className="w-full bg-white px-4 sm:px-8 lg:px-16 py-12">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className=" mb-8"
      >
        <h2 className="text-[48px] sm:text-4xl lg:text-5xl font-bold text-[#2E437C]">
          Resources <span className="text-[#BABEC8]">& Insights</span>
        </h2>
        <p className="mt-2 text-[#343434] text-sm sm:text-base">
          The latest industry news, interviews, technologies, and resources.
        </p>
      </motion.div>

      {/* Tabs */}
      <div className="flex justify-start gap-6 border-b w-90 border-gray-200 mb-8 text-sm sm:text-base">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 ${
              activeTab === tab
                ? "text-black border-b-2 border-[#2E437C]"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
      >
        {allNews.map((item, index) => (
          <NewsCard key={index} props={item}/>
        ))}
      </motion.div>
    </div>
  );
}
