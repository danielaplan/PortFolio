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
        { name: "Responsive Design", icon: (props) => <Smartphone size={14} {...props} /> },
        { name: "UI/UX Principles", icon: (props) => <Palette size={14} {...props} /> },
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
        { name: "Relational Schema Design", icon: (props) => <TableProperties size={14} {...props} /> },
        { name: "REST APIs", icon: (props) => <Network size={14} {...props} /> },
      ]
    },
    {
      title: "Tools & Workflow",
      icon: Wrench,
      skills: [
        { name: "Git & GitHub", icon: GitIcon },
        { name: "VS Code", icon: VscodeIcon },
        { name: "Systems Architecture", icon: (props) => <Layers size={14} {...props} /> },
      ]
    }
  ];

  return (
    <section id="skills" className="py-12 sm:py-20">
      <div className="w-full px-5 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-1.5">
            <Cpu size={15} />
            <span>Technical Proficiency</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Skills & Technologies
          </h2>
          <p className="text-[color:var(--text-secondary)] text-xs sm:text-sm mt-1 max-w-xl">
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
                className="neo-raised-lg p-6 sm:p-7"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="neo-raised-xs w-9 h-9 flex items-center justify-center">
                    <CategoryIcon size={17} />
                  </div>
                  <h3 className="font-semibold text-base">
                    {category.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIndex) => {
                    const SkillIcon = skill.icon;
                    return (
                      <span
                        key={sIndex}
                        className="neo-raised-xs inline-flex items-center gap-2 px-3 py-2 text-xs font-medium cursor-default"
                      >
                        <SkillIcon className="w-3.5 h-3.5 shrink-0" />
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
