import { Project } from "../types/project";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-black/50 rounded-lg border border-yellow-500/20 p-6 hover:border-yellow-400/40 transition-colors">
      <div className="space-y-3">
        <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 rounded-lg flex items-center justify-center">
          <span className="text-yellow-400 text-sm">Project Preview</span>
        </div>
        <h3 className="font-semibold text-white">{project.title}</h3>
        <p className="text-gray-400 text-sm">{project.description}</p>
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
