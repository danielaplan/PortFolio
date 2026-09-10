import React, { useRef } from 'react';
import {
  Terminal, Code, Database, Wrench,
  Zap, ShieldCheck, Cpu, Smartphone, Palette, Table, Network
} from 'lucide-react';
import { Lightning } from '@phosphor-icons/react';
import {
  JavaIcon, CSharpIcon, PhpIcon, JavascriptIcon, TypescriptIcon,
  HtmlCssIcon, ReactIcon, TailwindIcon, ViteIcon, MysqlIcon,
  MariadbIcon, SqliteIcon, GitIcon, NodeIcon, VscodeIcon
} from './icons/TechIcons';
import { useScrollReveal } from '../hooks/useScrollReveal';

export default function Skills() {
  const sectionRef = useRef(null);
  useScrollReveal(sectionRef, { threshold: 0.05 });

  const skillCategories = [
    {
      title: "Programming Languages",
      badge: "Core Logic",
      focus: "OOP & Server Logic",
      icon: Terminal,
      description: "Fundamental languages for algorithms, backend services, and interactive web architecture.",
      application: "Applied in core full-stack builds, APIs, and data modeling.",
      skills: [
        { name: "Java", icon: JavaIcon },
        { name: "C#", icon: CSharpIcon },
        { name: "PHP", icon: PhpIcon },
        { name: "JavaScript", icon: JavascriptIcon },
        { name: "TypeScript", icon: TypescriptIcon },
      ]
    },
    {
      title: "Frontend & Web",
      badge: "Interactive UI",
      focus: "Responsive & Modern",
      icon: Code,
      description: "Building fast, accessible, and dynamic interfaces with component-driven architecture.",
      application: "Applied in single-page apps, design systems, and responsive layouts.",
      skills: [
        { name: "React", icon: ReactIcon },
        { name: "Tailwind CSS", icon: TailwindIcon },
        { name: "Vite", icon: ViteIcon },
        { name: "HTML5 & CSS3", icon: HtmlCssIcon },
        { name: "Responsive Design", icon: (props) => <Smartphone size={14} {...props} /> },
        { name: "UI/UX Principles", icon: (props) => <Palette size={14} {...props} /> },
      ]
    },
    {
     title: "Backend",
     badge: "03",
     focus: "Services & APIs",
      icon: Database,
     description: "Building server workflows and REST endpoints for connected web applications.",
     application: "Applied in full-stack projects and CRUD services.",
      skills: [
        { name: "Node.js", icon: NodeIcon },
        { name: "REST APIs", icon: (props) => <Network size={14} {...props} /> },
        { name: "PHP", icon: PhpIcon },
        { name: "Laravel", icon: (props) => <Code size={14} {...props} /> },
      ]
    },
    {
     title: "Databases",
     badge: "04",
     focus: "Data & Storage",
     icon: Database,
     description: "Designing structured schemas and reliable data models for application workflows.",
     application: "Applied in relational querying and data persistence.",
     skills: [
        { name: "MySQL", icon: MysqlIcon },
        { name: "MariaDB", icon: MariadbIcon },
        { name: "SQLite", icon: SqliteIcon },
        { name: "Relational Schema Design", icon: (props) => <Table size={14} {...props} /> },
      ]
    },
    {
      title: "Tools & Workflow",
      badge: "DevOps & Tooling",
      focus: "Engineering Lifecycle",
      icon: Wrench,
      description: "Version control, modern IDE tooling, and structured software architecture workflows.",
      application: "Applied in collaborative Git workflows and project releases.",
      skills: [
        { name: "Git & GitHub", icon: GitIcon },
        { name: "VS Code", icon: VscodeIcon },
        { name: "Systems Architecture", icon: (props) => <Cpu size={14} {...props} /> },
      ]
    }
  ];

  return (
    <section
      id="skills"
      ref={sectionRef}
      style={{ backgroundColor: 'var(--bg-canvas)' }}
      className={`min-h-0 lg:min-h-[calc(100dvh-4rem)] flex flex-col justify-center border-t px-4 pb-12 pt-14 scroll-mt-16 sm:px-8 sm:pb-16 sm:pt-20 lg:px-12 lg:pt-24`}
    >
      <div className="mx-auto w-full max-w-[1400px] space-y-10 lg:space-y-14">

        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div>
            <h2
              className="text-4xl font-medium tracking-[-0.05em] sm:text-6xl"
              style={{ color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}
            >
              How I build
            </h2>
            <p
              className="mt-3 max-w-xl text-sm font-normal leading-6 sm:text-base sm:leading-7"
              style={{ color: 'var(--text-secondary)' }}
            >
              Tools and technologies I use to build web applications, solve problems, and keep learning.
            </p>
          </div>
        </div>

        <div className="grid gap-x-12 lg:grid-cols-2">
          {skillCategories.map((category) => (
             <div
               key={category.title}
               className="border-t py-5 sm:py-6"
               style={{
                 borderColor: 'var(--border)',
               }}
             >
               <div>
                 <h3 className="text-base font-medium sm:text-lg" style={{ color: 'var(--accent)' }}>
                   {category.title}
                 </h3>
                 <p className="mt-2 text-sm leading-6" style={{ color: 'var(--text-secondary)' }}>
                   {category.description}
                 </p>
                 <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                   {category.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="text-sm" style={{ color: 'var(--text-primary)' }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
          ))}
        </div>

      </div>
    </section>
  );
}
