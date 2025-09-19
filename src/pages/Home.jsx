import React, { useEffect, useState } from "react";
import HomeBanner from "../components/Home_Components/HomeBanner";
import Gatherings from "../components/Home_Components/Gatherings";
import { motion } from "framer-motion";
import CustomConveyor from "../components/Home_Components/CustomConveyor";
import ModulerSolution from "../components/Home_Components/ModulerSolution";
import Navbar from "../components/Navbar/Navbar";
import ShowCase from "../components/Home_Components/ShowCase";
import Lenis from "@studio-freight/lenis";
import IndustryCom from "../components/Home_Components/IndustryCom";
import ContactForm from "../components/contactUsForm/ContactForm";
import l1 from "../assets/images/l1.png";
import l2 from "../assets/images/l2.png";
import l3 from "../assets/images/l3.png";
import l4 from "../assets/images/l4.png";
import l5 from "../assets/images/l5.png";
import l6 from "../assets/images/l6.png";
import ClientFeedback from "../components/Home_Components/ClientFeedback";
import Resources from "../components/Home_Components/Resources";

// Data
const partners = [
  { id: 3, name: "l1", image: l1, width: 117 },
  { id: 4, name: "l2", image: l2, width: 110 },
  { id: 5, name: "l3", image: l3, width: 100 },
  { id: 6, name: "l4", image: l4, width: 200 },
  { id: 7, name: "l5", image: l5, width: 87 },
  { id: 8, name: "l6", image: l6, width: 200 },
];
export default function Home() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const handleBannerAnimationComplete = () => {
    setShowNavbar(true);
  };

  return (
    <div>
      {showNavbar && <Navbar navStyle="transparent" />}
      <HomeBanner onAnimationComplete={handleBannerAnimationComplete} />
      <Gatherings />
      <ModulerSolution />
      <CustomConveyor />
      <ShowCase />
      <IndustryCom />
      <ClientFeedback />
      <div className="our-client-section">
        <motion.div
          className="container mx-auto px-4 sm:px-6 md:px-10 lg:px-0 xl:px-0 py-16 sm:py-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold  mb-12"
          >
            <span className="text-[#2E437C]">Our </span>
            <span className="text-[#BABEC8]">Clients</span>
          </motion.h1>
          <div className="overflow-hidden">
            <div className="flex">
              {[1, 2].map((set) => (
                <motion.div
                  key={set}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 40,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-shrink-0 items-center"
                >
                  {partners.map((partner) => (
                    <motion.div
                      key={`${set}-${partner.id}`}
                      className="flex-shrink-0 mx-12 px-0 md:px-5"
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-12 sm:h-16 lg:h-20 object-contain  transition-all duration-300 "
                        style={{ maxWidth: `${partner.width}px` }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
      <Resources />

      <ContactForm />
      <section className="w-full pt-10 bg-white">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-full h-[300px] sm:h-[400px] lg:h-[400px] overflow-hidden shadow-lg"
        >
          <iframe
            title="ATC CHAINS INDIA Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3672.604152548122!2d72.580103!3d23.03987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e8442629d0ef7%3A0x475a2529ab81e2dc!2sATC%20CHAINS%20INDIA!5e0!3m2!1sen!2sin!4v1726752975123!5m2!1sen!2sin"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </motion.div>
      </section>

    </div>
  );
}
