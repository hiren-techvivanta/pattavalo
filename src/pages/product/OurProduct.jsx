import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProductCom from "../../components/ProductComponent/ProductCom";
import Navbar from "../../components/Navbar/Navbar";

gsap.registerPlugin(ScrollTrigger);

function OurProduct() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.12,
      duration: 0.8,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      direction: "vertical",
      gestureDirection: "vertical",
      smooth: true,
      mouseMultiplier: 1.2,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
      autoResize: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);
    
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
      },
    },
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        delay: 0.1,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen bg-white"
    >
      <motion.div 
        className="nav_section relative z-50"
        variants={navVariants}
      >
        <div className="backdrop-blur-sm bg-white/95 border-b border-gray-100">
          <Navbar navStyle={"white"} />
        </div>
      </motion.div>

      <motion.div
        className="w-full bg-gradient-to-b from-gray-50/30 to-white pt-20 md:pt-24 lg:pt-20"
        variants={contentVariants}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            delay: 0.2,
          }}
        >
          <ProductCom />
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#2E437C] to-[#1d3b72] origin-left z-40"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
          delay: 0.1,
        }}
      />
    </motion.div>
  );
}

export default OurProduct;
