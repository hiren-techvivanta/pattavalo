import React from "react";
import { motion } from "framer-motion";
import next1 from "../../assets/images/next1.jpg";
import next2 from "../../assets/images/next2.jpg";
import next3 from "../../assets/images/next3.jpg";
import next4 from "../../assets/images/next4.jpg";

const events = [
  {
    id: 1,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next1,
  },
  {
    id: 2,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next2,
  },
  {
    id: 3,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next3,
  },
  {
    id: 4,
    date: "OCT 6",
    title: "TechVision 2025",
    location: "Mumbai, India",
    img: next4,
  },
];

export default function Gatherings() {
  const letterVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    visible: {
      transition: { staggerChildren: 0.03, delayChildren: 0.2 },
    },
  };

  const splitText = (text) =>
    text.split("").map((char, i) => (
      <motion.span key={i} variants={letterVariants} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ));
  return (
    <section className=" w-full px-4 md:px-10 lg:px-15 py-10">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="container mx-auto mb-5 sm:mb-10 sm:px-6 lg:px-0 pb-1  md:text-left"
      >
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[74px]   leading-17 md``:leading-17">
          <span className="font-normal text-[#2E437C] block">
            {splitText("What’s ")}
          </span>
          <span className="font-bold text-[#BABEC8] block">
            {splitText("Happening Next")}
          </span>
        </h1>
        <p className="text-[#191919] mt-6 text-[20px] sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto md:mx-0">
          Stay connected with our latest gatherings and innovations
        </p>
      </motion.div>

      {/* Events Grid */}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="group  overflow-hidden hover:bg-[#D8DEEE] hover:border-b-2  hover:border-[#2E437C] transition-colors duration-300 cursor-pointer"
          >
            <img
              src={event.img}
              alt={event.title}
              className="w-full h-70 sm:h-76 md:h-80 lg:h-80 xl:h-100 2xl:h-100  object-cover p-2 transform transition-transform duration-500 group-hover:scale-105"
            />

            <div className="flex items-center gap-4 p-4">
              {/* Date box */}
              <div className="bg-gray-100 w-14 h-14 flex flex-col items-center justify-center ">
                <p className="text-[11px] font-medium text-gray-600 leading-tight">
                  {event.date.split(" ")[0]}
                </p>
                <p className="text-base font-semibold text-gray-800 leading-tight">
                  {event.date.split(" ")[1]}
                </p>
              </div>

              {/* Title & Location */}
              <div>
                <h3 className="font-semibold text-gray-800 text-[15px] md:text-base">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500">{event.location}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
