import React from 'react';
import {
  Cpu, Terminal, Database, Wrench, Code2,
  Smartphone, Palette, TableProperties, Layers, Network,
  CheckCircle2, Zap, ShieldCheck
} from 'lucide-react';
import {
  JavaIcon, CSharpIcon, PhpIcon, JavascriptIcon, TypescriptIcon,
  HtmlCssIcon, ReactIcon, TailwindIcon, ViteIcon, MysqlIcon,
  MariadbIcon, SqliteIcon, GitIcon, NodeIcon, VscodeIcon
} from './icons/TechIcons';

export default function Skills({ isActive = true }) {
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
      icon: Code2,
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
        { name: "Relational Schema Design", icon: (props) => <TableProperties size={14} {...props} /> },
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
        { name: "Systems Architecture", icon: (props) => <Layers size={14} {...props} /> },
      ]
    }
  ];

  return (
    <section 
      id="skills" 
      className={`min-h-[calc(100vh-4rem)] lg:min-h-screen flex flex-col justify-center pt-20 pb-10 sm:pt-24 sm:pb-12 scroll-mt-0 transition-all duration-700 ease-out ${
        isActive 
          ? 'opacity-100 translate-y-0 scale-100 blur-none' 
          : 'opacity-40 translate-y-6 scale-[0.985] blur-[0.3px]'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 space-y-8 sm:space-y-10">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-2">
              <Cpu size={14} />
              <span>Technical Proficiency</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Skills & Technologies
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 max-w-2xl font-normal leading-relaxed">
              Core competencies acquired through coursework at University of Caloocan City and hands-on full-stack engineering.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="px-3.5 py-2 rounded-2xl bg-slate-100/90 dark:bg-slate-900/90 border border-slate-300/80 dark:border-slate-800 text-xs font-mono text-slate-700 dark:text-slate-300 flex items-center gap-2 shadow-xs">
              <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
              <span>20+ Technologies & Tools</span>
            </div>
          </div>
        </div>

        {/* Skill Category Cards Grid */}
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                className="group rounded-3xl p-6 sm:p-8 neo-raised-lg bg-[color:var(--bg-color)] dark:bg-slate-900/90 border border-slate-200/80 dark:border-slate-800 hover:border-cyan-500/40 shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle card glow highlight on hover */}
                <div className="absolute top-0 right-0 -mt-10 -mr-10 w-36 h-36 bg-cyan-500/5 group-hover:bg-cyan-500/10 rounded-full blur-2xl transition-all pointer-events-none" />

                <div>
                  <div className="relative z-10 flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3.5">
                      <div className="w-11 h-11 rounded-2xl bg-slate-200/90 dark:bg-slate-950/90 border border-slate-300 dark:border-slate-800 text-cyan-600 dark:text-cyan-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                        <CategoryIcon size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white tracking-tight">
                          {category.title}
                        </h3>
                        <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                          {category.focus}
                        </span>
                      </div>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-slate-200/90 dark:bg-slate-800/80 text-cyan-800 dark:text-cyan-400 text-[10px] font-mono font-semibold uppercase border border-slate-300 dark:border-slate-700/60 shadow-xs">
                      {category.badge}
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-5 leading-relaxed font-normal">
                    {category.description}
                  </p>

                  <div className="relative z-10 flex flex-wrap gap-2.5">
                    {category.skills.map((skill, sIndex) => {
                      const SkillIcon = skill.icon;
                      return (
                        <span
                          key={sIndex}
                          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-slate-950/80 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-300 hover:text-cyan-600 dark:hover:text-cyan-300 text-xs font-mono font-medium border border-slate-300/80 dark:border-slate-800 hover:border-cyan-500/40 shadow-xs transition-all duration-200 cursor-default hover:scale-102 select-none"
                        >
                          <SkillIcon className="w-4 h-4 shrink-0 opacity-80" />
                          <span>{skill.name}</span>
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Card Application Note */}
                <div className="relative z-10 mt-6 pt-4 border-t border-slate-200/70 dark:border-slate-800/70 flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                  <span>{category.application}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Engineering Architecture Highlights Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Zap size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">Full-Stack Integration</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                Connecting interactive React user interfaces with secure backend endpoints and schema logic.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <Database size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">Structured Schemas</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                Designing normalized relational models with MySQL and MariaDB with consistent query integrity.
              </p>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 flex items-start gap-3.5 shadow-xs">
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 shrink-0">
              <ShieldCheck size={18} />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white font-mono">Clean Architecture</h4>
              <p className="text-[11px] sm:text-xs text-slate-600 dark:text-slate-400 mt-1 leading-normal">
                Writing modular, maintainable code with strict typing, Git versioning, and design consistency.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
