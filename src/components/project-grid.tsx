import { Project } from "../types/project";
import { ProjectCard } from "./project-card";
import { Button } from "./ui/button";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="mt-32">
      <div className="bg-gray-900/50 backdrop-blur rounded-2xl border border-yellow-500/20 p-8">
        <div className="space-y-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-2xl font-bold text-yellow-400">
              Latest Web Projects
            </h2>
            <div className="h-1 flex-1 bg-gradient-to-r from-yellow-400 to-transparent rounded"></div>
          </div>

          <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          <div className="text-center">
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-2">
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
