import { Search, Sun } from "lucide-react";
import { Suspense } from "react";
import { Button } from "./components/ui/button";
import { ProjectGrid } from "./components/project-grid";
import { Spotlight } from "./components/ui/spotlight-new";
import WebpageCards from "./components/webpage-card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import BlogsGrid from "./components/pages/AllBlogs"; 

// import { useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
// const AllBlogs = lazy(() => import("./components/pages/AllBlogs"));
import axios from "axios";

gsap.registerPlugin(useGSAP);

function App() {
  // Simple state-based router for demo (replace with react-router for real apps)
  const [route, setRoute] = useState(window.location.pathname);
  useEffect(() => {
    const onPopState = () => setRoute(window.location.pathname);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);
  const navigate = (path: string) => {
    window.history.pushState({}, "", path);
    setRoute(path);
  };
  // const navigate = useNavigate();
  useGSAP(() => {
    gsap.fromTo(
      ".main-text h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 2, ease: "power2.inOut", stagger: 0.3 }
    );
    gsap.fromTo(
      ".main-text p",
      { opacity: 0 },
      { opacity: 1, duration: 2, ease: "power2.inOut", stagger: 0.3 }
    );
  });

  // --- New: Fetch latest blogs from backend ---
  const [latestProjects, setLatestProjects] = useState<any[]>([]);
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
    axios
      .get("http://127.0.0.1:8000/blogs/?limit=3")
      .then((res) => {
        // Map backend blogs to Project type
        const mapped = (res.data.results || res.data || []).slice(0, 3).map((blog: any) => ({
          id: String(blog.id),
          title: blog.title,
          description: blog.content?.replace(/<[^>]*>/g, "").slice(0, 120) + "...",
          domain: [blog.domain],
          technologies: [blog.writer || "Blog"],
          previewImage: (() => {
            const match = blog.content?.match(/<img.*?src=\"(.*?)\".*?>/);
            return match ? match[1] : undefined;
          })(),
        }));
        setLatestProjects(mapped);
      })
      .catch(() => setLatestProjects([]));
  }, []);

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
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-yellow-400" onClick={e => {e.preventDefault();navigate("/");}}>
              BuiltOnDot
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => navigate("/about")}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => navigate("/showcase")}
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Showcase
              </button>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-yellow-400"
                >
                  <Search className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-gray-300 hover:text-yellow-400"
                >
                  <Sun className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content router */}
      <main className="relative">
        {route === "/showcase" ? (
          <Suspense fallback={<div className="p-8 text-center">Loading blogs...</div>}>
            <BlogsGrid />
          </Suspense>
        ) : (
          <>
            <div className="h-[40rem] w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
              <Spotlight />
              <div className="container mx-auto px-4 relative z-10">
                <div className="text-center space-y-8">
                  <div className="space-y-20 main-text">
                    <div className="inline-flex items-center px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm">
                      🔍 Explore More Web Development Resources
                    </div>
                    <div className="space-y-6">
                      <h1 className="fade-on-scroll text-5xl md:text-7xl lg:text-8xl font-bold">
                        <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                          DDC-BuiltOnDot
                        </span>
                      </h1>
                      <p className="">
                        Discover, Read, and Celebrate What Our Community Builds.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Latest Projects Section (real blogs) */}
            <ProjectGrid projects={latestProjects.length ? latestProjects : []} />

            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-10 p-6">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                You can Connect with us on...
              </span>
            </h1>
            <WebpageCards />
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2025 DDC-Web Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;