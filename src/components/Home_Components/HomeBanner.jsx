import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import BgVideo from "../../assets/Video/HeroBg.mp4";
import { MdArrowOutward } from "react-icons/md";
import Navbar from "../Navbar/Navbar";
import AnimatedButton from "../aboutUsComponents/AnimatedButton";
import { useNavigate } from "react-router-dom";

export default function HomeBanner({ onAnimationComplete }) {
  const navigate = useNavigate();
  const [isVideoExpanded, setIsVideoExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);
  const [hasAnimatedBefore, setHasAnimatedBefore] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const ANIMATION_KEY = "homeBannerAnimationCompleted";

  useEffect(() => {
    const animationCompleted = sessionStorage.getItem(ANIMATION_KEY);
    const hasAnimated = animationCompleted === "true";

    setHasAnimatedBefore(hasAnimated);

    if (videoRef.current) {
      videoRef.current.play();
    }

    if (hasAnimated) {
      // If animation has been played before, show everything immediately
      setIsVideoExpanded(true);
      setShowNavbar(true);
      setShowContent(true);

      if (onAnimationComplete) {
        onAnimationComplete();
      }
    } else {
      // Run animation for first time
      const timer = setTimeout(() => {
        setIsVideoExpanded(true);
        // Store in sessionStorage that animation has completed
        sessionStorage.setItem(ANIMATION_KEY, "true");
      }, 1500);

      const navbarTimer = setTimeout(() => {
        setShowNavbar(true);
        setShowContent(true);
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2000);

      return () => {
        clearTimeout(timer);
        clearTimeout(navbarTimer);
      };
    }
  }, [onAnimationComplete]);

  const titleVariants = {
    hidden: { opacity: 1, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: hasAnimatedBefore ? 0 : 0.6,
        ease: "easeInOut",
        delay: hasAnimatedBefore ? 0 : 0.3,
      },
    },
  };

  const subTitleVariants = {
    hidden: { opacity: 1, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: hasAnimatedBefore ? 0 : 0.6,
        ease: "easeInOut",
        delay: hasAnimatedBefore ? 0 : 0.3,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: hasAnimatedBefore ? 0 : 0.6,
        ease: "easeInOut",
        delay: hasAnimatedBefore ? 0 : 0.3,
      },
    },
  };

  return (
    <>
      {/* Animated Navbar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ opacity: 1, y: hasAnimatedBefore ? 0 : -100 }}
        animate={
          showNavbar
            ? { opacity: 1, y: 0, scale: 1 }
            : { y: hasAnimatedBefore ? 0 : -100 }
        }
        transition={{
          duration: hasAnimatedBefore ? 0 : 0.6,
          ease: "easeInOut",
          delay: hasAnimatedBefore ? 0 : 0.2,
        }}
      >
        <Navbar />
      </motion.div>

      <div className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            preload="none"
            poster="/assets/images/industries/posterimg.jpeg"
            playsInline
            className="w-full h-full object-cover"
            style={{ minHeight: "100vh", objectPosition: "center" }}
          >
            <source src={BgVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* White overlay animation - only animate once */}
        <motion.div
          initial={
            hasAnimatedBefore
              ? { opacity: 1, y: 0, boxShadow: "0 0 0 0px white" }
              : { opacity: 1, y: 1500, boxShadow: "0 0 0 9999px white" }
          }
          animate={
            hasAnimatedBefore
              ? { opacity: 1, y: 0, boxShadow: "0 0 0 0px white" }
              : {
                  opacity: 1,
                  y: 0,
                  boxShadow: isVideoExpanded
                    ? "0 0 0 0px white"
                    : "0 0 0 9999px white",
                }
          }
          transition={{
            duration: hasAnimatedBefore ? 0 : 0.6,
            ease: "easeOut",
          }}
          className={`absolute inset-0 transition-all ease-out bg-transparent ${
            isVideoExpanded || hasAnimatedBefore
              ? "scale-110"
              : "scale-75 rounded-[15px] sm:scale-50 sm:rounded-3xl m-4"
          }`}
          style={{
            transitionDuration: hasAnimatedBefore ? "0ms" : "800ms",
          }}
        />

        {/* Content - show when conditions are met */}
        {(isVideoExpanded || hasAnimatedBefore) &&
          (showContent || hasAnimatedBefore) && (
            <div className="container mx-auto relative z-10 w-full h-full flex items-center px-4 sm:px-6 md:px-8 lg:px-12 xl:px-15 2xl:px-25 py-16">
              <div className=" w-full mt-10 sm:mt-0">
                <div className="max-w-4xl text-white overflow-hidden">
                  <div className="overflow-hidden">
                    <motion.h1
                      className="text-[40px] xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight tracking-tight overflow-hidden"
                      variants={titleVariants}
                      initial="hidden"
                      animate="visible"
                      style={{
                        fontFamily: "'Articulat CF', sans-serif",
                        fontWeight: 500,
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
                        fontWeight: 500,
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
                      As a leading modular conveyor belt and component
                      manufacturer in India, we design durable and robust
                      solutions for food, packaging, and industrial
                      automation—built to last for generations.
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
                      color={"white"}
                      hoverColor={`#2E437C`}
                      onClick={() => navigate(`/products`)}
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
