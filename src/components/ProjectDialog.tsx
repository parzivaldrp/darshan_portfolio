import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import type { Project } from "@/types/project";
import Image from 'next/image';

export default function ProjectDialog({ project, children }: { project: Project, children: React.ReactNode }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">{project.name}</DialogTitle>
        </DialogHeader>
        <div className="mt-2 ">
          <Image
            src={project.image[0] || "/placeholder.svg"}
            alt={project.name}
            width={400}
            height={225}
            className="object-cover rounded mb-4 "
          />
          <p className="mb-2 text-muted-foreground">{project.description}</p>
          <div className="mb-4 flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
            ))}
          </div>
          <div className="flex gap-2">
            {project.liveLink && (
              <Button asChild variant="outline" className="hover:shadow-lg hover:shadow-purple-500/30" size="sm">
                <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                </a>
              </Button>
            )}
            {project.gitLink && (
              <Button asChild variant="outline" className="hover:shadow-lg hover:shadow-purple-500/30"  size="sm">
                <a href={project.gitLink} target="_blank" rel="noopener noreferrer">
                  <Github className="w-4 h-4 mr-1" /> GitHub
                </a>
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
