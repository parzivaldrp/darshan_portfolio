import Image from "next/image";
import { Button } from "@/components/ui/buttons";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,

  Briefcase,
  Files,
  
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-background via-background/80 to-purple-100/40 px-4 sm:px-8">
      <section className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12 py-24 md:py-32 animate-fade-in">
        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-8 items-start">
          <div className="flex items-center gap-2 text-muted-foreground animate-slide-in-left">
            <MapPin className="w-4 h-4" />
            <span>Available for opportunities</span>
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight animate-fade-in-delayed">
            {`Hi, I'm`}{' '}
            <span className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 inline-block">
              Darshan
            </span>
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-primary animate-slide-up">
            Aspiring Full Stack Developer
          </h2>
          <p className="text-md md:text-md text-muted-foreground max-w-xl animate-slide-up-delayed">
            Recent Computer Science graduate passionate about creating digital experiences. Eager to apply my skills in React, Node.js, and modern web technologies to build meaningful applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full animate-fade-in">
            <Link href="/Project" passHref >
              <Button
                size="sm"
                className="text-sm p-5 px-8 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all group bg-primary text-white hover:bg-primary/90"
                aria-label="View My Work"
              >
                <Briefcase className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                View My Work
              </Button>
            </Link>
       
            <Link href="/about" passHref >
              <Button
                variant="outline"
                size="sm"
                className="text-sm p-5 px-8 font-semibold hover:scale-105 transition-all group"
                aria-label="About Me"
              >
                <Files className="w-5 h-5 group-hover:scale-110 transition-transform" />
                Resume
              </Button>
            </Link>
          </div>
          <div className="flex gap-4 mt-2 animate-slide-up">
            <a href="https://github.com/parzivaldrp" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gradient-to-r hover:from-purple-500/20 hover:to-pink-500/20 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <Github className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-purple-400" />
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/darshan-panchal-11668129a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gradient-to-r hover:from-blue-500/20 hover:to-purple-500/20 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-blue-500/25"
              >
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-blue-400" />
              </Button>
            </a>
            <a href="mailto:panchaldarshan507@gmail.com" aria-label="Email">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-gradient-to-r hover:from-red-500/20 hover:to-blue-500/20 group transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-red-500/25"
              >
                <Mail className="w-5 h-5 group-hover:scale-110 transition-transform duration-300 group-hover:text-red-400" />
              </Button>
            </a>
          </div>
        </div>
        {/* Right: Profile Image */}
        <div className="flex-1 flex justify-center items-center animate-slide-in-right">
          <div className="relative animate-slide-in-right">
            <div className="z-10 glass-effect rounded-2xl p-2 hover-glow transition-all-smooth">
              <div className="aspect-square  rounded-xl overflow-hidden animate-float hover:animate-pulse-glow transition-all-smooth">
                <Image
                  src="/darshan.png"
                  alt="Darshan - Aspiring Full Stack Developer"
                  className="w-full h-full object-contain hover:scale-105 transition-transform duration-500"
                  width={800}
                  height={800}
                  priority
                />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl transform rotate-6 -z-10 animate-pulse-glow"></div>
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full blur-xl animate-float"></div>
            <div
              className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl animate-float"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </section>

    </main>
  );
}
