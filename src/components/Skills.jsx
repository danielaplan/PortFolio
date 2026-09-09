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

export default function Skills({ isActive = true }) {
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
      className={`min-h-0 lg:min-h-[calc(100dvh-4rem)] flex flex-col justify-start pt-14 pb-12 sm:pt-20 sm:pb-16 scroll-mt-16 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] space-y-10 px-5 sm:px-8 lg:space-y-14 lg:px-12">

        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <div>
            <p
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              My skills
            </p>
            <h2
              className="text-3xl font-medium tracking-[-0.04em] sm:text-5xl"
              style={{ color: 'var(--text-primary)' }}
            >
              Technical Skills
            </h2>
            <p
              className="mt-3 max-w-xl text-sm font-normal leading-6 sm:text-base sm:leading-7"
              style={{ color: 'var(--text-secondary)' }}
            >
              Tools and technologies I use to build web applications, solve problems, and keep learning.
            </p>
          </div>
        </div>

        {/* Editorial skill index */}
        <div className="grid gap-x-12 lg:grid-cols-2">
          {[skillCategories.slice(0, 3), skillCategories.slice(3)].map((column, columnIndex) => (
            <div key={columnIndex}>
              {column.map((category) => {
                const index = skillCategories.indexOf(category);
                return (
              <div
                key={index}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-t py-5 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-6"
                style={{
                  borderColor: 'var(--border)',
                }}
              >
                <span className="pt-0.5 text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3 className="text-base font-medium sm:text-lg" style={{ color: 'var(--text-primary)' }}>
                    {category.title}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                    {category.skills.map((skill, sIndex) => (
                      <span key={sIndex} className="text-xs sm:text-sm" style={{ color: 'var(--text-secondary)' }}>
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-4 text-xs italic" style={{ color: 'var(--text-secondary)' }}>
          <span>Always learning. Always building.</span>
          <span className="h-px w-14" style={{ backgroundColor: 'var(--border)' }} />
        </div>

      </div>
    </section>
  );
}
