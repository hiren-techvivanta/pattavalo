import React from "react";
import { motion } from "framer-motion";
import clientimg from "../../assets/images/clientfeedback.jpg"
const testimonials = [
  {
    id: 1,
    name: "Mirana Mari",
    role: "3D Designer",
    image: clientimg, 
    feedback:
      "Working with this team was a fantastic experience from start to finish. They took the time to really understand our requirements, asked the right questions, and even suggested improvements that we hadn’t thought of. The final delivery was not only on time but exceeded our expectations in terms of quality and design.",
  },
  {
    id: 2,
    name: "Mirana Mari",
    role: "3D Designer",
    image: clientimg,
    feedback:
      "Working with this team was a fantastic experience from start to finish. They took the time to really understand our requirements, asked the right questions, and even suggested improvements that we hadn’t thought of. The final delivery was not only on time but exceeded our expectations in terms of quality and design.",
  },
  {
    id: 3,
    name: "Mirana Mari",
    role: "3D Designer",
    image: clientimg,
    feedback:
      "Working with this team was a fantastic experience from start to finish. They took the time to really understand our requirements, asked the right questions, and even suggested improvements that we hadn’t thought of. The final delivery was not only on time but exceeded our expectations in terms of quality and design.",
  },
  {
    id: 4,
    name: "Mirana Mari",
    role: "3D Designer",
    image: clientimg,
    feedback:
      "Working with this team was a fantastic experience from start to finish. They took the time to really understand our requirements, asked the right questions, and even suggested improvements that we hadn’t thought of. The final delivery was not only on time but exceeded our expectations in terms of quality and design.",
  },
];

export default function ClientFeedback() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 md:px-12 lg:px-20 bg-white">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-left mb-12 max-w-4xl"
      >
        <p className="text-[#2E437C] font-medium">Client Feedback</p>
        <h2 className="text-2xl md:text-4xl font-normal text-[#2E437C] mt-2">
          Don’t take our world for it!
        </h2>
        <h3 className="text-2xl md:text-4xl font-bold text-[#BABEC8]">
          Hear it from our partners.
        </h3>
      </motion.div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="bg-[#F5F6FA] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            {/* Profile Image */}
            <div className="flex items-center mb-4">
              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>

            {/* Feedback */}
            <p className="text-gray-700 text-[15px] leading-relaxed mb-4">
              “{t.feedback}”
            </p>

            {/* Name & Role */}
            <div>
              <p className="font-medium italic text-gray-800">{t.name}</p>
              <p className="text-gray-500 text-sm">{t.role}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
