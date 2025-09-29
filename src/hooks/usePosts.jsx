import { useState, useEffect } from "react";

const usePosts = (endpoint = "settings/post") => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        setPosts([]); // Clear previous posts

        console.log('Fetching from endpoint:', endpoint); // Debug log

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "ngrok-skip-browser-warning": "true"
            },
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log('API Response:', result); // Debug log

        // Check different possible response structures
        if (result.data && Array.isArray(result.data)) {
          // Transform API data to match existing structure
          const transformedPosts = result.data.map((post) => {
            // Extract plain text from HTML description for preview
            const tempDiv = document.createElement("div");
            tempDiv.innerHTML = post.description || '';
            const plainTextDescription =
              tempDiv.textContent || tempDiv.innerText || "";

            // Format date
            const formattedDate = new Date(post.date_time).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "numeric",
                year: "numeric",
              }
            );

            // Map API type to frontend categories
            const getNewsCategory = (type) => {
              switch (type?.toLowerCase()) {
                case 'blog':
                  return 'Blogs';
                case 'event':
                  return 'Events';
                case 'product':
                case 'featured-product':
                  return 'Featured Product';
                default:
                  return 'Latest';
              }
            };

            return {
              image: post.image
                ? `${import.meta.env.VITE_BACKEND_URL}/${post.image}`
                : null,
              news: getNewsCategory(post.type),
              heading: post.name || post.title || 'Untitled',
              details:
                plainTextDescription.substring(0, 150) +
                (plainTextDescription.length > 150 ? "..." : ""),
              date: formattedDate,
              author: "ATC Team",
              slug: post.slug,
              id: post.id,
              fullDescription: post.description || '',
              type: post.type,
            };
          });

          console.log('Transformed posts:', transformedPosts); // Debug log
          setPosts(transformedPosts);
        } else {
          console.log('No data in response or data is not an array');
          setPosts([]);
        }
      } catch (err) {
        console.error("Error fetching posts:", err);
        setError("Failed to load posts. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [endpoint]); // Make sure endpoint is in dependency array

  // Refetch function for manual refresh
  const refetch = () => {
    // Force re-fetch by calling fetchPosts again
    fetchPosts();
  };

  return { posts, loading, error, refetch };
};

export default usePosts;
