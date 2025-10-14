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
export const handleDisplayScaling = (baseWidth = 1536, baseHeight = 864) => {
  const html = document.documentElement;
  const body = document.body;
  
  // Media query for screens above 992px
  const mediaQuery = window.matchMedia('(min-width: 992px)');
  
  const applyScaleFix = () => {
    const actualWidth = window.innerWidth;
    const actualHeight = window.innerHeight;

    // Only apply scaling if screen width is above 992px
    if (actualWidth > 992) {
      // Calculate relative scaling vs baseline resolution
      const widthRatio = actualWidth / baseWidth;
      const heightRatio = actualHeight / baseHeight;

      // Use the smaller ratio to keep proportions consistent
      const uiScale = Math.min(widthRatio, heightRatio);

      // We want to normalize so design looks the same
      // e.g. if your laptop looks normal at 125%, we fix that baseline here
      const normalizedScale = uiScale / 0.8; // since 125% = 1.25x → 1/1.25 ≈ 0.8

      html.style.setProperty("--ui-scale", normalizedScale);
      html.style.setProperty("--vh", `${window.innerHeight}px`);

      // Apply scaling to body
      body.style.transform = `scale(${normalizedScale})`;
      body.style.transformOrigin = "top left";
      body.style.width = `${100 / normalizedScale}%`;
      body.style.height = `${100 / normalizedScale}%`;
    } else {
      // Reset scaling for smaller screens
      resetScaling();
    }
  };

  const resetScaling = () => {
    html.style.removeProperty("--ui-scale");
    html.style.setProperty("--vh", `${window.innerHeight}px`);
    body.style.transform = "none";
    body.style.transformOrigin = "initial";
    body.style.width = "100%";
    body.style.height = "100%";
  };

  // Handle media query changes efficiently
  const handleMediaQueryChange = (event) => {
    if (event.matches) {
      // Screen is now above 992px - apply scaling
      applyScaleFix();
    } else {
      // Screen is now below 992px - reset scaling
      resetScaling();
    }
  };

  // Initial setup
  applyScaleFix();

  // Use matchMedia for efficient breakpoint detection
  mediaQuery.addEventListener('change', handleMediaQueryChange);
  
  // Still listen to resize for screens above 992px
  const handleResize = () => {
    if (window.innerWidth > 992) {
      applyScaleFix();
    }
  };

  window.addEventListener("resize", handleResize);
  
  // Optional: periodic check (reduce frequency since we have matchMedia)
  const interval = setInterval(() => {
    if (window.innerWidth > 992) {
      applyScaleFix();
    }
  }, 3000); // Reduced frequency from 1500ms to 3000ms

  // Cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleMediaQueryChange);
    window.removeEventListener("resize", handleResize);
    clearInterval(interval);
    resetScaling(); // Reset on cleanup
  };
};
