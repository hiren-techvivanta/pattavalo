import React from "react";
import img from "../../assets/images/whtsapp.png";

const WhatsappIcon = () => {
  return (
    <a
      href="https://web.whatsapp.com/" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed z-50 bottom-10 right-10"
    >
      <img
        src={img}
        alt="whatsapp logo"
        className="w-15 h-15 object-cover hover:scale-110"
      />
    </a>
  );
};

export default WhatsappIcon;
