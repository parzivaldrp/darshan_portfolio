'use client';
import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { fetchProjects } from '@/lib/api';
import type { Project } from '@/types/project';
import ProjectDialog from '@/components/ProjectDialog';
import Image from 'next/image';


const Project = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        fetchProjects()
            .then((data) => setProjects(data))
            .finally(() => setLoading(false));

    }, []);


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



        <section className="py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        Featured Projects
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                        Here are some of my recent projects that showcase my skills and
                        passion for creating exceptional digital experiences.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <ProjectDialog key={project._id} project={project}>
                            <Card
                                className="group overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 hover:-translate-y-2"
                                style={{ animationDelay: `${index * 150}ms` }}
                            >
                                <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary-600/20 relative overflow-hidden">
                                    <Image
                                        src={project.image[0] || "/placeholder.svg"}
                                        alt={project.name}
                                        width={400}
                                        height={225}
                                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                                        onError={(e) => {
                                            e.currentTarget.src = "/placeholder.svg";
                                        }}
                                    />
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                                </div>
                                <CardContent className="p-6">
                                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                                        {project.name}
                                    </h3>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        {project.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {(project.techStack || []).slice(0, 3).map((tech) => (
                                            <Badge key={tech} variant="outline" className="text-xs">
                                                {tech}
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </ProjectDialog>
                    ))}
                </div>


            </div>
        </section>
       
    )
}

export default Project