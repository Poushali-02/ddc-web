import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import { useParams, Link } from "react-router-dom";

// Define a Blog type that matches your backend response
type Blog = {
  id: number;
  title: string;
  content: string;
  domain: string;
  writer: string;
  blog_link?: string;
  created_at: string;
  created_by?: string;
  is_published?: boolean;
};

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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


  useEffect(() => {
    if (!id) return;

    // Fetch blog details
    setLoading(true);
    axios
      .get(`http://127.0.0.1:8000/blogs/${id}/`)
      .then((res) => {
        setBlog(res.data);

        // Check if it's a premium blog by looking for truncation markers in content
        const content = res.data.content || "";
        setIsPremium(
          content.includes("...") &&
            (content.includes("This story is for Medium members only") ||
              content.includes("Member-only story"))
        );

        // Scroll to top when blog loads
        window.scrollTo(0, 0);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
        setError("Failed to load the blog. Please try again later.");
        setLoading(false);
      });
  }, [id]);
  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-yellow-400 border-r-transparent"></div>
        <p className="ml-4 text-yellow-400">Loading blog...</p>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h2 className="text-2xl text-yellow-400 mb-4">Error</h2>
        <p className="text-gray-300 mb-6">{error || "Blog not found"}</p>
        <Link
          to="/projects"
          className="px-4 py-2 bg-yellow-500 text-black rounded-md hover:bg-yellow-400 transition-colors"
        >
          Back to Blogs
        </Link>
      </div>
    );
  }

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
      <div className="container mx-auto pt-32 px-4 pb-16">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link
            to="/projects"
            className="inline-flex items-center text-yellow-400 hover:text-yellow-300 transition-colors mb-8"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Blogs
          </Link>

          {/* Blog header */}
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-yellow-500/20 p-8 mb-8">
            <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20 mb-4 inline-block">
              {blog.domain}
            </span>
            <h1 className="text-3xl font-bold text-yellow-400 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center text-gray-400 text-sm mb-2">
              <span className="mr-4">By {blog.writer}</span>
              <span>{new Date(blog.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Blog content */}
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-yellow-500/20 p-8">
            <div
              className="text-gray-300 leading-relaxed blog-content overflow-hidden"
              style={{ wordWrap: "break-word", maxWidth: "100%" }}
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {/* Premium content CTA */}
            {isPremium && (
              <div className="mt-8 border-t border-yellow-500/20 pt-6">
                <div className="bg-gray-800 rounded-xl p-6 text-center">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">
                    Premium Content
                  </h3>
                  <p className="text-gray-300 mb-4">
                    This is a premium article with restricted content. Continue
                    reading on Medium for the full article.
                  </p>
                  <a
                    href={blog.blog_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 py-3 bg-yellow-500 text-black rounded-md font-medium hover:bg-yellow-400 transition-colors"
                  >
                    Read Full Article on Medium
                  </a>
                </div>
              </div>
            )}

            {/* Source link */}
            {blog.blog_link && !isPremium && (
              <div className="mt-8 text-center">
                <a
                  href={blog.blog_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:text-yellow-300 transition-colors"
                >
                  View original article on Medium
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetail;
