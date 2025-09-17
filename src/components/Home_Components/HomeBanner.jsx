import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BgVideo from "../../assets/Video/HeroBg.mp4";
import { MdArrowOutward } from "react-icons/md";

export default function HomeBanner() {
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
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

  return (
    <div className="relative h-screen w-full overflow-hidden">
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

      {/* Transparent animated overlay div */}
      <motion.div
        initial={{ opacity: 0, y: 1500 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className={`absolute inset-0 transition-all duration-1000 ease-in-out bg-white/0 ${
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
            <div className="max-w-4xl text-white">
              <motion.h1
                className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[100px] font-bold leading-none tracking-tight"
                variants={titleVariants}
                initial="hidden"
                animate="visible"
                style={{
                  fontFamily: "'Articulat CF', sans-serif",
                  fontWeight: 400,
                  lineHeight: 0.9,
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

              <div className="pt-5">
                <button
                  className={`relative inline-flex items-center text-white font-medium px-6 py-3 rounded-full overflow-hidden transition-all duration-[1000ms] ease-in-out group ${
                    isHovered ? "border-none" : "border border-white"
                  }`}
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontWeight: 400,
                  }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <div
                    className={`absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[#2E437C] transition-transform duration-[1200ms] ease-in-out will-change-transform ${
                      isHovered ? "scale-[30]" : "scale-100"
                    }`}
                  />

                  <span className="relative z-10 transition-colors duration-[800ms]">
                    FIND SOLUTION
                  </span>

                  <span className="relative z-10 ml-3 h-8 w-8 overflow-hidden flex items-center justify-center">
                    <MdArrowOutward
                      size={25}
                      className={`absolute transition-transform duration-[1000ms] ease-in-out ${
                        isHovered
                          ? "translate-x-6 opacity-0"
                          : "translate-x-0 opacity-100"
                      }`}
                    />
                    <MdArrowOutward
                      size={25}
                      className={`absolute transition-transform duration-[1000ms] ease-in-out ${
                        isHovered
                          ? "translate-x-0 opacity-100"
                          : "-translate-x-6 opacity-0"
                      }`}
                    />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
