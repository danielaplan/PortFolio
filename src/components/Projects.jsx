import React, { useState } from 'react';
import { ExternalLink, FolderGit2, Layers, Sparkles } from 'lucide-react';
import Github from './icons/Github';

export default function Projects() {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      title: "FaithQuest",
      category: "web",
      description: "Interactive gamification platform for church programs. Features a teacher-controlled dashboard that engages participants with real-time points, achievements, and milestone progress tracking.",
      tags: ["TypeScript", "Web", "Interactive UI", "Gamification"],
      link: "https://github.com/danielaplan/FaithQuest",
      featured: true,
      year: "2024"
    },
    {
      title: "Customer Relationship Management System",
      category: "systems",
      description: "Enterprise CRM solution built with C# and relational databases. Manages customer interactions, pipelines, communication logs, and business processes with reliable data persistence.",
      tags: ["C#", ".NET", "Database Architecture", "CRM"],
      link: "https://github.com/danielaplan/Customer-Relationship-Management-System",
      featured: true,
      year: "2024"
    },
    {
      title: "Messiah Baptist Church Official Website",
      category: "web",
      description: "Full-featured church portal featuring service schedules, ministry updates, community announcements, and responsive mobile-first design.",
      tags: ["HTML5", "CSS3", "JavaScript", "Web Design"],
      link: "https://github.com/danielaplan/Messiah-Baptist-Church-Official-Website",
      featured: false,
      year: "2023"
    },
    {
      title: "Youth Organization Website",
      category: "web",
      description: "Clean, responsive organizational platform for youth engagement, event coordination, and digital presence with optimized performance.",
      tags: ["HTML5", "CSS3", "Responsive Design", "UI/UX"],
      link: "https://github.com/danielaplan/Youth-Organization-Website",
      featured: false,
      year: "2023"
    }
  ];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(p => p.category === filter);

  return (
    <section id="projects" className="py-20 border-t border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-2">
              <FolderGit2 size={16} />
              <span>Featured Work</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Projects & Applications
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200/60 dark:border-slate-800/60 self-start md:self-auto text-xs">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${filter === 'all'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              All ({projects.length})
            </button>
            <button
              onClick={() => setFilter('web')}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${filter === 'web'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Web & Interactive
            </button>
            <button
              onClick={() => setFilter('systems')}
              className={`px-3 py-1.5 rounded-md font-medium transition cursor-pointer ${filter === 'systems'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
            >
              Systems & CRM
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, i) => (
            <article
              key={i}
              className="group relative flex flex-col justify-between p-6 rounded-2xl bg-slate-50/60 dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800/80 hover:border-blue-500/40 dark:hover:border-blue-500/40 hover:bg-slate-50 dark:hover:bg-slate-900/80 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
            >
              <div className="space-y-4">
                {/* Header with Title & Year */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    {project.featured && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
                        <Sparkles size={11} /> Featured Project
                      </span>
                    )}
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600 transition flex-shrink-0"
                    aria-label={`View ${project.title} on GitHub`}
                    title="View GitHub Repository"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  {project.description}
                </p>
              </div>

              {/* Tags & Action Link */}
              <div className="pt-6 space-y-4">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-300 font-medium font-mono"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    <Github size={14} />
                    <span>View Repository</span>
                  </a>
                  <span>{project.year}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
