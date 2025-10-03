import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsappIcon = () => {
  const whatsappUrl = import.meta.env.VITE_WHATSAPP_SUPPORT_URL; 

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-10 right-10 z-50 flex items-center gap-2 bg-green-500 text-white px-4 py-3 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-105"
    >
      <FaWhatsapp size={28} />
      <span className="font-medium">Chat with us</span>
    </a>
  );
};

export default WhatsappIcon;
