import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BgVideo from "../../assets/Video/HeroBg.mp4";
import { MdArrowOutward } from "react-icons/md";

export default function HomeBanner() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current
        .play()
        .catch((err) => console.log("Autoplay prevented:", err));
    }

    const timer = setTimeout(() => {
      setIsVideoExpanded(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const subTitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: "easeOut", delay: 0.3 },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 },
    },
    hover: {

      backgroundColor: "#2E437C",
      borderColor: "none",
      transition: { duration: 0.1 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 1500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
          isVideoExpanded
            ? "scale-110"
            : "scale-75 rounded-[15px] sm:scale-50 sm:rounded-3xl m-4"
        }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={BgVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/60"></div>
      </motion.div>

     {isVideoExpanded && (
        <div className="relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-16">
          <div className="max-w-7xl mx-auto w-full">
            <div className="max-w-4xl text-white">
              <motion.h1
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold leading-none tracking-tight"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "'Articulat CF', sans-serif",
                  fontWeight: 400,
                  lineHeight: 0.9
                }}
              >
                Belts that Fit,
                <br />
                <span
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 400,
                  }}
                >
                  Solutions that Last
                </span>
              </motion.h1>

              <motion.p
                className="mt-4 sm:mt-5 md:mt-6 text-sm xs:text-base sm:text-lg md:text-xl text-gray-200 max-w-xl md:max-w-2xl"
                variants={subTitleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "'Articulat CF', sans-serif",
                  fontWeight: 400,
                }}
              >
                Leading in the manufacturing Industry, We build durable & robust
                products which are built to last for generations.
              </motion.p>

              <motion.button
                className="mt-6 sm:mt-7 md:mt-8 inline-flex items-center border-2 border-white text-white font-medium px-5 py-2.5 sm:px-6 sm:py-3 rounded-full transition-all duration-300 group"
                variants={buttonVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                whileTap="tap"
                style={{
                  fontFamily: "'Articulat CF', sans-serif",
                  fontWeight: 400,
                }}
              >
                FIND SOLUTION
                <span className="ml-2 sm:ml-3 bg-[#2E437C] text-white rounded-full h-6 w-6 sm:h-8 sm:w-8 flex items-center justify-center transition-all duration-300 group-hover:bg-white group-hover:text-[#2E437C]">
                  <MdArrowOutward size={16} className="sm:scale-110" />
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      )}
    </div>
    
  );
}
