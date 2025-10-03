import React from "react";
import { motion } from "framer-motion";
import {
  FiPhone,
  FiMapPin,
  FiMail,
  FiInstagram,
  FiLinkedin,
  FiYoutube,

} from "react-icons/fi";
import { RiTwitterXFill } from "react-icons/ri";
import Logo from "../assets/images/logo-white.png";

export default function Footer() {
  const socialLinks = [
    {
      icon: <FiInstagram />,
      href: "https://www.instagram.com/atcchainsindia/?igsh=MTBtb3NhczAydjhpMA%3D%3D#",
      label: "Instagram",
    },
    { icon: <FiLinkedin />, href: "https://www.linkedin.com/company/atc-chains-india-ahmedabad/", label: "LinkedIn" },
    { icon: <FiYoutube />, href: "https://www.youtube.com/@atcchainsindia", label: "YouTube" },
  ];
  return (
    <footer className="bg-[#2E437C] text-white">
      <div className=" px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-10 sm:py-15">
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          
          <div className="space-y-6">
            <img src={Logo} alt="ATC Chains India" className="h-10 w-auto" />
            <p className="text-md leading-relaxed text-[#DBEAFE] max-w-xs">
              Your trusted partner in innovative bearing solutions, built on
              performance and durability.
            </p>

           
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4 pt-2"
            >
              {socialLinks.map(({ icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 text-[#DBEAFE] 
                             hover:bg-white hover:text-[#2E437C] transition-colors duration-300"
                  whileHover={{
                    scale: 1.2,
                    rotate: 8,
                    transition: { type: "spring", stiffness: 300 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  {icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* Center - Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-[#DBEAFE]">
              {["Products", "News", "Jobs", "Downloads", "About us"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href={`/${item.toLowerCase().replace(" ", "")}`}
                      className="hover:text-white transition"
                    >
                      {item}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Right - Contact Info */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-[#DBEAFE] text-sm">
              <li className="flex items-center gap-3">
                <FiMail className="text-lg" />
                <a
                  href="mailto:sales@atcchain.com"
                  className="hover:text-white"
                >
                  sales@atcchain.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="text-lg" />
                <div className="flex flex-col">
                  <a href="tel:+919023725674" className="hover:text-white">
                    +91 90237-25674
                  </a>
                  <a href="tel:+919023725676" className="hover:text-white">
                    +91 90237-25676
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <FiMapPin className="text-white text-lg mt-1" />
                <p>
                  22, Kalyannagar Society, O/s Shahpur Gate, Shahpur, Ahmedabad
                  - 380004
                </p>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="border-gray-500 my-8"
        />

        {/* Bottom Text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-center text-gray-300 text-sm"
        >
          © 2025 ATC Chains. All rights reserved.
        </motion.p>
      </div>
    </footer>
  );
}
