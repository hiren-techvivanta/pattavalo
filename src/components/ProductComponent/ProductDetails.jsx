// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Thumbs, Autoplay } from "swiper/modules";
// import { HiChevronRight } from "react-icons/hi2";
// import { MdClose } from "react-icons/md";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Box,
//   Typography,
//   IconButton,
//   Divider,
//   Alert,
//   CircularProgress,
// } from "@mui/material";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/thumbs";

// import pd1 from "../../assets/images/pd1.jpg";
// import pd2 from "../../assets/images/pd2.jpg";
// import pd3 from "../../assets/images/pd3.jpg";
// import pd4 from "../../assets/images/pd4.jpg";

// const ProductDetails = ({ selectedProduct }) => {
//   const [thumbsSwiper, setThumbsSwiper] = useState(null);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const [searchQuery, setSearchQuery] = useState("");

//   // Product details API states
//   const [productDetails, setProductDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // Dialog states
//   const [isDialogOpen, setIsDialogOpen] = useState(false);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

//   // Form states
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone_number: "",
//     company_name: "",
//     company_website: "",
//     designation: "",
//     message: "",
//   });

//   const [formErrors, setFormErrors] = useState({});

//   // Fetch product details when selectedProduct changes
//   useEffect(() => {
//     if (selectedProduct && selectedProduct.id) {
//       fetchProductDetails(selectedProduct.id);
//     }
//   }, [selectedProduct]);

//   const fetchProductDetails = async (productId) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/product/product/${productId}`,{
//           headers: { "ngrok-skip-browser-warning": "true" },
//         }
//       );

//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`);
//       }

//       const result = await response.json();

//       if (result.message === "Product fetched successfully" && result.data) {
//         setProductDetails(result.data);
//       } else {
//         throw new Error("Invalid API response format");
//       }
//     } catch (err) {
//       console.error("Error fetching product details:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };
//   const getImageUrl = (imagePath) => {
//     if (!imagePath) return null;

//     if (imagePath.startsWith("http")) {
//       return imagePath;
//     }
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     if (imagePath.startsWith("/")) {
//       return `${backendUrl}${imagePath}`;
//     }
//     return `${backendUrl}/${imagePath}`;
//   };
//   // Get images from API or use fallback
//   const getImages = () => {
//     if (
//       productDetails &&
//       productDetails.images &&
//       productDetails.images.length > 0
//     ) {
//       return productDetails.images.map((imageUrl, index) => ({
//         id: index + 1,
//         src: getImageUrl(imageUrl),
//         alt: productDetails.productName || "Product Image",
//       }));
//     }

//     return [
//       { id: 1, src: pd1, alt: "Product Image 1" },
//       { id: 2, src: pd2, alt: "Product Image 2" },
//       { id: 3, src: pd3, alt: "Product Image 3" },
//       { id: 4, src: pd4, alt: "Product Image 4" },
//     ];
//   };

//   const images = getImages();

//   const getBreadcrumbItems = () => {
//     if (!productDetails) return [];

//     const items = [];

//     if (productDetails.category) {
//       items.push({
//         name: productDetails.category.name,
//         active: false,
//       });
//     }

//     if (productDetails.subcategory) {
//       items.push({
//         name: productDetails.subcategory.name,
//         active: false,
//       });
//     }

//     items.push({
//       name: productDetails.productName,
//       active: true,
//     });

//     return items;
//   };

//   const breadcrumbItems = getBreadcrumbItems();

//   // Validation functions
//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const validatePhone = (phone) => {
//     const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
//     return phoneRegex.test(phone.replace(/\s/g, ""));
//   };

//   const validateURL = (url) => {
//     if (!url) return true;
//     try {
//       new URL(url.startsWith("http") ? url : `https://${url}`);
//       return true;
//     } catch {
//       return false;
//     }
//   };

//   // Handle form input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));

//     // Clear error when user starts typing
//     if (formErrors[name]) {
//       setFormErrors((prev) => ({
//         ...prev,
//         [name]: "",
//       }));
//     }
//   };

//   // Validate form
//   const validateForm = () => {
//     const errors = {};

//     if (!formData.name.trim()) {
//       errors.name = "Name is required";
//     }

//     if (!formData.email.trim()) {
//       errors.email = "Email is required";
//     } else if (!validateEmail(formData.email)) {
//       errors.email = "Please enter a valid email address";
//     }

//     if (!formData.phone_number.trim()) {
//       errors.phone_number = "Phone number is required";
//     } else if (!validatePhone(formData.phone_number)) {
//       errors.phone_number = "Please enter a valid phone number";
//     }

//     if (!formData.company_name.trim()) {
//       errors.company_name = "Company name is required";
//     }

//     if (formData.company_website && !validateURL(formData.company_website)) {
//       errors.company_website = "Please enter a valid website URL";
//     }

//     if (!formData.designation.trim()) {
//       errors.designation = "Designation is required";
//     }

//     if (!formData.message.trim()) {
//       errors.message = "Message is required";
//     }

//     setFormErrors(errors);
//     return Object.keys(errors).length === 0;
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) {
//       return;
//     }

//     setIsSubmitting(true);
//     setSubmitStatus({ type: "", message: "" });

//     try {
//       const response = await fetch(
//         `${import.meta.env.VITE_BACKEND_URL}/settings/enquiry`,
//         {
//           method: "POST",
//           headers: {
//             "ngrok-skip-browser-warning": "true",
//           },
//           body: JSON.stringify({
//             ...formData,
//             product_name: productDetails?.productName || "Unknown Product",
//             product_id: productDetails?.id,
//           }),
//         }
//       );

//       if (response.ok) {
//         setSubmitStatus({
//           type: "success",
//           message:
//             "Your inquiry has been submitted successfully! We will get back to you soon.",
//         });

//         // Reset form after successful submission
//         setTimeout(() => {
//           handleCloseDialog();
//         }, 2000);
//       } else {
//         throw new Error("Failed to submit inquiry");
//       }
//     } catch (error) {
//       console.error("Error submitting inquiry:", error);
//       setSubmitStatus({
//         type: "error",
//         message: "Failed to submit inquiry. Please try again later.",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Handle dialog open
//   const handleOpenDialog = () => {
//     setIsDialogOpen(true);
//     setSubmitStatus({ type: "", message: "" });
//   };

//   // Handle dialog close
//   const handleCloseDialog = () => {
//     setIsDialogOpen(false);
//     setFormData({
//       name: "",
//       email: "",
//       phone_number: "",
//       company_name: "",
//       company_website: "",
//       designation: "",
//       message: "",
//     });
//     setFormErrors({});
//     setSubmitStatus({ type: "", message: "" });
//   };

//   if (loading) {
//     return (
//       <div className="w-full min-h-screen bg-white flex items-center justify-center">
//         <div className="text-center">
//           <CircularProgress size={60} />
//           <p className="mt-4 text-gray-600">Loading product details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="w-full min-h-screen bg-white flex items-center justify-center px-4">
//         <Alert severity="error" className="max-w-md">
//           <strong>Error loading product details:</strong> {error}
//           <button
//             onClick={() =>
//               selectedProduct && fetchProductDetails(selectedProduct.id)
//             }
//             className="ml-2 underline hover:no-underline"
//           >
//             Try again
//           </button>
//         </Alert>
//       </div>
//     );
//   }

//   if (!productDetails) {
//     return (
//       <div className="w-full min-h-screen bg-white flex items-center justify-center">
//         <Alert severity="warning" className="max-w-md">
//           No product details available.
//         </Alert>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full min-h-screen bg-white">
//       {/* Mobile Header - Only visible on mobile */}
//       {/* <div className="lg:hidden px-4 py-4">
//         <h1 className="text-2xl md:text-3xl font-bold text-[#BABEC8] mb-4">
//           Our Products
//         </h1>
//       </div> */}

//       {/* Breadcrumb Navigation */}
//       <div className="px-4 lg:px-0 mb-4 lg:mb-5">
//         <div className="flex items-center flex-wrap gap-2 text-sm">
//           {breadcrumbItems.map((item, index) => (
//             <div key={index} className="flex items-center">
//               <span
//                 className={`px-3 py-2 rounded-lg transition-colors ${
//                   item.active
//                     ? "text-[#2E437D] font-semibold bg-blue-50"
//                     : "text-gray-700 hover:text-gray-900"
//                 }`}
//               >
//                 {item.name}
//               </span>
//               {index < breadcrumbItems.length - 1 && (
//                 <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="max-w-7xl mx-auto lg:px-8 px-4">
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-8 mb-6 lg:mb-8">
//           {/* Product Title and Description */}
//           <div className="flex-1 min-w-0">
//             <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#BABEC8] leading-tight">
//               {productDetails.productName}
//             </h2>
//             {/* {productDetails.description && (
//               <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg max-w-4xl leading-relaxed">
//                 {productDetails.description}
//               </p>
//             )} */}
//           </div>

//           {/* Action Buttons */}
//           <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto lg:justify-end">
//             {productDetails.document && (
//               <a
//                 href={productDetails.document}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 sm:px-6 py-2.5 bg-[#2E437C] text-white text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-[#1E2F5C] transition-colors inline-flex items-center justify-center text-center"
//               >
//                 Downloads
//               </a>
//             )}
//             <button
//               onClick={handleOpenDialog}
//               className="px-4 sm:px-6 py-2.5 border border-black text-black text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-gray-50 transition-colors"
//             >
//               Raise Inquiry
//             </button>
//           </div>
//         </div>

//         {/* Main Content Grid with Side Thumbnails */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
//           {/* Main Image Container - Takes 3 columns on desktop */}
//           <div className="lg:col-span-3">
//             <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[5/4] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
//               <Swiper
//                 modules={[Navigation, Thumbs, Autoplay]}
//                 spaceBetween={0}
//                 slidesPerView={1}
//                 navigation={{
//                   nextEl: ".swiper-button-next-custom",
//                   prevEl: ".swiper-button-prev-custom",
//                 }}
//                 thumbs={{
//                   swiper:
//                     thumbsSwiper && !thumbsSwiper.destroyed
//                       ? thumbsSwiper
//                       : null,
//                 }}
//                 autoplay={{
//                   delay: 4000,
//                   disableOnInteraction: false,
//                   pauseOnMouseEnter: true,
//                 }}
//                 loop={images.length > 1}
//                 speed={800}
//                 onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//                 className="w-full h-full"
//               >
//                 {images.map((image) => (
//                   <SwiperSlide key={image.id}>
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className="w-full h-full object-cover"
//                     />
//                   </SwiperSlide>
//                 ))}

//                 {/* Custom Navigation Buttons */}
//                 {images.length > 1 && (
//                   <>
//                     <div className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
//                       <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 rotate-180" />
//                     </div>
//                     <div className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
//                       <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
//                     </div>
//                   </>
//                 )}
//               </Swiper>
//             </div>

//             {/* Mobile Thumbnails - Below main image for mobile */}
//             {images.length > 1 && (
//               <div className="lg:hidden mt-4">
//                 <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
//                   {images.map((image, index) => (
//                     <div
//                       key={`mobile-thumb-${index}`}
//                       onClick={() => thumbsSwiper?.slideTo(index)}
//                       className={`relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 rounded-md ${
//                         index === activeIndex
//                           ? "ring-2 ring-[#2E437C] opacity-100"
//                           : "opacity-80 hover:opacity-100"
//                       }`}
//                     >
//                       <img
//                         src={image.src}
//                         alt={image.alt}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>

//           {images.length > 1 && (
//             <div className="hidden lg:block lg:col-span-1">
//               <div className="flex flex-col gap-3 h-full max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1">
//                 {images.map((image, index) => (
//                   <div
//                     key={`side-thumb-${image.id}`}
//                     onClick={() => thumbsSwiper?.slideTo(index)}
//                     className={`relative w-full aspect-square overflow-hidden cursor-pointer transition-all duration-300 rounded-lg ${
//                       activeIndex === index
//                         ? "scale-[1.02] shadow-lg border-2 border-[#2E437C] transform-gpu"
//                         : "opacity-90 hover:opacity-100 hover:scale-[1.01] grayscale-[0.1]"
//                     }`}
//                   >
//                     <img
//                       src={image.src}
//                       alt={image.alt}
//                       className={`w-full h-full object-cover transition-all duration-300 ${
//                         activeIndex === index
//                           ? "brightness-110"
//                           : "brightness-95 hover:brightness-100"
//                       }`}
//                     />
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Inquiry Dialog */}
//       <Dialog
//         open={isDialogOpen}
//         onClose={handleCloseDialog}
//         fullWidth
//         maxWidth="md"
//         PaperProps={{
//           sx: {
//             borderRadius: 3,
//             maxHeight: "90vh",
//           },
//         }}
//       >
//         <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
//           <Box
//             display="flex"
//             alignItems="center"
//             justifyContent="space-between"
//           >
//             <Typography
//               variant="h5"
//               component="div"
//               fontWeight="bold"
//               color="#2E437C"
//             >
//               Product Inquiry - {productDetails.productName}
//             </Typography>
//             <IconButton
//               aria-label="close"
//               onClick={handleCloseDialog}
//               sx={{ color: "grey.500" }}
//             >
//               <MdClose size={24} />
//             </IconButton>
//           </Box>
//           <Typography variant="body2" color="text.secondary" mt={1}>
//             Fill out the form below and we'll get back to you soon.
//           </Typography>
//           <Divider sx={{ mt: 2 }} />
//         </DialogTitle>

//         <DialogContent sx={{ p: 3 }}>
//           {submitStatus.message && (
//             <Alert
//               severity={submitStatus.type}
//               sx={{ mb: 3 }}
//               onClose={() => setSubmitStatus({ type: "", message: "" })}
//             >
//               {submitStatus.message}
//             </Alert>
//           )}

//           <Box
//             component="form"
//             sx={{ mt: 2 }}
//             onSubmit={handleSubmit}
//             noValidate
//           >
//             <Box
//               display="grid"
//               gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
//               gap={2.5}
//             >
//               <TextField
//                 name="name"
//                 label="Full Name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//                 error={!!formErrors.name}
//                 helperText={formErrors.name}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//               />

//               <TextField
//                 name="email"
//                 label="Email Address"
//                 type="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 error={!!formErrors.email}
//                 helperText={formErrors.email}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//               />

//               <TextField
//                 name="phone_number"
//                 label="Phone Number"
//                 value={formData.phone_number}
//                 onChange={handleInputChange}
//                 error={!!formErrors.phone_number}
//                 helperText={formErrors.phone_number}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//                 placeholder="+91 9876543210"
//               />

//               <TextField
//                 name="company_name"
//                 label="Company Name"
//                 value={formData.company_name}
//                 onChange={handleInputChange}
//                 error={!!formErrors.company_name}
//                 helperText={formErrors.company_name}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//               />

//               <TextField
//                 name="company_website"
//                 label="Company Website"
//                 value={formData.company_website}
//                 onChange={handleInputChange}
//                 error={!!formErrors.company_website}
//                 helperText={formErrors.company_website}
//                 fullWidth
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//                 placeholder="https://www.example.com"
//               />

//               <TextField
//                 name="designation"
//                 label="Designation"
//                 value={formData.designation}
//                 onChange={handleInputChange}
//                 error={!!formErrors.designation}
//                 helperText={formErrors.designation}
//                 fullWidth
//                 required
//                 variant="outlined"
//                 sx={{ mb: 1 }}
//               />
//             </Box>

//             <TextField
//               name="message"
//               label="Message"
//               value={formData.message}
//               onChange={handleInputChange}
//               error={!!formErrors.message}
//               helperText={formErrors.message}
//               fullWidth
//               required
//               multiline
//               rows={4}
//               variant="outlined"
//               sx={{ mt: 2 }}
//               placeholder="Please describe your inquiry in detail..."
//             />
//           </Box>
//         </DialogContent>

//         <DialogActions sx={{ p: 3, pt: 1 }}>
//           <Button
//             onClick={handleCloseDialog}
//             variant="outlined"
//             sx={{
//               mr: 1,
//               borderColor: "#2E437C",
//               color: "#2E437C",
//               "&:hover": {
//                 borderColor: "#1E2F5C",
//                 backgroundColor: "rgba(46, 67, 124, 0.04)",
//               },
//             }}
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={isSubmitting}
//             sx={{
//               backgroundColor: "#2E437C",
//               "&:hover": {
//                 backgroundColor: "#1E2F5C",
//               },
//               minWidth: 120,
//             }}
//           >
//             {isSubmitting ? (
//               <Box display="flex" alignItems="center" gap={1}>
//                 <CircularProgress size={16} color="inherit" />
//                 Submitting...
//               </Box>
//             ) : (
//               "Submit Inquiry"
//             )}
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// };

// export default ProductDetails;






import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs, Autoplay } from "swiper/modules";
import { HiChevronRight } from "react-icons/hi2";
import { MdClose } from "react-icons/md";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
} from "@mui/material";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";

import pd1 from "../../assets/images/pd1.jpg";
import pd2 from "../../assets/images/pd2.jpg";
import pd3 from "../../assets/images/pd3.jpg";
import pd4 from "../../assets/images/pd4.jpg";

const ProductDetails = ({ selectedProduct }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone_number: "",
    company_name: "",
    company_website: "",
    designation: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;

    if (imagePath.startsWith("http")) {
      return imagePath;
    }
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (imagePath.startsWith("/")) {
      return `${backendUrl}${imagePath}`;
    }
    return `${backendUrl}/${imagePath}`;
  };

  // Get images from props or use fallback
  const getImages = () => {
    if (
      selectedProduct &&
      selectedProduct.images &&
      selectedProduct.images.length > 0
    ) {
      return selectedProduct.images.map((imageUrl, index) => ({
        id: index + 1,
        src: getImageUrl(imageUrl),
        alt: selectedProduct.title || selectedProduct.productName || "Product Image",
      }));
    }

    return [
      { id: 1, src: pd1, alt: "Product Image 1" },
      { id: 2, src: pd2, alt: "Product Image 2" },
      { id: 3, src: pd3, alt: "Product Image 3" },
      { id: 4, src: pd4, alt: "Product Image 4" },
    ];
  };

  const images = getImages();

  const getBreadcrumbItems = () => {
    if (!selectedProduct) return [];

    const items = [];

    // Handle both transformed and raw API data
    const categoryName = selectedProduct.category || selectedProduct.apiData?.category?.name;
    const subcategoryName = selectedProduct.subcategory || selectedProduct.apiData?.subcategory?.name;
    const productName = selectedProduct.title || selectedProduct.productName;

    if (categoryName) {
      items.push({
        name: categoryName,
        active: false,
      });
    }

    if (subcategoryName) {
      items.push({
        name: subcategoryName,
        active: false,
      });
    }

    if (productName) {
      items.push({
        name: productName,
        active: true,
      });
    }

    return items;
  };

  const breadcrumbItems = getBreadcrumbItems();

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
  };

  const validateURL = (url) => {
    if (!url) return true;
    try {
      new URL(url.startsWith("http") ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone_number.trim()) {
      errors.phone_number = "Phone number is required";
    } else if (!validatePhone(formData.phone_number)) {
      errors.phone_number = "Please enter a valid phone number";
    }

    if (!formData.company_name.trim()) {
      errors.company_name = "Company name is required";
    }

    if (formData.company_website && !validateURL(formData.company_website)) {
      errors.company_website = "Please enter a valid website URL";
    }

    if (!formData.designation.trim()) {
      errors.designation = "Designation is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Message is required";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/settings/enquiry`,
        {
          method: "POST",
          headers: {
            "ngrok-skip-browser-warning": "true",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            product_name: selectedProduct?.title || selectedProduct?.productName || "Unknown Product",
            product_id: selectedProduct?.id,
          }),
        }
      );

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Your inquiry has been submitted successfully! We will get back to you soon.",
        });

        // Reset form after successful submission
        setTimeout(() => {
          handleCloseDialog();
        }, 2000);
      } else {
        throw new Error("Failed to submit inquiry");
      }
    } catch (error) {
      console.error("Error submitting inquiry:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to submit inquiry. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog open
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSubmitStatus({ type: "", message: "" });
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      name: "",
      email: "",
      phone_number: "",
      company_name: "",
      company_website: "",
      designation: "",
      message: "",
    });
    setFormErrors({});
    setSubmitStatus({ type: "", message: "" });
  };

  // Show loading or no product message if no product is provided
  if (!selectedProduct) {
    return (
      <div className="w-full min-h-screen bg-white flex items-center justify-center">
        <Alert severity="info" className="max-w-md">
          <Typography variant="h6" gutterBottom>
            No Product Selected
          </Typography>
          <Typography variant="body2">
            Please select a product to view its details.
          </Typography>
        </Alert>
      </div>
    );
  }

  // Get product data - handle both transformed and raw API data
  const productData = {
    id: selectedProduct.id,
    productName: selectedProduct.title || selectedProduct.productName,
    description: selectedProduct.description,
    document: selectedProduct.document,
    category: selectedProduct.category || selectedProduct.apiData?.category,
    subcategory: selectedProduct.subcategory || selectedProduct.apiData?.subcategory,
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <div className="px-4 lg:px-0 mb-4 lg:mb-5">
        <div className="flex items-center flex-wrap gap-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? "text-[#2E437C] font-semibold bg-blue-50"
                    : "text-gray-700 hover:text-gray-900"
                }`}
              >
                {item.name}
              </span>
              {index < breadcrumbItems.length - 1 && (
                <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto lg:px-8 px-4">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 lg:gap-8 mb-6 lg:mb-8">
          {/* Product Title and Description */}
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-[#2E437C] leading-tight">
              {productData.productName}
            </h2>
            {productData.description && (
              <p className="text-gray-600 mt-2 sm:mt-3 text-base sm:text-lg max-w-4xl leading-relaxed">
                {productData.description}
              </p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto lg:justify-end">
            {productData.document && (
              <a
                href={getImageUrl(productData.document)}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 sm:px-6 py-2.5 bg-[#2E437C] text-white text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-[#1E2F5C] transition-colors inline-flex items-center justify-center text-center"
              >
                Downloads
              </a>
            )}
            <button
              onClick={handleOpenDialog}
              className="px-4 sm:px-6 py-2.5 border border-black text-black text-xs sm:text-sm font-medium uppercase rounded-full hover:bg-gray-50 transition-colors"
            >
              Raise Inquiry
            </button>
          </div>
        </div>

        {/* Main Content Grid with Side Thumbnails */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* Main Image Container - Takes 3 columns on desktop */}
          <div className="lg:col-span-3">
            <div className="relative w-full aspect-[4/3] sm:aspect-[3/2] lg:aspect-[4/3] xl:aspect-[5/4] bg-gray-100 rounded-lg overflow-hidden shadow-lg">
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={images.length > 1}
                speed={800}
                onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                className="w-full h-full"
              >
                {images.map((image) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </SwiperSlide>
                ))}

                {/* Custom Navigation Buttons */}
                {images.length > 1 && (
                  <>
                    <div className="swiper-button-prev-custom absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                      <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800 rotate-180" />
                    </div>
                    <div className="swiper-button-next-custom absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                      <HiChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-800" />
                    </div>
                  </>
                )}
              </Swiper>
            </div>

            {/* Mobile Thumbnails - Below main image for mobile */}
            {images.length > 1 && (
              <div className="lg:hidden mt-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3">
                  {images.map((image, index) => (
                    <div
                      key={`mobile-thumb-${index}`}
                      onClick={() => thumbsSwiper?.slideTo(index)}
                      className={`relative aspect-square overflow-hidden cursor-pointer transition-all duration-300 rounded-md ${
                        index === activeIndex
                          ? "ring-2 ring-[#2E437C] opacity-100"
                          : "opacity-80 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Side Thumbnails for Desktop */}
          {images.length > 1 && (
            <div className="hidden lg:block lg:col-span-1">
              <div className="flex flex-col gap-3 h-full max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1">
                <Swiper
                  onSwiper={setThumbsSwiper}
                  modules={[Thumbs]}
                  spaceBetween={12}
                  slidesPerView="auto"
                  direction="vertical"
                  freeMode={true}
                  watchSlidesProgress={true}
                  className="w-full h-full thumb-swiper"
                >
                  {images.map((image, index) => (
                    <SwiperSlide key={`side-thumb-${image.id}`} className="!h-auto">
                      <div
                        className={`relative w-full aspect-square overflow-hidden cursor-pointer transition-all duration-300 rounded-lg ${
                          activeIndex === index
                            ? "scale-[1.02] shadow-lg border-2 border-[#2E437C] transform-gpu"
                            : "opacity-90 hover:opacity-100 hover:scale-[1.01] grayscale-[0.1]"
                        }`}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className={`w-full h-full object-cover transition-all duration-300 ${
                            activeIndex === index
                              ? "brightness-110"
                              : "brightness-95 hover:brightness-100"
                          }`}
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Inquiry Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            borderRadius: 3,
            maxHeight: "90vh",
          },
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography
              variant="h5"
              component="div"
              fontWeight="bold"
              color="#2E437C"
            >
              Product Inquiry - {productData.productName}
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ color: "grey.500" }}
            >
              <MdClose size={24} />
            </IconButton>
          </Box>
          <Typography variant="body2" color="text.secondary" mt={1}>
            Fill out the form below and we'll get back to you soon.
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </DialogTitle>

        <DialogContent sx={{ p: 3 }}>
          {submitStatus.message && (
            <Alert
              severity={submitStatus.type}
              sx={{ mb: 3 }}
              onClose={() => setSubmitStatus({ type: "", message: "" })}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit}
            noValidate
          >
            <Box
              display="grid"
              gridTemplateColumns={{ xs: "1fr", md: "1fr 1fr" }}
              gap={2.5}
            >
              <TextField
                name="name"
                label="Full Name"
                value={formData.name}
                onChange={handleInputChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="email"
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="phone_number"
                label="Phone Number"
                value={formData.phone_number}
                onChange={handleInputChange}
                error={!!formErrors.phone_number}
                helperText={formErrors.phone_number}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
                placeholder="+91 9876543210"
              />

              <TextField
                name="company_name"
                label="Company Name"
                value={formData.company_name}
                onChange={handleInputChange}
                error={!!formErrors.company_name}
                helperText={formErrors.company_name}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />

              <TextField
                name="company_website"
                label="Company Website"
                value={formData.company_website}
                onChange={handleInputChange}
                error={!!formErrors.company_website}
                helperText={formErrors.company_website}
                fullWidth
                variant="outlined"
                sx={{ mb: 1 }}
                placeholder="https://www.example.com"
              />

              <TextField
                name="designation"
                label="Designation"
                value={formData.designation}
                onChange={handleInputChange}
                error={!!formErrors.designation}
                helperText={formErrors.designation}
                fullWidth
                required
                variant="outlined"
                sx={{ mb: 1 }}
              />
            </Box>

            <TextField
              name="message"
              label="Message"
              value={formData.message}
              onChange={handleInputChange}
              error={!!formErrors.message}
              helperText={formErrors.message}
              fullWidth
              required
              multiline
              rows={4}
              variant="outlined"
              sx={{ mt: 2 }}
              placeholder="Please describe your inquiry in detail..."
            />
          </Box>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 1 }}>
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              mr: 1,
              borderColor: "#2E437C",
              color: "#2E437C",
              "&:hover": {
                borderColor: "#1E2F5C",
                backgroundColor: "rgba(46, 67, 124, 0.04)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: "#2E437C",
              "&:hover": {
                backgroundColor: "#1E2F5C",
              },
              minWidth: 120,
            }}
          >
            {isSubmitting ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} color="inherit" />
                Submitting...
              </Box>
            ) : (
              "Submit Inquiry"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
