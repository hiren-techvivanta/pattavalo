import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import NewsCard from "../../../components/newsComponents/NewsCard";

import blo1 from "../../../assets/images/blo1.jpg";
import bl1 from "../../../assets/images/bl1.jpg";
import bl2 from "../../../assets/images/bl2.jpg";
import bl3 from "../../../assets/images/bl3.jpg";
import bl4 from "../../../assets/images/bl4.jpg";

import l1 from "../../../assets/images/l1.png";
import l2 from "../../../assets/images/l2.png";
import l3 from "../../../assets/images/l3.png";
import l4 from "../../../assets/images/l4.png";
import l5 from "../../../assets/images/l5.png";
import l6 from "../../../assets/images/l6.png";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

const BlogDetails = () => {
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
  ];

  // Optimized smooth scrolling setup - FASTER
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.0, 
      smoothTouch: false,
      touchMultiplier: 2.0, 
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

  // FASTER animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4, 
        ease: "easeOut", 
        staggerChildren: 0.05, 
        delayChildren: 0.1,
      },
    },
  };

  const fadeInUp = {
    hidden: {
      opacity: 0,
      y: 30, 
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

  const fadeInLeft = {
    hidden: {
      opacity: 0,
      x: -20, 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const fadeInRight = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95, 
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  const textStagger = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, 
        delayChildren: 0.05, 
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
        duration: 0.4, 
        ease: "easeOut",
      },
    },
  };

  return (
    <>
      <Navbar navStyle={"white"} />

      <motion.div
        className="container mx-auto mt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Header Section */}
        <motion.div variants={fadeInUp} className="mb-8">
          <motion.p
            className="font-[700] text-[16px]"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }} 
          >
            Shivam Patel{" "}
            <span className="font-[500] text-[#999999] ms-4">
              16 March 2023
            </span>
          </motion.p>

          <motion.h1
            className="font-[400] text-[32px] md:text-[48px] lg:text-[64px] leading-tight mt-4"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.2, 
              duration: 0.5, 
              ease: "easeOut",
            }}
          >
            The Future of Digital Innovation
          </motion.h1>
        </motion.div>

        {/* Hero Image */}
        <motion.div variants={imageVariants} className="mb-10">
          <motion.img
            src={blo1}
            className="w-full lg:h-[650px] object-cover rounded-[16px] shadow-lg"
            alt="Digital Innovation"
            loading="lazy"
            whileHover={{
              scale: 1.01,
              transition: { duration: 0.2 },
            }}
          />
        </motion.div>

        {/* Article Content */}
        <motion.div
          className="pt-8 lg:pt-15 max-w-4xl mx-auto"
          variants={textStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#666666] py-3 leading-relaxed"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#666666] py-3 leading-relaxed"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#666666] py-3 leading-relaxed"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>

          {/* Bullet Points */}
          <motion.div variants={fadeInUp} className="ms-5 my-6">
            <motion.ul
              className="list-disc marker:text-[#2E437C] marker:text-xl space-y-2"
              variants={textStagger}
            >
              <motion.li
                variants={fadeInLeft}
                className="text-[16px] text-[#666666]"
              >
                Lorem ipsum
              </motion.li>
              <motion.li
                variants={fadeInLeft}
                className="text-[16px] text-[#666666]"
              >
                dolor sit amet
              </motion.li>
              <motion.li
                variants={fadeInLeft}
                className="text-[16px] text-[#666666]"
              >
                consectetur adipisicing elit
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#666666] py-3 leading-relaxed"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>

          <motion.p
            variants={fadeInUp}
            className="text-[16px] text-[#666666] py-3 leading-relaxed"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>
        </motion.div>

        {/* Center Image */}
        <motion.div
          className="text-center my-12"
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          <motion.img
            src={blo1}
            className="lg:w-[692px] lg:h-[312px] object-cover rounded-[16px] mx-auto shadow-md"
            alt="Innovation Process"
            loading="lazy"
            whileHover={{
              scale: 1.02,
              boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)", 
              transition: { duration: 0.2 },
            }}
          />
        </motion.div>

        {/* Conclusion */}
        <motion.div
          className="pt-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            duration: 0.4, 
            ease: "easeOut",
          }}
        >
          <p className="text-[16px] text-[#666666] py-3 leading-relaxed">
            The future promises even greater opportunities: smarter
            applications, secure platforms, and an increased focus on
            sustainability through technology.
          </p>
        </motion.div>

        {/* Popular Blogs Section */}
        <motion.div
          className="pt-16 lg:pt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }} 
        >
          <motion.h3
            className="text-[28px] lg:text-[36px] font-[700] text-[#BABEC8] mb-8"
            initial={{ opacity: 0, x: -20 }} 
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.4, 
              ease: "easeOut",
            }}
          >
            Popular Blogs
          </motion.h3>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {allNews?.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                custom={index}
                transition={{
                  delay: index * 0.05, 
                }}
              >
                <NewsCard props={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Partners Section - Optimized */}
        <motion.div
          className="overflow-hidden pt-16 lg:pt-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex">
            {[1, 2].map((set) => (
              <motion.div
                key={set}
                initial={{ x: "0%" }}
                animate={{ x: "-100%" }}
                transition={{
                  duration: 30, 
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
                      className="h-12 sm:h-16 lg:h-20 object-contain opacity-60 hover:opacity-100 transition-all duration-200 filter grayscale hover:grayscale-0" // Faster transition
                      style={{ maxWidth: `${partner.width}px` }}
                      loading="lazy"
                    />
                  </motion.div>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default BlogDetails;
