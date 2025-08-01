"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/buttons";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { fetchProjects, createProject } from "@/lib/api";
import type { Project, CreateProjectRequest } from "@/types/project";
import Image from "next/image";

export default function Admin() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<CreateProjectRequest>({
    name: "",
    description: "",
    gitLink: "",
    liveLink: "",
    techStack: [],
    image: [],
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    fetchProjects()
      .then((data) => setProjects(data))
      .finally(() => setLoading(false));
  }, []);

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        name: project.name,
        description: project.description,
        gitLink: project.gitLink,
        liveLink: project.liveLink,
        techStack: project.techStack,
        image: project.image,
      });
    } else {
      setFormData({
        name: "",
        description: "",
        gitLink: "",
        liveLink: "",
        techStack: [],
        image: [],
      });
      setEditingProject(null);
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Handle file uploads first
      let finalImageUrls = formData.image;
      if (selectedFiles.length > 0) {
        finalImageUrls = await handleFileUpload(selectedFiles);
      }

      const projectData = {
        ...formData,
        image: finalImageUrls
      };

      if (editingProject) {
        // await updateProject({
        //   id: editingProject._id,
        //   ...projectData,
        // });
      } else {
        await createProject(projectData);
        // Refresh the projects list
        const updatedProjects = await fetchProjects();
        setProjects(updatedProjects);
      }

      setIsDialogOpen(false);
      setFormData({
        name: "",
        description: "",
        gitLink: "",
        liveLink: "",
        techStack: [],
        image: [],
      });
      setSelectedFiles([]);
      setEditingProject(null);
    } catch (error) {
      console.error("Error saving project:", error);
      alert(error instanceof Error ? error.message : "Failed to save project");
    }
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        // await deleteProject(id);
      } catch (error) {
        console.error("Error deleting project:", error);
      }
    }
  };

  const handleTechStackChange = (techStackString: string) => {
    const techStack = techStackString
      .split(",")
      .map((tech) => tech.trim())
      .filter((tech) => tech.length > 0);
    setFormData({ ...formData, techStack });
  };

  const handleImageChange = async (files: FileList | null) => {
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles(fileArray);
      
      // Convert files to Base64 for MongoDB storage
      const base64Images = await Promise.all(
        fileArray.map(file => convertFileToBase64(file))
      );
      
      setFormData({ ...formData, image: base64Images });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert file to Base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = async (files: File[]) => {
    // Convert files to Base64 strings for MongoDB storage
    const base64Images = await Promise.all(
      files.map(file => convertFileToBase64(file))
    );
    return base64Images;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-16 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your portfolio projects
            </p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={() => handleOpenDialog()} className="gap-2">
                <Plus className="w-4 h-4" />
                Add Project
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingProject ? "Edit Project" : "Add New Project"}
                </DialogTitle>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Project Images *</Label>
                    <Input
                      id="image"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleImageChange(e.target.files)}
                      required
                    />
                    {selectedFiles.length > 0 && (
                      <div className="text-sm text-muted-foreground">
                        Selected: {selectedFiles.map(f => f.name).join(', ')}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={2}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="techStack">Tech Stack (comma-separated) *</Label>
                  <Input
                    id="techStack"
                    value={formData.techStack.join(", ")}
                    onChange={(e) => handleTechStackChange(e.target.value)}
                    placeholder="React, TypeScript, Node.js"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="gitLink">GitHub URL</Label>
                    <Input
                      id="gitLink"
                      value={formData.gitLink}
                      onChange={(e) =>
                        setFormData({ ...formData, gitLink: e.target.value })
                      }
                      placeholder="https://github.com/username/repo"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="liveLink">Live Demo URL</Label>
                    <Input
                      id="liveLink"
                      value={formData.liveLink}
                      onChange={(e) =>
                        setFormData({ ...formData, liveLink: e.target.value })
                      }
                      placeholder="https://example.com"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" className="flex-1">
                    {editingProject ? "Update Project" : "Create Project"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{projects.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projects with Live Demo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.liveLink).length}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Projects with GitHub
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {projects.filter((p) => p.gitLink).length}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card key={project._id} className="group relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:border-primary/60 border border-transparent hover:bg-gradient-to-br hover:from-primary/10 hover:to-purple-600/10">
              <div className="aspect-video bg-muted relative overflow-hidden">
                <Image
                  src={project.image[0] || "/placeholder.svg"}
                  alt={project.name}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg";
                  }}
                />
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold mb-2 truncate">{project.name}</h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {(project.techStack || []).slice(0, 3).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs">
                      {tech}
                    </Badge>
                  ))}
                  {Array.isArray(project.techStack) && project.techStack.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{project.techStack.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {project.liveLink && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                    {project.gitLink && (
                      <Button size="sm" variant="ghost" asChild>
                        <a
                          href={project.gitLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Github className="w-3 h-3" />
                        </a>
                      </Button>
                    )}
                  </div>

                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleOpenDialog(project)}
                    >
                      <Edit className="w-3 h-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => handleDelete()}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {projects.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center">
              <Plus className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold mb-2">No projects yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first project to get started
            </p>
            <Button onClick={() => handleOpenDialog()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Project
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
