import React from 'react';
import { 
  Cpu, Terminal, Database, Wrench, Code2, 
  Smartphone, Palette, TableProperties, Layers, Network 
} from 'lucide-react';
import {
  JavaIcon, CSharpIcon, PhpIcon, JavascriptIcon, TypescriptIcon, 
  HtmlCssIcon, ReactIcon, TailwindIcon, ViteIcon, MysqlIcon, 
  MariadbIcon, SqliteIcon, GitIcon, NodeIcon, VscodeIcon
} from './icons/TechIcons';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Terminal,
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
      icon: Code2,
      skills: [
        { name: "React", icon: ReactIcon },
        { name: "Tailwind CSS", icon: TailwindIcon },
        { name: "Vite", icon: ViteIcon },
        { name: "HTML5 & CSS3", icon: HtmlCssIcon },
        { name: "Responsive Design", icon: (props) => <Smartphone size={14} className="text-sky-500 shrink-0" {...props} /> },
        { name: "UI/UX Principles", icon: (props) => <Palette size={14} className="text-violet-500 shrink-0" {...props} /> },
      ]
    },
    {
      title: "Backend & Databases",
      icon: Database,
      skills: [
        { name: "Node.js", icon: NodeIcon },
        { name: "MySQL", icon: MysqlIcon },
        { name: "MariaDB", icon: MariadbIcon },
        { name: "SQLite", icon: SqliteIcon },
        { name: "Relational Schema Design", icon: (props) => <TableProperties size={14} className="text-amber-500 shrink-0" {...props} /> },
        { name: "REST APIs", icon: (props) => <Network size={14} className="text-emerald-500 shrink-0" {...props} /> },
      ]
    },
    {
      title: "Tools & Workflow",
      icon: Wrench,
      skills: [
        { name: "Git & GitHub", icon: GitIcon },
        { name: "VS Code", icon: VscodeIcon },
        { name: "Systems Architecture", icon: (props) => <Layers size={14} className="text-indigo-500 shrink-0" {...props} /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-20 border-t border-slate-200/60 dark:border-slate-800/60">
      <div className="max-w-4xl mx-auto px-5 sm:px-6">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1.5">
            <Cpu size={15} />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
            Core competencies acquired through academic coursework at University of Caloocan City and hands-on project engineering.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => {
            const CategoryIcon = category.icon;
            return (
              <div
                key={index}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  e.currentTarget.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
                  e.currentTarget.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
                }}
                className="p-6 sm:p-7 rounded-3xl liquid-glass-card"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 shadow-2xs">
                    <CategoryIcon size={18} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={sIndex}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/70 dark:bg-slate-800/60 border border-slate-200/80 dark:border-white/5 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition shadow-2xs group"
                      >
                        <SkillIcon className="w-3.5 h-3.5 shrink-0 group-hover:scale-110 transition-transform" />
                        <span>{skill.name}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
