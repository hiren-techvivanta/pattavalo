import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IoChevronDown } from "react-icons/io5";
import { HiOutlineViewGrid } from "react-icons/hi";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const QuickSelectMenu = ({ navBg }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);

 
  const axiosConfig = {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  };

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
          setSelectedCategory(transformedCategories[0].id);
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
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
        isActive: index === 0,
        subcategories: subcategories,
        directProducts: directProducts,
      };
    });
  };

  // Navigation function to build dynamic URLs
  const handleNavigation = (item) => {
    setIsOpen(false);

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
    console.log("Navigating to:", `/products?${queryParams.toString()}`);
  };

  const handleCategoryClick = (category) => {
    handleNavigation(category);
  };

  const buttonVariants = {
    closed: {
      backgroundColor: navBg
        ? "rgba(46, 67, 124, 0.1)"
        : "rgba(255, 255, 255, 0.1)",
      borderColor: navBg
        ? "rgba(46, 67, 124, 0.2)"
        : "rgba(255, 255, 255, 0.2)",
      width: "44px",
    },
    open: {
      backgroundColor: navBg
        ? "rgba(46, 67, 124, 0.15)"
        : "rgba(255, 255, 255, 0.15)",
      borderColor: navBg
        ? "rgba(46, 67, 124, 0.4)"
        : "rgba(255, 255, 255, 0.4)",
      width: "44px",
    },
    hovered: {
      backgroundColor: navBg
        ? "rgba(46, 67, 124, 0.1)"
        : "rgba(255, 255, 255, 0.1)",
      borderColor: navBg
        ? "rgba(46, 67, 124, 0.3)"
        : "rgba(255, 255, 255, 0.3)",
      width: "auto",
    },
  };

  const textVariants = {
    hidden: { opacity: 0, width: 0, marginLeft: 0 },
    visible: {
      opacity: 1,
      width: "auto",
      marginLeft: "8px",
      transition: { duration: 0.15, ease: "easeOut" },
    },
  };

  const iconVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 },
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

  const handleCategoryHover = (categoryId) => {
    setSelectedCategory(categoryId);
    setSelectedSubCategory(null);
  };

  const handleSubcategoryHover = (subcategoryId) => {
    setSelectedSubCategory(subcategoryId);
  };

  const getSelectedCategoryData = () => {
    return categories.find((cat) => cat.id === selectedCategory);
  };

  const getSelectedSubcategoryData = () => {
    const category = getSelectedCategoryData();
    if (!category || !selectedSubCategory) return null;
    return category.subcategories.find((sub) => sub.id === selectedSubCategory);
  };

  return (
    <div className="relative ">
      {/* Icon Quick Select Button */}
      <motion.button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex items-center justify-center h-11 rounded-xl border-2 font-medium transition-all duration-150 hover:shadow-lg overflow-hidden ${
          navBg ? "text-[#2E437C]" : "text-white"
        }`}
        variants={buttonVariants}
        animate={"open"}
        style={{
          willChange: "transform, background-color, border-color, width",
          fontFamily: "'Articulat CF', sans-serif",
        }}
      >
        <div className="flex items-center justify-center w-6 h-6 flex-shrink-0">
          <HiOutlineViewGrid className="w-5 h-5" />
        </div>
      </motion.button>

      {/* Mega Menu Dropdown */}
      <AnimatePresence mode="wait"  >
        {isOpen && (
          <motion.div
            ref={menuRef}

            className="absolute center-div mt-2 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"

            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
              willChange: "transform, opacity",
              width: "1280px",
              maxWidth: "95vw",
            }}
          >
            {/* Header */}
            <motion.div
              className="bg-white px-6 py-4 border-b border-gray-100"
              variants={itemVariants}
            >
              <div className="flex items-center gap-3">
                <h2
                  className="text-[#2E437C] font-bold text-2xl"
                  style={{ fontFamily: "'Articulat CF', sans-serif" }}
                >
                  Quick Select
                </h2>
                <div className="flex-1 h-px bg-gradient-to-r from-[#2E437C] to-transparent opacity-30"></div>
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
              <div className="flex">
                {/* Left Column - Main Categories */}
                <motion.div
                  className="bg-white w-[369px] min-h-[424px] border-r border-gray-100"
                  variants={itemVariants}
                >
                  <div className="p-3.5">
                    {categories.map((category, index) => (
                      <motion.div
                        key={category.id}
                        className={`flex items-center justify-between p-4 border-b border-gray-100 cursor-pointer transition-all duration-100 ${
                          category.isActive || selectedCategory === category.id
                            ? "bg-[#2E437C]/5 border-l-4 border-l-[#2E437C]"
                            : "hover:bg-gray-50"
                        }`}
                        variants={itemVariants}
                        onMouseEnter={() => handleCategoryHover(category.id)}
                        onClick={() => handleCategoryClick(category)}
                        whileHover={{ x: 2, transition: { duration: 0.1 } }}
                      >
                        <span
                          className={`text-base transition-colors duration-100 ${
                            category.isActive ||
                            selectedCategory === category.id
                              ? "text-[#2E437C] font-semibold"
                              : "text-gray-600 font-medium"
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
                            rotate: selectedCategory === category.id ? -90 : 0,
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

                <div className="w-px bg-gray-200"></div>

                {/* Middle Column - Subcategories & Direct Products */}
                <motion.div
                  className="bg-white w-[500px] min-h-[424px] border-r border-gray-100"
                  variants={itemVariants}
                >
                  <div className="p-7">
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
                                className={`flex items-center justify-between p-2.5 cursor-pointer rounded-lg transition-all duration-100 ${
                                  selectedSubCategory === subcategory.id
                                    ? "bg-[#2E437C]/10 border border-[#2E437C]/20"
                                    : "hover:bg-gray-50"
                                }`}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay: index * 0.02,
                                  duration: 0.15,
                                }}
                                onMouseEnter={() =>
                                  handleSubcategoryHover(subcategory.id)
                                }
                                onClick={() => handleNavigation(subcategory)}
                                whileHover={{
                                  x: 4,
                                  transition: { duration: 0.1 },
                                }}
                              >
                                <span
                                  className={`text-sm transition-colors duration-100 font-medium ${
                                    selectedSubCategory === subcategory.id
                                      ? "text-[#2E437C]"
                                      : "text-gray-700"
                                  }`}
                                  style={{
                                    fontFamily: "'Articulat CF', sans-serif",
                                    fontSize: "15px",
                                  }}
                                >
                                  {subcategory.name}
                                </span>
                                <motion.div
                                  animate={{
                                    rotate:
                                      selectedSubCategory === subcategory.id
                                        ? -90
                                        : 0,
                                    color:
                                      selectedSubCategory === subcategory.id
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
                                className="flex items-center justify-between p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-100"
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                  delay:
                                    (getSelectedCategoryData()?.subcategories
                                      .length +
                                      index) *
                                    0.02,
                                  duration: 0.15,
                                }}
                                onClick={() => handleNavigation(product)}
                                whileHover={{
                                  x: 4,
                                  backgroundColor: "rgba(46, 67, 124, 0.05)",
                                  transition: { duration: 0.1 },
                                }}
                              >
                                <span
                                  className="text-sm transition-colors duration-100 text-[#2E437C] font-medium"
                                  style={{
                                    fontFamily: "'Articulat CF', sans-serif",
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

                <div className="w-px bg-gray-200"></div>

                {/* Right Column - Subcategory Products */}
                <motion.div
                  className="bg-white w-[411px] min-h-[424px] rounded-r-2xl"
                  variants={itemVariants}
                >
                  <div className="p-7">
                    <AnimatePresence mode="wait">
                      {selectedSubCategory && getSelectedSubcategoryData() && (
                        <motion.div
                          key={selectedSubCategory}
                          initial={{ opacity: 0, x: 15 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -15 }}
                          transition={{ duration: 0.15 }}
                        >
                          {getSelectedSubcategoryData()?.products.length > 0 ? (
                            getSelectedSubcategoryData().products.map(
                              (product, index) => (
                                <motion.div
                                  key={product.id}
                                  className="flex items-center justify-center p-2.5 cursor-pointer hover:bg-gray-50 rounded-lg transition-all duration-100"
                                  initial={{ opacity: 0, y: 8 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{
                                    delay: index * 0.02,
                                    duration: 0.15,
                                  }}
                                  onClick={() => handleNavigation(product)}
                                  whileHover={{
                                    x: 2,
                                    backgroundColor: "rgba(46, 67, 124, 0.05)",
                                    transition: { duration: 0.1 },
                                  }}
                                >
                                  <span
                                    className="text-[#2E437C] font-medium opacity-80 transition-opacity duration-100 hover:opacity-100"
                                    style={{
                                      fontFamily: "'Articulat CF', sans-serif",
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
                              className="flex items-center justify-center h-full text-gray-400"
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
                        className="flex items-center justify-center h-full text-gray-400"
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
