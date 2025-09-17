import React, { useState } from "react";
import { motion } from "framer-motion";

const ClipPathButton = ({
  children,
  onClick,
  className = "",
  icon: Icon,
  disabled = false,
  color,
  hoverColor,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className={`relative inline-flex items-center text-[${color}] font-medium px-6 py-3 rounded-full overflow-hidden transition-all duration-[1000ms] ease-in-out group ${
        isHovered ? "border-none text-white" : `border border-[${hoverColor}]`
      }`}
      style={{
        fontFamily: "'Inter', sans-serif",
        fontWeight: 400,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`absolute right-6 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-[${color}]  transition-transform duration-[1000ms] ease-in-out will-change-transform ${
          isHovered ? "scale-[30]" : "scale-100"
        }`}
      />

      <span className="relative z-10 transition-colors duration-[1000ms]">
        {children}
      </span>

      <span className="relative z-10 ml-3 h-8 w-8 overflow-hidden flex items-center justify-center">
        <Icon
          size={25}
          className={`absolute transition-transform duration-[1000ms] text-white ease-in-out ${
            isHovered ? "translate-x-6 opacity-0" : "translate-x-0 opacity-100"
          }`}
        />
        <Icon
          size={25}
          className={`absolute transition-transform duration-[1000ms] text-white ease-in-out ${
            isHovered ? "translate-x-0 opacity-100" : "-translate-x-6 opacity-0"
          }`}
        />
      </span>
    </button>
  );
};

export default ClipPathButton;
