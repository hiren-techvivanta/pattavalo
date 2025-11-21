import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { GoFilter } from "react-icons/go";
import axios from "axios";

const QuickSelectMenu = ({ navBg }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [expandedSubcategory, setExpandedSubcategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

  const axiosConfig = {
    headers: {
      "ngrok-skip-browser-warning": "true",
      "Content-Type": "application/json",
    },
  };

  // Handle menu height and scrolling
  useEffect(() => {
    if (isOpen && menuRef.current && !isMobile) {
      const menu = menuRef.current;
      const viewportHeight = window.innerHeight;
      const maxHeight = viewportHeight * 0.8; // 80vh

      // Check if content height exceeds 80vh
      const contentHeight = menu.scrollHeight;
      if (contentHeight > maxHeight) {
        menu.style.maxHeight = `${maxHeight}px`;
        menu.style.overflowY = "auto";
      }

      // Prevent window scroll when scrolling inside menu
      const handleWheel = (e) => {
        if (menu.contains(e.target)) {
          const atTop = menu.scrollTop <= 0;
          const atBottom =
            menu.scrollTop >= menu.scrollHeight - menu.clientHeight;

          // Only prevent window scroll if menu can still scroll
          if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
            e.stopPropagation();
          }
        }
      };

      document.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        document.removeEventListener("wheel", handleWheel);
      };
    }
  }, [isOpen, isMobile, categories, expandedCategory, selectedCategory]);

  // Check if mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 767);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (isOpen && categories.length === 0) {
      fetchCategories();
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
        // Reset mobile accordion state
        setExpandedCategory(null);
        setExpandedSubcategory(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/chart`,
        axiosConfig
      );

      const result = response.data;

      if (result.message === "Chart fetched successfully" && result.data) {
        const transformedCategories = transformApiData(result.data);
        setCategories(transformedCategories);

        if (transformedCategories.length > 0) {
          // setSelectedCategory(transformedCategories[0].id);
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch categories"
      );
    } finally {
      setLoading(false);
    }
  };

  const transformApiData = (apiData) => {
    return apiData.map((category, index) => {
      const subcategories = [];
      const directProducts = [];

      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((subcategory) => {
          const subcategoryProducts = subcategory.products.map((product) => ({
            id: product.id,
            title: product.productName || product.productname,
            type: "product",
            categoryId: category.id,
            subcategoryId: subcategory.id,
            parentCategory: category.name,
            category: subcategory.name,
          }));

          subcategories.push({
            id: subcategory.id,
            name: subcategory.name,
            type: "subcategory",
            categoryId: category.id,
            products: subcategoryProducts,
          });
        });
      }

      if (category.products && category.products.length > 0) {
        category.products.forEach((product) => {
          directProducts.push({
            id: product.id,
            title: product.productName || product.productname,
            type: "product",
            categoryId: category.id,
            parentCategory: category.name,
            category: category.name,
          });
        });
      }

      return {
        id: category.id,
        name: category.name,
        type: "category",
        subcategories: subcategories,
        directProducts: directProducts,
      };
    });
  };

  // Navigation function to build dynamic URLs
  const handleNavigation = (item) => {
    setIsOpen(false);
    setExpandedCategory(null);
    setExpandedSubcategory(null);

    let queryParams = new URLSearchParams();

    if (item.type === "category") {
      queryParams.set("category", item.id);
    } else if (item.type === "subcategory") {
      queryParams.set("category", item.categoryId);
      queryParams.set("subcategory", item.id);
    } else if (item.type === "product") {
      queryParams.set("category", item.categoryId);

      if (item.subcategoryId) {
        queryParams.set("subcategory", item.subcategoryId);
      }

      queryParams.set("product", item.id);
    }

    navigate(`/products?${queryParams.toString()}`);
  };

  // Handle clicks based on device type
  const handleItemClick = (item) => {
    if (isMobile) {
      // Mobile behavior - only navigate on product click
      if (item.type === "product") {
        handleNavigation(item);
      } else if (item.type === "category") {
        setExpandedCategory(expandedCategory === item.id ? null : item.id);
        setExpandedSubcategory(null);
      } else if (item.type === "subcategory") {
        setExpandedSubcategory(
          expandedSubcategory === item.id ? null : item.id
        );
      }
    } else {
      // Desktop behavior - navigate on any click
      handleNavigation(item);
    }
  };

  // Desktop hover handlers
  const handleCategoryHover = (categoryId) => {
    if (!isMobile) {
      setSelectedCategory(categoryId);
      setSelectedSubCategory(null);
    }
  };

  const handleSubcategoryHover = (subcategoryId) => {
    if (!isMobile) {
      setSelectedSubCategory(subcategoryId);
    }
  };

  const getSelectedCategoryData = () => {
    return categories.find((cat) => cat.id === selectedCategory);
  };

  const getSelectedSubcategoryData = () => {
    const category = getSelectedCategoryData();
    if (!category || !selectedSubCategory) return null;
    return category.subcategories.find((sub) => sub.id === selectedSubCategory);
  };

  const buttonVariants = {
    closed: {
      width: "44px",
    },
    open: {
      width: "44px",
    },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -8, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.25,
        staggerChildren: 0.015,
        delayChildren: 0.05,
      },
    },
    exit: {
      opacity: 0,
      y: -8,
      scale: 0.98,
      transition: { duration: 0.15, ease: "easeInOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -8 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 35,
        duration: 0.2,
      },
    },
  };

  return (
    <div className="relative">
      {/* Icon Quick Select Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={`h-11 ${navBg ? "text-[#2E437C]" : "text-white"}`}
        variants={buttonVariants}
        animate={isOpen ? "open" : "closed"}
      >
        <div className="mx-auto">
          <GoFilter className="w-5 h-5 mx-auto" />
        </div>
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            ref={menuRef}
            className={`mt-2 bg-white shadow-2xl z-50 overflow-hidden show-scrollbar ${
              isMobile
                ? "absolute right-0 w-[102vw] max-w-[110vw]"
                : "center-div"
            }`}
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={
              isMobile
                ? {
                    right: -80,
                    transform: "translateX(-50%)",
                  }
                : {
                    position: "fixed",
                    marginTop: 0,
                  }
            }
          >
            {/* Header */}
            <motion.div className="bg-white px-6 py-4" variants={itemVariants}>
              <div className="flex items-center gap-3 max-w-7xl mx-auto">
                <h2
                  className="text-[#2E437C] font-bold text-2xl"
                  style={{ fontFamily: "'Articulat CF', sans-serif" }}
                >
                  Quick Select
                </h2>
                <div className="flex-1 h-[6px] bg-[#2E437C]"></div>
              </div>
            </motion.div>

            {loading && (
              <div className="flex items-center justify-center py-20">
                <CircularProgress size={40} sx={{ color: "#2E437C" }} />
                <span className="ml-3 text-gray-600">
                  Loading categories...
                </span>
              </div>
            )}

            {error && !loading && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <p className="text-red-500 mb-2">Failed to load categories</p>
                  <button
                    onClick={fetchCategories}
                    className="text-[#2E437C] hover:text-[#1E2F5C] underline transition-colors duration-200"
                  >
                    Try again
                  </button>
                </div>
              </div>
            )}

            {!loading && !error && categories.length > 0 && (
              <>
                {/* Mobile Accordion View - Updated Styles */}
                {isMobile && (
                  <div className="max-h-96 overflow-y-auto show-scrollbar" >
                    <div className="p-4">
                      {categories.map((category) => (
                        <div key={category.id} className="mb-4">
                          {/* Category Header - Matching Desktop Style */}
                          <motion.div
                            className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-100 ${
                              expandedCategory === category.id
                                ? ""
                                : "hover:bg-gray-50"
                            }`}
                            onClick={() => handleItemClick(category)}
                          >
                            <span
                              className={`transition-colors duration-100 ${
                                expandedCategory === category.id
                                  ? "text-[#000] font-[500]"
                                  : "text-[#666666] font-medium"
                              }`}
                              style={{
                                fontFamily: "'Articulat CF', sans-serif",
                                fontSize: "17px",
                              }}
                            >
                              {category.name}
                            </span>
                            <motion.div
                              animate={{
                                rotate:
                                  expandedCategory === category.id ? 0 : -90,
                                color:
                                  expandedCategory === category.id
                                    ? "#2E437C"
                                    : "#9CA3AF",
                              }}
                              transition={{ duration: 0.1 }}
                            >
                              <IoChevronDown className="w-6 h-6" />
                            </motion.div>
                          </motion.div>

                          {/* Category Content */}
                          <AnimatePresence>
                            {expandedCategory === category.id && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 pt-2">
                                  {/* Subcategories - Matching Desktop Style */}
                                  {category.subcategories.map((subcategory) => (
                                    <div key={subcategory.id} className="mb-2">
                                      <motion.div
                                        className={`flex items-center justify-between p-2.5 cursor-pointer rounded-lg transition-all duration-100 ${
                                          expandedSubcategory === subcategory.id
                                            ? ""
                                            : "hover:bg-gray-50"
                                        }`}
                                        onClick={() =>
                                          handleItemClick(subcategory)
                                        }
                                      >
                                        <span
                                          className={`transition-colors duration-100 font-medium ${
                                            expandedSubcategory ===
                                            subcategory.id
                                              ? "text-[#000] font-[500]"
                                              : "text-gray-700"
                                          }`}
                                          style={{
                                            fontFamily:
                                              "'Articulat CF', sans-serif",
                                            fontSize: "15px",
                                          }}
                                        >
                                          {subcategory.name}
                                        </span>
                                        <motion.div
                                          animate={{
                                            rotate:
                                              expandedSubcategory ===
                                              subcategory.id
                                                ? 0
                                                : -90,
                                            color:
                                              expandedSubcategory ===
                                              subcategory.id
                                                ? "#2E437C"
                                                : "#9CA3AF",
                                          }}
                                          transition={{ duration: 0.1 }}
                                        >
                                          <IoChevronDown className="w-6 h-6" />
                                        </motion.div>
                                      </motion.div>

                                      {/* Subcategory Products - Matching Desktop Style */}
                                      <AnimatePresence>
                                        {expandedSubcategory ===
                                          subcategory.id && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{
                                              height: "auto",
                                              opacity: 1,
                                            }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                            className="overflow-hidden pl-4 pt-1"
                                          >
                                            {subcategory.products.map(
                                              (product) => (
                                                <motion.div
                                                  key={product.id}
                                                  className="flex items-center p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-100"
                                                  onClick={() =>
                                                    handleItemClick(product)
                                                  }
                                                  whileHover={{ x: 2 }}
                                                >
                                                  <span
                                                    className="text-[#666666] font-medium transition-colors duration-100"
                                                    style={{
                                                      fontFamily:
                                                        "'Articulat CF', sans-serif",
                                                      fontSize: "15px",
                                                      lineHeight: "22px",
                                                    }}
                                                  >
                                                    • {product.title}
                                                  </span>
                                                </motion.div>
                                              )
                                            )}
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  ))}

                                  {/* Direct Products - Matching Desktop Style */}
                                  {category.directProducts.map((product) => (
                                    <motion.div
                                      key={product.id}
                                      className="flex items-center p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-100"
                                      onClick={() => handleItemClick(product)}
                                      whileHover={{ x: 2 }}
                                    >
                                      <span
                                        className="text-[#666666] font-medium transition-colors duration-100"
                                        style={{
                                          fontFamily:
                                            "'Articulat CF', sans-serif",
                                          fontSize: "15px",
                                          lineHeight: "22px",
                                        }}
                                      >
                                        • {product.title}
                                      </span>
                                    </motion.div>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Desktop Mega Menu - Keep existing styles */}
                {!isMobile && (
                  <div className="max-w-7xl mx-auto">
                    <div className="flex justify-center mt-5">
                      {/* Left Column - Main Categories */}
                      <motion.div
                        className="bg-white flex-1 max-w-md border-r-2 border-gray-100"
                        variants={itemVariants}
                        style={{ minHeight: "auto" }}
                      >
                        <div className="p-3.5 pt-0">
                          {categories.map((category, index) => (
                            <motion.div
                              key={category.id}
                              className={`flex items-center justify-between p-4 cursor-pointer transition-all duration-100`}
                              variants={itemVariants}
                              onClick={() => handleCategoryHover(category.id)}
                            >
                              <span
                                className={`text-base transition-colors duration-100 ${
                                  selectedCategory === category.id
                                    ? "text-[#000] font-[500]"
                                    : "text-[#666666] font-medium"
                                }`}
                                style={{
                                  fontFamily: "'Articulat CF', sans-serif",
                                  fontSize: "17px",
                                }}
                              >
                                {category.name}
                              </span>
                              <motion.div
                                animate={{
                                  rotate: -90,
                                  color:
                                    selectedCategory === category.id
                                      ? "#2E437C"
                                      : "#9CA3AF",
                                }}
                                transition={{ duration: 0.1 }}
                              >
                                <IoChevronDown className="w-6 h-6" />
                              </motion.div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>

                      {/* Middle Column - Subcategories & Direct Products */}
                      <motion.div
                        className="bg-white flex-1 max-w-lg border-r-2 border-gray-100"
                        variants={itemVariants}
                        style={{ minHeight: "auto" }}
                      >
                        <div className="p-3.5 pt-0">
                          <AnimatePresence mode="wait">
                            {selectedCategory && (
                              <motion.div
                                key={selectedCategory}
                                initial={{ opacity: 0, x: 15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -15 }}
                                transition={{ duration: 0.15 }}
                              >
                                {/* Subcategories */}
                                {getSelectedCategoryData()?.subcategories.map(
                                  (subcategory, index) => (
                                    <motion.div
                                      key={subcategory.id}
                                      className={`flex items-center justify-between p-2.5 cursor-pointer rounded-lg transition-all duration-100`}
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: index * 0.02,
                                        duration: 0.15,
                                      }}
                                      onClick={() =>
                                        handleSubcategoryHover(subcategory.id)
                                      }
                                    >
                                      <span
                                        className={`text-sm transition-colors duration-100 font-medium ${
                                          selectedSubCategory === subcategory.id
                                            ? "text-[#000] font-[500]"
                                            : "text-gray-700"
                                        }`}
                                        style={{
                                          fontFamily:
                                            "'Articulat CF', sans-serif",
                                          fontSize: "15px",
                                        }}
                                      >
                                        {subcategory.name}
                                      </span>
                                      <motion.div
                                        animate={{
                                          rotate: -90,
                                          color:
                                            selectedSubCategory ===
                                            subcategory.id
                                              ? "#2E437C"
                                              : "#9CA3AF",
                                        }}
                                        transition={{ duration: 0.1 }}
                                      >
                                        <IoChevronDown className="w-6 h-6" />
                                      </motion.div>
                                    </motion.div>
                                  )
                                )}

                                {/* Direct Products */}
                                {getSelectedCategoryData()?.directProducts.map(
                                  (product, index) => (
                                    <motion.div
                                      key={product.id}
                                      className="flex items-center justify-between p-2.5 cursor-pointer rounded-lg transition-all duration-100"
                                      initial={{ opacity: 0, y: 8 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay:
                                          (getSelectedCategoryData()
                                            ?.subcategories.length +
                                            index) *
                                          0.02,
                                        duration: 0.15,
                                      }}
                                      onClick={() => handleItemClick(product)}
                                    >
                                      <span
                                        className="text-sm transition-colors duration-100 text-[#666666] font-medium"
                                        style={{
                                          fontFamily:
                                            "'Articulat CF', sans-serif",
                                          fontSize: "15px",
                                        }}
                                      >
                                        • {product.title}
                                      </span>
                                    </motion.div>
                                  )
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </motion.div>

                      {/* Right Column - Subcategory Products */}
                      <motion.div
                        className="bg-white flex-1 max-w-md rounded-r-2xl"
                        variants={itemVariants}
                        style={{ minHeight: "auto" }}
                      >
                        <div className="px-3">
                          <AnimatePresence mode="wait">
                            {selectedSubCategory &&
                              getSelectedSubcategoryData() && (
                                <motion.div
                                  key={selectedSubCategory}
                                  initial={{ opacity: 0, x: 15 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  exit={{ opacity: 0, x: -15 }}
                                  transition={{ duration: 0.15 }}
                                >
                                  {getSelectedSubcategoryData()?.products
                                    .length > 0 ? (
                                    getSelectedSubcategoryData().products.map(
                                      (product, index) => (
                                        <motion.div
                                          key={product.id}
                                          className="flex items-center  p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-100"
                                          initial={{ opacity: 0, y: 8 }}
                                          animate={{ opacity: 1, y: 0 }}
                                          transition={{
                                            delay: index * 0.02,
                                            duration: 0.15,
                                          }}
                                          onClick={() =>
                                            handleItemClick(product)
                                          }
                                        >
                                          <span
                                            className="text-[#666666] font-medium  duration-100 "
                                            style={{
                                              fontFamily:
                                                "'Articulat CF', sans-serif",
                                              fontSize: "15px",
                                              lineHeight: "22px",
                                            }}
                                          >
                                            • {product.title}
                                          </span>
                                        </motion.div>
                                      )
                                    )
                                  ) : (
                                    <motion.div
                                      className="flex items-center justify-center h-32 text-gray-400"
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      transition={{ delay: 0.1 }}
                                    >
                                      <p className="text-center">
                                        No products available
                                        <br />
                                        in this subcategory
                                      </p>
                                    </motion.div>
                                  )}
                                </motion.div>
                              )}
                          </AnimatePresence>

                          {!selectedSubCategory && (
                            <motion.div
                              className="flex items-center justify-center h-32 text-gray-400"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.15 }}
                            >
                              <p className="text-center text-sm">
                                Hover over a subcategory
                                <br />
                                to see its products
                              </p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    </div>
                  </div>
                )}
              </>
            )}

            {!loading && !error && categories.length === 0 && (
              <div className="flex items-center justify-center py-20">
                <div className="text-center text-gray-500">
                  <p>No categories available</p>
                  <button
                    onClick={fetchCategories}
                    className="mt-2 text-[#2E437C] hover:text-[#1E2F5C] underline transition-colors duration-200"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuickSelectMenu;
