import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';

const ScrollToTop = () => {
  const location = useLocation();
  const lenisRef = useRef(null);

  useEffect(() => {
    // Initialize Lenis if not already initialized
    if (!lenisRef.current) {
      lenisRef.current = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1.0,
        smoothTouch: true,
        touchMultiplier: 2.0,
        infinite: false,
      });

      // Animation frame for Lenis
      function raf(time) {
        lenisRef.current?.raf(time);
        requestAnimationFrame(raf);
      }
      requestAnimationFrame(raf);
    }

    // Smooth scroll to top when location changes
    const scrollToTop = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(0, {
          duration: 0, 
          easing: (t) => 1 - Math.pow(1 - t, 3),
        });
      } else {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      }
    };

    // Small delay to ensure DOM is ready
    const timeoutId = setTimeout(scrollToTop, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [location.pathname]); // Trigger when pathname changes

  // Cleanup Lenis on unmount
  useEffect(() => {
    return () => {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
