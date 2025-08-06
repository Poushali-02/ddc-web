// Replaced Next.js Link with <a> for Vite/React compatibility
import { Search, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Component() {
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
              <a href="/about" className="text-gray-300 hover:text-yellow-400 transition-colors">
                About
              </a>
              <a href="/showcase" className="text-gray-300 hover:text-yellow-400 transition-colors">
                Showcase
              </a>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-300 hover:text-yellow-400">
                  <Sun className="h-4 w-4" />
                </Button>
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-20">
        <div className="text-center space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center px-3 py-1 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400 text-sm">
              🔍 Explore More Web Development Resources
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                DDC-Web Community
              </span>
            </h1>
          </div>
        </div>

        {/* Latest Projects Section */}
        <div className="mt-32">
          <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-yellow-500/20 p-8">
            <div className="space-y-6">
              <div className="flex items-center space-x-3">
                <h2 className="text-2xl font-bold text-yellow-400">Latest Web Projects</h2>
                <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-transparent rounded"></div>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <div className="bg-black/50 rounded-lg border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm">Project Preview</span>
                    </div>
                    <h3 className="font-semibold text-white">Web Application</h3>
                    <p className="text-gray-400 text-sm">Modern web application built with latest technologies</p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">React</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Next.js</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm">Project Preview</span>
                    </div>
                    <h3 className="font-semibold text-white">E-commerce Platform</h3>
                    <p className="text-gray-400 text-sm">Full-stack e-commerce solution with payment integration</p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">TypeScript</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Node.js</span>
                    </div>
                  </div>
                </div>

                <div className="bg-black/50 rounded-lg border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
                  <div className="space-y-3">
                    <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg flex items-center justify-center">
                      <span className="text-yellow-400 text-sm">Project Preview</span>
                    </div>
                    <h3 className="font-semibold text-white">Dashboard Analytics</h3>
                    <p className="text-gray-400 text-sm">Real-time analytics dashboard with data visualization</p>
                    <div className="flex space-x-2">
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">Vue.js</span>
                      <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">D3.js</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-2">
                  View All Projects
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-yellow-500/20 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-400">
            <p>&copy; 2024 DDC-Web Community. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
