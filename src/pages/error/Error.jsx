import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import Lottie from "lottie-react";
import err from "../../assets/json/Error404.json";
import Seo from "../../components/common/Seo";

gsap.registerPlugin(ScrollTrigger);
  
const Error = () => {
  const navigate = useNavigate();

  const getRandomBrightColor = () => {
    const hue = Math.random() * 360;
    const saturation = 70 + Math.random() * 30;
    const lightness = 50 + Math.random() * 20;
    return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
  };
  //   // Initialize Lenis smooth scrolling
  //   const lenis = new Lenis({
  //     lerp: 0.1,
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

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);

  const pageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: -20,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
  };

  const lottieVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateY: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  const textVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        delay: 0.4,
      },
    },
  };

  const buttonVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.6,
      },
    },
  };

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center relative overflow-hidden"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <Seo
        title="Error 404 | ATC Chain India"
        description="ATC Chain designs and manufactures high-quality components for the food, beverage, packaging, automotive and automation industries providing the best solution designs and after-sale support."
      />
      {/* Background Decorative Elements */}
      <motion.div
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-[#2E437C]/5 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, -20, 0],
          x: [0, 10, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-[#BABEC8]/5 to-transparent rounded-full blur-3xl"
        animate={{
          y: [0, 15, 0],
          x: [0, -5, 0],
          scale: [1, 0.9, 1],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      <motion.div
        className="container mx-auto px-5 lg:px-16 py-8 relative z-10"
        variants={containerVariants}
      >
        <motion.div
          className="max-w-2xl mx-auto text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Lottie Animation Container */}
          <motion.div
            className="w-full max-w-lg mx-auto mb-8"
            variants={lottieVariants}
            whileHover={{
              scale: 1.02,
              rotateY: 5,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              },
            }}
          >
            <div className="relative">
              <Lottie
                animationData={err}
                loop={true}
                className="w-full h-auto drop-shadow-lg"
              />

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#2E437C]/5 to-transparent rounded-2xl blur-xl -z-10" />
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div className="mb-8" variants={textVariants}>
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <span className="bg-gradient-to-r from-[#2E437C] to-[#BABEC8] bg-clip-text text-transparent">
                Oops!
              </span>
            </motion.h1>

            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-700 mb-4"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              Page Not Found
            </motion.h2>

            <motion.p
              className="text-lg text-gray-600 leading-relaxed max-w-md mx-auto"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              The page you're looking for seems to have wandered off into the
              digital void. Don't worry, it happens to the best of us!
            </motion.p>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={buttonVariants}
          >
            <motion.button
              onClick={handleGoHome}
              className="relative overflow-hidden bg-[#2E437C] text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl  min-w-[160px]"
              whileHover={{
                scale: 1.05,
                y: -2,
                boxShadow: "0 15px 35px rgba(46, 67, 124, 0.3)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              {/* Button background animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-[#1d3b72] to-[#2E437C]"
                initial={{ x: "-100%" }}
                whileHover={{
                  x: "0%",
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 25,
                    duration: 0.4,
                  },
                }}
              />

              <motion.span
                className="relative z-10 flex items-center justify-center gap-2"
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
              >
                Go Home
              </motion.span>
            </motion.button>

            <motion.button
              onClick={handleGoBack}
              className="relative overflow-hidden bg-white text-[#2E437C] border-2 border-[#2E437C] px-8 py-4 rounded-full font-semibold text-lg shadow-md hover:shadow-lg  min-w-[160px]"
              whileHover={{
                scale: 1.05,
                y: -2,
                backgroundColor: "#2E437C",
                color: "#FFFFFF",
                boxShadow: "0 15px 35px rgba(46, 67, 124, 0.2)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 25,
                  duration: 0.3,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <motion.span
                className="relative z-10 flex items-center justify-center gap-2"
                whileHover={{ x: -2 }}
                transition={{ duration: 0.2 }}
              >
                ← Go Back
              </motion.span>
            </motion.button>
          </motion.div>

          {/* Additional Help Text */}
          <motion.div
            className="mt-12 pt-8 border-t border-gray-200"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <motion.p
              className="text-sm text-gray-500 mb-4"
              whileHover={{ color: "#2E437C" }}
              transition={{ duration: 0.2 }}
            >
              Need help finding what you're looking for?
            </motion.p>

            <motion.div
              className="flex flex-wrap justify-center gap-4 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              {[
                { label: "Visit Homepage", path: "/" },
                { label: "Browse Products", path: "/products" },
                { label: "Contact Support", path: "/contact" },
              ].map((link, index) => (
                <motion.button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className="text-[#2E437C] hover:text-[#1d3b72] underline underline-offset-4 hover:underline-offset-2 transition-all duration-200"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.2 },
                  }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 + index * 0.1, duration: 0.3 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles effect */}
      {[...Array(100)].map((_, i) => {
        const randomColor = getRandomBrightColor();
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: randomColor,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        );
      })}
    </motion.div>
  );
};

export default Error;
