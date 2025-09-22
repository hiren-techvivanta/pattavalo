import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,  Thumbs, Autoplay } from 'swiper/modules';
import { HiChevronRight } from 'react-icons/hi2';
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
        <div className="flex gap-3 mb-6  lg:top-0 lg:right-0 lg:z-10 lg:mb-0">
          <button className="px-6 py-2.5 bg-[#2E437C] text-white text-xs font-medium uppercase rounded-full hover:bg-[#1E2F5C] transition-colors">
            Downloads
          </button>
          <button className="px-6 py-2.5 border border-black text-black text-xs font-medium uppercase rounded-full hover:bg-gray-50 transition-colors">
            Raise Inquiry
          </button>
        </div>
       </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1  lg:mt-5">
          
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
                    className={`relative w-[25%] h-[auto] aspect-[1/1]  overflow-hidden cursor-pointer transition-all duration-300 ${
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
                  className={`relative aspect-[122/97]  overflow-hidden cursor-pointer transition-all duration-300 ${
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
    </div>
  );
};

export default ProductDetails;
