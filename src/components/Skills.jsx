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
      title: "Backend & Databases",
      badge: "Architecture",
      focus: "Data & APIs",
      icon: Database,
      description: "Designing structured database schemas, RESTful endpoints, and server workflows.",
      application: "Applied in relational database querying, authentication, and CRUD services.",
      skills: [
        { name: "Node.js", icon: NodeIcon },
        { name: "MySQL", icon: MysqlIcon },
        { name: "MariaDB", icon: MariadbIcon },
        { name: "SQLite", icon: SqliteIcon },
        { name: "Relational Schema Design", icon: (props) => <Table size={14} {...props} /> },
        { name: "REST APIs", icon: (props) => <Network size={14} {...props} /> },
      ]
    },
    {
      title: "Tools & Workflow",
      badge: "DevOps & Tooling",
      focus: "Engineering Lifecycle",
      icon: Wrench,
      description: "Version control, modern IDE tooling, and structured software architecture workflows.",
      application: "Applied in collaborative Git workflows, code reviews, and project releases.",
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
      className={`min-h-[100dvh] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 scroll-mt-0 transition-all duration-700 ${
        isActive
          ? 'opacity-100 translate-y-0 scale-100'
          : 'opacity-40 translate-y-6 scale-[0.985]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <p
              className="text-xs font-mono font-semibold uppercase tracking-wider mb-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              Technical Proficiency
            </p>
            <h2
              className="text-3xl sm:text-4xl font-extrabold tracking-tight"
              style={{ color: 'var(--text-primary)' }}
            >
              Skills &amp; Technologies
            </h2>
            <p
              className="text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed"
              style={{ color: 'var(--text-secondary)' }}
            >
              Core competencies acquired through coursework at University of Caloocan City and hands-on full-stack engineering.
            </p>
          </div>

          <div
            className="px-3.5 py-2 rounded-xl text-xs font-mono flex items-center gap-2"
            style={{
              backgroundColor: 'var(--bg-surface)',
              border: '1px solid var(--border)',
              color: 'var(--text-secondary)',
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: 'var(--status-active)' }} />
            <span>20+ Technologies &amp; Tools</span>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                className="rounded-2xl p-6 sm:p-8 border card-hover"
                style={{
                  backgroundColor: 'var(--bg-surface)',
                  borderColor: 'var(--border)',
                }}
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div
                        className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{
                          backgroundColor: 'var(--bg-surface)',
                          border: '1px solid var(--border)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        <CategoryIcon size={20} weight="bold" />
                      </div>
                      <div>
                        <h3
                          className="font-bold text-base sm:text-lg"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {category.title}
                        </h3>
                        <span className="text-xs font-mono" style={{ color: 'var(--text-secondary)' }}>
                          {category.focus}
                        </span>
                      </div>
                    </div>
                    <span
                      className="px-3 py-1 rounded-lg text-[10px] font-mono font-semibold uppercase"
                      style={{
                        backgroundColor: 'var(--bg-canvas)',
                        border: '1px solid var(--border)',
                        color: 'var(--text-secondary)',
                      }}
                    >
                      {category.badge}
                    </span>
                  </div>

                  <p
                    className="text-xs sm:text-sm mb-5 leading-relaxed font-normal"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {category.description}
                  </p>

                  <div className="flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIndex) => {
                      const SkillIcon = skill.icon;
                      return (
                        <span
                          key={sIndex}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-mono font-medium cursor-default"
                          style={{
                            backgroundColor: 'var(--bg-surface)',
                            border: '1px solid var(--border)',
                            color: 'var(--text-secondary)',
                          }}
                        >
                          <SkillIcon className="w-4 h-4 shrink-0 opacity-80" />
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Application Note */}
                <div
                  className="mt-6 pt-4 flex items-center gap-2 text-[11px] font-mono"
                  style={{ borderTop: '1px solid var(--border)', color: 'var(--text-secondary)' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--text-tertiary)' }} />
                  <span>{category.application}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Architecture Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {[
            { icon: Lightning, title: "Full-Stack Integration", desc: "Connecting interactive React user interfaces with secure backend endpoints and schema logic." },
            { icon: Database, title: "Structured Schemas", desc: "Designing normalized relational models with MySQL and MariaDB with consistent query integrity." },
            { icon: ShieldCheck, title: "Clean Architecture", desc: "Writing modular, maintainable code with strict typing, Git versioning, and design consistency." },
          ].map(({ icon: Icon, title, desc }, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-xl border card-hover"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border)' }}
            >
              <div className="flex items-start gap-3.5">
                <div
                  className="p-2 rounded-lg shrink-0"
                  style={{ backgroundColor: 'var(--pastel-blue-bg)', color: 'var(--pastel-blue-text)' }}
                >
                  <Icon size={18} weight="bold" />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold font-mono" style={{ color: 'var(--text-primary)' }}>{title}</h4>
                  <p className="text-[11px] sm:text-xs mt-1 leading-normal" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
