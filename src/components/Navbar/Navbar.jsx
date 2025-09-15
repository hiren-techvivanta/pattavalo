import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../../assets/images/atc_logo.png";

export default function Navbar() {
  const [navBg, setNavBg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 50) {
        setNavBg(true);
      } else {
        setNavBg(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    "Home",
    "Products",
    "Industries",
    "News",
    "Jobs",
    "About Us",
  ];

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 },
  };

  
  const desktopButtonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.6 },
    },
    hover: {
   
      backgroundColor: "#2E437C",
      color: "#FFFFFF",
      borderColor: "#2E437C",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  const mobileButtonVariants = {
    hover: {
      backgroundColor: "#FFFFFF",
      color: "#2E437C",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  return (
    <motion.nav
      className={`fixed w-full border-b border-white/50 top-0 left-0 z-50 transition-all duration-300 ${
        navBg ? "bg-white shadow-md border-b border-gray-200" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className=" mx-auto px-6 md:px-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <motion.div
            className="flex-shrink-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <img src={logo} alt="ATC Logo" className="h-10 w-auto " />
          </motion.div>

        
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((menu, index) => (
              <motion.a
                key={menu}
                href="#"
                className={`${
                  navBg ? "text-gray-800" : "text-white"
                } transition-colors font-medium hover:text-blue-600`}
                style={{
                  fontFamily: "'Articulat CF', sans-serif",
                  fontSize: "0.95rem",
                  fontWeight: 450,
                }}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: index * 0.1 + 0.3 }}
                whileHover={{ y: -2 }}
              >
                {menu}
              </motion.a>
            ))}
          </div>

          
          <div className="hidden md:flex">
            <motion.button
              className={`inline-flex items-center border-1 font-medium px-6 py-2.5 rounded-full transition ${
                navBg
                  ? "border-[#2E437C] text-[#2E437C] hover:bg-[#2E437C] hover:text-white"
                  : "border-white text-white hover:bg-white hover:text-[#2E437C]"
              }`}
              variants={desktopButtonVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              whileTap="tap"
              style={{
                fontFamily: "'Articulat CF', sans-serif",
                fontWeight: 500,
                letterSpacing: "0.5px",
              }}
            >
              CONTACT US
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className={`focus:outline-none p-1 rounded-md ${
                navBg
                  ? "text-gray-800 hover:bg-gray-100"
                  : "text-white hover:bg-white/10"
              }`}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              <svg
                className="h-7 w-7"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`md:hidden fixed inset-x-0 top-20 shadow-lg ${
              navBg ? "bg-white" : "bg-gray-900"
            }`}
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="px-5 pt-4 pb-8 space-y-1 flex flex-col">
              {menuItems.map((menu, index) => (
                <motion.a
                  key={menu}
                  href="#"
                  className={`py-4 px-4 rounded-lg text-lg ${
                    navBg
                      ? "text-gray-800 hover:bg-gray-100"
                      : "text-white hover:bg-gray-800"
                  } transition-colors font-medium`}
                  style={{ fontFamily: "'Articulat CF', sans-serif" }}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  {menu}
                </motion.a>
              ))}
              <motion.div
                className="pt-2 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.button
                  className={`w-full inline-flex justify-center items-center border-2 font-medium px-6 py-3.5 rounded-full text-lg ${
                    navBg
                      ? "border-[#2E437C] text-[#2E437C] hover:bg-[#2E437C] hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-[#2E437C]"
                  }`}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 500,
                  }}
                  onClick={() => setIsOpen(false)}
                  variants={mobileButtonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  CONTACT US
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
