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

  return (
    <section className="container mx-auto relative w-full bg-white  ">
      <div className="  md:text-left md:px-10 px-8 ">
        <motion.h2
          className="text-[36px] md:text-[48px] font-normal text-[#2E437C] leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Interactive <br />
          <span className="text-[#BABEC8] font-bold">Product Showcase</span>
        </motion.h2>

        <motion.p
          className="text-[#191919] mt-4 text-sm md:text-base max-w-xl mx-auto md:mx-0"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          {isDesktop
            ? "Click or hover over the hotspots to explore our products"
            : "Tap on the hotspots to explore our products"}
        </motion.p>
      </div>

      <div className="relative w-full max-w-6xl mx-auto">
        <div
          className="w-full h-auto cursor-not-allowed select-none"
          onContextMenu={handleContextMenu}
          onDragStart={handleDragStart}
        >
          <img
            src={showcaseImg}
            alt="Product Showcase"
            className="w-full h-auto object-contain"
          />
        </div>

        {points.map((point) => (
          <motion.div
            key={point.id}
            className="absolute"
            style={{ top: point.top, left: point.left }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.4 }}
            onMouseEnter={() =>
              window.innerWidth >= 768 && setActivePoint(point.id)
            }
            onMouseLeave={() =>
              window.innerWidth >= 768 && setActivePoint(null)
            }
            onClick={() => window.innerWidth < 768 && handlePointClick(point)}
          >
            <button
              aria-label="Hotspot"
              className="relative flex items-center justify-center
             w-4 h-4 sm:w-6 sm:h-6 md:w-5 md:h-5 lg:w-7 lg:h-7
               bg-orange-500 text-white rounded-full shadow-lg
           cursor-pointer transition-transform duration-200
                 hover:scale-110 active:scale-95"
            >
              <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-[ripple_2.5s_linear_infinite]" />
              <span className="absolute inset-0 rounded-full bg-orange-500/40 animate-[ripple_2.5s_linear_infinite] [animation-delay:1.25s]" />

              <TiPlus className="w-2 h-2 sm:w-3 sm:h-3 md:w-4 md:h-4 lg:w-4 lg:h-4 relative z-10" />
            </button>

            {/* Desktop tooltip */}
            <AnimatePresence>
              {activePoint === point.id && window.innerWidth >= 768 && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="absolute left-8 top-0 w-60 md:w-72 bg-white rounded-xl shadow-xl p-4 z-20"
                >
                  <h4 className="text-lg font-semibold text-[#2E437C]">
                    {point.title}
                  </h4>
                  <p className="text-gray-600 text-sm mt-1">{point.desc}</p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="mt-3 inline-flex items-center px-4 py-2 rounded-full border border-[#2E437C] text-[#2E437C] text-sm font-medium hover:bg-[#2E437C] hover:text-white transition-all"
                  >
                    VIEW →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPoint && window.innerWidth < 768 && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-xl shadow-xl p-6 w-full max-w-md relative"
            >
              <button
                onClick={closeMobileCard}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
              <h4 className="text-xl font-semibold text-[#2E437C]">
                {selectedPoint.title}
              </h4>
              <p className="text-gray-600 text-base mt-3">
                {selectedPoint.desc}
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="mt-5 w-full inline-flex items-center justify-center px-4 py-3 rounded-full border border-[#2E437C] text-[#2E437C] text-base font-medium hover:bg-[#2E437C] hover:text-white transition-all"
              >
                VIEW DETAILS →
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 md:bottom-5 md:right-5 flex items-start gap-2 text-black">
        
        <span className="text-lg sm:text-xl md:text-2xl">
          <CgArrowTopLeftO />
        </span>

        
        <div className="flex flex-col leading-tight">
          <span className="font-bold text-sm sm:text-base md:text-lg">
            Explore
          </span>
          <span className="text-sm sm:text-base md:text-lg">
            Click or Hover on any point
          </span>
        </div>
      </div>
    </section>
  );
};

export default ShowCase;
