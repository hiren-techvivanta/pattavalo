import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { FaChevronDown, FaSearch, FaArrowLeft } from "react-icons/fa";
import productImage from "../../assets/images/productdefault.png";
import ProductDetails from "./ProductDetails";

const productData = [
  { id: 1, title: "Ball Bearing", category: "Bearing", image: productImage },
  { id: 2, title: "Roller Bearing", category: "Bearing", image: productImage },
  { id: 3, title: "Thrust Bearing", category: "Bearing", image: productImage },
  {
    id: 4,
    title: "Plastic Cable Drag Chain",
    category: "Cable Drag Chain",
    image: productImage,
  },
  {
    id: 5,
    title: "Steel Cable Drag Chain",
    category: "Cable Drag Chain",
    image: productImage,
  },
  {
    id: 6,
    title: "Conveyor Idler",
    category: "Conveyor Component",
    image: productImage,
  },
  {
    id: 7,
    title: "Conveyor Pulley",
    category: "Conveyor Component",
    image: productImage,
  },
  {
    id: 8,
    title: "Straight Modular Belt",
    category: "Modular Belt",
    image: productImage,
  },
  {
    id: 9,
    title: "Sideflex Modular Belt",
    category: "Modular Belt",
    image: productImage,
  },
  {
    id: 10,
    title: "SS Conveyor Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 11,
    title: "SS Roller Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 12,
    title: "SS Industrial Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 13,
    title: "SS Sideflex Chain",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 14,
    title: "SS Rubbertrop Chain",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 15,
    title: "Slide Flex Without Tab Chain & Sprocket",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 16,
    title: "Small Radius RT Side Flex with Tab Chain & Sprocket",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 17,
    title: "TPU Conveyor Chain",
    category: "Thermoplastic Chain & Sprocket",
    image: productImage,
  },
  {
    id: 18,
    title: "Plastic Sprocket",
    category: "Thermoplastic Chain & Sprocket",
    image: productImage,
  },
  {
    id: 19,
    title: "Finger Chain",
    category: "Finger Chain & Assembly",
    image: productImage,
  },
  {
    id: 20,
    title: "Finger Assembly",
    category: "Finger Chain & Assembly",
    image: productImage,
  },
  {
    id: 21,
    title: "SS Z Bucket Elevator",
    category: "Z Bucket Elevator",
    image: productImage,
  },
  {
    id: 22,
    title: "Plastic Z Bucket Elevator",
    category: "Z Bucket Elevator",
    image: productImage,
  },
  {
    id: 23,
    title: "UHMWPE Wear Strip",
    category: "Wear Strip",
    image: productImage,
  },
  {
    id: 24,
    title: "HDPE Wear Strip",
    category: "Wear Strip",
    image: productImage,
  },
];

const categories = [
  {
    id: "1",
    title: "Bearing",
    category: "Bearing",
    children: [
      { title: "Ball Bearing", category: "Bearing" },
      { title: "Roller Bearing", category: "Bearing" },
      { title: "Thrust Bearing", category: "Bearing" },
    ],
  },
  {
    id: "2",
    title: "Cable Drag Chain",
    category: "Cable Drag Chain",
    children: [
      { title: "Plastic Cable Drag Chain", category: "Cable Drag Chain" },
      { title: "Steel Cable Drag Chain", category: "Cable Drag Chain" },
    ],
  },
  {
    id: "3",
    title: "Conveyor Component",
    category: "Conveyor Component",
    children: [
      { title: "Conveyor Idler", category: "Conveyor Component" },
      { title: "Conveyor Pulley", category: "Conveyor Component" },
    ],
  },
  {
    id: "4",
    title: "Modular Belt",
    category: "Modular Belt",
    children: [
      { title: "Straight Modular Belt", category: "Modular Belt" },
      { title: "Sideflex Modular Belt", category: "Modular Belt" },
    ],
  },
  {
    id: "5",
    title: "SS Chain & Sprocket",
    category: "SS Chain & Sprocket",
    children: [
      {
        title: "SS Straight Running Chain",
        category: "SS Straight Running Chain",
        isSubCategory: true,
        subChildren: [
          { title: "SS Conveyor Chain", category: "SS Straight Running Chain" },
          { title: "SS Roller Chain", category: "SS Straight Running Chain" },
          {
            title: "SS Industrial Chain",
            category: "SS Straight Running Chain",
          },
        ],
      },
      { title: "SS Sideflex Chain", category: "SS Chain & Sprocket" },
      { title: "SS Rubbertrop Chain", category: "SS Chain & Sprocket" },
      {
        title: "Slide Flex Without Tab Chain & Sprocket",
        category: "SS Chain & Sprocket",
      },
      {
        title: "Small Radius RT Side Flex with Tab Chain & Sprocket",
        category: "SS Chain & Sprocket",
      },
    ],
  },
  {
    id: "6",
    title: "Thermoplastic Chain & Sprocket",
    category: "Thermoplastic Chain & Sprocket",
    children: [
      {
        title: "TPU Conveyor Chain",
        category: "Thermoplastic Chain & Sprocket",
      },
      { title: "Plastic Sprocket", category: "Thermoplastic Chain & Sprocket" },
    ],
  },
  {
    id: "7",
    title: "Finger Chain & Assembly",
    category: "Finger Chain & Assembly",
    children: [
      { title: "Finger Chain", category: "Finger Chain & Assembly" },
      { title: "Finger Assembly", category: "Finger Chain & Assembly" },
    ],
  },
  {
    id: "8",
    title: "Z Bucket Elevator",
    category: "Z Bucket Elevator",
    children: [
      { title: "SS Z Bucket Elevator", category: "Z Bucket Elevator" },
      { title: "Plastic Z Bucket Elevator", category: "Z Bucket Elevator" },
    ],
  },
  {
    id: "9",
    title: "Wear Strip",
    category: "Wear Strip",
    children: [
      { title: "UHMWPE Wear Strip", category: "Wear Strip" },
      { title: "HDPE Wear Strip", category: "Wear Strip" },
    ],
  },
];

const ProductCom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Bearing");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState("products");
  const [expandedPanel, setExpandedPanel] = useState("panel1"); // Default to first accordion
  const [expandedSubPanel, setExpandedSubPanel] = useState("");
  const [parentCategory, setParentCategory] = useState("Bearing");

  // Set default category on mount
  useEffect(() => {
    setSelectedCategory("Bearing");
    setViewMode("products");
  }, []);

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);

    if (isExpanded) {
      // Find the category and set it as selected
      const categoryIndex = parseInt(panel.replace("panel", "")) - 1;
      const category = categories[categoryIndex];
      if (category) {
        setSelectedCategory(category.category);
        setParentCategory(category.category);
        setViewMode("products");
        setShowDetails(false);
        setExpandedSubPanel(""); // Reset sub panel
      }
    }
  };

  const handleSubAccordionChange = (subPanel) => (event, isExpanded) => {
    setExpandedSubPanel(isExpanded ? subPanel : false);

    if (isExpanded) {
      // Find the subcategory and set it as selected
      const ssChainCategory = categories.find((cat) => cat.id === "5");
      const subCategory = ssChainCategory.children.find(
        (child) => child.isSubCategory
      );
      if (subCategory) {
        setSelectedCategory(subCategory.category);
        setParentCategory("SS Chain & Sprocket");
        setViewMode("products");
        setShowDetails(false);
      }
    }
  };

  const handleCategoryItemClick = (category) => {
    setSelectedCategory(category);
    setParentCategory(category);
    setViewMode("products");
    setShowDetails(false);
  };

  const handleProductItemClick = (productTitle, category) => {
    const product = productData.find((p) => p.title === productTitle);
    if (product) {
      setSelectedProduct(product);
      setViewMode("details");
      setShowDetails(true);
      setParentCategory(category);
    }
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setViewMode("details");
    setShowDetails(true);
  };

  const handleBackToProducts = () => {
    setViewMode("products");
    setShowDetails(false);
    setSelectedProduct(null);
  };

  const filteredProducts = productData.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-semibold text-[#BABEC8]">
          Our Products
        </h1>

        <div className="relative w-full md:w-1/3">
          <motion.input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setViewMode("products");
              setShowDetails(false);
            }}
            className="w-full border rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-300"
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 4px 15px rgba(59, 130, 246, 0.15)",
            }}
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row gap-5">
        {/* Left Sidebar - Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/4"
        >
          <div className="p-4 rounded-lg">
            {categories.map((category, index) => (
              <Accordion
                key={category.id}
                expanded={expandedPanel === `panel${index + 1}`}
                onChange={handleAccordionChange(`panel${index + 1}`)}
                sx={{
                  boxShadow: "none",
                  "&:before": { display: "none" },
                  marginBottom: "4px",
                  backgroundColor: "transparent",
                }}
              >
                <AccordionSummary
                  expandIcon={<FaChevronDown className="text-gray-600" />}
                  sx={{
                    minHeight: "48px",
                    padding: "0 8px",

                    borderRadius: "6px",
                    transition: "all 0.2s ease-in-out",
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: "17px",
                      fontWeight: 500,
                      fontStyle: "normal",
                      color:
                        expandedPanel === `panel${index + 1}`
                          ? "#2E437C"
                          : "#374151",
                      transition: "color 0.2s ease-in-out",
                    }}
                  >
                    {category.title}
                  </Typography>
                </AccordionSummary>

                <AccordionDetails sx={{ padding: "0 0 8px 16px" }}>
                  <List dense>
                    {category.children.map((child, childIndex) => (
                      <React.Fragment key={childIndex}>
                        {child.isSubCategory ? (
                          // Sub-accordion for SS Straight Running Chain
                          <Accordion
                            expanded={
                              expandedSubPanel === `subpanel${childIndex}`
                            }
                            onChange={handleSubAccordionChange(
                              `subpanel${childIndex}`
                            )}
                            sx={{
                              boxShadow: "none",
                              "&:before": { display: "none" },
                              backgroundColor: "transparent",
                              margin: 0,
                            }}
                          >
                            <AccordionSummary
                              expandIcon={
                                <FaChevronDown className="text-gray-500 text-xs" />
                              }
                              sx={{
                                minHeight: "36px",
                                padding: "0 4px",

                                borderRadius: "4px",
                                transition: "all 0.2s ease-in-out",
                              }}
                            >
                              <Typography
                                sx={{
                                  fontSize: "15px",
                                  fontWeight: 500,
                                  fontStyle: "normal",
                                  color:
                                    expandedSubPanel === `subpanel${childIndex}`
                                      ? "#2E437C"
                                      : "#4b5563",
                                  transition: "color 0.2s ease-in-out",
                                }}
                              >
                                {child.title}
                              </Typography>
                            </AccordionSummary>

                            <AccordionDetails sx={{ padding: "0 0 4px 12px" }}>
                              <List dense>
                                {child.subChildren.map((subChild, subIndex) => (
                                  <ListItem key={subIndex} disablePadding>
                                    <ListItemButton
                                      onClick={() =>
                                        handleProductItemClick(
                                          subChild.title,
                                          subChild.category
                                        )
                                      }
                                      sx={{
                                        minHeight: "32px",
                                        padding: "4px 8px",
                                        borderRadius: "4px",

                                        transition: "all 0.2s ease-in-out",
                                      }}
                                    >
                                      <ListItemText
                                        primary={subChild.title}
                                        primaryTypographyProps={{
                                          fontSize: "14px",
                                          fontWeight: 500,
                                          fontStyle: "normal",
                                          color: "#6b7280",
                                          transition: "color 0.2s ease-in-out",
                                        }}
                                      />
                                    </ListItemButton>
                                  </ListItem>
                                ))}
                              </List>
                            </AccordionDetails>
                          </Accordion>
                        ) : (
                          // Regular list item
                          <ListItem key={childIndex} disablePadding>
                            <ListItemButton
                              onClick={() =>
                                handleProductItemClick(
                                  child.title,
                                  child.category
                                )
                              }
                              sx={{
                                minHeight: "36px",
                                padding: "4px 8px",
                                borderRadius: "4px",

                                transition: "all 0.2s ease-in-out",
                              }}
                            >
                              <ListItemText
                                primary={child.title}
                                primaryTypographyProps={{
                                  fontSize: "15px",
                                  fontWeight: 500,
                                  fontStyle: "normal",
                                  color: "#4b5563",
                                  transition: "color 0.2s ease-in-out",
                                }}
                              />
                            </ListItemButton>
                          </ListItem>
                        )}
                      </React.Fragment>
                    ))}
                  </List>
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/4"
        >
          {viewMode === "products" ? (
            <>
              {filteredProducts.length > 0 ? (
                <div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2"
                >
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleProductClick(product)}
                      className="flex flex-col items-center text-center p-6 rounded-lg cursor-pointer transition-shadow"
                    >
                      <motion.img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-48 object-contain mb-4"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                      />
                      <h2 className="text-lg font-semibold mt-3 text-gray-800">
                        {product.title}
                      </h2>
                      <p className="text-gray-500 text-sm mt-1">
                        {product.category}
                      </p>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center py-20"
                >
                  <div className="text-gray-400 mb-4">
                    <svg
                      className="w-16 h-16 mx-auto"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.291-1.002-5.824-2.653M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium text-gray-600 mb-2">
                    No products found
                  </h3>
                  <p className="text-gray-400">
                    {searchQuery
                      ? `No products match "${searchQuery}" in ${selectedCategory}`
                      : `No products available in ${selectedCategory}`}
                  </p>
                </motion.div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <button
                  onClick={handleBackToProducts}
                  className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors group"
                >
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-gray-200 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowLeft className="text-sm" />
                  </motion.div>
                  <span className="font-medium">Back to {parentCategory}</span>
                </button>
              </motion.div>

              <ProductDetails selectedProduct={selectedProduct} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCom;
