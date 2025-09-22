import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import showcaseImg from "../../assets/images/Showcase.png";
import { CgArrowTopLeftO } from "react-icons/cg";
import { TiPlus } from "react-icons/ti";

const ShowCase = () => {
  const [activePoint, setActivePoint] = useState(null);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleContextMenu = (e) => {
    e.preventDefault();
  };

  const handleDragStart = (e) => {
    e.preventDefault();
  };

  const handlePointClick = (point) => {
    setSelectedPoint(point);
  };

  const closeMobileCard = () => {
    setSelectedPoint(null);
  };

  const points = [
    {
      id: 1,
      top: "30%",
      left: "12%",
      title: "Elevator",
      desc: "Vertical lift system for material handling.",
    },
    {
      id: 2,
      top: "75%",
      left: "13%",
      title: "Spiral Conveyor",
      desc: "Smooth spiral conveyor for high throughput.",
    },
    {
      id: 3,
      top: "42%",
      left: "58%",
      title: "Storage System",
      desc: "Multi-level storage for efficiency.",
    },
    {
      id: 4,
      top: "31%",
      left: "31%",
      title: "Conveyor Belt",
      desc: "Durable and efficient conveyor systems.",
    },
    {
      id: 5,
      top: "47%",
      left: "84%",
      title: "Bearing",
      desc: "Explore our wide range of high-performance bearings.",
    },
    {
      id: 6,
      top: "67%",
      left: "39%",
      title: "Motor Drive",
      desc: "High-efficiency motors for performance.",
    },
    {
      id: 7,
      top: "76%",
      left: "90%",
      title: "Inspection Station",
      desc: "Quality assurance with advanced inspection tools.",
    },
    {
      id: 8,
      top: "86%",
      left: "54.5%",
      title: "Control Panel",
      desc: "Centralized control unit for monitoring operations.",
    },
    {
      id: 9,
      top: "60%",
      left: "22%",
      title: "Packaging Unit",
      desc: "Automated packaging for efficiency and safety.",
    },
    {
      id: 10,
      top: "65%",
      left: "77%",
      title: "Cooling System",
      desc: "Maintains optimal temperature for smooth operation.",
    },
    {
      id: 11,
      top: "83%",
      left: "80%",
      title: "Safety Guard",
      desc: "Protective guard ensuring operator safety.",
    },
  ];

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.5,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.6,
        delay: 0.2,
      },
    },
  };

  const hotspotVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0,
      rotate: -180 
    },
    visible: (index) => ({
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        delay: 0.4 + index * 0.05,
        duration: 0.4,
      },
    }),
  };

  const tooltipVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      scale: 0.9,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30,
        duration: 0.25,
      },
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      filter: "blur(2px)",
      transition: {
        duration: 0.15,
        ease: "easeOut",
      },
    },
  };

  const mobileCardVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.4,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="container mx-auto relative w-full bg-white">
      <div className="md:text-left md:px-0 px-8">
        <motion.h2
          className="text-[36px] md:text-[48px] font-normal text-[#2E437C] leading-tight"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={titleVariants}
        >
          Interactive <br />
          <span className="text-[#BABEC8] font-bold">Product Showcase</span>
        </motion.h2>

        <motion.p
          className="text-[#191919] mt-4 text-sm md:text-base max-w-xl mx-auto md:mx-0"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 25,
                delay: 0.3,
              },
            },
          }}
        >
          {isDesktop
            ? "Click or hover over the hotspots to explore our products"
            : "Tap on the hotspots to explore our products"}
        </motion.p>
      </div>

      <div className="relative w-full mx-auto">
        <motion.div
          className="w-full h-auto cursor-not-allowed select-none"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={imageVariants}
        >
          <img
            src={showcaseImg}
            alt="Product Showcase"
            className="w-full h-auto object-contain"
          />
        </motion.div>

        {points.map((point, index) => (
          <motion.div
            key={point.id}
            className="absolute"
            style={{ top: point.top, left: point.left }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={hotspotVariants}
            custom={index}
            onMouseEnter={() =>
              window.innerWidth >= 768 && setActivePoint(point.id)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && setActivePoint(null)
            }
            onClick={() => window.innerWidth < 768 && handlePointClick(point)}
          >
            <motion.button
              aria-label="Hotspot"
              className="relative flex items-center justify-center w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-7 lg:h-7 bg-orange-500 text-white rounded-full shadow-lg cursor-pointer overflow-hidden"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 8px 25px rgba(249, 115, 22, 0.4)",
                transition: {
                  type: "spring",
                  stiffness: 500,
                  damping: 25,
                  duration: 0.2,
                },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.1 },
              }}
            >
              <motion.span
                className="absolute inset-0 rounded-full bg-orange-400/60"
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.6, 0, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.span
                className="absolute inset-0 rounded-full bg-orange-400/40"
                animate={{
                  scale: [1, 2.2, 1],
                  opacity: [0.4, 0, 0.4],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
              />

              <motion.div
                animate={{
                  rotate: [0, 90, 180, 270, 360],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <TiPlus className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 relative z-10" />
              </motion.div>
            </motion.button>

            <AnimatePresence>
              {activePoint === point.id && window.innerWidth >= 768 && (
                <motion.div
                  variants={tooltipVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute left-8 top-0 w-60 md:w-72 bg-white rounded-2xl shadow-2xl p-5 z-20 border border-gray-100"
                  style={{
                    backdropFilter: "blur(10px)",
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                  }}
                >
                  <div className="absolute -left-2 top-4 w-4 h-4 bg-white border-l border-t border-gray-100 rotate-45 rounded-tl-sm" />
                  
                  <motion.h4
                    className="text-lg font-semibold text-[#2E437C] mb-2"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    {point.title}
                  </motion.h4>
                  
                  <motion.p
                    className="text-gray-600 text-sm mb-4 leading-relaxed"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    {point.desc}
                  </motion.p>
                  
                  <motion.button
                    className="inline-flex items-center px-4 py-2 rounded-full border border-[#2E437C] text-[#2E437C] text-sm font-medium transition-all duration-300 group overflow-hidden relative"
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 4px 15px rgba(46, 67, 124, 0.2)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <span className="absolute inset-0 bg-[#2E437C] transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
                    <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                      VIEW →
                    </span>
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPoint && window.innerWidth < 768 && (
          <motion.div
            className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ backdropFilter: "blur(4px)" }}
          >
            <motion.div
              variants={mobileCardVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md relative"
            >
              <motion.button
                onClick={closeMobileCard}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
              
              <motion.h4
                className="text-xl font-semibold text-[#2E437C] pr-8"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {selectedPoint.title}
              </motion.h4>
              
              <motion.p
                className="text-gray-600 text-base mt-3 leading-relaxed"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {selectedPoint.desc}
              </motion.p>
              
              <motion.button
                className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 rounded-xl bg-[#2E437C] text-white text-base font-medium shadow-lg transition-all duration-300"
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0 8px 25px rgba(46, 67, 124, 0.3)",
                }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                VIEW DETAILS →
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        className="w-full justify-end flex items-start gap-2 text-black mt-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 25,
          delay: 0.8,
        }}
      >
        <motion.span
          className="text-lg sm:text-xl md:text-2xl"
          animate={{
            rotate: [0, -10, 0, 10, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <CgArrowTopLeftO />
        </motion.span>

        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm sm:text-base md:text-lg">
            Explore
          </span>
          <span className="text-sm sm:text-base md:text-lg">
            Click or Hover on any point
          </span>
        </div>
      </motion.div>
    </section>
  );
};

export default ShowCase;
