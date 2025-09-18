import React, { useState } from "react";
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


const categoryContent = {
  Bakery: {
    title: "Bakery Solutions",
    description:
      "Specialized conveyor systems for bakery products that ensure gentle handling and maintain product integrity throughout the production process.",
    image:
      "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=80",
  },

 
  Water: {
    title: "Water Bottling Solutions",
    description:
      "High-speed conveying systems for water bottling plants with precision handling and labeling capabilities.",
    image:
      "https://images.unsplash.com/photo-1600672025550-802dcd5c78a1?auto=format&fit=crop&w=1200&q=80",
  },
  Juice: {
    title: "Juice Production Lines",
    description:
      "Sanitary conveyor systems for juice processing that resist corrosion and enable easy cleaning.",
    image:
      "https://images.unsplash.com/photo-1615482266735-80c216cec44d?auto=format&fit=crop&w=1200&q=80",
  },
  "Tetra Pack": {
    title: "Tetra Pack Handling",
    description:
      "Specialized conveyors for tetra pack packaging with precise alignment and sealing capabilities.",
    image:
      "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=1200&q=80",
  },
  "Beer Line": {
    title: "Brewery Conveying Systems",
    description:
      "Durable conveyors for brewery operations that can handle glass bottles, cans, and kegs with care.",
    image:
      "https://images.unsplash.com/photo-1504502350688-00f5d9bb610f?auto=format&fit=crop&w=1200&q=80",
  },
  "Carbonated Soft Drinks": {
    title: "Carbonated Beverage Lines",
    description:
      "High-speed conveying solutions for carbonated drink production with precision filling and capping.",
    image:
      "https://images.unsplash.com/photo-1592892111427-53c6ec5c9a5a?auto=format&fit=crop&w=1200&q=80",
  },

};

const industries = [
  {
    id: 1,
    title: "Food Industry",
    description:
      "A food industry modular conveyor belt is a type of conveyor system that is commonly used in the food processing and manufacturing industry. It consists of individual interlocking plastic modules that.",
    image:
      "https://images.unsplash.com/photo-1606851093957-481bf8e7c7f0?auto=format&fit=crop&w=1200&q=80",
    icon: <FaIndustry size={26} />,
    color: "#2E437C",
    targetRotation: 0,
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
    color: "#1d4ed8",
    targetRotation: -45,
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
    color: "#E74623",
    targetRotation: -90,
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
    color: "#f97316",
    targetRotation: -135,
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
    color: "#10b981",
    targetRotation: -180,
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
    color: "#8b5cf6",
    targetRotation: -225,
    categories: [],
  },
  {
    id: 7,
    title: "Automobile",
    description:
      "Conveyors in automobile industry are used for assembly lines, efficient movement of parts, and automation of processes.",
    image:
      "https://images.unsplash.com/photo-1581092336013-7c52eec64b28?auto=format&fit=crop&w=1200&q=80",
    icon: <FaCar size={26} />,
    color: "#06b6d4",
    targetRotation: -270,
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
    color: "#ec4899",
    targetRotation: -315,
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
    industries[0].categories[0]
  );
  const [rotation, setRotation] = useState(0);

  const handleButtonClick = (industry) => {
    setActiveIndustry(industry);
    setActiveCategory(industry.categories[0]);

    const currentRotation = rotation % 360;
    let targetRotation = industry.targetRotation;

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

  return (
    <section className="container me-auto w-full py-12   overflow-hidden">
      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl md:text-6xl lg:text-[100px] font-normal text-[#BABEC8] mb-10 text-center lg:text-left  sm:px-6 lg:px-13"
      >
        Industries we serve
      </motion.h1>

      <div className=" grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-15 items-center">
        {/* Circle Section (Left) */}
        <div className="relative flex justify-center lg:justify-start items-center overflow-hidden">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
            style={{ width: "600px", height: "600px", marginLeft: "-250px" }}
          >
            <motion.div
              animate={{ rotate: rotation }}
              transition={{
                duration: 0.7,
                ease: "easeInOut",
              }}
              className="relative w-full h-full rounded-full"
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
                  inset: "150px",
                  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
                }}
              ></div>

              {industries.map((industry, index) => {
                const segmentAngle = 360 / industries.length;
                const startAngle = index * segmentAngle;
                const endAngle = (index + 1) * segmentAngle;
                const midAngle = startAngle + segmentAngle / 2;
                const radian = (midAngle * Math.PI) / 180;
                const radius = 220;
                const x = radius * Math.cos(radian);
                const y = radius * Math.sin(radian);

                const isActive = industry.id === activeIndustry.id;

                return (
                  <div key={industry.id}>
                    <div
                      onClick={() => handleButtonClick(industry)}
                      className="absolute inset-0 rounded-full cursor-pointer"
                      style={{
                        clipPath: `path('M300,300 L${
                          300 + 300 * Math.cos((startAngle * Math.PI) / 180)
                        },${
                          300 + 300 * Math.sin((startAngle * Math.PI) / 180)
                        } A300,300 0 0,1 ${
                          300 + 300 * Math.cos((endAngle * Math.PI) / 180)
                        },${
                          300 + 300 * Math.sin((endAngle * Math.PI) / 180)
                        } Z')`,
                        zIndex: 15,
                      }}
                    ></div>

                    <motion.div
                      animate={{ rotate: -rotation }}
                      transition={{ duration: 0.7, ease: "easeInOut" }}
                      className={`absolute z-20 flex flex-col items-center justify-center w-16 h-16`}
                      style={{
                        left: `calc(50% + ${x}px - 2rem)`,
                        top: `calc(50% + ${y}px - 2rem)`,
                        color: "white",
                        borderColor: "white",
                        pointerEvents: "none",
                      }}
                    >
                      {industry.icon}
                      <span className="text-xs mt-1 font-medium text-center leading-tight">
                        {industry.title.split(" ")[0]}
                      </span>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          key={activeIndustry.id}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col "
        >
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
                  backgroundColor: activeCategory === category ? "#2E437C" : "",
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-lg">
            <img
              src={categoryData.image}
              alt={categoryData.title}
              className="w-full h-110 object-cover transition-transform duration-500 hover:scale-105"
            />
            <div className="absolute top-0 left-0 w-full p-3 bg-gradient-to-b from-black/70 to-transparent">
              <h3 className="text-xl font-semibold text-white">
                {categoryData.title}
              </h3>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-black/70 to-transparent"></div>
          </div>

          <h3 className="mt-4 text-3xl font-semibold text-gray-800">
            Solutions for{" "}
            <span style={{ color: "#2E437C" }}>{activeIndustry.title}</span>
          </h3>
          <p className="mt-2 text-gray-600 text-base leading-relaxed">
            {categoryData.description}
          </p>
        </motion.div>
      </div>

      <div className="mt-8 text-center text-gray-500 text-sm">
        <p>Click on an industry segment to learn more</p>
      </div>
    </section>
  );
}
