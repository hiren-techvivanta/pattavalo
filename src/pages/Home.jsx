  import React, { useEffect, useState } from "react";
  import HomeBanner from "../components/Home_Components/HomeBanner";
  import Gatherings from "../components/Home_Components/Gatherings";
  import CustomConveyor from "../components/Home_Components/CustomConveyor";
  import ModulerSolution from "../components/Home_Components/ModulerSolution";
  import Navbar from "../components/Navbar/Navbar";
  import ShowCase from "../components/Home_Components/ShowCase";
  import Lenis from "@studio-freight/lenis";
  import IndustryCom from "../components/Home_Components/IndustryCom";

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
      </div>
    );
  }
