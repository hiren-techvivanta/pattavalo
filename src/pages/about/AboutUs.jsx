import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import Lenis from "@studio-freight/lenis";
import { HiDownload } from "react-icons/hi";

// Components
import Navbar from "../../components/Navbar/Navbar";
import SectionTitle from "../../components/aboutUsComponents/SectionTitle";
import AnimatedImage from "../../components/aboutUsComponents/AnimatedImage";
import StatCard from "../../components/aboutUsComponents/StatCard";
import TeamCard from "../../components/aboutUsComponents/TeamCard";
import TimelineItem from "../../components/aboutUsComponents/TimelineItem";
import AnimatedButton from "../../components/aboutUsComponents/AnimatedButton";

// Assets
import BgVideo from "../../assets/Video/aboutUs.mp4";
import a1 from "../../assets/images/a1.jpg";
import a2 from "../../assets/images/a2.jpg";
import t1 from "../../assets/images/t1.jpg";
import t2 from "../../assets/images/t2.jpg";
import t3 from "../../assets/images/t3.jpg";
import i1 from "../../assets/images/i1.png";
import i2 from "../../assets/images/i2.png";
import i3 from "../../assets/images/i3.png";
import i4 from "../../assets/images/i4.png";
import i5 from "../../assets/images/i5.png";
import i6 from "../../assets/images/i6.png";

import l1 from "../../assets/images/l1.png";
import l2 from "../../assets/images/l2.png";
import l3 from "../../assets/images/l3.png";
import l4 from "../../assets/images/l4.png";
import l5 from "../../assets/images/l5.png";
import l6 from "../../assets/images/l6.png";

// Data
const partners = [
  { id: 3, name: "l1", image: l1, width: 117 },
  { id: 4, name: "l2", image: l2, width: 110 },
  { id: 5, name: "l3", image: l3, width: 100 },
  { id: 6, name: "l4", image: l4, width: 200 },
  { id: 7, name: "l5", image: l5, width: 87 },
  { id: 8, name: "l6", image: l6, width: 200 },
];

const statsData = [
  { number: "250+", label: "Products" },
  { number: "35+", label: "Experience" },
  { number: "120+", label: "Clients" },
  { number: "99%", label: "Satisfaction Rate" },
];

const teamData = [
  { img: t1, name: "Ajay Patel", role: "Managing Director" },
  { img: t2, name: "Harnish Patel", role: "General Manager (Sales&Marketing)" },
  { img: t3, name: "Shivam Patel", role: "Technical Director" },
];

const galleryImages = [i1, i2, i3, i4, i5, i6];

const timelineData = {
  2015: {
    title: "Establishment",
    description:
      "After extensive research, Our Founder Mr. Ajay Patel entered the manufacturing world with the intention to build durable transmission conveyor chains through automation.",
  },
  2017: {
    title: "Modular Belt Production",
    description:
      "After receiving incredible response from customers, ATCchains shifted focus towards a better consumer-centric approach and entered modular belt manufacturing.",
  },
  2019: {
    title: "Conveying Solution",
    description:
      "Understanding consumer requirements, we strategically moved towards developing conveyor sprockets, wear strips, and conveyor components.",
  },
  2021: {
    title: "Automation",
    description:
      "After gaining expertise in manufacturing, we expanded and established 3 other plants, expanding our products into 1100+ manufacturing solutions.",
  },
};

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const AboutUs = () => {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2015");

  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  };

  const slideInLeft = {
    hidden: {
      opacity: 0,
      x: -80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
      },
    },
  };

  const slideInRight = {
    hidden: {
      opacity: 0,
      x: 80,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        duration: 1,
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
        duration: 0.6,
      },
    },
  };

  const scaleInVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotate: -5,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.4,
      },
    },
  };

  // Smooth scrolling setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Update ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }

    const timer = setTimeout(() => setIsVideoExpanded(true), 1500);
    const navbarTimer = setTimeout(() => setShowNavbar(true), 2000);

    return () => {
      clearTimeout(timer);
      clearTimeout(navbarTimer);
    };
  }, []);

  const currentData = timelineData[selectedYear];

  return (
    <div ref={scrollContainerRef} className="overflow-hidden">
      {/* Animated Navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 1, y: -100 }}
        animate={showNavbar ? { opacity: 1, y: 0, scale: 1 } : { y: -100 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      >
        <Navbar />
      </motion.div>

      {/* Hero Video Section - HomeBanner Style */}
      <div className="relative h-[408px] md:h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] md:min-h-[500px] lg:min-h-[600px]"
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* White overlay animation */}
        <motion.div
          initial={{ opacity: 1, y: 1500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: 0,
            ease: "easeOut",
          }}
          className={`absolute inset-0 transition-all duration-800 ease-out bg-white/0 ${
            isVideoExpanded
              ? "scale-110"
              : "scale-75 rounded-[15px] sm:scale-50 sm:rounded-3xl m-4"
          }`}
          style={{
            boxShadow: isVideoExpanded ? "none" : "0 0 0 9999px white",
          }}
        />

        {isVideoExpanded && (
          <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
            <div className="max-w-7xl mx-auto w-full">
              <div className="max-w-4xl text-white overflow-hidden">
                <motion.h1
                  className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold leading-none overflow-hidden tracking-tight"
                  initial={{ opacity: 1, y: -100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 400,
                    lineHeight: 0.9,
                  }}
                >
                  Who We Are
                </motion.h1>

                <motion.p
                  className="mt-4 sm:mt-5 md:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 max-w-xl md:max-w-2xl"
                  initial={{ opacity: 1, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: "easeInOut", delay: 0.8 }}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  We are team of 150+ experts leading and thriving in the
                  manufacturing industry. We build robust products and
                  machineries generated to sustain for generations.
                </motion.p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* About Quality Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-150px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-7 p-4 sm:p-5 order-1"
            variants={slideInLeft}
          >
            <SectionTitle
              title="Our Quality,"
              subtitle="Our Integrity"
              description="Atcchains is always high in demand due to its wide variety of sub-products in the Plastic slat chain series, Modular belts series & conveyor components. We lead due to our consistent efforts in delivering the best suited services for our clients."
            />
          </motion.div>

          <motion.div
            className="lg:col-span-5 p-4 sm:p-5 order-2"
            variants={slideInRight}
          >
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedImage
                  src={a2}
                  alt="about-quality"
                  className="w-full h-64 sm:h-80 lg:h-[411px] rounded-lg"
                  containerClassName="rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Why ATC Chains Section */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mt-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-150px" }}
        >
          <motion.div
            className="lg:col-span-7 p-4 sm:p-5 sm:order-1 md:order-2"
            variants={slideInRight}
          >
            <SectionTitle
              title="Why"
              subtitle="Atc Chains?"
              description="One year warranty. Our policies also include accidental warranty which is provided by no other company in the world. A diverse and wide variety of 1100+ products. 24*7 available technical assistance."
            />
          </motion.div>

          <motion.div
            className="lg:col-span-5 p-4 sm:p-5 sm:order-2 md:order-1"
            variants={slideInLeft}
          >
            <div className="w-full max-w-lg mx-auto lg:mx-0">
              <motion.div
                whileHover={{
                  scale: 1.02,
                  transition: { duration: 0.3 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                <AnimatedImage
                  src={a1}
                  alt="why-atc-chains"
                  className="w-[391px] h-[391px] lg:w-[411px] sm:h-80 lg:h-[411px] rounded-lg object-cover"
                  containerClassName="rounded-lg"
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 text-center"
          variants={containerVariants}
        >
          {statsData.map((stat, index) => (
            <motion.div key={index} variants={scaleInVariants}>
              <StatCard {...stat} index={index} />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Team Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="p-8">
          <motion.div variants={fadeInUp}>
            <SectionTitle title="Our" subtitle="Team" alignment="center" />
          </motion.div>

          <div className="overflow-x-auto scrollbar-hide">
            <motion.div
              className="flex justify-center align-top gap-8 pb-4 min-w-max"
              variants={containerVariants}
            >
              {teamData.map((member, index) => (
                <motion.div key={index} variants={scaleInVariants}>
                  <TeamCard member={member} index={index} />
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* History Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="p-8">
          <motion.p
            className="font-[700] text-[16px] text-[#222222] text-center"
            variants={fadeInUp}
          >
            OUR HISTORY
          </motion.p>
          <motion.div variants={fadeInUp}>
            <SectionTitle
              title="Foundation of excellences"
              subtitle="in Industry"
              alignment="center"
            />
          </motion.div>
          <motion.div variants={containerVariants}>
            {[
              "Founded in 2015, we deliver high-quality machines and customized belt solutions with a focus",
              "on reliability, innovation, and integrity. Guided by our founder Mr. Ajay Patel, we uphold",
              "consistency and dignity in every relationship with clients, vendors, and employees.",
            ].map((text, index) => (
              <motion.p
                key={index}
                className="text-center opacity-40"
                variants={fadeInUp}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          <motion.div
            className="lg:col-span-5 sm:p-5 p-4 order-1"
            variants={slideInLeft}
          >
            <div className="rounded-2xl border border-gray-200 text-center bg-white overflow-hidden">
              {Object.entries(timelineData).map(([year, data], index) => (
                <TimelineItem
                  key={year}
                  year={year}
                  data={data}
                  isSelected={selectedYear === year}
                  onClick={() => setSelectedYear(year)}
                  index={index}
                  isLast={index === Object.keys(timelineData).length - 1}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            className="lg:col-span-7 sm:p-5 p-4 order-2"
            variants={slideInRight}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedYear}
                className="bg-gradient-to-br rounded-2xl h-full p-6 sm:p-8 relative overflow-hidden"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                  damping: 25,
                  duration: 0.3,
                }}
              >
                <div className="relative z-10">
                  <motion.h3
                    className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6 text-[#2E437C]"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.4 }}
                  >
                    {currentData.title} ({selectedYear})
                  </motion.h3>

                  <motion.p
                    className="text-base sm:text-lg leading-relaxed mb-6 opacity-60"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.4 }}
                  >
                    {currentData.description}
                  </motion.p>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.div>

      {/* Images Gallery Section */}
      <motion.div
        className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div variants={fadeInUp}>
          <SectionTitle
            title="Our"
            subtitle="Recent Images"
            alignment="center"
          />
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
        >
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              variants={scaleInVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
            >
              <AnimatedImage
                src={image}
                alt={`Gallery image ${index + 1}`}
                className="w-full h-40 lg:h-80"
                containerClassName=""
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="pt-16 flex justify-center" variants={fadeInUp}>
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
        transition={{ duration: 0.8 }}
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
    </div>
  );
};

export default AboutUs;
