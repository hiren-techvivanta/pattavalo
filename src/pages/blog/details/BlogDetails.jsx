import React, { useEffect } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import NewsCard from "../../../components/newsComponents/NewsCard";

import blo1 from "../../../assets/images/blo1.jpg";
import bl1 from "../../../assets/images/bl1.jpg";
import bl2 from "../../../assets/images/bl2.jpg";
import bl3 from "../../../assets/images/bl3.jpg";
import bl4 from "../../../assets/images/bl4.jpg";

import l1 from "../../../assets/images/l1.png";
import l2 from "../../../assets/images/l2.png";
import l3 from "../../../assets/images/l3.png";
import l4 from "../../../assets/images/l4.png";
import l5 from "../../../assets/images/l5.png";
import l6 from "../../../assets/images/l6.png";

gsap.registerPlugin(ScrollTrigger);

const BlogDetails = () => {
  const partners = [
    { id: 3, name: "l1", image: l1, width: 117 },
    { id: 4, name: "l2", image: l2, width: 110 },
    { id: 5, name: "l3", image: l3, width: 100 },
    { id: 6, name: "l4", image: l4, width: 200 },
    { id: 7, name: "l5", image: l5, width: 87 },
    { id: 8, name: "l6", image: l6, width: 200 },
  ];

  const allNews = [
    {
      image: bl1,
      news: "Latest",
      heading: "Revolutionary Conveyor Belt Technology",
      details:
        "Discover how our latest innovations are transforming manufacturing efficiency across industries.",
      date: "Dec 15, 2024",
      author: "Tech Team",
    },
    {
      image: bl2,
      news: "Blog",
      heading: "Industry Best Practices Guide",
      details:
        "How do you create compelling presentations that wow your colleagues and impress your managers?",
      date: "Dec 12, 2024",
      author: "John Smith",
    },
    {
      image: bl3,
      news: "Events",
      heading: "Manufacturing Expo 2025",
      details:
        "Join us at the biggest manufacturing exhibition showcasing cutting-edge conveyor solutions.",
      date: "Jan 20, 2025",
      author: "Event Team",
    },
    {
      image: bl4,
      news: "Featured Product",
      heading: "Premium Modular Belt Series",
      details:
        "Our flagship product line featuring advanced materials and superior durability ratings.",
      date: "Dec 10, 2024",
      author: "Product Team",
    },
  ];

  // useEffect(() => {
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

  //   gsap.fromTo(
  //     ".fade-up-blog",
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
  //         trigger: ".fade-up-blog",
  //         start: "top 85%",
  //         end: "bottom 20%",
  //         toggleActions: "play none none reverse",
  //       },
  //     }
  //   );

  //   return () => {
  //     lenis.destroy();
  //     ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  //     gsap.ticker.remove(lenis.raf);
  //   };
  // }, []);

  const pageVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const navVariants = {
    hidden: {
      opacity: 0,
      y: -20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const headerVariants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
  };

  const heroImageVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      y: 20,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.7,
        delay: 0.2,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const paragraphVariants = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  const listVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  };

  const listItemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
  };

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 25,
      scale: 0.95,
      rotateX: 5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <motion.div initial="hidden" animate="visible" variants={navVariants}>
        <Navbar navStyle={"white"} />
      </motion.div>

      <motion.div
        className="container mx-auto mt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.div className="mb-8 fade-up-blog" variants={headerVariants}>
          <motion.div
            className="flex items-center gap-4 mb-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <p className="font-semibold text-gray-800">Shivam Patel</p>
            <p className="text-sm text-gray-500">16 March 2023</p>
          </motion.div>

          <motion.h1
            className="font-normal text-3xl md:text-5xl lg:text-6xl leading-tight text-gray-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
              delay: 0.2,
            }}
          >
            The Future of{" "}
            <span className="bg-gradient-to-r from-[#2E437C] to-[#1d3b72] bg-clip-text text-transparent">
              Digital Innovation
            </span>
          </motion.h1>
        </motion.div>

        <motion.div className="mb-12 fade-up-blog" variants={heroImageVariants}>
          <motion.img
            src={blo1}
            className="w-full lg:h-[650px] object-cover rounded-2xl shadow-2xl"
            alt="Digital Innovation"
            loading="lazy"
            whileHover={{
              scale: 1.01,
              y: -5,
              boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              },
            }}
          />
        </motion.div>

        <motion.article
          className="max-w-4xl mx-auto prose prose-lg prose-gray"
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <motion.p
            variants={paragraphVariants}
            className="text-lg text-gray-700 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-[#2E437C] first-letter:float-left first-letter:mr-2 first-letter:mt-1 fade-up-blog"
          >
            In today's fast-paced world, digital innovation is shaping the way
            we live, work, and connect with each other. From artificial
            intelligence to cloud computing, technology has become the backbone
            of modern businesses and everyday life.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            className="text-base text-gray-600 leading-relaxed mb-6 fade-up-blog"
          >
            The rapid evolution of technology continues to transform industries,
            creating new opportunities while challenging traditional business
            models. Companies that embrace digital transformation are better
            positioned to thrive in this competitive landscape.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            className="text-base text-gray-600 leading-relaxed mb-8 fade-up-blog"
          >
            As we move forward, the integration of emerging technologies like
            machine learning, IoT, and blockchain will continue to revolutionize
            how we approach problem-solving and innovation across various
            sectors.
          </motion.p>

          <motion.div
            className="ml-6 my-8 fade-up-blog"
            variants={listVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Key Innovation Areas:
            </h3>
            <motion.ul className="space-y-3">
              <motion.li
                variants={listItemVariants}
                className="flex items-center text-gray-600"
              >
                <div className="w-2 h-2 bg-[#2E437C] rounded-full mr-3"></div>
                Artificial Intelligence and Machine Learning
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="flex items-center text-gray-600"
              >
                <div className="w-2 h-2 bg-[#2E437C] rounded-full mr-3"></div>
                Cloud Computing and Infrastructure
              </motion.li>
              <motion.li
                variants={listItemVariants}
                className="flex items-center text-gray-600"
              >
                <div className="w-2 h-2 bg-[#2E437C] rounded-full mr-3"></div>
                Internet of Things (IoT) Solutions
              </motion.li>
            </motion.ul>
          </motion.div>

          <motion.p
            variants={paragraphVariants}
            className="text-base text-gray-600 leading-relaxed mb-6 fade-up-blog"
          >
            The digital transformation journey requires strategic planning,
            investment in the right technologies, and a commitment to continuous
            learning and adaptation. Organizations must foster a culture of
            innovation to stay ahead of the curve.
          </motion.p>

          <motion.p
            variants={paragraphVariants}
            className="text-base text-gray-600 leading-relaxed mb-8 fade-up-blog"
          >
            Success in the digital age depends on the ability to leverage data
            effectively, automate processes intelligently, and create seamless
            user experiences that exceed customer expectations.
          </motion.p>
        </motion.article>

        <motion.div
          className="text-center my-16 fade-up-blog"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 20,
            duration: 0.6,
          }}
        >
          <motion.img
            src={blo1}
            className="lg:w-[692px] lg:h-[312px] object-cover rounded-2xl mx-auto shadow-xl"
            alt="Innovation Process"
            loading="lazy"
            whileHover={{
              scale: 1.02,
              y: -3,
              boxShadow: "0 20px 40px rgba(0, 0, 0, 0.12)",
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25,
                duration: 0.3,
              },
            }}
          />
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto fade-up-blog"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.6,
          }}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8 border-l-4 border-[#2E437C]"
            whileHover={{
              scale: 1.01,
              boxShadow: "0 8px 25px rgba(0, 0, 0, 0.08)",
              transition: { duration: 0.2 },
            }}
          >
            <p className="text-lg text-gray-700 leading-relaxed italic">
              "The future promises even greater opportunities: smarter
              applications, secure platforms, and an increased focus on
              sustainability through technology. We stand at the threshold of
              unprecedented innovation."
            </p>
          </motion.div>
        </motion.div>

        <motion.section
          className="pt-20 fade-up-blog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="flex items-center gap-4 mb-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h3 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r text-[#2E437C]">
              Popular Blogs
            </h3>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            variants={cardGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {allNews?.map((item, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  rotateX: -2,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    duration: 0.3,
                  },
                }}
                className="fade-up-blog  border border-[#0A0D170D] rounded-[8px]"
              >
                <NewsCard props={item} />
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        <motion.section
          className="overflow-hidden pt-20 fade-up-blog"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="bg-gradient-to-r from-gray-50/50 to-transparent rounded-2xl py-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <motion.h4
              className="text-center text-xl font-semibold text-gray-600 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Trusted by Industry Leaders
            </motion.h4>

            <div className="flex">
              {[1, 2].map((set) => (
                <motion.div
                  key={set}
                  initial={{ x: "0%" }}
                  animate={{ x: "-100%" }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                    repeatType: "loop",
                  }}
                  className="flex flex-shrink-0 items-center"
                >
                  {partners.map((partner) => (
                    <motion.div
                      key={`${set}-${partner.id}`}
                      className="flex-shrink-0 mx-12 px-0 md:px-5"
                      whileHover={{
                        scale: 1.1,
                        transition: { duration: 0.2 },
                      }}
                    >
                      <img
                        src={partner.image}
                        alt={partner.name}
                        className="h-12 sm:h-16 lg:h-20 object-contain opacity-60 hover:opacity-100 transition-all duration-300 filter grayscale hover:grayscale-0"
                        style={{ maxWidth: `${partner.width}px` }}
                        loading="lazy"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      </motion.div>
    </>
  );
};

export default BlogDetails;
