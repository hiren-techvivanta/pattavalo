import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NewsCard from "../newsComponents/NewsCard";
import usePosts from "../../hooks/usePosts";

const NewsGrid = ({
  activeTab = "Latest",
  searchQuery = "",
  initialPostsCount = 8,
  showLoadingState = true,
  showErrorState = true,
  gridCols = "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  gap = "gap-6 lg:gap-8",
  className = "",
  onLoadMore,
  showLoadMoreButton = true,
}) => {
  const [displayCount, setDisplayCount] = useState(initialPostsCount);
  
  const getApiEndpoint = (tab) => {
    switch (tab) {
      case "Blogs":
        return "settings/post/blog";
      case "Events":
        return "settings/post/event";
      case "Featured Product":
        return "settings/post/product";
      default:
        return "settings/post";
    }
  };

  const currentEndpoint = getApiEndpoint(activeTab);
  const { posts, loading, error, refetch } = usePosts(currentEndpoint);

  const filteredData = useMemo(() => {
    let filtered = posts || [];
    if (searchQuery) {
      filtered = filtered.filter(
        (item) =>
          item.heading?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.details?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.news?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [searchQuery, posts]);

  const postsToShow = useMemo(() => {
    return filteredData.slice(0, displayCount);
  }, [filteredData, displayCount]);

  const hasMorePosts = filteredData.length > initialPostsCount && filteredData.length > displayCount;

  const handleLoadMore = () => {
    setDisplayCount(filteredData.length);
    if (onLoadMore) {
      onLoadMore(filteredData.length - displayCount);
    }
  };

  React.useEffect(() => {
    if (onLoadMore) {
      onLoadMore({
        hasMore: hasMorePosts,
        remaining: filteredData.length - displayCount,
        total: filteredData.length,
        handleLoadMore: handleLoadMore
      });
    }
  }, [hasMorePosts, filteredData.length, displayCount]);

  React.useEffect(() => {
    setDisplayCount(initialPostsCount);
  }, [activeTab, searchQuery, initialPostsCount]);

  const cardGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.06,
        delayChildren: 0.2,
        duration: 0.6
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
        duration: 0.4,
      },
    },
  };

  return (
    <div className={className}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${searchQuery}-${filteredData.length}-${displayCount}`}
          className={`grid ${gridCols} ${gap}`}
          variants={cardGridVariants}
          initial="hidden"
          whileInView="visible" 
          viewport={{ 
            once: true,    
            amount: 0.1,    
            margin: "-50px" 
          }}
        >
          {loading && showLoadingState && (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6,
              }}
            >
              <motion.div
                className="text-gray-300 mb-6"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
              </motion.div>
              <p className="text-gray-600">Loading posts...</p>
            </motion.div>
          )}

          {error && !loading && showErrorState && (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6,
              }}
            >
              <motion.div
                className="text-gray-300 mb-6"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </motion.div>
              <h3 className="text-xl font-semibold text-gray-500 mb-2">
                Unable to load posts
              </h3>
              <p className="text-gray-400">
                Please check your connection and try again later.
              </p>
            </motion.div>
          )}

          {!loading &&
            !error &&
            postsToShow.length > 0 &&
            postsToShow.map((item, index) => (
              <motion.div
                key={`${item.id}-${item.heading}-${activeTab}-${index}`}
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
                className="fade-up-news"
              >
                <NewsCard props={item} />
              </motion.div>
            ))}

          {!loading && !error && filteredData.length === 0 && (
            <motion.div
              className="col-span-full text-center py-20"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.6,
              }}
            >
              <motion.div
                className="text-gray-300 mb-6"
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <svg
                  className="w-20 h-20 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </motion.div>

              <motion.h3
                className="text-xl font-semibold text-gray-500 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                No posts available
              </motion.h3>

              <motion.p
                className="text-gray-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {searchQuery
                  ? `No posts match "${searchQuery}" in ${activeTab}`
                  : `No posts available in ${activeTab} at the moment.`}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      {!loading && !error && !hasMorePosts && filteredData.length > initialPostsCount && showLoadMoreButton && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.p
            className="text-gray-500 text-sm bg-gray-50 px-4 py-2 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            Showing all {filteredData.length} posts
          </motion.p>
        </motion.div>
      )}
    </div>
  );
};

export default NewsGrid;
