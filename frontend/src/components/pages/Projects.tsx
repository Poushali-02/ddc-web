import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

// Define a Blog type that matches your backend response
type Blog = {
  id: number;
  title: string;
  content: string;
  domain: string;
  writer: string;
  blog_link?: string;
  created_at: string;
  is_published?: boolean;
};

const Projects = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [domains, setDomains] = useState<string[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const navigate = useNavigate();

  // Linear scroll progress bar logic
  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Fetch blogs
  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/blogs/")
      .then((res) => {
        setBlogs(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Fetch unique domains
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/domains/").then((res) => {
      // Remove duplicates and ensure string[]
      const unique = Array.from(new Set(res.data.domains)).filter((d): d is string => typeof d === "string");
      setDomains(unique);
    });
  }, []);

  // Function to extract the first image URL from content
  const extractImageUrl = (content: string): string | undefined => {
    const imgRegex = /<img.*?src="(.*?)".*?>/;
    const match = content.match(imgRegex);
    return match ? match[1] : undefined;
  };

  // Function to extract snippet from content
  const extractSnippet = (content: string): string => {
    // Remove HTML tags
    const withoutTags = content.replace(/<[^>]*>/g, "");
    // Limit to 150 characters
    return withoutTags.length > 150
      ? withoutTags.substring(0, 150) + "..."
      : withoutTags;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Linear scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 50 }}>
        <div
          style={{
            height: "4px",
            width: `${scrollProgress}%`,
            background: "linear-gradient(90deg, #facc15 0%, #f59e42 100%)",
            transition: "width 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </div>
      <div className="container mx-auto pt-32 px-4">
        {/* Go Back Button */}
        <button
          className="mb-6 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded transition-colors"
          onClick={() => navigate("/")}
        >
          ← Go Back
        </button>
        {/* Domain Filter Dropdown */}
        <div className="mb-8 flex items-center gap-3">
          <span className="font-semibold text-yellow-400">Filter by Domain:</span>
          <select
            className="px-4 py-2 rounded border border-yellow-400 bg-black text-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors"
            value={selectedDomain}
            onChange={e => setSelectedDomain(e.target.value)}
          >
            <option value="">All</option>
            {domains.map(domain => (
              <option key={domain} value={domain}>{domain}</option>
            ))}
          </select>
        </div>
        <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-yellow-500/20 p-8">
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-2xl font-bold text-yellow-400">All Blogs</h2>
              <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-transparent rounded"></div>
            </div>

            {loading ? (
              <div className="text-center py-10">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
                <p className="mt-2 text-yellow-400">Loading blogs...</p>
              </div>
            ) : blogs.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs
                  .filter(
                    (blog) =>
                      !selectedDomain || blog.domain === selectedDomain
                  )
                  .map((blog) => (
                    <div
                      key={blog.id}
                      className="bg-gray-800/80 rounded-xl border border-yellow-500/30 p-6 flex flex-col hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
                    >
                      {extractImageUrl(blog.content) && (
                        <Link to={`/blog/${blog.id}`} className="block">
                          <div className="w-full h-40 bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-yellow-600/5 rounded-lg flex items-center justify-center backdrop-blur-sm mb-4">
                            <img
                              src={extractImageUrl(blog.content)}
                              alt={blog.title}
                              className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                            />
                          </div>
                        </Link>
                      )}
                      <Link to={`/blog/${blog.id}`} className="block mb-2">
                        <h3 className="text-lg font-bold text-yellow-400 group-hover:text-yellow-400/90 transition-colors duration-300 hover:text-yellow-300">
                          {blog.title}
                        </h3>
                      </Link>
                      <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {extractSnippet(blog.content)}
                      </p>
                      <div className="mt-auto flex justify-between items-center">
                        <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20">
                          {blog.domain}
                        </span>
                        <Link
                          to={`/blog/${blog.id}`}
                          className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                        >
                          Read more
                        </Link>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        By {blog.writer} •{" "}
                        {new Date(blog.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400">No blogs found.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
