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
  CircularProgress,
} from "@mui/material";
import { FaChevronDown, FaSearch, FaArrowLeft, FaTimes } from "react-icons/fa";
import productImage from "../../assets/images/productdefault.png";
import ProductDetails from "./ProductDetails";

const ProductCom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Bearing");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState("products");
  const [expandedPanel, setExpandedPanel] = useState("panel1");
  const [expandedSubPanel, setExpandedSubPanel] = useState("");
  const [parentCategory, setParentCategory] = useState("Bearing");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const [isSearching, setIsSearching] = useState(false);
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (categories.length > 0) {
      const firstCategory = categories[0];
      if (firstCategory?.id) {
        setSelectedCategory(firstCategory.category || firstCategory.title);
        setParentCategory(firstCategory.category || firstCategory.title);

        searchProducts("", firstCategory.id).then((defaultProducts) => {
          setProducts(defaultProducts);
        });
      }
    }
  }, [categories]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/chart`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.message === "Chart fetched successfully" && result.data) {
        const transformedCategories = transformApiData(result.data);
        setCategories(transformedCategories);

        const allProducts = extractAllProducts(result.data);
        setProducts(allProducts);

        if (transformedCategories.length > 0) {
          const firstCategory = transformedCategories[0];
          setSelectedCategory(firstCategory.category || firstCategory.title);
          setParentCategory(firstCategory.category || firstCategory.title);
          setExpandedPanel(`panel1`);
        }
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  const searchProducts = async (query, categoryId = null) => {
    try {
      setIsSearching(true);

      let url = `${
        import.meta.env.VITE_BACKEND_URL
      }/product/product/search?search=${encodeURIComponent(query)}`;

      if (categoryId) {
        url += `&category_id=${categoryId}`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.message === "Products fetched successfully" && result.data) {
        const transformedProducts = result.data.map((product) => ({
          id: product.id,
          title: product.productName,
          category: product.category?.name || "Uncategorized",
          parentCategory: product.category?.name || "Uncategorized",
          image:
            product.images && product.images.length > 0
              ? product?.images[0]
              : productImage,
          description: product.description,
          document: product.document,
          is_active: product.is_active,

          apiData: product,
        }));

        setSearchResults(transformedProducts);
        return transformedProducts;
      } else {
        throw new Error("Invalid search API response format");
      }
    } catch (err) {
      console.error("Error searching products:", err);
      setError(err.message);
      return [];
    } finally {
      setIsSearching(false);
    }
  };

  const transformApiData = (apiData) => {
    return apiData.map((category, index) => {
      const children = [];

      if (category.subcategories && category.subcategories.length > 0) {
        category.subcategories.forEach((subcategory) => {
          children.push({
            title: subcategory.name,
            category: category.name,
            isSubCategory: true,
            subChildren: subcategory.products.map((product) => ({
              title: product.productName || product.productname,
              category: subcategory.name,
            })),
          });
        });
      }

      // Add direct products as children
      if (category.products && category.products.length > 0) {
        category.products.forEach((product) => {
          children.push({
            title: product.productName || product.productname,
            category: category.name,
          });
        });
      }

      return {
        id: category.id.toString(),
        title: category.name,
        category: category.name,
        image: category.image || productImage,
        children: children,
      };
    });
  };
  const fetchProductsByCategory = async (categoryId, categoryName) => {
    try {
      setLoading(true);
      const products = await searchProducts("", categoryId);
      setProducts(products);
      setSelectedCategory(categoryName);
      setParentCategory(categoryName);
    } catch (error) {
      console.error("Error fetching category products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Extract all products from API data for search functionality
  const extractAllProducts = (apiData) => {
    const allProducts = [];
    console.log("api data", apiData);

    apiData.forEach((category) => {
      // Add products from subcategories
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          if (subcategory.products) {
            subcategory.products.forEach((product) => {
              console.log("all products", product);

              allProducts.push({
                id: product.id,
                title: product.productName || product.productname,
                category: subcategory.name,
                parentCategory: category.name,
                image: productImage,
              });
            });
          }
        });
      }

      if (category.products) {
        category.products.forEach((product) => {
          allProducts.push({
            id: product.id,
            title: product.productName || product.productname,
            category: category.name,
            parentCategory: category.name,
            image: productImage,
          });
        });
      }
    });

    return allProducts;
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);

    if (isExpanded) {
      const categoryIndex = parseInt(panel.replace("panel", "")) - 1;
      const category = categories[categoryIndex];
      if (category) {
        fetchProductsByCategory(category.id, category.category);
        setViewMode("products");
        setShowDetails(false);
        setExpandedSubPanel("");
        setSearchQuery("");
      }
    }
  };

  const handleSubAccordionChange =
    (subPanel, subCategory) => (event, isExpanded) => {
      setExpandedSubPanel(isExpanded ? subPanel : false);

      if (isExpanded && subCategory) {
        const parentCategory = categories.find(
          (cat) =>
            cat.category === subCategory.category ||
            cat.title === subCategory.category
        );

        if (parentCategory) {
          setSelectedCategory(subCategory.title);
          setParentCategory(subCategory.category);
          setViewMode("products");
          setShowDetails(false);
          setSearchQuery(""); // Clear search when changing category
        }
      }
    };

  const handleCategoryItemClick = (categoryName, parentCategoryName) => {
    // Find the category object to get ID
    const category = categories.find(
      (cat) => cat.category === categoryName || cat.title === categoryName
    );

    if (category) {
      fetchProductsByCategory(category.id, categoryName);
    } else {
      // Fallback to filtering existing products
      setSelectedCategory(categoryName);
      setParentCategory(parentCategoryName || categoryName);
    }

    setViewMode("products");
    setShowDetails(false);
    setSearchQuery(""); // Clear search when changing category
  };

  const handleProductItemClick = async (productTitle, category) => {
    try {
      setLoading(true);

      // Find the category to get ID for API call
      const categoryObj = categories.find(
        (cat) => cat.category === category || cat.title === category
      );

      if (categoryObj) {
        // Search for this specific product in the category
        const searchResults = await searchProducts(
          productTitle,
          categoryObj.id
        );
        const product = searchResults.find((p) => p.title === productTitle);

        if (product) {
          setSelectedProduct(product);
          setViewMode("details");
          setShowDetails(true);
          setParentCategory(category);
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
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

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory
      ? product.category === selectedCategory ||
        product.parentCategory === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });
  const displayProducts =
    searchQuery.trim() !== "" && viewMode === "search"
      ? searchResults
      : filteredProducts;
  if (loading) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-50">
        <CircularProgress
          size={70}
          thickness={4}
          sx={{ color: "#2E437C" }}
        />
        <p className="mt-4 text-gray-600 text-lg tracking-wide">
          Loading, please wait...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center px-4">
        <Alert severity="error" className="max-w-md">
          <strong>Error loading products:</strong> {error}
          <button
            onClick={fetchCategories}
            className="ml-2 underline hover:no-underline"
          >
            Try again
          </button>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-[#BABEC8]">
          Our Products
        </h1>

        <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-lg">
          <motion.input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            // onChange={(e) => {
            //   setSearchQuery(e.target.value);
            //   setViewMode("products");
            //   setShowDetails(false);
            // }}
            onChange={(e) => {
              const query = e.target.value;
              setSearchQuery(query);

              if (query.trim() === "") {
                setSearchResults([]);
                setViewMode("products");
                setShowDetails(false);
              } else {
                setViewMode("search");
                setShowDetails(false);

                const selectedCat = categories.find(
                  (cat) =>
                    cat.category === selectedCategory ||
                    cat.title === selectedCategory
                );
                const categoryId = selectedCat ? selectedCat.id : null;

                const timeoutId = setTimeout(() => {
                  searchProducts(query, categoryId);
                }, 500);

                return () => clearTimeout(timeoutId);
              }
            }}
            className="w-full border border-gray-300 rounded-full pl-12 pr-6 py-3 md:py-2 outline-none focus:ring-3 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-300 text-gray-800 placeholder-gray-500 text-base md:text-lg bg-white shadow-sm hover:shadow-md focus:shadow-lg"
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 10px 30px rgba(59, 130, 246, 0.15)",
            }}
            whileHover={{
              scale: 1.005,
              boxShadow: "0 5px 20px rgba(0, 0, 0, 0.08)",
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />

          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl transition-colors duration-300 pointer-events-none" />

          {/* Clear Button (appears when there's text) */}
          {searchQuery && (
            <motion.button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              whileHover={{ scale: 0.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes className="text-lg" />
            </motion.button>
          )}
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
                                      •{" "}
                                      <ListItemText
                                        primary={subChild.title}
                                        primaryTypographyProps={{
                                          fontSize: "14px",
                                          fontWeight: 500,
                                          fontStyle: "normal",
                                          color: "#6b7280",
                                          marginLeft: "2px",
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
                              •
                              <ListItemText
                                primary={child.title}
                                primaryTypographyProps={{
                                  fontSize: "15px",
                                  fontWeight: 500,
                                  fontStyle: "normal",
                                  color: "#4b5563",
                                  marginLeft: "2px",
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
          {viewMode === "products" || viewMode === "search" ? (
            <>
              {isSearching ? (
                <div className="text-center py-20">
                  <CircularProgress size={40} />
                  <p className="mt-4 text-gray-600">Searching products...</p>
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2">
                  {displayProducts.map((product, index) => (
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
                        src={
                          product.image && product.image.startsWith("http")
                            ? product.image
                            : product.image && product.image.includes("/")
                            ? `${import.meta.env.VITE_BACKEND_URL}/${
                                product.image
                              }`
                            : productImage
                        }
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
                      {searchQuery.trim() !== "" && viewMode === "search" && (
                        <span className="text-xs text-blue-500 mt-1">
                          Search Result
                        </span>
                      )}
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
                    {searchQuery && viewMode === "search"
                      ? `No products match "${searchQuery}"`
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
