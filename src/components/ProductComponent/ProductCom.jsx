import React, { useState } from "react";
import { motion } from "framer-motion";
import { RichTreeView } from "@mui/x-tree-view/RichTreeView";
import { FaChevronDown, FaChevronRight, FaSearch } from "react-icons/fa";
import productImage from "../../assets/images/productdefault.png";

const productData = [
  { id: 1, title: "Ball Bearing", category: "Bearing", image: productImage },
  { id: 2, title: "Roller Bearing", category: "Bearing", image: productImage },
  { id: 3, title: "Thrust Bearing", category: "Bearing", image: productImage },
  {
    id: 4,
    title: "Plastic Cable Drag Chain",
    category: "Cable Drag Chain",
    image: productImage,
  },
  {
    id: 5,
    title: "Steel Cable Drag Chain",
    category: "Cable Drag Chain",
    image: productImage,
  },
  {
    id: 6,
    title: "Conveyor Idler",
    category: "Conveyor Component",
    image: productImage,
  },
  {
    id: 7,
    title: "Conveyor Pulley",
    category: "Conveyor Component",
    image: productImage,
  },
  {
    id: 8,
    title: "Straight Modular Belt",
    category: "Modular Belt",
    image: productImage,
  },
  {
    id: 9,
    title: "Sideflex Modular Belt",
    category: "Modular Belt",
    image: productImage,
  },
  {
    id: 10,
    title: "SS Conveyor Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 11,
    title: "SS Roller Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 12,
    title: "SS Industrial Chain",
    category: "SS Straight Running Chain",
    image: productImage,
  },
  {
    id: 13,
    title: "SS Sideflex Chain",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 14,
    title: "SS Rubbertrop Chain",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 15,
    title: "Slide Flex Without Tab Chain & Sprocket",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 16,
    title: "Small Radius RT Side Flex with Tab Chain & Sprocket",
    category: "SS Chain & Sprocket",
    image: productImage,
  },
  {
    id: 17,
    title: "TPU Conveyor Chain",
    category: "Thermoplastic Chain & Sprocket",
    image: productImage,
  },
  {
    id: 18,
    title: "Plastic Sprocket",
    category: "Thermoplastic Chain & Sprocket",
    image: productImage,
  },
  {
    id: 19,
    title: "Finger Chain",
    category: "Finger Chain & Assembly",
    image: productImage,
  },
  {
    id: 20,
    title: "Finger Assembly",
    category: "Finger Chain & Assembly",
    image: productImage,
  },
  {
    id: 21,
    title: "SS Z Bucket Elevator",
    category: "Z Bucket Elevator",
    image: productImage,
  },
  {
    id: 22,
    title: "Plastic Z Bucket Elevator",
    category: "Z Bucket Elevator",
    image: productImage,
  },
  {
    id: 23,
    title: "UHMWPE Wear Strip",
    category: "Wear Strip",
    image: productImage,
  },
  {
    id: 24,
    title: "HDPE Wear Strip",
    category: "Wear Strip",
    image: productImage,
  },
];

const treeItems = [
  {
    id: "1",
    label: "Bearing",
    children: [
      { id: "1-1", label: "Ball Bearing" },
      { id: "1-2", label: "Roller Bearing" },
      { id: "1-3", label: "Thrust Bearing" },
    ],
  },
  {
    id: "2",
    label: "Cable Drag Chain",
    children: [
      { id: "2-1", label: "Plastic Cable Drag Chain" },
      { id: "2-2", label: "Steel Cable Drag Chain" },
    ],
  },
  {
    id: "3",
    label: "Conveyor Component",
    children: [
      { id: "3-1", label: "Conveyor Idler" },
      { id: "3-2", label: "Conveyor Pulley" },
    ],
  },
  {
    id: "4",
    label: "Modular Belt",
    children: [
      { id: "4-1", label: "Straight Modular Belt" },
      { id: "4-2", label: "Sideflex Modular Belt" },
    ],
  },
  {
    id: "5",
    label: "SS Chain & Sprocket",
    children: [
      {
        id: "5-1",
        label: "SS Straight Running Chain",
        children: [
          { id: "5-1-1", label: "SS Conveyor Chain" },
          { id: "5-1-2", label: "SS Roller Chain" },
          { id: "5-1-3", label: "SS Industrial Chain" },
        ],
      },
      { id: "5-2", label: "SS Sideflex Chain" },
      { id: "5-3", label: "SS Rubbertrop Chain" },
      { id: "5-4", label: "Slide Flex Without Tab Chain & Sprocket" },
      {
        id: "5-5",
        label: "Small Radius RT Side Flex with Tab Chain & Sprocket",
      },
    ],
  },
  {
    id: "6",
    label: "Thermoplastic Chain & Sprocket",
    children: [
      { id: "6-1", label: "TPU Conveyor Chain" },
      { id: "6-2", label: "Plastic Sprocket" },
    ],
  },
  {
    id: "7",
    label: "Finger Chain & Assembly",
    children: [
      { id: "7-1", label: "Finger Chain" },
      { id: "7-2", label: "Finger Assembly" },
    ],
  },
  {
    id: "8",
    label: "Z Bucket Elevator",
    children: [
      { id: "8-1", label: "SS Z Bucket Elevator" },
      { id: "8-2", label: "Plastic Z Bucket Elevator" },
    ],
  },
  {
    id: "9",
    label: "Wear Strip",
    children: [
      { id: "9-1", label: "UHMWPE Wear Strip" },
      { id: "9-2", label: "HDPE Wear Strip" },
    ],
  },
];

const ProductCom = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleSelect = (event, itemIds) => {
    if (itemIds.length > 0) {
      const selectedLabel = findLabelById(treeItems, itemIds[0]);
      setSelectedCategory(selectedLabel);
    }
  };

  const findLabelById = (items, id) => {
    for (const item of items) {
      if (item.id === id) return item.label;
      if (item.children) {
        const found = findLabelById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const filteredProducts = productData.filter((product) => {
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchCategory = selectedCategory
      ? product.category === selectedCategory
      : true;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-white px-4 md:px-12 py-10">
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8"
      >
        {/* Left: Title */}
        <h1 className="text-3xl md:text-4xl font-semibold text-[#BABEC8]">
          Our Products
        </h1>

        {/* Divider line */}
        <div className="hidden md:block flex-grow h-[5px] bg-gray-300"></div>

        {/* Right: Search Bar */}
        <div className="relative w-full md:w-1/3">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border rounded-full pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
      </motion.div>

      <div className="mt-10 flex flex-col md:flex-row gap-10">
        {/* Left Sidebar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full md:w-1/4"
        >
          <RichTreeView
            items={treeItems}
            defaultExpandedItems={["5"]}
            slots={{ collapseIcon: FaChevronDown, expandIcon: FaChevronRight }}
            onSelectedItemsChange={handleSelect}
          />
        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-3/4"
        >
          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain"
                />
                <h2 className="text-lg font-semibold mt-3">{product.title}</h2>
                <p className="text-gray-500">{product.category}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCom;
