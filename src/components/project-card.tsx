import { Project } from "../types/project";
import { CardBody, CardContainer, CardItem } from "./ui/3d-card";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <CardContainer className="inter-var w-full">
      <CardBody className="relative bg-gradient-to-br from-black/80 to-black/60 rounded-xl border border-yellow-500/20 p-6 group hover:border-yellow-400/40 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 w-auto sm:w-[30rem] h-auto">
        <CardItem
          translateZ="100"
          className="w-full mb-4 group-hover:scale-105 transition-transform duration-300"
        >
          <div className="w-full h-40 bg-gradient-to-br from-yellow-500/20 via-yellow-500/10 to-yellow-600/5 rounded-lg flex items-center justify-center backdrop-blur-sm">
            {project.previewImage ? (
              <img
                src={project.previewImage}
                alt={project.title}
                className="w-full h-full object-cover rounded-lg opacity-80 hover:opacity-100 transition-opacity"
              />
            ) : (
              <span className="text-yellow-400 text-sm font-medium">
                Project Preview
              </span>
            )}
          </div>
        </CardItem>

        <CardItem
          translateZ="75"
          className="font-bold text-white text-2xl mb-2 group-hover:text-yellow-400/90 transition-colors duration-300"
        >
          {project.title}
        </CardItem>

        <CardItem
          translateZ="60"
          as="p"
          className="text-gray-400 text-sm mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300"
        >
          {project.description}
        </CardItem>

        <CardItem translateZ="50" className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 bg-yellow-500/10 text-yellow-400 text-xs font-medium rounded-full border border-yellow-500/20 hover:border-yellow-400/40 hover:bg-yellow-500/20 transition-all duration-300"
            >
              {tech}
            </span>
          ))}
        </CardItem>
      </CardBody>
    </CardContainer>
  );
}
