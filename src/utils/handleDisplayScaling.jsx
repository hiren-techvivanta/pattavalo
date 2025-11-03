// // src/utils/handleDisplayScaling.js
// export const handleDisplayScaling = (baseWidth = 1536, baseHeight = 864) => {
//   const html = document.documentElement;
//   const body = document.body;

//   const applyScaleFix = () => {
//     const actualWidth = window.innerWidth;
//     const actualHeight = window.innerHeight;

//     // Calculate relative scaling vs baseline resolution
//     const widthRatio = actualWidth / baseWidth;
//     const heightRatio = actualHeight / baseHeight;

//     // Use the smaller ratio to keep proportions consistent
//     const uiScale = Math.min(widthRatio, heightRatio);

//     // We want to normalize so design looks the same
//     // e.g. if your laptop looks normal at 125%, we fix that baseline here
//     const normalizedScale = uiScale / 0.8; // since 125% = 1.25x → 1/1.25 ≈ 0.8

//     html.style.setProperty("--ui-scale", normalizedScale);
//     html.style.setProperty("--vh", `${window.innerHeight}px`);

//     // Apply scaling to body
//     body.style.transform = `scale(${normalizedScale})`;
//     body.style.transformOrigin = "top left";
//     body.style.width = `${100 / normalizedScale}%`;
//     body.style.height = `${100 / normalizedScale}%`;
//   };

//   applyScaleFix();
//   window.addEventListener("resize", applyScaleFix);
//   const interval = setInterval(applyScaleFix, 1500);

//   return () => {
//     window.removeEventListener("resize", applyScaleFix);
//     clearInterval(interval);
//   };
// };


// src/utils/handleDisplayScaling.js

// export const handleDisplayScaling = (baseWidth = 1536, baseHeight = 864) => {
//   const html = document.documentElement;
//   const body = document.body;
  
//   // Media query for screens above 992px
//   const mediaQuery = window.matchMedia('(min-width: 1200px)');
  
//   const applyScaleFix = () => {
//     const actualWidth = window.innerWidth;
//     const actualHeight = window.innerHeight;

//     // Only apply scaling if screen width is above 992px
//     if (actualWidth > 992) {
//       // Calculate relative scaling vs baseline resolution
//       const widthRatio = actualWidth / baseWidth;
//       const heightRatio = actualHeight / baseHeight;

//       // Use the smaller ratio to keep proportions consistent
//       const uiScale = Math.min(widthRatio, heightRatio);

//       // We want to normalize so design looks the same
//       // e.g. if your laptop looks normal at 125%, we fix that baseline here
//       const normalizedScale = uiScale / 0.8; // since 125% = 1.25x → 1/1.25 ≈ 0.8

//       html.style.setProperty("--ui-scale", normalizedScale);
//       html.style.setProperty("--vh", `${window.innerHeight}px`);

//       // Apply scaling to body
//       body.style.transform = `scale(${normalizedScale})`;
//       body.style.transformOrigin = "top left";
//       body.style.width = `${100 / normalizedScale}%`;
//       body.style.height = `${100 / normalizedScale}%`;
//     } else {
//       // Reset scaling for smaller screens
//       resetScaling();
//     }
//   };

//   const resetScaling = () => {
//     html.style.removeProperty("--ui-scale");
//     html.style.setProperty("--vh", `${window.innerHeight}px`);
//     body.style.transform = "none";
//     body.style.transformOrigin = "initial";
//     body.style.width = "100%";
//     body.style.height = "100%";
//   };

//   // Handle media query changes efficiently
//   const handleMediaQueryChange = (event) => {
//     if (event.matches) {
//       // Screen is now above 992px - apply scaling
//       applyScaleFix();
//     } else {
//       // Screen is now below 992px - reset scaling
//       resetScaling();
//     }
//   };

//   // Initial setup
//   applyScaleFix();

//   // Use matchMedia for efficient breakpoint detection
//   mediaQuery.addEventListener('change', handleMediaQueryChange);
  
//   // Still listen to resize for screens above 992px
//   const handleResize = () => {
//     if (window.innerWidth > 992) {
//       applyScaleFix();
//     }
//   };

//   window.addEventListener("resize", handleResize);
  
//   // Optional: periodic check (reduce frequency since we have matchMedia)
//   const interval = setInterval(() => {
//     if (window.innerWidth > 992) {
//       applyScaleFix();
//     }
//   }, 3000); // Reduced frequency from 1500ms to 3000ms

//   // Cleanup function
//   return () => {
//     mediaQuery.removeEventListener('change', handleMediaQueryChange);
//     window.removeEventListener("resize", handleResize);
//     clearInterval(interval);
//     resetScaling(); // Reset on cleanup
//   };
// };



// ---------------------------------------------------------------------------------------------



// src/utils/handleDisplayScaling.js
// export const handleDisplayScaling = (baseWidth = 1536, baseHeight = 864) => {
//   const html = document.documentElement;
  
//   // Media query for screens between 1200px and 1550px
//   const mediaQuery = window.matchMedia('(min-width: 1200px) and (max-width: 1550px)');
  
//   const applyScaleFix = () => {
//     const actualWidth = window.innerWidth;
//     const actualHeight = window.innerHeight;

//     console.log('Scaling check:', { actualWidth, actualHeight, inRange: actualWidth >= 1200 && actualWidth <= 1550 });

//     // Only apply scaling if screen width is between 1200px and 1550px
//     if (actualWidth >= 1200 && actualWidth <= 1550) {
//       // Calculate relative scaling vs baseline resolution
//       const widthRatio = actualWidth / baseWidth;
//       const heightRatio = actualHeight / baseHeight;

//       // Use the smaller ratio to keep proportions consistent
//       const uiScale = Math.min(widthRatio, heightRatio);

//       // We want to normalize so design looks the same
//       const normalizedScale = uiScale / 0.8;

//       console.log('Applying scale:', { widthRatio, heightRatio, uiScale, normalizedScale });

//       html.style.setProperty("--ui-scale", normalizedScale);
//       html.style.setProperty("--vh", `${window.innerHeight}px`);

//       // Instead of scaling body, scale only main content areas
//       const contentSelectors = [
//         'main',
//         '.container',
//         '.content',
//         'section:not(nav):not(header)',
//         'footer',
//         '.page-content'
//       ];

//       contentSelectors.forEach(selector => {
//         const elements = document.querySelectorAll(selector);
//         elements.forEach(element => {
//           // Skip if it's inside a navbar
//           if (!element.closest('nav') && !element.closest('header')) {
//             element.style.transform = `scale(${normalizedScale})`;
//             element.style.transformOrigin = "top center";
//           }
//         });
//       });

//       // Ensure navbar stays unscaled
//       forceNavbarFix();
      
//     } else {
//       // Reset scaling for screens outside the range
//       resetScaling();
//     }
//   };

//   const forceNavbarFix = () => {
//     const navElements = document.querySelectorAll('nav, .navbar-fixed, header, [role="navigation"]');
//     navElements.forEach(element => {
//       element.style.setProperty('position', 'fixed', 'important');
//       element.style.setProperty('top', '0px', 'important');
//       element.style.setProperty('left', '0px', 'important');
//       element.style.setProperty('right', '0px', 'important');
//       element.style.setProperty('width', '100vw', 'important');
//       element.style.setProperty('z-index', '9999', 'important');
//       element.style.setProperty('transform', 'none', 'important');
//       element.style.setProperty('transform-origin', 'initial', 'important');
//     });
//   };

//   const resetScaling = () => {
//     console.log('Resetting scaling - outside 1200px-1550px range');
    
//     html.style.setProperty("--ui-scale", "1");
//     html.style.setProperty("--vh", `${window.innerHeight}px`);

//     // Reset content scaling
//     const allElements = document.querySelectorAll('*');
//     allElements.forEach(element => {
//       if (element.style.transform && element.style.transform.includes('scale')) {
//         element.style.transform = '';
//         element.style.transformOrigin = '';
//       }
//     });

//     // Ensure navbar stays fixed
//     forceNavbarFix();
//   };

//   // Rest of the code remains the same...
//   const handleMediaQueryChange = (event) => {
//     console.log('Media query changed - 1200px-1550px range:', event.matches);
//     if (event.matches) {
//       applyScaleFix();
//     } else {
//       resetScaling();
//     }
//   };

//   applyScaleFix();
//   mediaQuery.addEventListener('change', handleMediaQueryChange);
  
//   const handleResize = () => {
//     const currentWidth = window.innerWidth;
//     if (currentWidth >= 1200 && currentWidth <= 1550) {
//       applyScaleFix();
//     } else if (currentWidth < 1200 || currentWidth > 1550) {
//       resetScaling();
//     }
//   };

//   window.addEventListener("resize", handleResize);
  
//   const interval = setInterval(() => {
//     const currentWidth = window.innerWidth;
//     if (currentWidth >= 1200 && currentWidth <= 1550) {
//       forceNavbarFix();
//     }
//   }, 500);

//   return () => {
//     mediaQuery.removeEventListener('change', handleMediaQueryChange);
//     window.removeEventListener("resize", handleResize);
//     clearInterval(interval);
//     resetScaling();
//   };
// };


export const handleDisplayScaling = (baseWidth = 1536, baseHeight = 864) => {
  const html = document.documentElement;
  
  // Media query for screens between 1200px and 1550px
  const mediaQuery = window.matchMedia('(min-width: 1200px) and (max-width: 1550px)');
  
  const applyScaleFix = () => {
    const actualWidth = window.innerWidth;
    const actualHeight = window.innerHeight;

   

    // Only apply scaling if screen width is between 1200px and 1550px
    if (actualWidth >= 1200 && actualWidth <= 1550) {
      // Calculate relative scaling vs baseline resolution
      const widthRatio = actualWidth / baseWidth;
      const heightRatio = actualHeight / baseHeight;

      // Use the smaller ratio to keep proportions consistent
      const uiScale = Math.min(widthRatio, heightRatio);

      // FIXED: Better normalization for initial screen
      let normalizedScale;
      
      // Check if this is close to the baseline screen
      const isBaselineScreen = Math.abs(actualWidth - baseWidth) < 100 && Math.abs(actualHeight - baseHeight) < 100;
      
      if (isBaselineScreen) {
        // For baseline screen, use scale of 1 (no scaling)
        normalizedScale = 1;
      } else {
        // For other screens, apply the normalization
        normalizedScale = uiScale / 0.8;
        
        // Ensure reasonable bounds
        normalizedScale = Math.max(0.6, Math.min(1.3, normalizedScale));
      }

     

      html.style.setProperty("--ui-scale", normalizedScale);
      html.style.setProperty("--vh", `${window.innerHeight}px`);

      // Instead of scaling body, scale only main content areas
      const contentSelectors = [
        'main',
        '.container',
        '.content',
        'section:not(nav):not(header)',
        'footer',
        '.page-content'
      ];

      contentSelectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
          // Skip if it's inside a navbar
          if (!element.closest('nav') && !element.closest('header')) {
            if (normalizedScale === 1) {
              // For baseline screen, remove any scaling
              element.style.transform = '';
              element.style.transformOrigin = '';
            } else {
              // For other screens, apply scaling
              element.style.transform = `scale(${normalizedScale})`;
              element.style.transformOrigin = "top center";
            }
          }
        });
      });

      // Ensure navbar stays unscaled
      forceNavbarFix();
      
    } else {
      // Reset scaling for screens outside the range
      resetScaling();
    }
  };

  const forceNavbarFix = () => {
    const navElements = document.querySelectorAll('nav, .navbar-fixed, header, [role="navigation"]');
    navElements.forEach(element => {
      element.style.setProperty('position', 'fixed', 'important');
      element.style.setProperty('top', '0px', 'important');
      element.style.setProperty('left', '0px', 'important');
      element.style.setProperty('right', '0px', 'important');
      element.style.setProperty('width', '100vw', 'important');
      // element.style.setProperty('z-index', '9999', 'important');
      element.style.setProperty('transform', 'none', 'important');
      element.style.setProperty('transform-origin', 'initial', 'important');
    });

     const footerElements = document.querySelectorAll('footer-bottom-main');
    footerElements.forEach(element => {
      element.style.setProperty('transform', 'none', 'important');
      element.style.setProperty('width', '100vw', 'important');
      element.style.setProperty('transform-origin', 'initial', 'important');
    });

    // Also fix WhatsApp icon
    const whatsappElements = document.querySelectorAll('.whatsapp-fixed, [class*="whatsapp"]');
    whatsappElements.forEach(element => {
      element.style.setProperty('position', 'fixed', 'important');
      element.style.setProperty('bottom', '2.5rem', 'important');
      element.style.setProperty('right', '2.5rem', 'important');
      element.style.setProperty('z-index', '9997', 'important');
      element.style.setProperty('transform', 'none', 'important');
      element.style.setProperty('transform-origin', 'initial', 'important');
    });
  };

  const resetScaling = () => {
   
    
    html.style.setProperty("--ui-scale", "1");
    html.style.setProperty("--vh", `${window.innerHeight}px`);

    // Reset content scaling
    const allElements = document.querySelectorAll('*');
    allElements.forEach(element => {
      if (element.style.transform && element.style.transform.includes('scale')) {
        element.style.transform = '';
        element.style.transformOrigin = '';
      }
    });

    // Ensure navbar stays fixed
    forceNavbarFix();
  };

  const handleMediaQueryChange = (event) => {
   
    if (event.matches) {
      applyScaleFix();
    } else {
      resetScaling();
    }
  };

  applyScaleFix();
  mediaQuery.addEventListener('change', handleMediaQueryChange);
  
  const handleResize = () => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 1200 && currentWidth <= 1550) {
      applyScaleFix();
    } else if (currentWidth < 1200 || currentWidth > 1550) {
      resetScaling();
    }
  };

  window.addEventListener("resize", handleResize);
  
  const interval = setInterval(() => {
    const currentWidth = window.innerWidth;
    if (currentWidth >= 1200 && currentWidth <= 1550) {
      forceNavbarFix();
    }
  }, 500);

  return () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange);
    window.removeEventListener("resize", handleResize);
    clearInterval(interval);
    resetScaling();
  };
};
