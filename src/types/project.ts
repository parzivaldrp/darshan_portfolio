export interface Project {
  _id: string;
  name: string;
  description: string;
  gitLink: string;
  liveLink: string;
  techStack: string[];
  image: string[];
}

export interface CreateProjectRequest {
  name: string;
  description: string;
  gitLink: string;
  liveLink: string;
  techStack: string[];
  image: string[];
} 