import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs, Autoplay } from 'swiper/modules';
import { HiChevronRight } from 'react-icons/hi2';
import { MdClose } from 'react-icons/md';
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
  CircularProgress
} from '@mui/material';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/thumbs';

import pd1 from '../../assets/images/pd1.jpg';
import pd2 from '../../assets/images/pd2.jpg';
import pd3 from '../../assets/images/pd3.jpg';
import pd4 from '../../assets/images/pd4.jpg';

const ProductDetails = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Dialog states
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  
  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone_number: '',
    company_name: '',
    company_website: '',
    designation: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});

  const images = [
    { id: 1, src: pd1, alt: 'SS Single Hinge 1' },
    { id: 2, src: pd2, alt: 'SS Single Hinge 2' },
    { id: 3, src: pd3, alt: 'SS Single Hinge 3' },
    { id: 4, src: pd4, alt: 'SS Single Hinge 4' },
  ];

  const breadcrumbItems = [
    { name: 'SS Chain & Sprocket', active: false },
    { name: 'SS Straight Hinge', active: false },
    { name: 'SS Single Hinge', active: true },
  ];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const validateURL = (url) => {
    if (!url) return true; // Optional field
    try {
      new URL(url.startsWith('http') ? url : `https://${url}`);
      return true;
    } catch {
      return false;
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Phone number is required';
    } else if (!validatePhone(formData.phone_number)) {
      errors.phone_number = 'Please enter a valid phone number';
    }
    
    if (!formData.company_name.trim()) {
      errors.company_name = 'Company name is required';
    }
    
    if (formData.company_website && !validateURL(formData.company_website)) {
      errors.company_website = 'Please enter a valid website URL';
    }
    
    if (!formData.designation.trim()) {
      errors.designation = 'Designation is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
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
    setSubmitStatus({ type: '', message: '' });
    
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/settings/enquiry`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Your inquiry has been submitted successfully! We will get back to you soon.'
        });
        
        // Reset form after successful submission
        setTimeout(() => {
          handleCloseDialog();
        }, 2000);
      } else {
        throw new Error('Failed to submit inquiry');
      }
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Failed to submit inquiry. Please try again later.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle dialog open
  const handleOpenDialog = () => {
    setIsDialogOpen(true);
    setSubmitStatus({ type: '', message: '' });
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setFormData({
      name: '',
      email: '',
      phone_number: '',
      company_name: '',
      company_website: '',
      designation: '',
      message: ''
    });
    setFormErrors({});
    setSubmitStatus({ type: '', message: '' });
  };

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Mobile Header - Only visible on mobile */}
      <div className="lg:hidden px-4 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-[#BABEC8] mb-4">
          Our Products
        </h1>
      </div>

      {/* Breadcrumb Navigation */}
      <div className="px-4 lg:px-0 mb-4 lg:mb-6">
        <div className="flex items-center flex-wrap gap-2 text-sm">
          {/* {breadcrumbItems.map((item, index) => (
            <div key={index} className="flex items-center">
              <span
                className={`px-3 py-2 rounded-lg transition-colors ${
                  item.active
                    ? 'text-[#2E447D] font-semibold bg-blue-50'
                    : 'text-gray-700 hover:text-gray-900'
                }`}
              >
                {item.name}
              </span>
              {index < breadcrumbItems.length - 1 && (
                <HiChevronRight className="w-4 h-4 text-gray-400 mx-1" />
              )}
            </div>
          ))} */}
        </div>
      </div>

      <div className="lg:relative lg:px-0 px-4">
        {/* Product Title */}
        <div className='lg:flex justify-between items-center'>
          <div className="mb-4 lg:mb-6">
            <h2 className="text-xl md:text-2xl lg:text-4xl font-bold text-[#BABEC8] lg:top-0 lg:left-0 lg:z-10">
              SS SINGLE HINGE
            </h2>
          </div>

          {/* Action Buttons - Desktop positioned absolute, Mobile below title */}
          <div className="flex gap-3 mb-6 lg:top-0 lg:right-0 lg:z-10 lg:mb-0">
            <button className="px-6 py-2.5 bg-[#2E437C] text-white text-xs font-medium uppercase rounded-full hover:bg-[#1E2F5C] transition-colors">
              Downloads
            </button>
            <button 
              onClick={handleOpenDialog}
              className="px-6 py-2.5 border border-black text-black text-xs font-medium uppercase rounded-full hover:bg-gray-50 transition-colors"
            >
              Raise Inquiry
            </button>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:mt-5">
          {/* Main Image Slider */}
          <div className="">
            <div className="w-full aspect-[4/3] lg:aspect-[792/630] bg-gray-100 overflow-hidden shadow-lg">
              <Swiper
                modules={[Navigation, Thumbs, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation={{
                  nextEl: '.swiper-button-next-custom',
                  prevEl: '.swiper-button-prev-custom',
                }}
                thumbs={{ 
                  swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null 
                }}
                autoplay={{
                  delay: 4000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                loop={true}
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
                <div className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                  <HiChevronRight className="w-5 h-5 text-gray-800 rotate-180" />
                </div>
                <div className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 shadow-lg">
                  <HiChevronRight className="w-5 h-5 text-gray-800" />
                </div>
              </Swiper>
            </div>

            {/* Desktop Thumbnails Row - Below main image */}
            <div className="hidden lg:block mt-4">
              <div className="flex gap-4">
                {images.map((image, index) => (
                  <div
                    key={`desktop-thumb-${image.id}`}
                    onClick={() => thumbsSwiper?.slideTo(index)}
                    className={`relative w-[25%] h-[auto] aspect-[1/1] overflow-hidden cursor-pointer transition-all duration-300 ${
                      activeIndex === index
                        ? 'ring-2 ring-blue-500 ring-offset-2 opacity-100 scale-105'
                        : 'opacity-80 hover:opacity-100 hover:scale-105'
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
          </div>

          {/* Mobile Thumbnails Grid - Only visible on mobile */}
          <div className="lg:hidden">
            <div className="grid grid-cols-3 gap-2">
              {images.map((image, index) => (
                <div
                  key={`mobile-thumb-${index}`}
                  onClick={() => thumbsSwiper?.slideTo(index % images.length)}
                  className={`relative aspect-[122/97] overflow-hidden cursor-pointer transition-all duration-300 ${
                    (index % images.length) === activeIndex
                      ? 'ring-2 ring-blue-500 ring-offset-1 opacity-100'
                      : 'opacity-80 hover:opacity-100'
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
            maxHeight: '90vh'
          }
        }}
      >
        <DialogTitle sx={{ m: 0, p: 3, pb: 1 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h5" component="div" fontWeight="bold" color="#2E437C">
              Product Inquiry
            </Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{ color: 'grey.500' }}
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
              onClose={() => setSubmitStatus({ type: '', message: '' })}
            >
              {submitStatus.message}
            </Alert>
          )}

          <Box component="form" sx={{mt:2}} onSubmit={handleSubmit} noValidate>
            <Box display="grid" gridTemplateColumns={{ xs: '1fr', md: '1fr 1fr' }} gap={2.5}>
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
              borderColor: '#2E437C',
              color: '#2E437C',
              '&:hover': {
                borderColor: '#1E2F5C',
                backgroundColor: 'rgba(46, 67, 124, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={isSubmitting}
            sx={{
              backgroundColor: '#2E437C',
              '&:hover': {
                backgroundColor: '#1E2F5C'
              },
              minWidth: 120
            }}
          >
            {isSubmitting ? (
              <Box display="flex" alignItems="center" gap={1}>
                <CircularProgress size={16} color="inherit" />
                Submitting...
              </Box>
            ) : (
              'Submit Inquiry'
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ProductDetails;
