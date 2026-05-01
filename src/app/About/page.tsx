'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/buttons';
import {
  GraduationCap,
  MapPin,
  Code2,
  Cloud,
  Database,
  Wrench,
  Music,
  Mic,
  Drama,
  Palette,
  Rocket,
  Mail,
  Github,
  Linkedin,
  Sparkles,
  Heart,
} from 'lucide-react';

/**
 * About page.
 *
 * Structure:
 *   - Hero strip with intro
 *   - "My Story" — Gujarat → Melbourne journey
 *   - "What I Work With" — categorised skills
 *   - "Education" — VNSGU CS degree
 *   - "Beyond the Keyboard" — creative hobbies card
 *   - "What I'm Looking For" — role pitch
 *   - CTA — email + socials
 *
 * Animations and styling are kept consistent with the home page and
 * Project page so the site feels like one designer built all three.
 */

const skillBuckets = [
  {
    icon: Code2,
    title: 'Languages & Frameworks',
    items: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Tailwind CSS'],
  },
  {
    icon: Database,
    title: 'Databases & Backend',
    items: ['Postgres (Supabase)', 'MongoDB', 'REST APIs', 'Row Level Security'],
  },
  {
    icon: Cloud,
    title: 'Cloud & Services',
    items: ['AWS Textract', 'Vercel', 'Supabase', 'Resend', 'EmailJS'],
  },
  {
    icon: Wrench,
    title: 'Tools & Workflow',
    items: ['Git / GitHub', 'Framer Motion', 'shadcn/ui', 'Figma'],
  },
];

const hobbies = [
  {
    icon: Mic,
    title: 'Singing',
    blurb: 'I sing whenever I can — being comfortable with a mic also helps in interviews and demos.',
  },
  {
    icon: Music,
    title: 'Guitar',
    blurb: 'Picking up chords trained the same muscle I use to pick up new APIs — practice over panic.',
  },
  {
    icon: Drama,
    title: 'Acting & dance',
    blurb: 'Stage time taught me to read a room, communicate clearly, and not freeze under pressure.',
  },
  {
    icon: Palette,
    title: 'Sketching',
    blurb: 'Drawing keeps my eye for layout and detail sharp — useful when crafting clean UIs.',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-background via-background/80 to-purple-100/40 px-4 sm:px-8 py-20">
      <div className="max-w-5xl mx-auto">
        {/* Hero ---------------------------------------------------------- */}
        <motion.section
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col md:flex-row items-center gap-10 mb-20"
        >
          <motion.div variants={itemVariants} className="shrink-0">
            <div className="relative">
              <div className="glass-effect rounded-2xl p-2 hover-glow transition-all-smooth">
                <div className="w-48 h-48 md:w-56 md:h-56 rounded-xl overflow-hidden">
                  <Image
                    src="/darshan.png"
                    alt="Darshan Panchal"
                    width={400}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 to-purple-600/20 rounded-2xl -z-10 blur-xl" />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex-1">
            <div className="inline-flex items-center gap-2 bg-card/60 backdrop-blur-sm border border-border/50 rounded-full px-4 py-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                About me
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Hi, I&apos;m{' '}
              <span className="bg-gradient-to-br from-primary to-purple-600 bg-clip-text text-transparent">
                Darshan
              </span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Junior full stack developer based in Melbourne. I build modern
              web apps with React, Next.js, TypeScript, and AWS — the kind that
              are fast, readable, and don&apos;t break in production.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>Melbourne, Australia</span>
            </div>
          </motion.div>
        </motion.section>

        {/* My Story ------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Rocket className="w-7 h-7 text-primary" />
            My story
          </h2>
          <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
            <CardContent className="p-8 space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I grew up between cultures — born in New Zealand, schooled in
                Gujarat, India, and now living in Melbourne, Australia. That
                kind of mobility teaches you to adapt fast, which turns out to
                be the same skill that matters most in software.
              </p>
              <p>
                I picked up coding because I liked the idea that you can sketch
                an idea on Friday and ship it to real users by Sunday. Since
                then I&apos;ve been deep in the JavaScript ecosystem — building
                full stack apps with React, Next.js, and Node, wiring them up
                to Postgres or Mongo, deploying to Vercel, and breaking things
                until I understand them.
              </p>
              <p>
                My latest project, <strong>InvoicePro</strong>, is a live SaaS
                app that uses AWS Textract to OCR receipts into editable
                invoices. It taught me a lot about real-world concerns —
                authentication, row-level security, rate-limiting an AI
                endpoint so it can&apos;t be abused, and shipping with the
                kind of guard rails that don&apos;t embarrass you in a code
                review.
              </p>
            </CardContent>
          </Card>
        </motion.section>

        {/* Skills --------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <Code2 className="w-7 h-7 text-primary" />
            What I work with
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {skillBuckets.map((bucket) => (
              <motion.div
                key={bucket.title}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <bucket.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg">{bucket.title}</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {bucket.items.map((item) => (
                        <Badge
                          key={item}
                          variant="outline"
                          className="bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                        >
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6 italic">
            I learn quickly — I picked up Next.js App Router, Supabase RLS,
            and the AWS Textract SDK while building my latest project, all
            from official docs and trial-and-error. Whatever stack a team
            runs, I can ramp in.
          </p>
        </motion.section>

        {/* Education ------------------------------------------------------ */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
            <GraduationCap className="w-7 h-7 text-primary" />
            Education
          </h2>
          <Card className="bg-card/60 backdrop-blur-sm border border-border/50">
            <CardContent className="p-8">
              <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-6">
                <div className="shrink-0 p-3 rounded-xl bg-gradient-to-br from-primary/20 to-purple-600/20">
                  <GraduationCap className="w-8 h-8 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1">
                    Bachelor of Computer Science
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    Veer Narmad South Gujarat University (VNSGU)
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Surat, Gujarat, India
                  </p>
                  <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                    Built my CS foundation through the degree — data
                    structures, algorithms, OOP, databases — then took the
                    long way round to web development on my own time, building
                    real projects until they worked.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Hobbies -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Heart className="w-7 h-7 text-primary" />
            Beyond the keyboard
          </h2>
          <p className="text-muted-foreground mb-8">
            Software is the day job. These keep me sharp everywhere else.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {hobbies.map((hobby) => (
              <motion.div
                key={hobby.title}
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="h-full bg-card/60 backdrop-blur-sm border border-border/50 hover:border-primary/40 transition-colors">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="shrink-0 p-2 rounded-lg bg-primary/10">
                      <hobby.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{hobby.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {hobby.blurb}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* What I'm looking for ------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <Card className="bg-gradient-to-br from-primary/10 via-card/80 to-purple-600/10 backdrop-blur-sm border border-primary/30">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                What I&apos;m looking for
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                A junior or entry-level role at a team that ships real
                software and is happy to mentor. I&apos;m looking to learn under
                experienced engineers, contribute from day one, and grow into
                a developer companies want to keep around. Frontend,
                full-stack, or backend — show me a real product and I&apos;ll
                show up.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
                <Link href="/Contact">
                  <Button
                    size="sm"
                    className="text-sm p-5 px-8 font-semibold shadow-lg hover:scale-105 hover:shadow-xl transition-all bg-primary text-white hover:bg-primary/90"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Get in touch
                  </Button>
                </Link>
                <Link href="/Project">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-sm p-5 px-8 font-semibold hover:scale-105 transition-all"
                  >
                    <Rocket className="w-4 h-4 mr-2" />
                    See my work
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Socials -------------------------------------------------------- */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground mb-4">
            Or reach me directly
          </p>
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/parzivaldrp"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:scale-110 transition-all"
              >
                <Github className="w-5 h-5" />
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/darshan-panchal-11668129a/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:scale-110 transition-all"
              >
                <Linkedin className="w-5 h-5" />
              </Button>
            </a>
            <a href="mailto:panchaldarshan507@gmail.com" aria-label="Email">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full hover:bg-primary/10 hover:scale-110 transition-all"
              >
                <Mail className="w-5 h-5" />
              </Button>
            </a>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
