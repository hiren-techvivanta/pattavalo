import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappIcon = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showText, setShowText] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_SUPPORT_URL;

  useEffect(() => {
    // Step 1: Show the icon after 3 seconds
    const showIconTimer = setTimeout(() => {
      setIsVisible(true);
    }, 3000);

    // Step 2: Expand to show text after 2 more seconds
    const expandTimer = setTimeout(() => {
      setIsExpanded(true);
      // Step 3: Show text content
      setTimeout(() => {
        setShowText(true);
      }, 300);
    }, 5000);

    // Cleanup timers on unmount
    return () => {
      clearTimeout(showIconTimer);
      clearTimeout(expandTimer);
    };
  }, []);

  return (
    <div className="fixed bottom-10 right-10 z-50">
      {/* Main WhatsApp button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`relative flex items-center bg-green-500 text-white rounded-full shadow-lg hover:bg-green-600 transition-all duration-700 hover:scale-105 hover:shadow-xl group overflow-hidden ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          width: isExpanded ? '160px' : '60px',
          height: '60px',
          paddingLeft: isExpanded ? '16px' : '16px',
          paddingRight: isExpanded ? '16px' : '16px',
          transform: isVisible ? 'scale(1)' : 'scale(0.8)',
          transition: 'opacity 1s ease-out, transform 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55), width 0.7s ease-in-out',
          animation: isVisible ? 'gentlePulse 3s ease-in-out infinite 3s' : 'none'
        }}
      >
        {/* WhatsApp Icon */}
        <div className="flex items-center justify-center transition-all duration-500">
          <FaWhatsapp 
            size={28} 
            className={`transition-all duration-500 group-hover:rotate-12 ${
              isExpanded ? 'mr-2' : ''
            }`}
          />
        </div>
        
        {/* Text that appears */}
        <div 
          className={`overflow-hidden transition-all duration-700 ${
            showText ? 'w-auto opacity-100' : 'w-0 opacity-0'
          }`}
        >
          <span className="font-medium whitespace-nowrap text-sm">
            Chat with us
          </span>
        </div>
        
        {/* Shine effect on hover */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-all duration-300 transform -translate-x-full group-hover:translate-x-full" />
      </a>
    </div>
  );
};

export default WhatsappIcon;
