import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import logoBlack from "../../assets/images/atc_logo.png";
import logoWhite from "../../assets/images/ATC Logo white.png";
import QuickSelectMenu from "./QuickSelectMenu";

export default function Navbar({ navStyle, show = true }) {
  const navigate = useNavigate();
  const [navBg, setNavBg] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

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

  // // Force navbar to stay fixed at top
  // useEffect(() => {
  //   const forceNavbarPosition = () => {
  //     if (navRef.current) {
  //       const nav = navRef.current;
  //       nav.style.setProperty('position', 'fixed', 'important');
  //       nav.style.setProperty('top', '0px', 'important');
  //       nav.style.setProperty('left', '0px', 'important');
  //       nav.style.setProperty('right', '0px', 'important');
  //       nav.style.setProperty('width', '100vw', 'important');
  //       nav.style.setProperty('transform', 'none', 'important');
  //       nav.style.setProperty('transform-origin', 'initial', 'important');
  //     }

  //     if (mobileMenuRef.current) {
  //       const menu = mobileMenuRef.current;
  //       menu.style.setProperty('position', 'fixed', 'important');
  //       menu.style.setProperty('width', '100vw', 'important');
  //       menu.style.setProperty('transform', 'none', 'important');
  //     }
  //   };

  //   // Force positioning immediately
  //   forceNavbarPosition();
    
  //   // Force positioning on scroll
  //   const handleScroll = () => {
  //     forceNavbarPosition();
  //   };

  //   // Force positioning on resize
  //   const handleResize = () => {
  //     forceNavbarPosition();
  //   };

  //   // Force positioning periodically
  //   const interval = setInterval(forceNavbarPosition, 100);

  //   window.addEventListener('scroll', handleScroll);
  //   window.addEventListener('resize', handleResize);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     window.removeEventListener('resize', handleResize);
  //     clearInterval(interval);
  //   };
  // }, []);

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
          ref={navRef}
          className={`navbar-fixed fixed w-full border-b border-white/50 top-0 left-0 z-50 transition-all duration-300 ${
            navBg
              ? "bg-white shadow-md border-b border-gray-200"
              : "bg-transparent"
          }`}
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          variants={containerVariants}
          style={{
            // Inline styles to ensure navbar stays unscaled
            position: 'fixed',
            top: '0px',
            left: '0px',
            right: '0px',
            zIndex: '12',
            width: '100vw',
            transform: 'none',
            transformOrigin: 'initial'
          }}
        >
          <div className="mx-auto px-6 md:px-3 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-15">
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
                  className="h-8 w-auto sm:h-10 md:h-8 lg:h-7"
                />
              </motion.div>

              {/* Desktop Menu - Changed from md:flex to lg:flex (992px+) */}
              <div className="hidden lg:flex items-center space-x-8">
                {menuItems.map((menu) =>
                  menu.name === "Industries" ? (
                    <motion.button
                      key={menu.name}
                      onClick={handleScrollToIndustries}
                      className={`${navBg ? "text-[#2E437C]" : "text-white"} 
                  transition-colors cursor-pointer hover:text-[#2E437C]`}
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
                      onClick={() => navigate(menu.url)}
                      className={`${navBg ? "text-[#2E437C]" : "text-white"} 
                  transition-colors cursor-pointer font-medium hover:text-[#2E437C]`}
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

              {/* Desktop Right Side - Changed from md:flex to lg:flex (992px+) */}
              <div className="hidden lg:flex items-center space-x-4">
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

              {/* Mobile Menu Button - Changed from md:hidden to lg:hidden (show below 992px) */}
              <div className="lg:hidden flex items-center space-x-3">
                <QuickSelectMenu navBg={navBg} />

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

          {/* Mobile Menu - Changed from md:hidden to lg:hidden */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={mobileMenuRef}
                className={`lg:hidden fixed inset-x-0 top-20 shadow-lg ${
                  navBg
                    ? "bg-white border-t border-gray-200"
                    : "bg-gray-900/95 backdrop-blur-md"
                }`}
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
                style={{
                  // Ensure mobile menu also stays unscaled
                  position: 'fixed',
                  // zIndex: '9998',
                  width: '100vw',
                  transform: 'none'
                }}
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
