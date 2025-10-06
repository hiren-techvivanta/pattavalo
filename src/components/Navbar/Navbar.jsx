import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logoBlack from "../../assets/images/atc_logo.png";
import logoWhite from "../../assets/images/ATC Logo white.png";
import QuickSelectMenu from "./QuickSelectMenu";

export default function Navbar({ navStyle, show = true }) {
  const navigate = useNavigate();
  const [navBg, setNavBg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (navStyle !== "white") {
        if (window.scrollY >= 50) {
          setNavBg(true);
        } else {
          setNavBg(false);
        }
      }
    };

    if (navStyle === "white") {
      setNavBg(true);
    } else {
      setNavBg(window.scrollY >= 50);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [navStyle]);

  const menuItems = [
    { name: "Home", url: "/" },
    { name: "Products", url: "/products" },
    { name: "Industries" },
    { name: "News", url: "/news" },
    { name: "Jobs", url: "/jobs" },
    { name: "Downloads", url: "/downloads" },
    { name: "About Us", url: "/about" },
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const handleMobileMenuClick = (url) => {
    setIsOpen(false);
    navigate(url);
  };

  const handleContactClick = () => {
    console.log("Contact clicked");
    navigate("/contact");
  };
  const handleScrollToIndustries = () => {
    if (window.location.pathname !== "/") {
      localStorage.setItem("scrollToIndustries", "true");
      navigate("/");
    } else {
      const section = document.getElementById("industries-section");
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.nav
          className={`fixed w-full border-b border-white/50 top-0 left-0 z-50 transition-all duration-300 ${
            navBg
              ? "bg-white shadow-md border-b border-gray-200"
              : "bg-transparent"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={containerVariants}
        >
          <div className="mx-auto px-6 md:px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <motion.div
                className="flex-shrink-0 flex items-center cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                onClick={() => navigate("/")}
              >
                <img
                  src={navBg ? logoBlack : logoWhite}
                  alt="ATC Logo"
                  className="h-8 w-auto sm:h-10 md:h-8 lg:h-10"
                />
              </motion.div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center space-x-8">
                {/* {menuItems.map((menu, index) => (
                  <motion.button
                    key={menu.name}
                    onClick={() => navigate(menu.url)}
                    className={`${
                      navBg ? "text-[#2E437C]" : "text-white"
                    } transition-colors font-medium hover:text-[#2E437C] cursor-pointer me-2 md:me-3 lg:me-6 xl:me-8`}
                    style={{
                      fontFamily: "'Articulat CF', sans-serif",
                      fontSize: "16px",
                      letterSpacing: "0.5px",
                      fontWeight: 550,
                    }}
                  >
                    {menu.name}
                  </motion.button>
                ))} */}
                {menuItems.map((menu) =>
                  menu.name === "Industries" ? (
                    <motion.button
                      key={menu.name}
                      onClick={handleScrollToIndustries} 
                      className={`${navBg ? "text-[#2E437C]" : "text-white"} 
                  transition-colors hover:text-[#2E437C]`}
                      style={{
                        fontFamily: "'Articulat CF', sans-serif",
                        fontSize: "16px",
                        fontWeight: 450,
                      }}
                    >
                      {menu.name}
                    </motion.button>
                  ) : (
                    <motion.button
                      key={menu.name}
                      onClick={() => navigate(menu.url)} // normal pages ke liye
                      className={`${navBg ? "text-[#2E437C]" : "text-white"} 
                  transition-colors font-medium hover:text-[#2E437C]`}
                      style={{
                        fontFamily: "'Articulat CF', sans-serif",
                        fontSize: "16px",
                        fontWeight: 450,
                      }}
                    >
                      {menu.name}
                    </motion.button>
                  )
                )}
              </div>

              {/* Desktop Actions - Quick Select + Contact Button */}
              <div className="hidden md:flex items-center space-x-4">
                <QuickSelectMenu navBg={navBg} />

                {/* Contact Button */}
                <motion.button
                  onClick={() => {
                    setIsOpen(false);
                    handleContactClick();
                    navigate("/contact");
                  }}
                  className={`inline-flex justify-center items-center border font-medium px-6 py-2 rounded-full text-base transition-all duration-200 ${
                    navBg
                      ? "border-[#2E437C] text-[#2E437C] hover:bg-[#2E437C] hover:text-white"
                      : "border-white text-white hover:bg-white hover:text-[#2E437C]"
                  }`}
                  style={{
                    fontFamily: "'Articulat CF', sans-serif",
                    fontWeight: 500,
                    fontSize: "16px",
                    letterSpacing: "0.5px",
                  }}
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.2 },
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  CONTACT US
                </motion.button>
              </div>

              {/* Mobile Actions - Quick Select + Menu Button */}
              <div className="md:hidden flex items-center space-x-3">
                {/* Quick Select Menu for Mobile */}
                <QuickSelectMenu navBg={navBg} />

                {/* Mobile Menu Button */}
                <motion.button
                  onClick={() => setIsOpen(!isOpen)}
                  className={`focus:outline-none p-2 rounded-md ${
                    navBg
                      ? "text-[#2E437C] hover:bg-gray-100"
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

          {/* Mobile Menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                className={`md:hidden fixed inset-x-0 top-20 shadow-lg ${
                  navBg
                    ? "bg-white border-t border-gray-200"
                    : "bg-gray-900/95 backdrop-blur-md"
                }`}
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="px-5 pt-4 pb-8 space-y-1 flex flex-col">
                  {menuItems.map((menu, index) => (
                    <motion.button
                      key={menu.name}
                      onClick={() => handleMobileMenuClick(menu.url)}
                      className={`py-4 px-4 rounded-lg text-lg text-left ${
                        navBg
                          ? "text-[#2E437C] hover:bg-gray-100"
                          : "text-white hover:bg-gray-800"
                      } transition-colors font-medium`}
                      style={{ fontFamily: "'Articulat CF', sans-serif" }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      {menu.name}
                    </motion.button>
                  ))}

                  {/* Mobile Contact Button */}
                  <motion.div
                    className="pt-4 px-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      onClick={() => {
                        setIsOpen(false);
                        handleContactClick();
                      }}
                      className={`w-full inline-flex justify-center items-center border font-medium px-6 py-3 rounded-full text-base transition-all ${
                        navBg
                          ? "border-[#2E437C] text-[#2E437C] hover:bg-[#2E437C] hover:text-white"
                          : "border-white text-white hover:bg-white hover:text-[#2E437C]"
                      }`}
                      style={{
                        fontFamily: "'Articulat CF', sans-serif",
                        fontWeight: 300,
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      CONTACT US
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
