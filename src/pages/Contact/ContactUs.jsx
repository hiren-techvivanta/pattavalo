import React, { useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import ContactForm from "../../components/contactUsForm/ContactForm";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

const ContactUs = () => {

  //  useEffect(() => {
  //   // Initialize Lenis smooth scrolling
  //   const lenis = new Lenis({
  //     lerp: 0.1,
  //     duration: 0.8,
  //     easing: (t) => 1 - Math.pow(1 - t, 3),
  //     direction: "vertical",
  //     gestureDirection: "vertical",
  //     smooth: true,
  //     mouseMultiplier: 1.2,
  //     smoothTouch: false,
  //     touchMultiplier: 2,
  //     infinite: false,
  //     autoResize: true,
  //   });

  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }

  //   requestAnimationFrame(raf);
  //   lenis.on("scroll", ScrollTrigger.update);
    
  //   gsap.ticker.add((time) => {
  //     lenis.raf(time * 1000);
  //   });

  //   gsap.ticker.lagSmoothing(0);

  //   // Scroll-triggered animations
  //   gsap.fromTo(".fade-up-contact", 
  //     { 
  //       opacity: 0,
  //       y: 30,
  //     },
  //     {
  //       opacity: 1,
  //       y: 0,
  //       duration: 0.6,
  //       ease: "power2.out",
  //       stagger: 0.1,
  //       scrollTrigger: {
  //         trigger: ".fade-up-contact",
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       }
  //     }
  //   );

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);

  return (
    <>
      <Navbar navStyle={"white"} />

      <div className="container mx-auto mt-10 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">
        <ContactForm />
      </div>
    </>
  );
};

export default ContactUs;
