import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSearchParams, useNavigate } from "react-router-dom";
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
  Alert,
} from "@mui/material";
import { FaChevronDown, FaSearch, FaArrowLeft, FaTimes } from "react-icons/fa";
import productImage from "../../assets/images/productdefault.png";
import ProductDetails from "./ProductDetails";
import axios from "axios";

const ProductCom = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

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
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);

  // URL parameters
  const [urlFilters, setUrlFilters] = useState({
    category: null,
    subcategory: null,
    product: null,
  });

  // Enhanced request headers for ngrok
  const getRequestHeaders = () => ({
    "ngrok-skip-browser-warning": "true",
    "Content-Type": "application/json",
    Accept: "application/json",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle URL parameters on mount and when they change
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    const productParam = searchParams.get("product");

    setUrlFilters({
      category: categoryParam ? parseInt(categoryParam) : null,
      subcategory: subcategoryParam ? parseInt(subcategoryParam) : null,
      product: productParam ? parseInt(productParam) : null,
    });

    console.log("URL Filters:", {
      category: categoryParam ? parseInt(categoryParam) : null,
      subcategory: subcategoryParam ? parseInt(subcategoryParam) : null,
      product: productParam ? parseInt(productParam) : null,
    });
  }, [searchParams]);

  // Apply URL filters when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && urlFilters.category) {
      applyUrlFilters();
    } else if (categories.length > 0 && !urlFilters.category) {
      // Default behavior when no URL params
      const firstCategory = categories[0];
      if (firstCategory?.id) {
        setSelectedCategory(firstCategory.category || firstCategory.title);
        setParentCategory(firstCategory.category || firstCategory.title);
        searchProducts("", firstCategory.id).then((defaultProducts) => {
          setProducts(defaultProducts);
        });
      }
    }
  }, [categories, urlFilters]);

  // Fetch individual product details with enhanced error handling
  const fetchProductDetails = async (productId) => {
    try {
      setProductDetailsLoading(true);

      console.log(`Fetching product details for ID: ${productId}`);

      const {data} = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/product/${productId}`,
        {
          headers: { "ngrok-skip-browser-warning": "true" },
        }
      );

      // console.log("Product details response status:", response.status);
      

      // if (!response.ok) {
      //   throw new Error(`HTTP error! status: ${response.status}`);
      // }

      // Check if response is HTML (ngrok warning page)
      // const contentType = response.headers.get("content-type");
      // if (contentType && contentType.includes("text/html")) {
      //   console.error(
      //     "Received HTML response instead of JSON - likely ngrok warning page"
      //   );
      //   throw new Error(
      //     "Received ngrok warning page instead of API response. Please check your ngrok configuration."
      //   );
      // }


      if (data) {
        // Transform the detailed product data
        const detailedProduct = {
          id: data.data.id,
          title: data.data.productName,
          description: data.data.description,
          images: data.data.images || [],
          document: data.data.document,
          category: data.data.category?.name || "Uncategorized",
          subcategory: data.data.subcategory?.name || null,
          parentCategory: data.data.category?.name || "Uncategorized",
          categoryId: data.data.category_id,
          subcategoryId: data.data.subcategory_id,
          is_active: data.data.is_active,
          created_at: data.data.created_at,
          updated_at: data.data.updated_at,
          apiData: data.data,
        };

        return detailedProduct;
      } else {
        throw new Error("Invalid product details API response format");
      }
    } catch (err) {
      console.error("Error fetching product details:", err);

      // More specific error handling
      if (err.message.includes("ngrok warning")) {
        setError(
          "Unable to bypass ngrok warning page. Please check your API configuration or try refreshing."
        );
      } else if (err.message.includes("Failed to fetch")) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        setError(`Failed to load product details: ${err.message}`);
      }
      throw err;
    } finally {
      setProductDetailsLoading(false);
    }
  };

  const applyUrlFilters = async () => {
    try {
      const category = categories.find(
        (cat) => cat.id === urlFilters.category.toString()
      );

      if (category) {
        // Set category selection
        setSelectedCategory(category.category || category.title);
        setParentCategory(category.category || category.title);
        setExpandedPanel(`panel${categories.indexOf(category) + 1}`);

        if (urlFilters.product) {
          // If product is specified, load product details
          await handleProductByUrl(urlFilters.product, category);
        } else if (urlFilters.subcategory) {
          // If subcategory is specified, load subcategory products
          await handleSubcategoryByUrl(urlFilters.subcategory, category);
        } else {
          // Just load category products
          await fetchProductsByCategory(
            category.id,
            category.category || category.title
          );
        }
      }
    } catch (error) {
      console.error("Error applying URL filters:", error);
    }
  };

  const handleProductByUrl = async (productId, category) => {
    try {
      setLoading(true);

      // First, load the detailed product data
      const detailedProduct = await fetchProductDetails(productId);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setViewMode("details");
        setShowDetails(true);

        // Also load category products for navigation
        const searchResults = await searchProducts("", category.id);
        setProducts(searchResults);
      }
    } catch (error) {
      console.error("Error loading product by URL:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleSubcategoryByUrl = async (subcategoryId, category) => {
    try {
      setLoading(true);

      // Find subcategory in category data
      const subcategory = category.children?.find(
        (child) => child.isSubCategory && child.subcategoryId === subcategoryId
      );

      if (subcategory) {
        setSelectedCategory(subcategory.title);
        setParentCategory(category.category || category.title);
        setExpandedSubPanel(
          `subpanel${category.children.indexOf(subcategory)}`
        );

        // Load subcategory products
        const products = await searchProducts(subcategory.title, category.id);
        setProducts(products);
      }
    } catch (error) {
      console.error("Error loading subcategory by URL:", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to update URL parameters
  const updateUrlParams = (params) => {
    const newSearchParams = new URLSearchParams();

    if (params.category) {
      newSearchParams.set("category", params.category.toString());
    }
    if (params.subcategory) {
      newSearchParams.set("subcategory", params.subcategory.toString());
    }
    if (params.product) {
      newSearchParams.set("product", params.product.toString());
    }

    setSearchParams(newSearchParams);
  };

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log("Fetching categories...");

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/product/chart`,
        {
          method: "GET",
          headers: getRequestHeaders(),
        }
      );

      console.log("Categories response status:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check content type to detect ngrok warning page
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error(
          "Received HTML response instead of JSON - likely ngrok warning page"
        );
        throw new Error(
          "Received ngrok warning page instead of API response. Please check your ngrok configuration."
        );
      }

      const result = await response.json();
      console.log("Categories response:", result);

      if (result.message === "Chart fetched successfully" && result.data) {
        const transformedCategories = transformApiData(result.data);
        setCategories(transformedCategories);

        const allProducts = extractAllProducts(result.data);
        setProducts(allProducts);

        if (transformedCategories.length > 0 && !urlFilters.category) {
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

      console.log("Searching products:", url);

      const response = await fetch(url, {
        method: "GET",
        headers: getRequestHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Check content type to detect ngrok warning page
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("text/html")) {
        console.error(
          "Received HTML response instead of JSON - likely ngrok warning page"
        );
        throw new Error("Received ngrok warning page instead of API response");
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
          categoryId: product.category_id,
          subcategoryId: product.subcategory_id,
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
            subcategoryId: subcategory.id,
            categoryId: category.id,
            subChildren: subcategory.products.map((product) => ({
              title: product.productName || product.productname,
              category: subcategory.name,
              productId: product.id,
              subcategoryId: subcategory.id,
              categoryId: category.id,
            })),
          });
        });
      }

      if (category.products && category.products.length > 0) {
        category.products.forEach((product) => {
          children.push({
            title: product.productName || product.productname,
            category: category.name,
            productId: product.id,
            categoryId: category.id,
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

      // Update URL - category only
      updateUrlParams({ category: categoryId });
    } catch (error) {
      console.error("Error fetching category products:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const extractAllProducts = (apiData) => {
    const allProducts = [];

    apiData.forEach((category) => {
      if (category.subcategories) {
        category.subcategories.forEach((subcategory) => {
          if (subcategory.products) {
            subcategory.products.forEach((product) => {
              allProducts.push({
                id: product.id,
                title: product.productName || product.productname,
                category: subcategory.name,
                parentCategory: category.name,
                image: productImage,
                categoryId: category.id,
                subcategoryId: subcategory.id,
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
            categoryId: category.id,
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
          setSearchQuery("");

          // Update URL - category + subcategory
          updateUrlParams({
            category: subCategory.categoryId,
            subcategory: subCategory.subcategoryId,
          });
        }
      }
    };

  const handleCategoryItemClick = (categoryName, parentCategoryName) => {
    const category = categories.find(
      (cat) => cat.category === categoryName || cat.title === categoryName
    );

    if (category) {
      fetchProductsByCategory(category.id, categoryName);
    } else {
      setSelectedCategory(categoryName);
      setParentCategory(parentCategoryName || categoryName);
    }

    setViewMode("products");
    setShowDetails(false);
    setSearchQuery("");
  };

  const handleProductItemClick = async (
    productTitle,
    category,
    productData = null
  ) => {
    try {
      // If we have productData with productId, use it directly
      if (productData?.productId) {
        const detailedProduct = await fetchProductDetails(
          productData.productId
        );

        if (detailedProduct) {
          setSelectedProduct(detailedProduct);
          setViewMode("details");
          setShowDetails(true);
          setParentCategory(category);

          // Update URL - category + subcategory (if exists) + product
          const urlParams = {
            category: productData.categoryId,
            product: detailedProduct.id,
          };

          if (productData.subcategoryId) {
            urlParams.subcategory = productData.subcategoryId;
          }

          updateUrlParams(urlParams);
        }
        return;
      }

      // Fallback to search method
      setLoading(true);

      const categoryObj = categories.find(
        (cat) => cat.category === category || cat.title === category
      );

      if (categoryObj) {
        const searchResults = await searchProducts(
          productTitle,
          categoryObj.id
        );
        const product = searchResults.find((p) => p.title === productTitle);

        if (product) {
          // Fetch detailed product information
          const detailedProduct = await fetchProductDetails(product.id);

          if (detailedProduct) {
            setSelectedProduct(detailedProduct);
            setViewMode("details");
            setShowDetails(true);
            setParentCategory(category);

            // Update URL - category + subcategory (if exists) + product
            const urlParams = {
              category: detailedProduct.categoryId,
              product: detailedProduct.id,
            };

            if (detailedProduct.subcategoryId) {
              urlParams.subcategory = detailedProduct.subcategoryId;
            }

            updateUrlParams(urlParams);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details");
    } finally {
      setLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    try {
      // Fetch detailed product information
      const detailedProduct = await fetchProductDetails(product.id);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setViewMode("details");
        setShowDetails(true);

        // Update URL - category + subcategory (if exists) + product
        const urlParams = {
          category: detailedProduct.categoryId,
          product: detailedProduct.id,
        };

        if (detailedProduct.subcategoryId) {
          urlParams.subcategory = detailedProduct.subcategoryId;
        }

        updateUrlParams(urlParams);
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      setError("Failed to load product details");
    }
  };

  const handleBackToProducts = () => {
    setViewMode("products");
    setShowDetails(false);
    setSelectedProduct(null);

    // Update URL - remove product parameter
    const currentCategory = searchParams.get("category");
    const currentSubcategory = searchParams.get("subcategory");

    const urlParams = {};
    if (currentCategory) urlParams.category = currentCategory;
    if (currentSubcategory) urlParams.subcategory = currentSubcategory;

    updateUrlParams(urlParams);
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
        <CircularProgress size={70} thickness={4} sx={{ color: "#2E437C" }} />
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
            className="ml-2 underline hover:no-underline text-[#2E437C]"
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
        <h1 className="text-3xl md:text-4xl font-bold text-[#2E437C]">
          Our Products
        </h1>

        <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-lg">
          <motion.input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
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
            className="w-full border border-gray-300 rounded-full pl-12 pr-6 py-3 md:py-2 outline-none focus:ring-3 focus:ring-[#2E437C]/20 focus:border-[#2E437C] transition-all duration-300 text-gray-800 placeholder-gray-500 text-base md:text-lg bg-white shadow-sm hover:shadow-md focus:shadow-lg"
            whileFocus={{
              scale: 1.01,
              boxShadow: "0 10px 30px rgba(46, 67, 124, 0.15)",
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

          {searchQuery && (
            <motion.button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
              whileHover={{ scale: 1.1 }}
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
                          <Accordion
                            expanded={
                              expandedSubPanel === `subpanel${childIndex}`
                            }
                            onChange={handleSubAccordionChange(
                              `subpanel${childIndex}`,
                              child
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
                                          subChild.category,
                                          subChild
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
                          <ListItem key={childIndex} disablePadding>
                            <ListItemButton
                              onClick={() =>
                                handleProductItemClick(
                                  child.title,
                                  child.category,
                                  child
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
                  <CircularProgress size={40} sx={{ color: "#2E437C" }} />
                  <p className="mt-4 text-gray-600">Searching products...</p>
                </div>
              ) : displayProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                  {displayProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      onClick={() => handleProductClick(product)}
                      className="flex flex-col items-center text-center p-6 rounded-lg cursor-pointer transition-all duration-200 hover:shadow-lg border border-gray-100 hover:border-[#2E437C]/20"
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
                        <span className="text-xs text-[#2E437C] mt-1 bg-[#2E437C]/10 px-2 py-1 rounded-full">
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
                  className="flex items-center gap-2 text-gray-600 hover:text-[#2E437C] transition-colors group"
                >
                  <motion.div
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 group-hover:bg-[#2E437C]/10 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaArrowLeft className="text-sm" />
                  </motion.div>
                  <span className="font-medium">Back to {parentCategory}</span>
                </button>
              </motion.div>

              {productDetailsLoading ? (
                <div className="flex items-center justify-center py-20">
                  <CircularProgress size={60} sx={{ color: "#2E437C" }} />
                  <p className="ml-4 text-gray-600">
                    Loading product details...
                  </p>
                </div>
              ) : (
                <ProductDetails selectedProduct={selectedProduct} />
              )}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCom;
