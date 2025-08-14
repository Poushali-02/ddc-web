import axios from "axios";
import { useEffect, useState } from "react";

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

const Projects = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all blogs from Django backend
    axios
      .get("http://127.0.0.1:8000/blogs/")
      .then((res) => {
        console.log("Blogs:", res.data);
        setBlogs(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
        setLoading(false);
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
      <div className="container mx-auto pt-32 px-4">
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
                {blogs.map((blog) => (
                  <div
                    key={blog.id}
                    className="bg-gray-800/80 rounded-xl border border-yellow-500/30 p-6 flex flex-col hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300"
                  >
                    {extractImageUrl(blog.content) && (
                      <div className="w-full h-40 bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-yellow-600/5 rounded-lg flex items-center justify-center backdrop-blur-sm mb-4">
                        <img
                          src={extractImageUrl(blog.content)}
                          alt={blog.title}
                          className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity"
                        />
                      </div>
                    )}
                    <h3 className="text-lg font-bold text-yellow-400 mb-2 group-hover:text-yellow-400/90 transition-colors duration-300">
                      {blog.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                      {extractSnippet(blog.content)}
                    </p>
                    <div className="mt-auto flex justify-between items-center">
                      <span className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20">
                        {blog.domain}
                      </span>
                      <a
                        href={blog.blog_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        Read more
                      </a>
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
