import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaIndustry,
  FaWineBottle,
  FaFish,
  FaIceCream,
  FaShippingFast,
  FaSprayCan,
  FaCar,
  FaHospital,
} from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import food1 from "../../assets/images/industries/food1.jpg";
import food2 from "../../assets/images/industries/food2.jpeg";
import water1 from "../../assets/images/industries/water1.jpeg";
import water2 from "../../assets/images/industries/water2.jpeg";
import juice1 from "../../assets/images/industries/juice1.jpeg";
import juice2 from "../../assets/images/industries/juice2.jpeg";
import tetra1 from "../../assets/images/industries/tetra1.jpeg";
import tetra2 from "../../assets/images/industries/tetra2.jpeg";
import beer1 from "../../assets/images/industries/beer1.jpeg";
import beer2 from "../../assets/images/industries/beer2.jpeg";
import softdrink1 from "../../assets/images/industries/softdrink1.jpeg";
import softdrink2 from "../../assets/images/industries/softdrink2.jpeg";
import seafood1 from "../../assets/images/industries/seafood1.jpeg";
import seafood2 from "../../assets/images/industries/seafood2.jpeg";
import meat1 from "../../assets/images/industries/meat1.jpeg";
import meat2 from "../../assets/images/industries/meat2.jpeg";
import poultry1 from "../../assets/images/industries/meat2.jpeg";
import milk from "../../assets/images/industries/milk.jfif";
import { CustomHeading } from "../common/CustomHeading";

const categoryContent = {
  // Food Industry
  "Fruit & Vegitables": {
    title: "Fruit & Vegetables Solutions",
    description:
      "A fruits and vegetable modular conveyor belt is a type of conveyor system that is designed specifically for handling fruits and vegetables in a production or processing facility. This type of conveyor system is typically made up of modular plastic belts that are designed to be easily replaced, cleaned, and sanitized to meet the strict hygiene standards required in the food industry. The design of a fruits and vegetable modular conveyor belt is optimized for the handling of delicate produce, such as fruits and vegetables, without causing damage to the product. The conveyor system is typically equipped with features such as adjustable speed controls and gentle transfer mechanisms to ensure that the produce is transported smoothly and safely through the production or processing line. In addition to being designed for the handling of delicate produce, a fruits and vegetable modular conveyor belt is also typically designed to be easily disassembled and cleaned to meet strict food safety requirements. This is important because any contaminants or bacteria that may be present on the conveyor belt can easily transfer to the produce, which can have serious health implications for consumers. Overall, a fruits and vegetable modular conveyor belt is an important component of a modern food production or processing facility, and can help ensure that fruits and vegetables are handled safely and efficiently throughout the production process.",
    images: [food1, food2],
  },

  Water: {
    title: "Water Bottling Solutions",
    description:
      "SS chain (stainless steel chain), plastic chain, modular belts, and components are commonly used in water bottling lines for various purposes. These materials and components play important roles in conveying, transferring, and processing bottles throughout the bottling process.",
    images: [water1, water2],
  },

  Juice: {
    title: "Juice Production Lines",
    description:
      "In a juice production line, you can utilize conveyors made of stainless steel (SS), plastic chain, and modular belt, along with various components tailored to the specific needs of the process. Modular belt, SS chains, Plastic and flex chains are commonly use in In-feed Conveyors, Fruit Washing Conveyors, Sorting Conveyors, Juice Extraction Conveyors, Bottle or Container Conveyors, Packaging Conveyors, Inspection Conveyors, Transfer Conveyors. Stainless steel conveyors are commonly used for conveying fruits through washing and sorting stages. They are resistant to moisture, chemicals, and are easy to clean, making them suitable for maintaining hygiene during the washing process. Plastic chain conveyors can also be employed, providing gentle and efficient transportation of delicate fruits.For the bottling and packaging of juice, conveyors with modular belts or plastic chains are commonly used. These conveyors transport empty bottles or containers through filling, capping, labeling, and packaging stations. Modular belts provide a stable surface for smooth and efficient movement, while plastic chain conveyors offer flexibility and ease of cleaning. Conveyors with modular belts or plastic chains are used for visual inspection and quality control of filled and packaged juice products. These conveyors facilitate the movement of bottles or containers, allowing inspectors to examine them for any defects or inconsistencies.",
    images: [juice1, juice2],
  },

  "Tetra Pack": {
    title: "Tetra Pack Handling",
    description:
      "Tetra Pack production typically involves the use of finger chains, slat chains, and various conveyor components to transport the cartons throughout the production line.Finger chains are commonly used in the Tetra Pack production process to transport the cartons from one stage to another. They are designed to securely hold the cartons in place and prevent them from falling or tilting during the conveying process.Modular belts are a versatile option for conveying cartons in the Tetra Pack production process. They can be easily customized to fit different conveyor configurations and offer low maintenance and easy cleaning, making them ideal for use in food and beverage applications. Other conveyor components commonly used in the Tetra Pack production process include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
    images: [tetra1, tetra2],
  },

  "Beer Line": {
    title: "Brewery Conveying Systems",
    description:
      "Beer manufacturing processes often utilize conveyors for various stages of production, including bottling, canning, labeling, packaging, and transportation. Both stainless steel (SS) conveyors and conveyors with plastic chains or modular belts are commonly employed in the beer industry. Stainless steel is a popular choice for conveying systems in the beer manufacturing industry due to its durability, corrosion resistance, and ease of cleaning. Plastic chain conveyors are another type of conveyor system widely used in the beer industry. These conveyors consist of interlocking plastic chains that move products along the production line. Plastic chains offer advantages such as being lightweight, flexible, and easy to clean. Both plastic chain conveyors and modular belt conveyors are well-suited for beer manufacturing processes as they are resistant to moisture, corrosion, and chemical exposure. The choice between the two will depend on factors such as the specific application, the type of product being transported, and the desired level of hygiene and product protection. It's worth noting that conveyor systems in the beer industry often require additional features and components to ensure product integrity and maintain hygiene standards. These may include side guides, drip pans, sanitary design principles, and proper cleaning procedures to prevent contamination and maintain the quality of the beer throughout the production process.",
    images: [beer1, beer2],
  },

  "Carbonated Soft Drinks": {
    title: "Carbonated Beverage Lines",
    description:
      "The manufacturing process of carbonated soft drinks often involves the use of SS (stainless steel) slat chains, plastic chains, and various conveyor parts to transport the bottles or cans throughout the production line.Other conveyor parts commonly used in the manufacturing process of carbonated soft drinks include bearings, sprockets, wear strips, and guides, all of which play a crucial role in ensuring the efficient and effective operation of the conveyor system.",
    images: [softdrink1, softdrink2],
  },

  // Meat & Seafood Industry
  Seafood: {
    title: "Seafood Handling Solutions",
    description:
      "Efficient and hygienic conveyor systems for seafood processing and packaging.",
    images: [seafood1, seafood2],
  },

  Meat: {
    title: "Meat Processing Solutions",
    description:
      "Safe and sanitary conveyor systems for meat processing facilities.",
    images: [meat1, meat2],
  },

  Poultry: {
    title: "Poultry Handling Solutions",
    description:
      "Specialized conveyors for handling poultry products with hygiene compliance.",
    images: [poultry1],
  },

  // Dairy Industry
  Chocolate: {
    title: "Chocolate Production Solutions",
    description: "Conveyors for chocolate processing ensuring product quality.",
    images: [
      "https://images.unsplash.com/photo-1580927752450-b5f0a35b0a2d?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Milk & Milk Products": {
    title: "Milk Processing Solutions",
    description:
      "Modular belts and plastic chains are commonly used in the food and beverage industry, including milk and milk product filling, labeling, and packaging applications. Modular belts are made up of interlocking plastic modules that can be easily replaced if damaged, allowing for quick maintenance and reducing downtime. They are often used in conveyor systems for transporting milk and other liquid products, as they are easy to clean and can withstand exposure to moisture. Plastic chains, on the other hand, are composed of interlocking plastic links and are ideal for applications that require high-strength and durability. They are often used in packaging and labeling machines to transport and position containers of milk and milk products during the filling and packaging process. Both modular belts and plastic chains are popular choices for the food and beverage industry because they are made from food-grade materials that are safe for contact with consumable products. They are also resistant to corrosion and are easy to clean, making them an ideal choice for environments where hygiene is critical.",
    images: [milk],
  },

  Yogurt: {
    title: "Yogurt Production Lines",
    description: "Sanitary conveyor solutions for yogurt production.",
    images: [
      "https://images.unsplash.com/photo-1587398290463-90b95b56e1b1?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  Cheese: {
    title: "Cheese Handling Systems",
    description: "Specialized conveyors for cheese processing and packaging.",
    images: [
      "https://images.unsplash.com/photo-1596614770116-0ff91d8e234d?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Shrink Wrapping": {
    title: "Shrink Wrapping Solutions",
    description:
      "Conveyors for automated shrink wrapping in logistics and packaging.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Material Handling": {
    title: "Material Handling Solutions",
    description:
      "Efficient conveyors for moving materials across production lines.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Packaging Belting Solution": {
    title: "Packaging Belting Solutions",
    description:
      "Conveyor belts optimized for packaging applications and labeling.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "E-commerce": {
    title: "E-commerce Logistics Solutions",
    description: "Conveyors for efficient handling of e-commerce products.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  Distribution: {
    title: "Distribution Solutions",
    description: "Conveyors for product distribution and warehouse automation.",
    images: [
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  // Cosmetic & Pharmaceutical
  "No Category": {
    title: "Cosmetic & Pharmaceutical Conveyors",
    description:
      "Conveyors for cosmetic and pharmaceutical industries ensuring sterile handling.",
    images: [
      "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg",
    ],
  },

  // Automobile
  Assembly: {
    title: "Assembly Line Conveyors",
    description: "Conveyors for automobile assembly lines.",
    images: [
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Parts Manufacturing": {
    title: "Parts Manufacturing Conveyors",
    description: "Conveyors for efficient parts manufacturing.",
    images: [
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  Painting: {
    title: "Painting Line Conveyors",
    description: "Specialized conveyors for painting operations.",
    images: [
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Quality Control": {
    title: "Quality Control Conveyors",
    description: "Conveyors for QC processes in automobile production.",
    images: [
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  // Healthcare
  "Medical Supplies": {
    title: "Medical Supplies Conveyors",
    description: "Conveyors for safe transport of medical supplies.",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  Equipment: {
    title: "Medical Equipment Conveyors",
    description: "Conveyors for moving medical equipment safely.",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Specimen Transport": {
    title: "Specimen Transport Solutions",
    description: "Conveyors for safe and hygienic transport of specimens.",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    ],
  },

  "Sterile Products": {
    title: "Sterile Product Handling",
    description: "Conveyors for sterile product transport in healthcare.",
    images: [
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    ],
  },
};

const industries = [
  {
    id: 1,
    title: "Food Industry",
    description:
      "A food industry modular conveyor belt is a type of conveyor system that is commonly used in the food processing and manufacturing industry. It consists of individual interlocking plastic modules that.",
    image: food1,
    icon: <FaIndustry size={26} />,
    color: "#2E437C",
    targetRotation: 0,
    mobileTargetRotation: -120,
    categories: ["Fruit & Vegitables"],
  },
  {
    id: 2,
    title: "Beverage Industry",
    description:
      "Beverage conveyors are designed to handle bottles, cans, and other containers with precision and care, ensuring efficient production lines.",
    image:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&w=1200&q=80",
    icon: <FaWineBottle size={26} />,
    color: "#E74623",
    targetRotation: -45,
    mobileTargetRotation: -165,
    categories: [
      "Water",
      "Juice",
      "Tetra Pack",
      "Beer Line",
      "Carbonated Soft Drinks",
    ],
  },
  {
    id: 3,
    title: "Meat & Seafood Industry",
    description:
      "Specialized conveyors for meat and seafood processing ensure hygiene standards while handling raw and processed products.",
    image:
      "https://images.unsplash.com/photo-1581338834647-b0fb40704e21?auto=format&fit=crop&w=1200&q=80",
    icon: <FaFish size={26} />,
    color: "#F39314",
    targetRotation: -90,
    mobileTargetRotation: -210,
    categories: ["Seafood", "Meat", "Poultry"],
  },
  {
    id: 4,
    title: "Dairy Industry",
    description:
      "Dairy conveyors are designed to handle milk products with strict hygiene standards and temperature controls.",
    image:
      "https://images.unsplash.com/photo-1566772940193-9c3ae2938d78?auto=format&fit=crop&w=1200&q=80",
    icon: <FaIceCream size={26} />,
    color: "#F5DC00",
    targetRotation: -135,
    mobileTargetRotation: -255,
    categories: ["Chocolate", "Milk & Milk Products", "Yogurt", "Cheese"],
  },
  {
    id: 5,
    title: "Packaging & Logistics",
    description:
      "Packaging and logistics conveyors automate the movement of products through filling, sealing, labeling, and distribution processes.",
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?auto=format&fit=crop&w=1200&q=80",
    icon: <FaShippingFast size={26} />,
    color: "#2E437C",
    targetRotation: -180,
    mobileTargetRotation: -300,
    categories: [
      "Shrink Wrapping",
      "Material Handling",
      "Packaging Belting Solution",
      "E-commerce",
      "Distribution",
    ],
  },
  {
    id: 6,
    title: "Cosmetic and Pharmaceutical",
    description:
      "Conveyors for cosmetic and pharmaceutical industries ensure sterile handling of products with compliance to health standards.",
    image:
      "https://png.pngtree.com/png-vector/20221125/ourmid/pngtree-no-image-available-icon-flatvector-illustration-picture-coming-creative-vector-png-image_40968940.jpg",
    icon: <FaSprayCan size={26} />,
    color: "#E74623",
    targetRotation: -225,
    mobileTargetRotation: -345,
    categories: ["No Category"],
  },
  {
    id: 7,
    title: "Automobile",
    description:
      "Conveyors in automobile industry are used for assembly lines, efficient movement of parts, and automation of processes.",
    image:
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    icon: <FaCar size={26} />,
    color: "#F39314",
    targetRotation: -270,
    mobileTargetRotation: -35,
    categories: [
      "Assembly",
      "Parts Manufacturing",
      "Painting",
      "Quality Control",
    ],
  },
  {
    id: 8,
    title: "Healthcare",
    description:
      "Healthcare conveyors safely transport medical supplies, equipment, and specimens throughout medical facilities.",
    image:
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1200&q=80",
    icon: <FaHospital size={26} />,
    color: "#F5DC00",
    targetRotation: -315,
    mobileTargetRotation: -80,
    categories: [
      "Medical Supplies",
      "Equipment",
      "Specimen Transport",
      "Sterile Products",
    ],
  },
];

export default function IndustryCom() {
  const [activeIndustry, setActiveIndustry] = useState(industries[0]);
  const [activeCategory, setActiveCategory] = useState(
    industries[0].categories?.[0] || null
  );
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const [rotation, setRotation] = useState(-20);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);

      if (mobile) {
        setRotation(-170);
      } else {
        setRotation(0);
      }
    };

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const handleButtonClick = (industry) => {
    setActiveIndustry(industry);
    setActiveCategory(industry.categories?.[0] || null);

    const currentRotation = rotation % 360;
    let targetRotation = industry.targetRotation;

    if (isMobile) {
      targetRotation = industry.mobileTargetRotation;
    }

    const normalizedCurrent = ((currentRotation % 360) + 360) % 360;
    const normalizedTarget = ((targetRotation % 360) + 360) % 360;

    let diff = normalizedTarget - normalizedCurrent;

    if (diff > 180) {
      diff -= 360;
    } else if (diff < -180) {
      diff += 360;
    }

    setRotation(rotation + diff);
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
  };

  const toggleReadMore = (industryId, category) => {
    const key = category ? `${industryId}-${category}` : industryId;
    setExpandedDescriptions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getConicGradient = () => {
    const segmentAngle = 360 / industries.length;
    const gapAngle = 5;

    let gradientString = "";

    industries.forEach((industry, index) => {
      const startAngle = index * segmentAngle;
      const endAngle = (index + 1) * segmentAngle - gapAngle;

      gradientString += `${industry.color} ${startAngle}deg ${endAngle}deg, `;
      gradientString += `transparent ${endAngle}deg ${
        endAngle + gapAngle
      }deg, `;
    });

    return gradientString.slice(0, -2);
  };

  const getCategoryContent = () => {
    return (
      categoryContent[activeCategory] || {
        title: `${activeIndustry.title} - ${activeCategory}`,
        description: activeIndustry.description,
        image: activeIndustry.image,
      }
    );
  };

  const categoryData = getCategoryContent();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.02,
        delayChildren: 0.1,
        duration: 0.4,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.3,
      },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));

  return (
    <section className="container mx-auto w-full  px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 lg:pr-16 lg:pl-0 xl:pr-20 xl:pl-0  sm:py-20">
      {/* Heading */}
      <motion.h1
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="text-[44px] md:text-[112px] font-[500] md:font-[400] text-[#BABEC8] mb-10 text-center md:text-left "
      >
         <CustomHeading title="Industries we serve" className="" />
        
      </motion.h1>

      <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
        {/* Chart Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-1 relative flex justify-center lg:justify-start items-center overflow-hidden order-2 lg:order-1">
          <motion.div
            initial={{
              opacity: 0,
              x: -50,
              rotate: isMobile ? -170 : -20,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
              rotate: isMobile ? -170 : -20,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{
              width: isMobile ? "320px" : "600px",
              height: isMobile ? "320px" : "600px",
              marginLeft: isMobile ? "0px" : "-250px",
              marginTop: isMobile ? "-180px" : "0",
            }}
          >
            <motion.div
              initial={{ rotate: isMobile ? -170 : -20 }}
              animate={{ rotate: rotation }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="absolute w-full h-full rounded-full"
            >
              <div
                className="absolute inset-0 rounded-full cursor-pointer"
                style={{
                  background: `conic-gradient(${getConicGradient()})`,
                }}
              ></div>

              <div
                className="absolute bg-white rounded-full z-10 flex items-center justify-center"
                style={{
                  inset: isMobile ? "80px" : "150px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              ></div>

              {industries.map((industry, index) => {
                const segmentAngle = 360 / industries.length;
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const midAngle = startAngle + segmentAngle / 2;
                const radian = (midAngle * Math.PI) / 180;
                const radius = isMobile ? 120 : 220;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);

                const isActive = industry.id === activeIndustry.id;
                const centerPoint = isMobile ? 200 : 300;
                const pathRadius = isMobile ? 200 : 300;

                return (
                  <div key={industry.id}>
                    <div
                      onClick={() => handleButtonClick(industry)}
                      className="absolute inset-0 rounded-full cursor-pointer"
                      style={{
                        clipPath: `path('M${centerPoint},${centerPoint} L${
                          centerPoint +
                          pathRadius * Math.cos((startAngle * Math.PI) / 180)
                        },${
                          centerPoint +
                          pathRadius * Math.sin((startAngle * Math.PI) / 180)
                        } A${pathRadius},${pathRadius} 0 0,1 ${
                          centerPoint +
                          pathRadius * Math.cos((endAngle * Math.PI) / 180)
                        },${
                          centerPoint +
                          pathRadius * Math.sin((endAngle * Math.PI) / 180)
                        } Z')`,
                        zIndex: 15,
                        border: isActive
                          ? "2px solid #fff"
                          : "2px solid transparent",
                        filter: isActive
                          ? "drop-shadow(0 0 15px rgba(255,255,255,0.6))"
                          : "none",
                        transition: "all 0.3s ease",
                      }}
                    ></div>

                    <motion.div
                      initial={{ rotate: isMobile ? 170 : 20 }}
                      animate={{ rotate: -rotation + (isMobile ? 170 : 20) }} // Fixed counter-rotation
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className={`absolute z-20 flex flex-col items-center justify-center ${
                        isMobile ? "w-12 h-12" : "w-16 h-16"
                      }`}
                      style={{
                        left: `calc(50% + ${x}px - ${
                          isMobile ? "1.5rem" : "2rem"
                        })`,
                        top: `calc(50% + ${y}px - ${
                          isMobile ? "1.5rem" : "2rem"
                        })`,
                        color: "white",
                        borderColor: "white",
                        pointerEvents: "none",
                      }}
                    >
                      <span className={isMobile ? "text-lg" : "text-xl"}>
                        {React.cloneElement(industry.icon, {
                          size: isMobile ? 23 : 26,
                        })}
                      </span>
                      <span
                        className={`${
                          isMobile ? "text-[8px]" : "text-xs"
                        } mt-1 font-medium text-center leading-tight`}
                      >
                        {industry.title.split(" ")[0]}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        {/* Content Section */}
        <div className="col-span-1 md:col-span-1 lg:col-span-2 order-1 lg:order-2">
          <motion.div
            key={activeIndustry.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col w-full px-4 sm:px-6 lg:px-0 order-1 lg:order-2"
          >
            {/* Category Buttons */}
            <div className="flex flex-wrap gap-2 mb-4">
              {activeIndustry.categories?.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {activeIndustry.categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? "text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                      style={{
                        backgroundColor:
                          activeCategory === category ? "#2E437C" : "",
                      }}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Image Slider */}
            <div className="relative overflow-hidden">
              {categoryData?.images?.length > 0 ? (
                <Swiper
                  modules={[Pagination, Autoplay]}
                  navigation
                  pagination={{ clickable: true }}
                  spaceBetween={10}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={true}
                  slidesPerView={1}
                  className=""
                >
                  {categoryData.images.map((img, idx) => (
                    <SwiperSlide key={idx}>
                      <img
                        src={img}
                        alt={`${categoryData.title} ${idx + 1}`}
                        className="w-full h-60 sm:h-80 lg:h-110 object-cover transition-transform duration-500 hover:scale-105 "
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              ) : (
                <img
                  src={activeIndustry.image}
                  alt={activeIndustry.title}
                  className="w-full h-60 sm:h-80 lg:h-110 object-cover transition-transform duration-500 hover:scale-105"
                />
              )}

              <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/70 to-transparent">
                <h3 className="text-lg lg:text-xl font-semibold text-white">
                  {categoryData.title}
                </h3>
              </div>
              <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>

            {/* Title and Description */}
            <h3 className="mt-4 text-2xl lg:text-3xl font-semibold text-gray-800">
              Solutions for{" "}
              <span style={{ color: "#2E437C" }}>{activeIndustry.title}</span>
            </h3>
            <div className="mt-2 text-gray-600">
              <p
                className={`text-sm lg:text-base leading-relaxed ${
                  !expandedDescriptions[
                    activeCategory
                      ? `${activeIndustry.id}-${activeCategory}`
                      : activeIndustry.id
                  ]
                    ? "line-clamp-3"
                    : ""
                }`}
              >
                {categoryData.description}
              </p>

              {/* Read More/Less Button */}
              {categoryData.description.length > 150 && (
                <button
                  onClick={() =>
                    toggleReadMore(activeIndustry.id, activeCategory)
                  }
                  className="mt-2 text-[#2E437C] font-medium hover:text-[#1E2F5C] transition-colors flex items-center"
                >
                  {expandedDescriptions[
                    activeCategory
                      ? `${activeIndustry.id}-${activeCategory}`
                      : activeIndustry.id
                  ] ? (
                    <>
                      Read Less
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 15l7-7 7 7"
                        />
                      </svg>
                    </>
                  ) : (
                    <>
                      Read More
                      <svg
                        className="w-4 h-4 ml-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}



// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import {
//   FaIndustry,
//   FaWineBottle,
//   FaFish,
//   FaIceCream,
//   FaShippingFast,
//   FaSprayCan,
//   FaCar,
//   FaHospital,
// } from "react-icons/fa";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { Pagination, Autoplay } from "swiper/modules";
// import food1 from "../../assets/images/industries/food1.jpg";
// import food2 from "../../assets/images/industries/food2.jpeg";
// import water1 from "../../assets/images/industries/water1.jpeg";
// import water2 from "../../assets/images/industries/water2.jpeg";
// import juice1 from "../../assets/images/industries/juice1.jpeg";
// import juice2 from "../../assets/images/industries/juice2.jpeg";
// import tetra1 from "../../assets/images/industries/tetra1.jpeg";
// import tetra2 from "../../assets/images/industries/tetra2.jpeg";
// import beer1 from "../../assets/images/industries/beer1.jpeg";
// import beer2 from "../../assets/images/industries/beer2.jpeg";
// import softdrink1 from "../../assets/images/industries/softdrink1.jpeg";
// import softdrink2 from "../../assets/images/industries/softdrink2.jpeg";
// import seafood1 from "../../assets/images/industries/seafood1.jpeg";
// import seafood2 from "../../assets/images/industries/seafood2.jpeg";
// import meat1 from "../../assets/images/industries/meat1.jpeg";
// import meat2 from "../../assets/images/industries/meat2.jpeg";
// import poultry1 from "../../assets/images/industries/meat2.jpeg";
// import milk from "../../assets/images/industries/milk.jfif";
// import { CustomHeading } from "../common/CustomHeading";

// const categoryContent = {
//   // ... (keep all your existing categoryContent as is)
// };

// const industries = [
//   // ... (keep all your existing industries array as is)
// ];

// export default function IndustryCom() {
//   const [activeIndustry, setActiveIndustry] = useState(industries[0]);
//   const [activeCategory, setActiveCategory] = useState(
//     industries[0].categories?.[0] || null
//   );
//   const [expandedDescriptions, setExpandedDescriptions] = useState({});

//   const [rotation, setRotation] = useState(-20);
//   const [isMobile, setIsMobile] = useState(false);

//   // Dynamic angle calculation
//   const getSegmentAngles = () => {
//     const activeSliceAngle = 65; // Active slice angle
//     const remainingAngle = 360 - activeSliceAngle; // Remaining angle for other slices
//     const inactiveSliceAngle = remainingAngle / (industries.length - 1); // Angle for each inactive slice
    
//     let currentAngle = 0;
//     const angles = industries.map((industry, index) => {
//       const isActive = industry.id === activeIndustry.id;
//       const segmentAngle = isActive ? activeSliceAngle : inactiveSliceAngle;
      
//       const result = {
//         startAngle: currentAngle,
//         endAngle: currentAngle + segmentAngle,
//         segmentAngle: segmentAngle,
//         midAngle: currentAngle + segmentAngle / 2,
//       };
      
//       currentAngle += segmentAngle;
//       return result;
//     });
    
//     return angles;
//   };

//   useEffect(() => {
//     const checkScreenSize = () => {
//       const mobile = window.innerWidth < 1024;
//       setIsMobile(mobile);

//       if (mobile) {
//         setRotation(-170);
//       } else {
//         setRotation(0);
//       }
//     };

//     checkScreenSize();

//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   const handleButtonClick = (industry) => {
//     setActiveIndustry(industry);
//     setActiveCategory(industry.categories?.[0] || null);

//     const currentRotation = rotation % 360;
//     let targetRotation = industry.targetRotation;

//     if (isMobile) {
//       targetRotation = industry.mobileTargetRotation;
//     }

//     const normalizedCurrent = ((currentRotation % 360) + 360) % 360;
//     const normalizedTarget = ((targetRotation % 360) + 360) % 360;

//     let diff = normalizedTarget - normalizedCurrent;

//     if (diff > 180) {
//       diff -= 360;
//     } else if (diff < -180) {
//       diff += 360;
//     }

//     setRotation(rotation + diff);
//   };

//   const handleCategoryClick = (category) => {
//     setActiveCategory(category);
//   };

//   const toggleReadMore = (industryId, category) => {
//     const key = category ? `${industryId}-${category}` : industryId;
//     setExpandedDescriptions((prev) => ({
//       ...prev,
//       [key]: !prev[key],
//     }));
//   };

//   const getConicGradient = () => {
//     const segmentAngles = getSegmentAngles();
//     const gapAngle = isMobile ? 2 : 3; // Smaller gaps for better visual

//     let gradientString = "";

//     segmentAngles.forEach((angleData, index) => {
//       const industry = industries[index];
//       const startAngle = angleData.startAngle;
//       const endAngle = angleData.endAngle - gapAngle;

//       gradientString += `${industry.color} ${startAngle}deg ${endAngle}deg, `;
//       gradientString += `transparent ${endAngle}deg ${
//         endAngle + gapAngle
//       }deg, `;
//     });

//     return gradientString.slice(0, -2);
//   };

//   const getCategoryContent = () => {
//     return (
//       categoryContent[activeCategory] || {
//         title: `${activeIndustry.title} - ${activeCategory}`,
//         description: activeIndustry.description,
//         image: activeIndustry.image,
//       }
//     );
//   };

//   const categoryData = getCategoryContent();
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.02,
//         delayChildren: 0.1,
//         duration: 0.4,
//       },
//     },
//   };

//   const letterVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: "spring",
//         stiffness: 300,
//         damping: 25,
//         duration: 0.3,
//       },
//     },
//   };

//   const splitText = (text) =>
//     text.split("").map((char, i) => (
//       <motion.span key={i} variants={letterVariants} className="inline-block">
//         {char === " " ? "\u00A0" : char}
//       </motion.span>
//     ));

//   return (
//     <section className="container mx-auto w-full  px-4 md:px-10 lg:px-5 xl:px-15 2xl:px-25 py-10 lg:pr-16 lg:pl-0 xl:pr-20 xl:pl-0  sm:py-20">
//       {/* Heading */}
//       <motion.h1
//         variants={containerVariants}
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true, margin: "-80px" }}
//         className="text-[44px] md:text-[112px] font-[500] md:font-[400] text-[#BABEC8] mb-10 text-center md:text-left "
//       >
//          <CustomHeading title="Industries we serve" className="" />
//       </motion.h1>

//       <div className=" grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-10 items-center">
//         {/* Chart Section */}
//         <div className="col-span-1 md:col-span-1 lg:col-span-1 relative flex justify-center lg:justify-start items-center overflow-hidden order-2 lg:order-1">
//           <motion.div
//             initial={{
//               opacity: 0,
//               x: -50,
//               rotate: isMobile ? -170 : -20,
//             }}
//             whileInView={{
//               opacity: 1,
//               x: 0,
//               rotate: isMobile ? -170 : -20,
//             }}
//             viewport={{ once: true }}
//             transition={{ duration: 0.6 }}
//             className="relative"
//             style={{
//               width: isMobile ? "320px" : "600px",
//               height: isMobile ? "320px" : "600px",
//               marginLeft: isMobile ? "0px" : "-250px",
//               marginTop: isMobile ? "-180px" : "0",
//             }}
//           >
//             <motion.div
//               initial={{ rotate: isMobile ? -170 : -20 }}
//               animate={{ rotate: rotation }}
//               transition={{
//                 duration: 0.7,
//                 ease: "easeInOut",
//               }}
//               className="absolute w-full h-full rounded-full"
//             >
//               <div
//                 className="absolute inset-0 rounded-full cursor-pointer"
//                 style={{
//                   background: `conic-gradient(${getConicGradient()})`,
//                 }}
//               ></div>

//               <div
//                 className="absolute bg-white rounded-full z-10 flex items-center justify-center"
//                 style={{
//                   inset: isMobile ? "80px" : "150px",
//                   boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
//                 }}
//               ></div>

//               {industries.map((industry, index) => {
//                 const segmentAngles = getSegmentAngles();
//                 const angleData = segmentAngles[index];
//                 const midAngle = angleData.midAngle;
//                 const radian = (midAngle * Math.PI) / 180;
//                 const radius = isMobile ? 120 : 220;
//                 const x = radius * Math.cos(radian);
//                 const y = radius * Math.sin(radian);

//                 const isActive = industry.id === activeIndustry.id;
//                 const centerPoint = isMobile ? 200 : 300;
//                 const pathRadius = isMobile ? 200 : 300;

//                 return (
//                   <div key={industry.id}>
//                     <div
//                       onClick={() => handleButtonClick(industry)}
//                       className="absolute inset-0 rounded-full cursor-pointer"
//                       style={{
//                         clipPath: `path('M${centerPoint},${centerPoint} L${
//                           centerPoint +
//                           pathRadius * Math.cos((angleData.startAngle * Math.PI) / 180)
//                         },${
//                           centerPoint +
//                           pathRadius * Math.sin((angleData.startAngle * Math.PI) / 180)
//                         } A${pathRadius},${pathRadius} 0 0,1 ${
//                           centerPoint +
//                           pathRadius * Math.cos((angleData.endAngle * Math.PI) / 180)
//                         },${
//                           centerPoint +
//                           pathRadius * Math.sin((angleData.endAngle * Math.PI) / 180)
//                         } Z')`,
//                         zIndex: 15,
//                         border: isActive
//                           ? "3px solid #fff"
//                           : "2px solid transparent",
//                         filter: isActive
//                           ? "drop-shadow(0 0 20px rgba(255,255,255,0.8))"
//                           : "none",
//                         transition: "all 0.4s ease",
//                         transform: isActive ? "scale(1.02)" : "scale(1)",
//                       }}
//                     ></div>

//                     <motion.div
//                       initial={{ rotate: isMobile ? 170 : 20 }}
//                       animate={{ rotate: -rotation + (isMobile ? 170 : 20) }}
//                       transition={{ duration: 0.7, ease: "easeInOut" }}
//                       className={`absolute z-20 flex flex-col items-center justify-center ${
//                         isMobile ? "w-12 h-12" : "w-16 h-16"
//                       } ${isActive ? "transform scale-110" : ""}`}
//                       style={{
//                         left: `calc(50% + ${x}px - ${
//                           isMobile ? "1.5rem" : "2rem"
//                         })`,
//                         top: `calc(50% + ${y}px - ${
//                           isMobile ? "1.5rem" : "2rem"
//                         })`,
//                         color: isActive ? "#fff" : "rgba(255,255,255,0.9)",
//                         borderColor: "white",
//                         pointerEvents: "none",
//                         textShadow: isActive ? "0 0 10px rgba(0,0,0,0.3)" : "none",
//                         transition: "all 0.3s ease",
//                       }}
//                     >
//                       <span className={isMobile ? "text-lg" : "text-xl"}>
//                         {React.cloneElement(industry.icon, {
//                           size: isMobile ? 23 : isActive ? 30 : 26,
//                         })}
//                       </span>
//                       <span
//                         className={`${
//                           isMobile ? "text-[8px]" : isActive ? "text-sm font-semibold" : "text-xs"
//                         } mt-1 font-medium text-center leading-tight`}
//                       >
//                         {industry.title.split(" ")[0]}
//                       </span>
//                     </motion.div>
//                   </div>
//                 );
//               })}
//             </motion.div>
//           </motion.div>
//         </div>

//         {/* Content Section - Keep all your existing content section code as is */}
//         <div className="col-span-1 md:col-span-1 lg:col-span-2 order-1 lg:order-2">
//           <motion.div
//             key={activeIndustry.id}
//             initial={{ opacity: 0, x: 50 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.6 }}
//             className="flex flex-col w-full px-4 sm:px-6 lg:px-0 order-1 lg:order-2"
//           >
//             {/* Category Buttons */}
//             <div className="flex flex-wrap gap-2 mb-4">
//               {activeIndustry.categories?.length > 0 && (
//                 <div className="flex flex-wrap gap-2 mb-4">
//                   {activeIndustry.categories.map((category, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleCategoryClick(category)}
//                       className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
//                         activeCategory === category
//                           ? "text-white"
//                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
//                       }`}
//                       style={{
//                         backgroundColor:
//                           activeCategory === category ? "#2E437C" : "",
//                       }}
//                     >
//                       {category}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* Image Slider */}
//             <div className="relative overflow-hidden">
//               {categoryData?.images?.length > 0 ? (
//                 <Swiper
//                   modules={[Pagination, Autoplay]}
//                   navigation
//                   pagination={{ clickable: true }}
//                   spaceBetween={10}
//                   autoplay={{
//                     delay: 3000,
//                     disableOnInteraction: false,
//                   }}
//                   loop={true}
//                   slidesPerView={1}
//                   className=""
//                 >
//                   {categoryData.images.map((img, idx) => (
//                     <SwiperSlide key={idx}>
//                       <img
//                         src={img}
//                         alt={`${categoryData.title} ${idx + 1}`}
//                         className="w-full h-60 sm:h-80 lg:h-110 object-cover transition-transform duration-500 hover:scale-105 "
//                       />
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>
//               ) : (
//                 <img
//                   src={activeIndustry.image}
//                   alt={activeIndustry.title}
//                   className="w-full h-60 sm:h-80 lg:h-110 object-cover transition-transform duration-500 hover:scale-105"
//                 />
//               )}

//               <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/70 to-transparent">
//                 <h3 className="text-lg lg:text-xl font-semibold text-white">
//                   {categoryData.title}
//                 </h3>
//               </div>
//               <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
//             </div>

//             {/* Title and Description */}
//             <h3 className="mt-4 text-2xl lg:text-3xl font-semibold text-gray-800">
//               Solutions for{" "}
//               <span style={{ color: "#2E437C" }}>{activeIndustry.title}</span>
//             </h3>
//             <div className="mt-2 text-gray-600">
//               <p
//                 className={`text-sm lg:text-base leading-relaxed ${
//                   !expandedDescriptions[
//                     activeCategory
//                       ? `${activeIndustry.id}-${activeCategory}`
//                       : activeIndustry.id
//                   ]
//                     ? "line-clamp-3"
//                     : ""
//                 }`}
//               >
//                 {categoryData.description}
//               </p>

//               {/* Read More/Less Button */}
//               {categoryData.description.length > 150 && (
//                 <button
//                   onClick={() =>
//                     toggleReadMore(activeIndustry.id, activeCategory)
//                   }
//                   className="mt-2 text-[#2E437C] font-medium hover:text-[#1E2F5C] transition-colors flex items-center"
//                 >
//                   {expandedDescriptions[
//                     activeCategory
//                       ? `${activeIndustry.id}-${activeCategory}`
//                       : activeIndustry.id
//                   ] ? (
//                     <>
//                       Read Less
//                       <svg
//                         className="w-4 h-4 ml-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M5 15l7-7 7 7"
//                         />
//                       </svg>
//                     </>
//                   ) : (
//                     <>
//                       Read More
//                       <svg
//                         className="w-4 h-4 ml-1"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M19 9l-7 7-7-7"
//                         />
//                       </svg>
//                     </>
//                   )}
//                 </button>
//               )}
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }
