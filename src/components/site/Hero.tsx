import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section id="home" className="container mx-auto px-4 py-16 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <Card className="glass">
          <CardContent className="p-8 md:p-12">
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-primary md:text-6xl">
              Welcome to ddc-web
            </h1>
            <p className="mb-8 max-w-2xl text-balance text-muted-foreground md:text-lg">
              A bold, glassmorphic React + Tailwind experience inspired by modern developer portfolios. Explore projects and read our latest blogs.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">Explore Projects</Button>
              <Button variant="outline" size="lg" className="hover-scale">Read the Blog</Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  );
};

export default Hero;
