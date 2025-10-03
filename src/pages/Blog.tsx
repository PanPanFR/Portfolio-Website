import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useData } from "../contexts/DataProvider";
import { ExternalLink } from "lucide-react";
import Button from "../components/Button";

export default function Blog() {
  const { translations: { blog: translations }, blogPosts } = useData();
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  // Get unique categories for filtering
  const categories = [...new Set(blogPosts.map(post => post.category))].sort();

  // Filter and sort blog posts
  const processedPosts = useMemo(() => {
    let filtered = blogPosts;
    
    // Apply category filter
    if (category) {
      filtered = filtered.filter(post => post.category === category);
    }
    
    // Apply sorting
    if (sort === "oldest") {
      filtered = [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    } else {
      // Default to newest
      filtered = [...filtered].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
    
    return filtered;
  }, [blogPosts, category, sort]);

  return (
    <div className="mt-auto pb-4">
      <motion.div 
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        exit={{ rotateX: 90 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 mb-6"
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6">{translations?.["blog-title"] || "Blog"}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8">
          {translations?.["blog-description"] || "Welcome to my blog where I share insights, tutorials, and thoughts on web development and technology."}
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ rotateX: -90 }}
        animate={{ rotateX: 0 }}
        exit={{ rotateX: 90 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col md:flex-row gap-4 mb-6"
      >
        <div className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-4 flex-1">
          <label className="block text-sm font-bold mb-2">
            {translations?.["category-filter"] || "Filter by Category"}
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 rounded"
          >
            <option value="">{translations?.["all-categories"] || "All Categories"}</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        
        <div className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] p-4 flex-1">
          <label className="block text-sm font-bold mb-2">
            {translations?.["sort-by"] || "Sort By"}
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-zinc-600 bg-white dark:bg-zinc-800 rounded"
          >
            <option value="">{translations?.["newest"] || "Newest"}</option>
            <option value="oldest">{translations?.["oldest"] || "Oldest"}</option>
          </select>
        </div>
      </motion.div>

      {/* Blog posts grid */}
      {processedPosts.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] p-6 mb-6 text-center"
        >
          <h2 className="text-xl font-bold mb-4">{translations?.["no-blog-posts"] || "No Blog Posts Found"}</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {translations?.["no-blog-posts-message"] || "Check back later for new blog posts."}
          </p>
        </motion.div>
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-2 md:px-0">
          {processedPosts.map((post, index) => (
            <motion.div 
              key={post.title + post.date}
              initial={{ rotateX: -90 }}
              whileInView={{ rotateX: 0 }}
              viewport={{ once: true }}
              exit={{ rotateX: 90 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-white dark:bg-zinc-900 border-2 dark:border-zinc-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={post.thumbnail} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = "/placeholder_project.avif";
                  }}
                />
                <div className="absolute top-2 right-2 bg-black dark:bg-white text-white dark:text-black text-xs px-2 py-1 rounded">
                  {post.category}
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 flex-grow flex flex-col">
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                  {post.description}
                </p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      href={post.link}
                      ariaLabel={`Read more about ${post.title}`}
                      className="flex items-center gap-1"
                    >
                      <ExternalLink size={16} />
                      <span>{translations?.["read-more"] || "Read More"}</span>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </section>
      )}
    </div>
  );
}