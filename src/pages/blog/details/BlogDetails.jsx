import React, { useEffect, useState } from "react";
import Navbar from "../../../components/Navbar/Navbar";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import NewsCard from "../../../components/newsComponents/NewsCard";

import l1 from "../../../assets/images/l1.png";
import l2 from "../../../assets/images/l2.png";
import l3 from "../../../assets/images/l3.png";
import l4 from "../../../assets/images/l4.png";
import l5 from "../../../assets/images/l5.png";
import l6 from "../../../assets/images/l6.png";
import Seo from "../../../components/common/Seo";
import NewsGrid from "../../../components/common/NewsGrid";
import { useParams } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const BlogDetails = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const partners = [
    { id: 3, name: "l1", image: l1, width: 117 },
    { id: 4, name: "l2", image: l2, width: 110 },
    { id: 5, name: "l3", image: l3, width: 100 },
    { id: 6, name: "l4", image: l4, width: 200 },
    { id: 7, name: "l5", image: l5, width: 87 },
    { id: 8, name: "l6", image: l6, width: 200 },
  ];

  // Fetch post details from API
  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!slug) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/settings/post-detail/${slug}`,
          {
            method: "GET",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.message === "Post fetch successfully" && result.data) {
          setPost(result.data);
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        console.error("Error fetching post details:", err);
        setError("Failed to load post details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [slug]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  // Animation variants
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

  // Loading state
  if (loading) {
    return (
      <>
        <motion.div initial="hidden" animate="visible" variants={navVariants}>
          <Navbar navStyle={"white"} />
        </motion.div>
        <div className="container mx-auto mt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="w-16 h-16 border-4 border-[#2E437C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading post...</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <motion.div initial="hidden" animate="visible" variants={navVariants}>
          <Navbar navStyle={"white"} />
        </motion.div>
        <div className="container mx-auto mt-20 px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 py-16 sm:py-20">
          <div className="text-center min-h-[400px] flex items-center justify-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                Post Not Found
              </h1>
              <p className="text-gray-600 mb-6">{error}</p>
              <button
                onClick={() => window.history.back()}
                className="px-6 py-3 bg-[#2E437C] text-white rounded-lg hover:bg-[#1E2F5C] transition-colors"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Main content when post is loaded
  return (
    <>
      <Seo
        title={`${post?.name || "Post"} | ATC Chain India`}
        description={
          post?.name ||
          "ATC Chain designs and manufactures high-quality components for the food, beverage, packaging, automotive and automation industries."
        }
        url={`https://www.atcchain.com/news/${slug}`}
      />
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
            <p className="font-semibold text-gray-800">ATC Team</p>
            <p className="text-sm text-gray-500">
              {formatDate(post?.date_time)}
            </p>
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
            {post?.name && (
              <>
                {post.name.split(" ").slice(0, -2).join(" ")}{" "}
                <span className="bg-gradient-to-r from-[#2E437C] to-[#1d3b72] bg-clip-text text-transparent">
                  {post.name.split(" ").slice(-2).join(" ")}
                </span>
              </>
            )}
          </motion.h1>
        </motion.div>

        {/* Hero Image */}
        {post?.image && (
          <motion.div
            className="mb-12 fade-up-blog aspect-[2/1] overflow-hidden rounded-2xl"
            variants={heroImageVariants}
          >
            <motion.img
              src={`${import.meta.env.VITE_BACKEND_URL}/${post.image}`}
              className="w-full object-cover shadow-2xl"
              alt={post.name}
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
        )}

        {/* Post Content */}
        <motion.article
          className=""
          variants={contentVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {post?.description && (
            <motion.div
              className="text-base text-gray-600 leading-relaxed fade-up-blog prose-custom"
              dangerouslySetInnerHTML={{ __html: post.description }}
              style={{
                fontSize: "16px",
                lineHeight: "1.75",
                color: "#4a5568",
              }}
            />
          )}
        </motion.article>

        {/* Related Posts Section */}
        <NewsGrid initialPostsCount={4} className="pt-20" />

        {/* Partners Section */}
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

      {/* Custom styles for HTML content */}
      <style jsx>{`
        .prose-custom p {
          margin-bottom: 1.5rem;
          font-size: 16px;
          line-height: 1.75;
          color: #4a5568;
        }
        .prose-custom strong {
          color: #2d3748;
          font-weight: 600;
        }
        .prose-custom img {
          width: 50%;
          aspect-ratio: 2/1;
          height: auto;
          border-radius: 12px;
          margin: 2rem auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .prose-custom .dest-block {
          margin-bottom: 2rem;
        }
        .prose-custom blockquote {
          background: linear-gradient(to right, #f7fafc, #edf2f7);
          border-left: 4px solid #2e437c;
          margin: 2rem 0;
          padding: 2rem;
          border-radius: 16px;
          font-size: 18px;
          line-height: 1.75;
          color: #374151;
          font-style: italic;
          position: relative;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        .prose-custom blockquote::before {
          content: '"';
          font-size: 4rem;
          color: #2e437c;
          position: absolute;
          top: -10px;
          left: 20px;
          font-family: Georgia, serif;
          opacity: 0.3;
        }
        .prose-custom blockquote p {
          margin: 0;
          padding-left: 2rem;
          color: #374151;
          font-size: 18px;
        }
        .prose-custom h1 {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin: 2rem 0 1rem 0;
          line-height: 1.2;
        }
        .prose-custom h2 {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2d3748;
          margin: 1.75rem 0 1rem 0;
          line-height: 1.3;
        }
        .prose-custom h3 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin: 1.5rem 0 0.75rem 0;
          line-height: 1.4;
        }

        /* Quill Editor Lists - Bullet Lists (data-list="bullet") */
        .prose-custom ol[data-list="bullet"],
        .prose-custom ol li[data-list="bullet"] {
          list-style-type: none;
          counter-reset: none;
        }
        .prose-custom ol {
          margin: 1.5rem 0;
          padding-left: 0;
          list-style-type: none;
        }
        .prose-custom ol li {
          position: relative;
          margin-bottom: 0.75rem;
          font-size: 16px;
          line-height: 1.75;
          color: #4a5568;
          padding-left: 2rem;
          display: block;
        }

        /* Bullet points for data-list="bullet" */
        .prose-custom ol li[data-list="bullet"]::before {
          content: "";
          position: absolute;
          left: 0.5rem;
          top: 0.75rem;
          width: 8px;
          height: 8px;
          background-color: #2e437c;
          border-radius: 50%;
          transform: translateY(-50%);
        }

        /* Numbers for data-list="ordered" */
        .prose-custom ol {
          counter-reset: ordered-counter;
        }
        .prose-custom ol li[data-list="ordered"] {
          counter-increment: ordered-counter;
        }
        .prose-custom ol li[data-list="ordered"]::before {
          content: counter(ordered-counter);
          position: absolute;
          left: 0;
          top: 0;
          background-color: #2e437c;
          color: white;
          font-size: 14px;
          font-weight: 600;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* Hide Quill UI elements */
        .prose-custom .ql-ui {
          display: none;
        }

        /* Regular unordered lists */
        .prose-custom ul {
          margin: 1.5rem 0;
          padding-left: 2rem;
          list-style-type: none;
        }
        .prose-custom ul li {
          position: relative;
          margin-bottom: 0.75rem;
          font-size: 16px;
          line-height: 1.75;
          color: #4a5568;
          padding-left: 1.5rem;
        }
        .prose-custom ul li::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0.75rem;
          width: 8px;
          height: 8px;
          background-color: #2e437c;
          border-radius: 50%;
          transform: translateY(-50%);
        }

        /* Nested lists support */
        .prose-custom ol ol,
        .prose-custom ul ul {
          margin: 0.5rem 0;
          padding-left: 1.5rem;
        }
        .prose-custom ol ol li::before,
        .prose-custom ul ul li::before {
          background-color: #718096;
          width: 6px;
          height: 6px;
        }

        /* List item content */
        .prose-custom li p {
          margin: 0;
          display: inline;
        }
        .prose-custom li > p + p {
          margin-top: 0.5rem;
          display: block;
        }
      `}</style>
    </>
  );
};

export default BlogDetails;
