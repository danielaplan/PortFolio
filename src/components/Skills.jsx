import React from 'react';
import { Cpu, Terminal, Database, Wrench, CheckCircle2, Code2 } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming Languages",
      icon: Terminal,
      skills: ["Java", "C#", "PHP", "JavaScript", "TypeScript", "HTML5 & CSS3"]
    },
    {
      title: "Frontend & Web Technologies",
      icon: Code2,
      skills: ["React", "Tailwind CSS", "Vite", "Responsive Design", "UI/UX Principles"]
    },
    {
      title: "Databases & Storage",
      icon: Database,
      skills: ["MySQL", "MariaDB", "SQLite", "Relational Schema Design"]
    },
    {
      title: "Tools & Development Workflow",
      icon: Wrench,
      skills: ["Git & GitHub", "Node.js", "VS Code", "Systems Architecture", "REST APIs"]
    }
  ];

  return (
    <section id="skills" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
            <Cpu size={16} />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
            Skills & Technologies
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-2 max-w-xl">
            Core competencies acquired through academic coursework at University of Caloocan City and hands-on project engineering.
          </p>
        </div>

        {/* Skill Category Cards */}
        <div className="grid gap-6 sm:grid-cols-2">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-2xl bg-white/75 dark:bg-slate-900/60 backdrop-blur-sm border border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/40">
                    <Icon size={18} />
                  </div>
                  <h3 className="font-semibold text-slate-900 dark:text-white text-base">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => (
                    <span
                      key={sIndex}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition shadow-2xs"
                    >
                      <CheckCircle2 size={12} className="text-blue-500 shrink-0" />
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
