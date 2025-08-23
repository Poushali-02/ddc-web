import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Blog type
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

const BlogsGrid = () => {
  const [groupedBlogs, setGroupedBlogs] = useState<Record<string, Blog[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Detect premium blog
  const isPremium = (content: string): boolean => {
    return (
      content.includes("...") &&
      (content.includes("This story is for Medium members only") ||
        content.includes("Member-only story"))
    );
  };

  // Preview text from HTML content
  const getPreview = (html: string, length = 180) => {
    const text = html.replace(/<[^>]+>/g, ""); // strip HTML tags
    return text.length > length ? text.slice(0, length) + "..." : text;
  };

  // Extract first image src from HTML content
  const getFirstImage = (html: string) => {
    const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
    return match ? match[1] : undefined;
  };

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://127.0.0.1:8000/blogs/")
      .then((res) => {
        let allBlogs: Blog[] = res.data;

        // Filter out premium blogs
        const filteredBlogs = allBlogs.filter((b) => !isPremium(b.content || ""));

        // Count blogs per domain
        const domainCounts: Record<string, number> = {};
        filteredBlogs.forEach((b) => {
          domainCounts[b.domain] = (domainCounts[b.domain] || 0) + 1;
        });

        // Get top 4 dominant domains by count
        const dominantDomains = Object.entries(domainCounts)
          .sort((a, b) => b[1] - a[1])
          .slice(0, 4)
          .map(([domain]) => domain);

        // Group blogs for those domains, pick 3 random blogs per domain
        const grouped: Record<string, Blog[]> = {};
        dominantDomains.forEach((domain) => {
          const domainBlogs = filteredBlogs.filter((b) => b.domain === domain);
          const shuffled = [...domainBlogs].sort(() => 0.5 - Math.random());
          grouped[domain] = shuffled.slice(0, 3);
        });

        setGroupedBlogs(grouped);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading blogs:", err);
        setError("Failed to load blogs");
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-black text-white pt-20 pb-16 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-yellow-400 mb-10 text-center">
          Explore Blogs by DevDotCom Members
        </h1>

        {loading && (
          <div className="flex justify-center items-center">
            <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
            <p className="ml-4 text-yellow-400">Loading blogs...</p>
          </div>
        )}

        {error && <p className="text-center text-red-400 mb-6">{error}</p>}

        {/* Blog Grid */}
        <div className="space-y-12">
          {Object.entries(groupedBlogs).map(([domain, domainBlogs]) => (
            <div key={domain}>
              <h2 className="text-xl font-bold text-black bg-yellow-400 bg-opacity-80 inline-block mb-4 px-4 py-2 rounded-lg
    transition-colors hover:bg-yellow-500 cursor-pointer">
                {domain.toUpperCase()}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {domainBlogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-gray-900/50 backdrop-blur rounded-xl border border-yellow-500/20 p-6 hover:border-yellow-400 transition-colors flex flex-col"
                  >
                    {getFirstImage(blog.content) && (
                      <img
                        src={getFirstImage(blog.content)!}
                        alt={blog.title}
                        className="mb-4 rounded-lg w-full max-h-48 object-cover border border-yellow-500/10"
                      />
                    )}

                    <h3 className="text-xl font-bold text-yellow-400 mb-2">{blog.title}</h3>

                    <p className="text-gray-300 text-sm leading-relaxed mb-3">
                      {getPreview(blog.content)}
                    </p>

                    <p className="text-yellow-200 hover:text-yellow-200 text-sm font-medium transition-colors">
                      {blog.domain}
                    </p>

                    <div className="text-gray-400 text-xs mb-3">
                      By {blog.writer} • {new Date(blog.created_at).toLocaleDateString()}
                    </div>

                    <Link
                      to={`/blog/${blog.id}`}
                      className="text-yellow-400 hover:text-yellow-200 text-sm font-medium transition-colors mt-auto"
                    >
                      Read More →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Explore Button */}
        <div className="flex justify-center mt-16">
          <Link
            to="/projects"
            className="px-6 py-3 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 transition-colors"
          >
            Explore More Projects →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogsGrid;
