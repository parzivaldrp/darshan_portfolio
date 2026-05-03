import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import type { Project } from "@/types/project";
import Image from 'next/image';

/**
 * Normalize a URL string so the browser treats it as absolute.
 *
 * If the admin saves a link without a protocol (e.g. just
 * "darshan-portfolio-rose.vercel.app"), the browser interprets it as a
 * RELATIVE path — so the anchor tries to navigate to
 * /Project/darshan-portfolio-rose.vercel.app which 404s silently and
 * makes "Live Demo" feel broken. This guard prepends https:// when
 * needed so values entered casually in the admin form still work.
 */
function ensureAbsoluteUrl(url: string | undefined | null): string | undefined {
  if (!url) return undefined;
  const trimmed = url.trim();
  if (!trimmed) return undefined;
  // If it already has any protocol (http://, https://, mailto:, etc.) keep it.
  if (/^[a-z][a-z0-9+.-]*:\/\//i.test(trimmed) || trimmed.startsWith("mailto:")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

export default function ProjectDialog({ project, children }: { project: Project, children: React.ReactNode }) {
  const liveHref = ensureAbsoluteUrl(project.liveLink);
  const gitHref = ensureAbsoluteUrl(project.gitLink);

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
            {liveHref && (
              <Button asChild variant="outline" className="hover:shadow-lg hover:shadow-purple-500/30" size="sm">
                <a href={liveHref} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-1" /> Live Demo
                </a>
              </Button>
            )}
            {gitHref && (
              <Button asChild variant="outline" className="hover:shadow-lg hover:shadow-purple-500/30"  size="sm">
                <a href={gitHref} target="_blank" rel="noopener noreferrer">
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
