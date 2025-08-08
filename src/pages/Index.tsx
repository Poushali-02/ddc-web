import Navbar from "@/components/site/Navbar";
import Hero from "@/components/site/Hero";
import ProjectCard from "@/components/site/ProjectCard";
import BlogCard from "@/components/site/BlogCard";
import Footer from "@/components/site/Footer";
import { motion } from "framer-motion";

const projects = [
  { title: "DevOps Dashboard", description: "Real-time metrics and deployment controls with a sleek glass UI.", href: "#" },
  { title: "CI/CD Templates", description: "Reusable workflows and pipelines for faster shipping.", href: "#" },
  { title: "Infra as Code", description: "IaC modules for scalable, reproducible environments.", href: "#" },
];

const blogs = [
  { title: "Optimizing Build Pipelines", snippet: "Discover techniques to shave minutes off your builds...", href: "#" },
  { title: "Kubernetes Best Practices", snippet: "Battle-tested tips for production-grade clusters...", href: "#" },
  { title: "Observability 101", snippet: "Logs, metrics, traces — how to stitch them together...", href: "#" },
];

const Index = () => {
  return (
    <div>
      <Navbar />
      <main>
        <Hero />

        <section id="projects" className="container mx-auto px-4 py-12 md:py-16">
          <header className="mb-6 md:mb-10">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Projects</h2>
            <p className="mt-2 text-muted-foreground">A selection of recent work and experiments.</p>
          </header>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {projects.map((p) => (
              <ProjectCard key={p.title} {...p} />
            ))}
          </motion.div>
        </section>

        <section id="blogs" className="container mx-auto px-4 py-12 md:py-16">
          <header className="mb-6 md:mb-10">
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Blogs</h2>
            <p className="mt-2 text-muted-foreground">Latest thoughts, guides and write-ups.</p>
          </header>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {blogs.map((b) => (
              <BlogCard key={b.title} {...b} />
            ))}
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
