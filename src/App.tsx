import { Search, Sun } from "lucide-react";
import { Button } from "./components/ui/button";
import projectsData from "./data/projects.json";
import { ProjectGrid } from "./components/project-grid";
import { Spotlight } from "./components/ui/spotlight-new";
import WebpageCards from "./components/webpage-card";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);


function App() {
  useGSAP(() =>{
        gsap.fromTo(".main-text h1",
            {y: 50, opacity: 0},
            {y: 0, opacity: 1, duration: 2, ease: "power2.inOut", stagger: 0.3}
        )
    })
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="border-b border-yellow-500/20 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="text-xl font-semibold text-yellow-400">
              Realtime DDC-Web Projects Showcase
            </a>
            <nav className="hidden md:flex items-center space-x-6">
              <a
                href="/about"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                About
              </a>
              <a
                href="/showcase"
                className="text-gray-300 hover:text-yellow-400 transition-colors"
              >
                Showcase
              </a>
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

      {/* Hero Section */}
      <main className="relative">
        <div className="h-[40rem] w-full flex items-center justify-center bg-black/[0.96] antialiased bg-grid-white/[0.02] relative overflow-hidden">
          <Spotlight fill="#ffc600" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-8">
              <div className="space-y-4 main-text">
                <div className="inline-flex items-center px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm">
                  🔍 Explore More Web Development Resources
                </div>

                <h1 className="fade-on-scroll text-4xl md:text-6xl lg:text-7xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                    DDC-Web Community
                  </span>
                </h1>
              </div>
            </div>
          </div>
        </div>

        {/* Latest Projects Section */}
        <ProjectGrid projects={projectsData.projects} />

        <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mt-10 p-6">
          <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
            You can Connect with us on...
          </span>
        </h1>
        <WebpageCards />
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
