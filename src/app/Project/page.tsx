'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import type { Project } from '@/types/project';
import ProjectDialog from '@/components/ProjectDialog';
import { fetchProjects } from '@/lib/api';
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import Image from "next/image";

const Project = () => {

    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const MotionImage = motion(Image);

    useEffect(() => {
        fetchProjects()
            .then((data) => setProjects(data))
            .finally(() => setLoading(false));

    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1
        }
    };

    const imageVariants = {
        hover: {
            scale: 1.1
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center"
                >
                    <div className="w-12 h-12 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-6" />
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-muted-foreground text-lg"
                    >
                        Loading amazing projects...
                    </motion.p>
                </motion.div>
            </div>
        );
    }

    return (
        <section className="py-20 bg-background relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-6 py-3 mb-8"
                    >
                        <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                        <span className="text-sm font-medium text-muted-foreground">Portfolio Showcase</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-light text-foreground mb-6 tracking-tight">
                        Featured <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent font-light">Projects</span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                        className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
                    >
                        Here are some of my recent projects that showcase my skills and
                        passion for creating exceptional digital experiences.
                    </motion.p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {projects.map((project, index) => (
                        <ProjectDialog key={project._id} project={project}>
                            <motion.div
                                key={project._id}
                                variants={cardVariants}
                                whileHover={{ y: -8 }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="group overflow-hidden cursor-pointer transition-all-smooth hover:shadow-2xl hover:shadow-primary/20 bg-card/60 backdrop-blur-sm border border-border/50">
                                    <div className=" bg-gradient-to-br from-primary/10 to-primary/5 relative overflow-hidden">
                                        <MotionImage
                                            src={project.image?.[0] || "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=400&h=225&fit=crop"}
                                            alt={project.name}
                                            width={400}
                                            height={225}
                                            className="object-cover w-full h-[225px]"
                                            variants={imageVariants}
                                            whileHover="hover"
                                            style={{ objectFit: "cover" }}
                                        />
                                        <motion.div
                                            initial={{ opacity: 0 }}
                                            whileHover={{ opacity: 1 }}
                                            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
                                            transition={{ duration: 0.3 }}
                                        />

                                        {/* Hover overlay with project info */}

                                    </div>

                                    <CardContent className="p-6">
                                        <motion.h3
                                            className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors"
                                            whileHover={{ x: 4 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            {project.name}
                                        </motion.h3>
                                        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                            {project.description}
                                        </p>

                                        <motion.div
                                            className="flex flex-wrap gap-2"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: index * 0.1 + 0.5 }}
                                        >
                                            {(project.techStack || []).slice(0, 3).map((tech, techIndex) => (
                                                <motion.div
                                                    key={tech}
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{
                                                        delay: index * 0.1 + techIndex * 0.1 + 0.6,
                                                        duration: 0.3
                                                    }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs bg-primary/5 border-primary/20 text-primary hover:bg-primary/10 transition-colors"
                                                    >
                                                        {tech}
                                                    </Badge>
                                                </motion.div>
                                            ))}

                                            {project.techStack && project.techStack.length > 3 && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.1 + 0.9 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs opacity-70 cursor-default bg-muted/30"
                                                    >
                                                        +{project.techStack.length - 3} more
                                                    </Badge>
                                                </motion.div>
                                            )}
                                        </motion.div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </ProjectDialog>
                    ))}
                </motion.div>

            </div>
        </section>
    );
}

export default Project