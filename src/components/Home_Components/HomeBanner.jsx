import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BgVideo from "../../assets/Video/HeroBg.mp4";
import { MdArrowOutward } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";

export default function HomeBanner({ onAnimationComplete }) {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }

    // Match AboutUs timing - video expands after 1500ms
    const timer = setTimeout(() => setIsVideoExpanded(true), 1500);

    // Show navbar after 2000ms (same as AboutUs)
    const navbarTimer = setTimeout(() => {
      setShowNavbar(true);
      setShowContent(true);
      if (onAnimationComplete) {
        onAnimationComplete();
      }
    }, 2000);

    // Show content after video expansion (similar to AboutUs pattern)
    const contentTimer = setTimeout(() => {}, 1900);

    return () => {
      clearTimeout(timer);
      clearTimeout(navbarTimer);
      clearTimeout(contentTimer);
    };
  }, [onAnimationComplete]);

  const titleVariants = {
    hidden: { opacity: 1, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
    },
  };

  const subTitleVariants = {
    hidden: { opacity: 1, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut", delay: 0.3 },
    },
  };

  return (
    <>
      {/* Animated Navbar - same as AboutUs */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 1, y: -100 }}
        animate={showNavbar ? { opacity: 1, y: 0, scale: 1 } : { y: -100 }}
        transition={{ duration: 0.6, ease: "easeInOut", delay: 0.2 }}
      >
        <Navbar navStyle="transparent" />
      </motion.div>

      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            style={{ minHeight: "100vh", objectPosition: "center" }}
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* White overlay animation - match AboutUs timing and transition */}
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
              : "scale-75 rounded-[15px] sm:scale-50 sm:rounded-3xl m-2 sm:m-4"
          }`}
          style={{
            boxShadow: isVideoExpanded ? "none" : "0 0 0 9999px white",
          }}
        />

        {/* Content - only show when isVideoExpanded is true and showContent is true */}
        {isVideoExpanded && showContent && (
          <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
            <div className="max-w-7xl mx-auto w-full mt-10 sm:mt-0">
              <div className="max-w-4xl text-white overflow-hidden">
                <div className="overflow-hidden">
                  <motion.h1
                    className="text-[40px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight overflow-hidden"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: "'Articulat CF', sans-serif",
                      fontWeight: 400,
                      lineHeight: 1.1,
                    }}
                  >
                    Belts that Fit,
                    <br />
                  </motion.h1>
                </div>
                <div className="overflow-hidden">
                  <motion.h2
                    className="text-[40px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight overflow-hidden"
                    variants={titleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: "'Articulat CF', sans-serif",
                      fontWeight: 400,
                      lineHeight: 1.1,
                    }}
                  >
                    Solutions that Last
                    <br />
                  </motion.h2>
                </div>
                <div className="overflow-hidden">
                  <motion.p
                    className="mt-3 sm:mt-4 md:mt-5 text-xs xs:text-sm sm:text-base md:text-lg text-gray-200 max-w-md sm:max-w-xl md:max-w-2xl"
                    variants={subTitleVariants}
                    initial="hidden"
                    animate="visible"
                    style={{
                      fontFamily: "'Articulat CF', sans-serif",
                      fontWeight: 400,
                    }}
                  >
                    Leading in the manufacturing Industry, We build durable &
                    robust products which are built to last for generations.
                  </motion.p>
                </div>

                <motion.div
                  className="pt-4 sm:pt-5"
                  variants={buttonVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <AnimatedButton
                    icon={MdArrowOutward}
                    color={"#2E437C"}
                    hoverColor={`#2E437C`}
                  >
                    FIND SOLUTION
                  </AnimatedButton>
                </motion.div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
