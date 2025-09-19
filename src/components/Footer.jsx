import React from "react";
import { motion } from "framer-motion";
import { FiPhone,FiMapPin,FiMail   } from "react-icons/fi";

import Logo from "../assets/images/logo-white.png"; 

export default function Footer() {
  return (
    <footer className="bg-[#2E437C] text-white px-6 md:px-12 lg:px-20 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-10"
      >
        {/* Left - Logo + Tagline */}
        <div className="space-y-4">
          <img src={Logo} alt="ATC Chains India" className="h-10 w-auto" />
          <p className="text-md leading-relaxed text-[#DBEAFE] max-w-xs">
            Your trusted partner in innovative bearing solutions, built on
            performance and durability.
          </p>
        </div>

        {/* Center - Quick Links */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
          <ul className="space-y-2 text-[#DBEAFE]">
            <li>
              <a href="/products" className="hover:text-white transition">
                Products
              </a>
            </li>
            <li>
              <a href="/news" className="hover:text-white transition">
                News
              </a>
            </li>
            <li>
              <a href="/jobs" className="hover:text-white transition">
                Jobs
              </a>
            </li>
            <li>
              <a href="/downloads" className="hover:text-white transition">
                Downloads
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition">
                About us
              </a>
            </li>
          </ul>
        </div>

        {/* Right - Contact Info */}
        <div>
          <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
          <ul className="space-y-3 text-[#DBEAFE] text-sm">
            <li className="flex items-center gap-3">
              <FiMail  className="text-lg" />
              <a href="mailto:sales@atcchain.com" className="hover:text-white">
                sales@atcchain.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone  className="text-lg" />
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
              <FiMapPin  className="text-white text-lg mt-1" />
              <p>
                22, Kalyannagar Society, O/s Shahpur Gate, Shahpur, Ahmedabad -
                380004
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
    </footer>
  );
}
