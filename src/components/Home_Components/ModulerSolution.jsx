import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CustomHeading } from "../common/CustomHeading";

export default function ModulerSolution() {
  const navigate = useNavigate();
  const [solutions, setSolutions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Empty animations array - no animations applied to icons
  const animationTypes = [];

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          "https://kiroapi.techvivanta.com/product/category/",
          {
            headers: {
              "ngrok-skip-browser-warning": "true",
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (
          result.message === "Categories fetched successfully" &&
          result.data
        ) {
          // Transform API data and sort by displayOrder
          const transformedSolutions = result.data
            .filter(category => category.is_active) // Only show active categories
            .sort((a, b) => a.displayOrder - b.displayOrder) // Sort by displayOrder ascending
            .map((category, index) => ({
              id: category.id,
              title: category.name.toUpperCase(),
              icon: category.image.startsWith("http")
                ? category.image
                : `${import.meta.env.VITE_BACKEND_URL}/${category.image}`,
              description: category.description,
              animation: null, // No animation applied
              displayOrder: category.displayOrder,
              is_active: category.is_active,
              created_at: category.created_at,
              updated_at: category.updated_at,
            }));

          setSolutions(transformedSolutions);
        } else {
          throw new Error("Invalid API response format");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError(err.message || "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Handle category click navigation
  const handleCategoryClick = (categoryId) => {
    navigate(`/products?category=${categoryId}`);
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

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
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

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  // Loading state
  if (loading) {
    return (
      <section className="container mx-auto w-full px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mb-8 sm:mb-12 md:text-left px-0"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#BABEC8] leading-snug">
            {splitText("Your Crafted, ")}
            <span className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#2E437C]">
              {splitText("Modular Solution")}
            </span>
          </h2>
        </motion.div>

        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E437C]"></div>
          <p className="ml-4 text-gray-600">Loading solutions...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="container mx-auto w-full px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={containerVariants}
          className="mb-8 sm:mb-12 md:text-left px-0"
        >
          <h2 className="text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#BABEC8] leading-snug">
            {splitText("Your Crafted, ")}
            <span className="block text-4xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-[#2E437C]">
              {splitText("Modular Solution")}
            </span>
          </h2>
        </motion.div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="text-red-500 mb-4">
              Failed to load solutions: {error}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="bg-[#2E437C] text-white px-6 py-2 rounded-lg hover:bg-[#1d3b72] transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container mx-auto w-full px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 bg-white">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={containerVariants}
        className="mb-8 sm:mb-12 md:text-left px-0"
      >
        <h2 className=" text-[40px] md:text-[100px] font-[500] text-[#BABEC8] leading-[55px] md:leading-[98px] text-center md:text-start">
          <CustomHeading title="Your Crafted, " className=" font-[500]" />
          <CustomHeading
            title="Modular Solution"
            className=" font-[500] text-[#2E437C]"
          />
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
        variants={cardGridVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 text-center"
      >
        {solutions.map((item, idx) => (
          <motion.div
            key={item.id}
            variants={cardVariants}
            onClick={() => handleCategoryClick(item.id)}
            whileHover={{
              y: -2,
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 500,
                damping: 30,
                mass: 0.5,
              },
            }}
            whileTap={{
              scale: 0.98,
              transition: { duration: 0.1 },
            }}
            className="group relative flex flex-col items-center justify-center p-5 bg-white
              cursor-pointer overflow-hidden hover:shadow-lg"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#2E437C] to-[#1d3b72]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />

            {/* Icon without any continuous animation */}
            <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 mb-3 flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                className="w-full h-full object-contain transition-all duration-300
                 group-hover:brightness-0 group-hover:invert"
                onError={(e) => {
                  // Fallback for broken images
                  e.target.src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='3' width='18' height='18' rx='2' ry='2'/%3E%3Ccircle cx='8.5' cy='8.5' r='1.5'/%3E%3Cpolyline points='21,15 16,10 5,21'/%3E%3C/svg%3E";
                }}
              />
            </div>

            {/* Title from API */}
            <motion.p
              className="relative z-10 text-xs sm:text-sm md:text-base font-medium
               text-gray-700 group-hover:text-white transition-colors duration-300
               text-center leading-tight max-w-full"
              whileHover={{
                scale: 1.01,
                transition: {
                  duration: 0.2,
                  ease: "easeOut",
                },
              }}
            >
              {item.title}
            </motion.p>

            {/* Bottom Border */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r
               from-[#2E437C] to-[#1d3b72]
               opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
