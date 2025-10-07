// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HomeBanner from "../components/Home_Components/HomeBanner";
import Gatherings from "../components/Home_Components/Gatherings";
import CustomConveyor from "../components/Home_Components/CustomConveyor";
import ModulerSolution from "../components/Home_Components/ModulerSolution";
import ShowCase from "../components/Home_Components/ShowCase";
import IndustryCom from "../components/Home_Components/IndustryCom";
import ContactForm from "../components/contactUsForm/ContactForm";
import ClientFeedback from "../components/Home_Components/ClientFeedback";
import Resources from "../components/Home_Components/Resources";

// Assets
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import Seo from "../components/common/Seo";
import { CustomHeading } from "../components/common/CustomHeading";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Fast animation variants (≤0.8s)
const fastContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.4,
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const quickFadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const quickScale = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

// Partners data
const partners = [
  { id: 3, name: "l1", image: l1, width: 117 },
  { id: 4, name: "l2", image: l2, width: 110 },
  { id: 5, name: "l3", image: l3, width: 100 },
  { id: 6, name: "l4", image: l4, width: 200 },
  { id: 7, name: "l5", image: l5, width: 87 },
  { id: 8, name: "l6", image: l6, width: 200 },
];

export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);
  const [showMap, setShowMap] = useState(false);
  // Individual Lenis setup for this page
  // useEffect(() => {
  //   // Initialize Lenis with fast settings for 0.8s animations
  //   const lenis = new Lenis({
  //     lerp: 0.15,             // Fast interpolation
  //     duration: 0.8,          // Max 0.8s duration
  //     easing: (t) => 1 - Math.pow(1 - t, 3), // Fast ease-out cubic
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     mouseMultiplier: 1.2,   // Quick mouse response
  //     smoothTouch: false,     // Disable on mobile for performance
  //     touchMultiplier: 2.5,   // Quick touch response
  //     infinite: false,
  //     autoResize: true,
  //   });

  //   // Manual RAF loop for smooth scrolling
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);

  //   // GSAP ScrollTrigger integration
  //   lenis.on('scroll', ScrollTrigger.update);

  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   // Optional: Add scroll-triggered animations
  //   gsap.fromTo(".fade-in-section",
  //     {
  //       opacity: 0,
  //       y: 30,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.5, // Fast 0.5s animation
  //       ease: "power2.out",
  //       scrollTrigger: {
  //         trigger: ".fade-in-section",
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       }
  //     }
  //   );

  //   // Cleanup function
  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);
  useEffect(() => {
    const shouldScroll = localStorage.getItem("scrollToIndustries");
    if (shouldScroll === "true") {
      const section = document.getElementById("industries-section");
      if (section) {
        setTimeout(() => {
          section.scrollIntoView({ behavior: "smooth" });
        }, 300);
      }
      localStorage.removeItem("scrollToIndustries");
    }
  }, []);
  const handleBannerAnimationComplete = () => {
    setShowNavbar(true);
  };
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <div>
      <Seo
        title="ATC Chain India"
        description="ATC Chain designs and manufactures high-quality components for the food, beverage, packaging, automotive and automation industries providing the best solution designs and after-sale support."
        url="https://www.atcchain.com/"
      />
      <HomeBanner onAnimationComplete={handleBannerAnimationComplete} />

      {/* Animated Components with fast timing */}
      <motion.div
        variants={fastContainerVariants}
        initial="hidden"
        animate="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section  2xl:px-10"
        >
          <Gatherings />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section ">
          <ModulerSolution />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section ">
          <CustomConveyor />
        </motion.div>

        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section overflow-hidden"
        >
          <ShowCase />
        </motion.div>

        <motion.div
          variants={quickFadeInUp}
          className="fade-in-section"
          id="industries-section"
        >
          <IndustryCom />
        </motion.div>

        <motion.div variants={quickFadeInUp} className="fade-in-section">
          <ClientFeedback />
        </motion.div>
      </motion.div>

      {/* Partners Section with fast animations */}
      <motion.div
        className="our-client-section fade-in-section"
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <div className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-0 xl:px-0 py-16 sm:py-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mb-12 px-14"
          >
            <motion.h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
              <span className="text-[#2E437C]">
                <CustomHeading title="Our " className="" />
              </span>
              <span className="text-[#BABEC8]">
                <CustomHeading title="Clients" className="" />
              </span>
            </motion.h1>
          </motion.div>

          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.25 }}
            viewport={{ once: true }}
          >
            <div className="flex">
              {[1, 2].map((set) => (
                <motion.div
                  key={set}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-shrink-0 items-center  "
                >
                  {partners.map((partner) => (
                    <motion.div
                      key={`${set}-${partner.id}`}
                      className="flex-shrink-0 mx-12 px-0 md:px-5"
                      whileHover={{
                        scale: 1.05,

                        transition: { duration: 0.1 },
                      }}
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-12 sm:h-16 lg:h-20 object-contain transition-all duration-150"
                        style={{ maxWidth: `${partner.width}px` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        variants={quickFadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="fade-in-section"
      >
        <Resources />
      </motion.div>

      {/* Contact Form with quick animation */}
      <motion.div
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="fade-in-section  container mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20   "
      >
        <ContactForm />
      </motion.div>

      {/* Map Section with fast animation */}
      {/* <motion.section
        className=" w-full pt-10 bg-white fade-in-section overflow-hidden"
        variants={quickScale}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        <motion.div
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden shadow-lg"
         
        >
          <iframe
            title="ATC CHAINS INDIA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.604152548122!2d72.580103!3d23.03987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1726752975123!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </motion.section> */}
       <section
        className="w-full pt-10 bg-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden shadow-lg"
        >
          <iframe
            title="ATC CHAINS INDIA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.604152548122!2d72.580103!3d23.03987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1726752975123!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>

    </div>
  );
}
