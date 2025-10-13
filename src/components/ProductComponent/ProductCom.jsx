import React, { useState, useEffect, useCallback, useRef } from "react";
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
import SubcategoryCards from "./SubcategoryCards";
import axios from "axios";
import { CustomHeading } from "../common/CustomHeading";
import { CiSearch } from "react-icons/ci";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { LuDot } from "react-icons/lu";

const theme = createTheme({
  components: {
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          minHeight: "38px !important",
          padding: "0px 16px !important",
          marginBottom: "0px !important",
          "&.Mui-expanded": {
            minHeight: "38px !important",
            margin: "0 !important",
            marginBottom: "0 !important",
          },
        },
        content: {
          margin: "0 !important",
          "&.Mui-expanded": {
            margin: "0 !important",
          },
        },
        expandIconWrapper: {
          marginRight: "0 !important",
          marginLeft: "16px !important",
        },
      },
    },
    MuiAccordion: {
      styleOverrides: {
        root: {
          margin: "0 !important",
          padding: "0 !important",
          borderRadius: "0 !important",
          boxShadow: "none !important",
          backgroundColor: "transparent !important",
          "&.Mui-expanded": {
            margin: "0 !important",
            // padding: "0 !important",
          },
          "&:before": {
            display: "none !important",
          },
          "&:last-child": {
            marginBottom: "0 !important",
            "&.Mui-expanded": {
              margin: "0 !important",
            },
          },
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: "0 !important",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          paddingTop: "0 !important",
          paddingBottom: "0 !important",
          listStyle: "none",
          // margin: "0",
          // paddingLeft:"32px !important",
          position: "relative",
        },
      },
    },
  },
});

const ProductCom = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Bearing");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const [viewMode, setViewMode] = useState("categories");
  const [expandedPanel, setExpandedPanel] = useState("panel1");
  const [expandedSubPanel, setExpandedSubPanel] = useState("");
  const [parentCategory, setParentCategory] = useState("Bearing");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [directProducts, setDirectProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [productDetailsLoading, setProductDetailsLoading] = useState(false);
  const [productsLoading, setProductsLoading] = useState(false);
  const [subcategoriesLoading, setSubcategoriesLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [selectedSubcategoryId, setSelectedSubcategoryId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const isInitialLoadRef = useRef(false);
  const searchTimeoutRef = useRef(null);
  const hasProcessedUrlRef = useRef(false);
  const lastUrlParamsRef = useRef("");
  const leftPanelRef = useRef(null);
  const rightPanelRef = useRef(null);
  const scrollTarget = useRef(0);
  const scrolling = useRef(false);

  useEffect(() => {
    const leftElement = leftPanelRef.current;
    const rightElement = rightPanelRef.current;

    // Custom smooth scroll function
    const smoothScrollTo = (element, targetScrollTop) => {
      if (!element) return;

      const startScrollTop = element.scrollTop;
      const distance = targetScrollTop - startScrollTop;
      const duration = 300; // ms
      let startTime = null;

      const animateScroll = (currentTime) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const progress = Math.min(timeElapsed / duration, 1);

        // Easing function (ease-out)
        const ease = 1 - Math.pow(1 - progress, 3);

        element.scrollTop = startScrollTop + distance * ease;

        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    // Scroll to top function
    const scrollToTop = (panel = "both") => {
      if (panel === "left" || panel === "both") {
        if (leftElement) {
          smoothScrollTo(leftElement, 0);
        }
      }

      if (panel === "right" || panel === "both") {
        if (rightElement) {
          smoothScrollTo(rightElement, 0);
        }
      }
    };

    // Auto scroll to active item in left panel
    const scrollToActiveItem = () => {
      if (!leftElement) return;

      // Find the active/expanded accordion
      const activeAccordion = leftElement.querySelector(".Mui-expanded");
      if (activeAccordion) {
        const containerRect = leftElement.getBoundingClientRect();
        const itemRect = activeAccordion.getBoundingClientRect();

        if (
          itemRect.top < containerRect.top ||
          itemRect.bottom > containerRect.bottom
        ) {
          const scrollTop =
            activeAccordion.offsetTop - leftElement.offsetTop - 20;
          smoothScrollTo(leftElement, scrollTop);
        }
      }
    };

    // Enhanced wheel handler for left panel
    const handleLeftPanelWheel = (e) => {
      if (!leftElement) return;

      const isScrollable = leftElement.scrollHeight > leftElement.clientHeight;
      if (!isScrollable) return;

      const atTop = leftElement.scrollTop <= 0;
      const atBottom =
        leftElement.scrollTop >=
        leftElement.scrollHeight - leftElement.clientHeight;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        e.preventDefault();
        e.stopPropagation();

        const scrollAmount = e.deltaY * 0.8;
        const newScrollTop = Math.max(
          0,
          Math.min(
            leftElement.scrollTop + scrollAmount,
            leftElement.scrollHeight - leftElement.clientHeight
          )
        );

        smoothScrollTo(leftElement, newScrollTop);
      }
    };

    // Enhanced wheel handler for right panel
    const handleRightPanelWheel = (e) => {
      if (!rightElement) return;

      const isScrollable =
        rightElement.scrollHeight > rightElement.clientHeight;
      if (!isScrollable) return;

      const atTop = rightElement.scrollTop <= 0;
      const atBottom =
        rightElement.scrollTop >=
        rightElement.scrollHeight - rightElement.clientHeight;

      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;

      if ((scrollingDown && !atBottom) || (scrollingUp && !atTop)) {
        e.preventDefault();
        e.stopPropagation();

        const scrollAmount = e.deltaY * 0.8;
        const newScrollTop = Math.max(
          0,
          Math.min(
            rightElement.scrollTop + scrollAmount,
            rightElement.scrollHeight - rightElement.clientHeight
          )
        );

        smoothScrollTo(rightElement, newScrollTop);
      }
    };

    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        const activeElement = document.activeElement;
        let targetElement = null;

        if (leftElement && leftElement.contains(activeElement)) {
          targetElement = leftElement;
        } else if (rightElement && rightElement.contains(activeElement)) {
          targetElement = rightElement;
        }

        if (targetElement) {
          e.preventDefault();
          const scrollAmount = e.key === "ArrowDown" ? 50 : -50;
          const newScrollTop = Math.max(
            0,
            Math.min(
              targetElement.scrollTop + scrollAmount,
              targetElement.scrollHeight - targetElement.clientHeight
            )
          );
          smoothScrollTo(targetElement, newScrollTop);
        }
      }

      if (e.key === "Home" || e.key === "End") {
        if (rightElement && rightElement.contains(document.activeElement)) {
          e.preventDefault();
          const targetScrollTop =
            e.key === "Home" ? 0 : rightElement.scrollHeight;
          smoothScrollTo(rightElement, targetScrollTop);
        }
      }
    };

    // Handle resize events
    const handleResize = () => {
      if (leftElement) {
        const maxScroll = leftElement.scrollHeight - leftElement.clientHeight;
        if (leftElement.scrollTop > maxScroll) {
          smoothScrollTo(leftElement, maxScroll);
        }
      }

      if (rightElement) {
        const maxScroll = rightElement.scrollHeight - rightElement.clientHeight;
        if (rightElement.scrollTop > maxScroll) {
          smoothScrollTo(rightElement, maxScroll);
        }
      }
    };

    // Handle focus management
    const handleFocusIn = (e) => {
      if (leftElement && leftElement.contains(e.target)) {
        const elementRect = e.target.getBoundingClientRect();
        const containerRect = leftElement.getBoundingClientRect();

        if (
          elementRect.top < containerRect.top ||
          elementRect.bottom > containerRect.bottom
        ) {
          const scrollTop = e.target.offsetTop - leftElement.offsetTop - 50;
          smoothScrollTo(leftElement, scrollTop);
        }
      }

      if (rightElement && rightElement.contains(e.target)) {
        const elementRect = e.target.getBoundingClientRect();
        const containerRect = rightElement.getBoundingClientRect();

        if (
          elementRect.top < containerRect.top ||
          elementRect.bottom > containerRect.bottom
        ) {
          const scrollTop = e.target.offsetTop - rightElement.offsetTop - 50;
          smoothScrollTo(rightElement, scrollTop);
        }
      }
    };

    // Handle state-based scroll behavior
    const handleStateChanges = () => {
      // Auto scroll to active item when expanded panel changes
      if (expandedPanel) {
        setTimeout(scrollToActiveItem, 100);
      }

      // Scroll right panel to top when view mode changes
      if (viewMode) {
        scrollToTop("right");
      }

      // Reset scroll position when search query changes
      if (searchQuery) {
        scrollToTop("right");
      }

      // Handle mobile accordion behavior - using selectedCategory instead of selectedCategoryId
      if (selectedCategory && !expandedPanel) {
        setExpandedPanel("panel1");
      }

      // Smooth scroll on category/subcategory changes - using your actual variables
      if (selectedCategory || selectedSubcategoryId) {
        setTimeout(() => {
          scrollToTop("right");
        }, 150);
      }
    };

    // Setup all event listeners
    if (leftElement) {
      leftElement.addEventListener("wheel", handleLeftPanelWheel, {
        passive: false,
      });
    }

    if (rightElement) {
      rightElement.addEventListener("wheel", handleRightPanelWheel, {
        passive: false,
      });
    }

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("resize", handleResize);
    document.addEventListener("focusin", handleFocusIn);

    // Initialize and handle state changes
    setTimeout(() => {
      scrollToTop("both");
    }, 100);

    handleStateChanges();

    // Cleanup function
    return () => {
      if (leftElement) {
        leftElement.removeEventListener("wheel", handleLeftPanelWheel);
      }
      if (rightElement) {
        rightElement.removeEventListener("wheel", handleRightPanelWheel);
      }
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("focusin", handleFocusIn);
    };
  }, [
    expandedPanel,
    viewMode,
    searchQuery,
    selectedCategory,
    selectedSubcategoryId,
    selectedProductId,
  ]);

  const getAxiosConfig = useCallback(
    () => ({
      headers: {
        "ngrok-skip-browser-warning": "true",
        "Content-Type": "application/json",
      },
    }),
    []
  );

  useEffect(() => {
    const initializeComponent = async () => {
      if (isInitialLoadRef.current) return;

      try {
        setLoading(true);
        await fetchCategories();
        isInitialLoadRef.current = true;
      } catch (error) {
        setError("Failed to load categories");
      } finally {
        setLoading(false);
      }
    };

    initializeComponent();
  }, []);

  useEffect(() => {
    if (!isInitialLoadRef.current || categories.length === 0) return;

    const categoryParam = searchParams.get("category");
    const subcategoryParam = searchParams.get("subcategory");
    const productParam = searchParams.get("product");

    // Create a unique string to compare with previous URL params
    const currentUrlParams = `${categoryParam || ""}-${
      subcategoryParam || ""
    }-${productParam || ""}`;

    // Skip if we've already processed these exact URL parameters
    if (
      hasProcessedUrlRef.current &&
      lastUrlParamsRef.current === currentUrlParams
    ) {
      return;
    }

    lastUrlParamsRef.current = currentUrlParams;

    const urlFilters = {
      category: categoryParam ? parseInt(categoryParam) : null,
      subcategory: subcategoryParam ? parseInt(subcategoryParam) : null,
      product: productParam ? parseInt(productParam) : null,
    };

    if (urlFilters.category || urlFilters.subcategory || urlFilters.product) {
      hasProcessedUrlRef.current = true;
      applyUrlFilters(urlFilters);
    } else if (categories.length > 0 && !hasProcessedUrlRef.current) {
      // Only show first category if no URL params and we haven't processed URL before
      const firstCategory = categories[0];
      if (firstCategory?.id) {
        setSelectedCategory(firstCategory.category || firstCategory.title);
        setParentCategory(firstCategory.category || firstCategory.title);
        setExpandedPanel(`panel1`);
        setSelectedSubcategoryId(null);
        setSelectedProductId(null);
        fetchSubcategoriesAndDirectProducts(firstCategory.id);
        updateUrlParams({ category: firstCategory.id });
        hasProcessedUrlRef.current = true;
      }
    }
  }, [categories, searchParams]);

  const debouncedSearch = useCallback(
    (query) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        if (query.trim() === "") {
          setSearchResults([]);
          setViewMode(
            subcategories.length > 0 || directProducts.length > 0
              ? "categories"
              : "products"
          );
          setShowDetails(false);
        } else {
          setViewMode("search");
          setShowDetails(false);
          searchProducts(query);
        }
      }, 300);
    },
    [subcategories.length, directProducts.length]
  );

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    setSearchError(null);
    debouncedSearch(query);
  };

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

    const newUrlParams = newSearchParams.toString();
    const currentUrlParams = `${searchParams.get("category") || ""}-${
      searchParams.get("subcategory") || ""
    }-${searchParams.get("product") || ""}`;
    const newUrlParamsFormatted = `${params.category || ""}-${
      params.subcategory || ""
    }-${params.product || ""}`;

    // Only update URL if it's actually different
    if (currentUrlParams !== newUrlParamsFormatted) {
      lastUrlParamsRef.current = newUrlParamsFormatted;
      setSearchParams(newSearchParams);
    }
  };

  const fetchSubcategoriesAndDirectProducts = async (categoryId) => {
    try {
      setSubcategoriesLoading(true);
      setError(null);

      const [subcategoryResponse, directProductsResponse] = await Promise.all([
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/subcategory?category_id=${categoryId}`,
          getAxiosConfig()
        ),
        axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/product/product/search?search=&category_id=${categoryId}`,
          getAxiosConfig()
        ),
      ]);

      let subcategoriesData = [];
      if (
        subcategoryResponse.data.message ===
          "Subcategories fetched successfully" &&
        subcategoryResponse.data.data
      ) {
        subcategoriesData = subcategoryResponse.data.data;
      }

      let directProductsData = [];
      if (
        directProductsResponse.data.message ===
          "Products fetched successfully" &&
        directProductsResponse.data.data
      ) {
        directProductsData = directProductsResponse.data.data
          .filter((product) => !product.subcategory_id)
          .map((product) => ({
            id: product.id,
            title: product.productName,
            category: product.category?.name || "Uncategorized",
            parentCategory: product.category?.name || "Uncategorized",
            image:
              product.images && product.images.length > 0
                ? product.images[0]
                : productImage,
            description: product.description,
            document: product.document,
            is_active: product.is_active,
            categoryId: product.category_id,
            subcategoryId: product.subcategory_id,
            apiData: product,
            isDirectProduct: true,
          }));
      }

      setSubcategories(subcategoriesData);
      setDirectProducts(directProductsData);
      setViewMode("categories");
    } catch (err) {
      setSubcategories([]);
      setDirectProducts([]);
      if (err.response) {
        setError(
          `Failed to load data: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError("Network error while loading data. Please try again.");
      } else {
        setError(`Failed to load data: ${err.message}`);
      }
    } finally {
      setSubcategoriesLoading(false);
    }
  };

  const applyUrlFilters = async (filters) => {
    try {
      if (filters.category) {
        const category = categories.find(
          (cat) => cat.id.toString() === filters.category.toString()
        );

        if (!category) return;

        // Set category state
        setSelectedCategory(category.category || category.title);
        setParentCategory(category.category || category.title);
        setExpandedPanel(`panel${categories.indexOf(category) + 1}`);

        if (filters.product) {
          // Handle product view
          setSelectedProductId(filters.product);
          setSelectedSubcategoryId(filters.subcategory || null);
          await handleProductByUrl(
            filters.product,
            category,
            filters.subcategory
          );
        } else if (filters.subcategory) {
          // Handle subcategory view
          setSelectedSubcategoryId(filters.subcategory);
          setSelectedProductId(null);
          await handleSubcategoryByUrl(filters.subcategory, category);
        } else {
          // Handle category view
          setSelectedSubcategoryId(null);
          setSelectedProductId(null);
          await fetchSubcategoriesAndDirectProducts(category.id);
          setViewMode("categories");
          setShowDetails(false);
          setProducts([]);
        }
      }
    } catch (error) {
      setError("Error applying URL filters");
    }
  };

  const handleProductByUrl = async (
    productId,
    category,
    subcategoryId = null
  ) => {
    try {
      setProductDetailsLoading(true);

      const detailedProduct = await fetchProductDetails(productId);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setViewMode("details");
        setShowDetails(true);

        // Load related products for context
        if (subcategoryId || detailedProduct.subcategoryId) {
          const searchResults = await searchProducts(
            "",
            category.id,
            subcategoryId || detailedProduct.subcategoryId
          );
          setProducts(searchResults);
        }
      }
    } catch (error) {
      setError("Error loading product by URL");
    } finally {
      setProductDetailsLoading(false);
    }
  };

  const handleSubcategoryByUrl = async (subcategoryId, category) => {
    try {
      setProductsLoading(true);

      // Find the subcategory in the tree structure
      let foundSubcategory = null;
      let subPanelIndex = -1;

      if (category.children) {
        category.children.forEach((child, index) => {
          if (
            child.isSubCategory &&
            child.subcategoryId.toString() === subcategoryId.toString()
          ) {
            foundSubcategory = child;
            subPanelIndex = index;
          }
        });
      }

      if (foundSubcategory) {
        setExpandedSubPanel(`subpanel${subPanelIndex}`);
        setSelectedCategory(foundSubcategory.title);
        setParentCategory(category.category || category.title);
      }

      const products = await searchProducts("", category.id, subcategoryId);
      setProducts(products);
      setViewMode("products");
      setShowDetails(false);
    } catch (error) {
      setError("Error loading subcategory by URL");
    } finally {
      setProductsLoading(false);
    }
  };

  const handleSubcategoryCardClick = async (subcategory) => {
    try {
      setProductsLoading(true);
      setViewMode("products");
      setShowDetails(false);
      setSelectedSubcategoryId(subcategory.id);
      setSelectedProductId(null);

      const fetchedProducts = await searchProducts(
        "",
        subcategory.category_id,
        subcategory.id
      );
      setProducts(fetchedProducts);

      updateUrlParams({
        category: subcategory.category_id,
        subcategory: subcategory.id,
      });
    } catch (error) {
      setProducts([]);
    } finally {
      setProductsLoading(false);
    }
  };

  const handleDirectProductClick = async (product) => {
    try {
      const detailedProduct = await fetchProductDetails(product.id);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setSelectedProductId(product.id);
        setSelectedSubcategoryId(null);
        setViewMode("details");
        setShowDetails(true);

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
      setError("Error loading product details");
    }
  };

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpandedPanel(isExpanded ? panel : false);

    if (isExpanded) {
      const categoryIndex = parseInt(panel.replace("panel", "")) - 1;
      const category = categories[categoryIndex];
      if (category) {
        setSelectedCategory(category.category);
        setParentCategory(category.category);
        setViewMode("categories");
        setShowDetails(false);
        setExpandedSubPanel("");
        setSelectedSubcategoryId(null);
        setSelectedProductId(null);
        setSearchQuery("");
        setProducts([]);

        fetchSubcategoriesAndDirectProducts(category.id);
        updateUrlParams({ category: category.id });
      }
    }
  };

  // Rest of your existing functions remain the same...
  const fetchProductDetails = async (productId) => {
    try {
      setProductDetailsLoading(true);
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/product/${productId}`,
        getAxiosConfig()
      );

      if (
        response.data.message === "Product fetched successfully" &&
        response.data.data
      ) {
        const detailedProduct = {
          id: response.data.data.id,
          title: response.data.data.productName,
          url: response.data.data.url,
          description: response.data.data.description,
          images: response.data.data.images || [],
          document: response.data.data.documents,
          category: response.data.data.category?.name || "Uncategorized",
          subcategory: response.data.data.subcategory?.name || null,
          parentCategory: response.data.data.category?.name || "Uncategorized",
          categoryId: response.data.data.category_id,
          subcategoryId: response.data.data.subcategory_id,
          is_active: response.data.data.is_active,
          created_at: response.data.data.created_at,
          updated_at: response.data.data.updated_at,
          apiData: response.data.data,
        };

        return detailedProduct;
      } else {
        throw new Error("Invalid product details API response format");
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
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

  const fetchCategories = async () => {
    try {
      setError(null);

      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/product/chart`,
        getAxiosConfig()
      );

      if (
        response.data.message === "Chart fetched successfully" &&
        response.data.data
      ) {
        const transformedCategories = transformApiData(response.data.data);
        setCategories(transformedCategories);
        return transformedCategories;
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      if (err.response) {
        setError(
          `Server error: ${err.response.status} - ${
            err.response.data?.message || "Unknown error"
          }`
        );
      } else if (err.request) {
        setError("Network error. Please check your internet connection.");
      } else {
        setError(err.message);
      }
      throw err;
    }
  };

  const searchProducts = async (
    query,
    categoryId = null,
    subcategoryId = null
  ) => {
    try {
      setIsSearching(query ? true : false);
      setSearchError(null);
      if (!query) setProductsLoading(true);

      let url = `${
        import.meta.env.VITE_BACKEND_URL
      }/product/product/search?search=${encodeURIComponent(query)}`;

      if (!query) {
        if (categoryId) {
          url += `&category_id=${categoryId}`;
        }
        if (subcategoryId) {
          url += `&subcategory_id=${subcategoryId}`;
        }
      }

      const response = await axios.get(url, getAxiosConfig());

      if (
        response.data.message === "Products fetched successfully" &&
        response.data.data
      ) {
        const transformedProducts = response.data.data.map((product) => ({
          id: product.id,
          title: product.productName,
          category: product.category?.name || "Uncategorized",
          parentCategory: product.category?.name || "Uncategorized",
          image:
            product.images && product.images.length > 0
              ? product.images[0]
              : productImage,
          description: product.description,
          document: product.document,
          is_active: product.is_active,
          categoryId: product.category_id,
          subcategoryId: product.subcategory_id,
          apiData: product,
        }));

        if (query) {
          setSearchResults(transformedProducts);
        }

        return transformedProducts;
      } else {
        const emptyResults = [];
        if (query) {
          setSearchResults(emptyResults);
        }
        return emptyResults;
      }
    } catch (err) {
      if (query) {
        setSearchError("Search failed. Please try again.");
        setSearchResults([]);
      }

      return [];
    } finally {
      setIsSearching(false);
      setProductsLoading(false);
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
            isProduct: true,
          });
        });
      }

      return {
        id: category.id,
        title: category.name,
        category: category.name,
        image: category.image || productImage,
        children: children,
        hasSubcategories:
          category.subcategories && category.subcategories.length > 0,
        hasDirectProducts: category.products && category.products.length > 0,
      };
    });
  };

  
  const handleSubAccordionChange =
    (subPanel, subCategory) => async (event, isExpanded) => {
      setExpandedSubPanel(isExpanded ? subPanel : false);

      if (isExpanded && subCategory) {
        try {
          setProductsLoading(true);
          setSelectedSubcategoryId(subCategory.subcategoryId);
          setSelectedProductId(null);

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

            const fetchedProducts = await searchProducts(
              "",
              subCategory.categoryId,
              subCategory.subcategoryId
            );
            setProducts(fetchedProducts);

            updateUrlParams({
              category: subCategory.categoryId,
              subcategory: subCategory.subcategoryId,
            });
          }
        } catch (error) {
          setProducts([]);
        } finally {
          setProductsLoading(false);
        }
      } else {
        setProducts([]);
      }
    };

  const handleProductItemClick = async (
    productTitle,
    category,
    productData = null
  ) => {
    try {
      setProductDetailsLoading(true);

      if (productData?.productId) {
        const detailedProduct = await fetchProductDetails(
          productData.productId
        );

        if (detailedProduct) {
          setSelectedProduct(detailedProduct);
          setSelectedProductId(productData.productId);
          setSelectedSubcategoryId(productData.subcategoryId || null);
          setViewMode("details");
          setShowDetails(true);
          setParentCategory(category);

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

      setProductsLoading(true);

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
          const detailedProduct = await fetchProductDetails(product.id);

          if (detailedProduct) {
            setSelectedProduct(detailedProduct);
            setSelectedProductId(product.id);
            setSelectedSubcategoryId(detailedProduct.subcategoryId || null);
            setViewMode("details");
            setShowDetails(true);
            setParentCategory(category);

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
      setError("Error loading product details");
    } finally {
      setProductsLoading(false);
      setProductDetailsLoading(false);
    }
  };

  const handleProductClick = async (product) => {
    try {
      const detailedProduct = await fetchProductDetails(product.id);

      if (detailedProduct) {
        setSelectedProduct(detailedProduct);
        setSelectedProductId(product.id);
        setSelectedSubcategoryId(detailedProduct.subcategoryId || null);
        setViewMode("details");
        setShowDetails(true);

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
      setError("Error loading product details");
    }
  };

  const handleBackToProducts = () => {
    const currentCategory = searchParams.get("category");
    const currentSubcategory = searchParams.get("subcategory");

    if (currentSubcategory) {
      setViewMode("products");
      setShowDetails(false);
      setSelectedProduct(null);
      setSelectedProductId(null);

      const urlParams = {};
      if (currentCategory) urlParams.category = currentCategory;
      if (currentSubcategory) urlParams.subcategory = currentSubcategory;

      updateUrlParams(urlParams);
    } else {
      setViewMode("categories");
      setShowDetails(false);
      setSelectedProduct(null);
      setSelectedProductId(null);

      const urlParams = {};
      if (currentCategory) urlParams.category = currentCategory;

      updateUrlParams(urlParams);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchSearch;
  });

  const displayProducts =
    searchQuery.trim() !== "" && viewMode === "search"
      ? searchResults
      : filteredProducts;

  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

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

  if (error && !searchError) {
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
    <ThemeProvider theme={theme}>
      <div className="min-h-screen bg-white px-4 md:px-12 pb-10 pt-5">
        {/* Your existing JSX remains the same */}
        {/* <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-5"
        >
          <h1 className="text-[36px] font-[700] text-[#BABEC8]">
            <CustomHeading title="Our Products" className="" />
          </h1>

          <div className="relative w-full md:max-w-md lg:max-w-lg xl:max-w-lg">
            <motion.input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
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

            <CiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg md:text-xl transition-colors duration-300 pointer-events-none" />

            {searchQuery && (
              <motion.button
                onClick={() => {
                  setSearchQuery("");
                  setSearchError(null);
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes className="text-lg" />
              </motion.button>
            )}
          </div>
        </motion.div> */}

        {/* Rest of your existing JSX remains exactly the same */}
        <div className="mt-2 flex flex-col md:flex-row gap-5">
          <motion.div
            ref={leftPanelRef}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full md:w-1/4 max-h-[80vh] overflow-y-auto overflow-x-hidden"
          >
            <div className="py-4 rounded-lg">
              
              <div className="md:hidden">
                <Accordion
                  expanded={isMobileMenuOpen}
                  onChange={(event, isExpanded) =>
                    setIsMobileMenuOpen(isExpanded)
                  }
                  sx={{
                    boxShadow: "0px 0.89px 1.78px 0px rgba(16, 24, 40, 0.05)",
                    "&:before": { display: "none" },
                    marginBottom: "4px",
                    backgroundColor: "transparent",
                    border: "none",
                    borderRadius: "27px",
                    width: "100%",
                    maxWidth: "420px",
                    overflow: "hidden",
                  }}
                >
                  <AccordionSummary
                    expandIcon={
                      <FaChevronDown className="text-black w-[9.58px] h-[5.42px]" />
                    }
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "1px solid #000000",
                      borderRadius: "27px",
                      minHeight: "auto",
                      padding: "10.66px 25px",
                      margin: 0,
                      "&.Mui-expanded": {
                        backgroundColor: "#ffffff",
                        borderRadius: "27px 27px 0 0",
                        borderBottom: "none",
                        minHeight: "auto",
                      },
                      "& .MuiAccordionSummary-content": {
                        margin: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        flex: 1,
                      },
                      "& .MuiAccordionSummary-expandIconWrapper": {
                        transform: "rotate(0deg)",
                        transition: "transform 0.2s",
                      },
                      "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                        transform: "rotate(180deg)",
                      },
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#000000",
                        textAlign: "left",
                        fontFamily: "'Articulat CF', sans-serif",
                        fontSize: "16px",
                        lineHeight: "21.32px",
                        fontWeight: 500,
                        flex: 1,
                      }}
                    >
                      Explore our range
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails
                    sx={{
                      backgroundColor: "#ffffff",
                      border: "0.89px solid #000000",
                      borderTop: "none",
                      borderRadius: "0 0 27px 27px",
                      padding: "8px 0",
                      boxShadow: "0px 0.89px 1.78px 0px rgba(16, 24, 40, 0.05)",
                    }}
                  >
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
                          expandIcon={
                            <FaChevronDown className="text-gray-600" />
                          }
                          sx={{
                            minHeight: "48px",
                            padding: "0 8px",
                            borderRadius: "6px",
                            transition: "all 0.2s ease-in-out",
                          }}
                        >
                          <div className="flex items-center w-full">
                            <Typography
                              sx={{
                                fontSize: "17px",
                                fontWeight: 500,
                                fontStyle: "normal",
                                color:
                                  expandedPanel === `panel${index + 1}` &&
                                  !selectedSubcategoryId &&
                                  !selectedProductId
                                    ? "#2E437C"
                                    : "#000",
                                transition: "color 0.2s ease-in-out",
                                whiteSpace: "nowrap",
                                marginRight: "12px",
                              }}
                            >
                              {category.title}
                            </Typography>
                            <div className="flex-1 border-[#2E437C] border-[2px] me-2 "></div>
                          </div>
                        </AccordionSummary>

                        <AccordionDetails sx={{ padding: "0 0 8px 16px" }}>
                          <List dense>
                            {category.children.map((child, childIndex) => (
                              <React.Fragment key={childIndex}>
                                {child.isSubCategory ? (
                                  <Accordion
                                    expanded={
                                      expandedSubPanel ===
                                      `subpanel${childIndex}`
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
                                      <div className="flex items-center w-full">
                                        <Typography
                                          sx={{
                                            fontSize: "17px",
                                            fontWeight: 500,
                                            fontStyle: "normal",
                                            color:
                                              selectedSubcategoryId ===
                                                child.subcategoryId &&
                                              !selectedProductId
                                                ? "#2E437C"
                                                : "#666666cc",
                                            transition:
                                              "color 0.2s ease-in-out",
                                            whiteSpace: "nowrap",
                                            marginRight: "12px",
                                          }}
                                        >
                                          {child.title}
                                        </Typography>
                                      </div>
                                    </AccordionSummary>

                                    <AccordionDetails
                                      sx={{ padding: "0 0 4px 12px" }}
                                    >
                                      <List dense>
                                        {child.subChildren.map(
                                          (subChild, subIndex) => (
                                            <ListItem
                                              key={subIndex}
                                              disablePadding
                                            >
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
                                                  transition:
                                                    "all 0.2s ease-in-out",
                                                }}
                                              >
                                                <LuDot
                                                  className="text-[30px]"
                                                  style={{
                                                    color:
                                                      selectedProductId ===
                                                      subChild.productId
                                                        ? "#2E437C"
                                                        : "#666666cc",
                                                  }}
                                                />
                                                <ListItemText
                                                  primary={subChild.title}
                                                  primaryTypographyProps={{
                                                    fontSize: "14px",
                                                    fontWeight: 500,
                                                    fontStyle: "normal",
                                                    color:
                                                      selectedProductId ===
                                                      subChild.productId
                                                        ? "#2E437C"
                                                        : "#666666cc",
                                                    marginLeft: "2px",
                                                    transition:
                                                      "color 0.2s ease-in-out",
                                                  }}
                                                />
                                              </ListItemButton>
                                            </ListItem>
                                          )
                                        )}
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
                                          color:
                                            selectedProductId ===
                                            child.productId
                                              ? "#2E437C"
                                              : "#4b5563",
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
                  </AccordionDetails>
                </Accordion>
              </div>

              <div className="hidden md:block">
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
                      <div className="flex items-center w-full">
                        <Typography
                          sx={{
                            fontSize: "17px",
                            fontWeight:
                              expandedPanel === `panel${index + 1}` &&
                              !selectedSubcategoryId &&
                              !selectedProductId
                                ? 600
                                : 500,
                            fontStyle: "normal",
                            color:
                              expandedPanel === `panel${index + 1}` &&
                              !selectedSubcategoryId &&
                              !selectedProductId
                                ? "#2E437C"
                                : "#000",
                            transition: "color 0.2s ease-in-out",
                            whiteSpace: "nowrap",
                            marginRight: "12px",
                          }}
                        >
                          {category.title}
                        </Typography>
                        <div className="flex-1 border-[#2E437C] border-[2px] me-2 "></div>
                      </div>
                    </AccordionSummary>

                    <AccordionDetails sx={{ padding: "0 0 8px 16px" }}>
                      <List
                        dense
                        sx={{
                          marginLeft: "25px",
                        }}
                      >
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
                                  "& .MuiAccordionSummary-root": {
                                    flexDirection: "row-reverse",
                                  },
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
                                  <div className="flex items-center w-full">
                                    <Typography
                                      sx={{
                                        fontSize: "15px",
                                        fontWeight:
                                          selectedSubcategoryId ===
                                            child.subcategoryId &&
                                          !selectedProductId
                                            ? 600
                                            : 400,
                                        fontStyle: "normal",
                                        color:
                                          selectedSubcategoryId ===
                                            child.subcategoryId &&
                                          !selectedProductId
                                            ? "#2E437C"
                                            : "#666666cc",
                                        transition: "color 0.2s ease-in-out",
                                        whiteSpace: "nowrap",
                                        marginRight: "12px",
                                        marginLeft: "10px",
                                      }}
                                    >
                                      {child.title}
                                    </Typography>
                                  </div>
                                </AccordionSummary>

                                <AccordionDetails
                                  sx={{ padding: "0 0 4px 12px" }}
                                >
                                  <List dense>
                                    {child.subChildren.map(
                                      (subChild, subIndex) => (
                                        <ListItem
                                          key={subIndex}
                                          sx={{ marginLeft: "25px" }}
                                          disablePadding
                                        >
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
                                              marginLeft: "20px",
                                              borderRadius: "4px",
                                              transition:
                                                "all 0.2s ease-in-out",
                                            }}
                                          >
                                            <LuDot
                                              className="text-[30px]"
                                              style={{
                                                color:
                                                  selectedProductId ===
                                                  subChild.productId
                                                    ? "#2E437C"
                                                    : "#666666cc",
                                              }}
                                            />
                                            <ListItemText
                                              primary={subChild.title}
                                              primaryTypographyProps={{
                                                fontSize: "13px",
                                                fontWeight:
                                                  selectedProductId ===
                                                  subChild.productId
                                                    ? 600
                                                    : 400,
                                                fontStyle: "normal",
                                                color:
                                                  selectedProductId ===
                                                  subChild.productId
                                                    ? "#2E437C"
                                                    : "#666666cc",
                                                marginLeft: "2px",
                                                transition:
                                                  "color 0.2s ease-in-out",
                                              }}
                                            />
                                          </ListItemButton>
                                        </ListItem>
                                      )
                                    )}
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
                                    borderRadius: "4px",
                                    transition: "all 0.2s ease-in-out",
                                  }}
                                >
                                  <LuDot
                                    className="text-[30px]"
                                    style={{
                                      color:
                                        selectedProductId === child.productId
                                          ? "#2E437C"
                                          : "#666666cc",
                                    }}
                                  />
                                  <ListItemText
                                    primary={child.title}
                                    primaryTypographyProps={{
                                      fontSize: "15px",
                                      fontWeight: 500,
                                      fontStyle: "normal",
                                      color:
                                        selectedProductId === child.productId
                                          ? "#2E437C"
                                          : "#666666cc",
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
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            ref={rightPanelRef}
            className="w-full md:w-3/4 max-h-[80vh] overflow-auto"
          >
            {viewMode === "categories" && (
              <div>
                {subcategories.length > 0 && (
                  <div className="mb-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                      <h2 className="text-xl font-semibold text-[#BABEC8]">
                        Subcategories
                      </h2>
                      <div className="hidden md:block flex-1 mx-6">
                        <div className="h-[6px] bg-[#BABEC8]"></div>
                      </div>
                    </div>

                    <SubcategoryCards
                      subcategories={subcategories}
                      onSubcategoryClick={handleSubcategoryCardClick}
                      loading={subcategoriesLoading}
                    />
                  </div>
                )}

                {directProducts.length > 0 && (
                  <div>
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
                      <h2 className="text-xl font-semibold text-[#BABEC8]">
                        Products
                      </h2>
                      <div className="hidden md:block flex-1 mx-6">
                        <div className="h-[6px] bg-[#BABEC8]"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
                      {directProducts.map((product, index) => (
                        <motion.div
                          key={product.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          onClick={() => handleDirectProductClick(product)}
                          className="flex flex-col items-start cursor-pointer p-4"
                        >
                          <div className="aspect-[3/3] max-w-[100%] overflow-hidden">
                            <motion.img
                              src={
                                product.image &&
                                product.image.startsWith("http")
                                  ? product.image
                                  : product.image && product.image.includes("/")
                                  ? `${import.meta.env.VITE_BACKEND_URL}/${
                                      product.image
                                    }`
                                  : productImage
                              }
                              alt={product.title}
                              className="max-w-[100%] w-full h-full object-cover p-3"
                              whileHover={{ scale: 1.05 }}
                              transition={{ duration: 0.3 }}
                            />
                          </div>
                          <h2 className="text-[16px] font-[600] mt-3 text-gray-800">
                            {product.title}
                          </h2>
                          <p className="text-gray-500 text-sm mt-1">
                            {product.category}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {subcategories.length === 0 &&
                  directProducts.length === 0 &&
                  !subcategoriesLoading && (
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
                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                          />
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-600 mb-2">
                        No content available
                      </h3>
                      <p className="text-gray-400">
                        This category doesn't have any subcategories or products
                        available
                      </p>
                    </motion.div>
                  )}
              </div>
            )}

            {(viewMode === "products" || viewMode === "search") && (
              <>
                {productsLoading ? (
                  <div className="text-center py-20">
                    <CircularProgress size={40} sx={{ color: "#2E437C" }} />
                    <p className="mt-4 text-gray-600">Loading products...</p>
                  </div>
                ) : isSearching ? (
                  <div className="text-center py-20">
                    <CircularProgress size={40} sx={{ color: "#2E437C" }} />
                    <p className="mt-4 text-gray-600">Searching products...</p>
                  </div>
                ) : displayProducts.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayProducts.map((product, index) => (
                      <motion.div
                        key={product.id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        onClick={() => handleProductClick(product)}
                        className="flex flex-col items-start text-center cursor-pointer"
                      >
                        <div className="aspect-[4/4] w-full overflow-hidden">
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
                            className="w-full object-cover p-3  mb-4"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>
                        <h2 className="text-[16px] font-[600] mt-3 text-gray-800">
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
                      {searchQuery && viewMode === "search"
                        ? "No products found"
                        : products.length === 0 && !searchQuery
                        ? "Select a subcategory to view products"
                        : "No products found"}
                    </h3>
                    <p className="text-gray-400">
                      {searchQuery && viewMode === "search"
                        ? searchError
                          ? `${searchError} Try searching with different keywords.`
                          : `No products match "${searchQuery}". Try different search terms.`
                        : products.length === 0 && !searchQuery
                        ? "Choose a subcategory from the left to explore products"
                        : `No products available in ${selectedCategory}`}
                    </p>
                  </motion.div>
                )}
              </>
            )}

            {viewMode === "details" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
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
    </ThemeProvider>
  );
};

export default ProductCom;
