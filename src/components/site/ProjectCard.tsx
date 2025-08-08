import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  href: string;
};

const ProjectCard = ({ title, description, href }: Project) => {
  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 250, damping: 20 }}>
      <Card className="glass h-full">
        <CardHeader>
          <CardTitle className="text-primary">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col justify-between gap-4">
          <p className="text-sm text-muted-foreground">{description}</p>
          <div>
            <Button asChild>
              <a href={href} target="_blank" rel="noreferrer">View Project</a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectCard;
