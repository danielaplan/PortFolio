import React, { useState, useMemo } from 'react';
import { 
  Copy, 
  Check, 
  ExternalLink, 
  FileCode2, 
  Database, 
  RefreshCw, 
  Sparkles
} from 'lucide-react';
import { projectCodeSnippets } from '../data/codeSnippets';

// Helper to render file icon based on extension/language
function getFileIcon(fileName = '') {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.cs')) {
    return <span className="text-purple-400 font-bold text-xs font-mono">C#</span>;
  }
  if (lower.endsWith('.sql')) {
    return <Database size={14} className="text-amber-400" />;
  }
  if (lower.endsWith('.ts') || lower.endsWith('.tsx')) {
    return <span className="text-sky-400 font-bold text-xs font-mono">TS</span>;
  }
  if (lower.endsWith('.js') || lower.endsWith('.jsx')) {
    return <span className="text-yellow-400 font-bold text-xs font-mono">JS</span>;
  }
  if (lower.endsWith('.py')) {
    return <span className="text-emerald-400 font-bold text-xs font-mono">PY</span>;
  }
  return <FileCode2 size={14} className="text-blue-400" />;
}

// Line Tokenizer & Syntax Highlighter
function renderHighlightedLine(line) {
  if (!line && line !== '') return '&nbsp;';

  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('--') || trimmed.startsWith('#')) {
    return <span className="text-slate-500 italic">{line}</span>;
  }

  // Safe HTML entity encoding
  const escaped = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Apply token spans
  const formatted = escaped
    // Strings (double, single, backticks)
    .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|".*?"|'.*?'|`.*?`)/g, '<span class="text-emerald-300">$1</span>')
    // TS/JS/C# Keywords
    .replace(
      /\b(export|import|from|class|public|private|static|readonly|async|await|return|if|else|for|const|let|var|new|interface|type|using|namespace|throw|function|default|case|switch)\b/g,
      '<span class="text-purple-400 font-semibold">$1</span>'
    )
    // SQL Keywords
    .replace(
      /\b(CREATE|TABLE|PRIMARY|KEY|DEFAULT|NVARCHAR|DATETIME2|UNIQUEIDENTIFIER|UNIQUE|CHECK|BETWEEN|AND|CONSTRAINT|FOREIGN|REFERENCES|CASCADE|NONCLUSTERED|INDEX|ON|INSERT|SELECT|FROM|WHERE|INT|DECIMAL|NULL)\b/g,
      '<span class="text-blue-400 font-bold">$1</span>'
    )
    // C# / TS Primitive Types
    .replace(
      /\b(string|number|boolean|void|Task|ActionResult|Guid|DateTime|int|decimal|Array|Map|Set|List)\b/g,
      '<span class="text-amber-300 font-mono">$1</span>'
    )
    // Numbers
    .replace(/\b(\d+)\b/g, '<span class="text-orange-300 font-mono">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: formatted || '&nbsp;' }} />;
}

export default function CodeInspector({ project, repoName }) {
  const projectId = project?.id || '';
  const snippets = useMemo(() => {
    if (projectCodeSnippets[projectId]) {
      return projectCodeSnippets[projectId];
    }
    // Dynamic default snippet for repos without predefined files
    return [
      {
        fileName: `${project?.repoName || 'architecture'}.config.json`,
        language: 'json',
        description: 'Repository structure manifest and environment configuration.',
        code: JSON.stringify(
          {
            project: project?.title || project?.name,
            repository: `https://github.com/danielaplan/${repoName || project?.repoName}`,
            primaryLanguage: project?.language || 'JavaScript / TypeScript',
            category: project?.category || 'Full-Stack Application',
            tags: project?.tags || [],
            architecturePattern: 'Layered Modular MVC / Component-Driven Architecture',
            status: 'Production / Maintained'
          },
          null,
          2
        )
      }
    ];
  }, [projectId, project, repoName]);

  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [liveLoading, setLiveLoading] = useState(false);
  const [liveFileContent, setLiveFileContent] = useState(null);
  const [liveError, setLiveError] = useState(null);

  const activeSnippet = snippets[activeFileIndex] || snippets[0];
  const displayedCode = liveFileContent || activeSnippet?.code || '';

  const handleCopy = () => {
    navigator.clipboard.writeText(displayedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Dynamically fetch raw README.md from GitHub
  const handleFetchLiveGitHub = async () => {
    const targetRepo = repoName || project?.repoName;
    if (!targetRepo) return;

    setLiveLoading(true);
    setLiveError(null);

    const branches = ['main', 'master'];
    let fetchedText = null;

    for (const branch of branches) {
      try {
        const url = `https://raw.githubusercontent.com/danielaplan/${targetRepo}/${branch}/README.md`;
        const res = await fetch(url);
        if (res.ok) {
          fetchedText = await res.text();
          break;
        }
      } catch (e) {
        // try next branch
      }
    }

    if (fetchedText) {
      setLiveFileContent(fetchedText);
    } else {
      setLiveError('Could not locate raw README.md on main/master branches.');
    }
    setLiveLoading(false);
  };

  const lines = useMemo(() => {
    return displayedCode.split('\n');
  }, [displayedCode]);

  return (
    <div className="space-y-4">
      {/* Top File Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2 border-b border-slate-200/80 dark:border-slate-800">
        
        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1 scrollbar-none">
          {snippets.map((file, index) => {
            const isActive = index === activeFileIndex && !liveFileContent;
            return (
              <button
                key={file.fileName}
                onClick={() => {
                  setActiveFileIndex(index);
                  setLiveFileContent(null);
                }}
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0 border ${
                  isActive
                    ? 'bg-slate-900 text-white dark:bg-blue-600 dark:text-white border-slate-900 dark:border-blue-500 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/60 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {getFileIcon(file.fileName)}
                <span>{file.fileName}</span>
              </button>
            );
          })}

          {/* Optional Live GitHub Readme Fetcher */}
          <button
            onClick={handleFetchLiveGitHub}
            disabled={liveLoading}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0 border ${
              liveFileContent
                ? 'bg-blue-600 text-white border-blue-500 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
            title="Fetch live raw README directly from GitHub API"
          >
            <RefreshCw size={12} className={liveLoading ? 'animate-spin text-blue-400' : ''} />
            <span>Live README.md</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition cursor-pointer border border-slate-200 dark:border-slate-700"
            title="Copy code to clipboard"
          >
            {copied ? (
              <>
                <Check size={13} className="text-emerald-500" />
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <a
            href={project?.link || `https://github.com/danielaplan/${repoName || project?.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-medium transition border border-slate-200 dark:border-slate-700"
          >
            <ExternalLink size={13} />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Description Snippet Header */}
      <div className="flex items-start justify-between gap-3 text-xs bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-start gap-2 text-slate-600 dark:text-slate-300">
          <Sparkles size={14} className="text-blue-500 shrink-0 mt-0.5" />
          <span>
            {liveFileContent
              ? 'Displaying live raw repository documentation streamed from GitHub.'
              : activeSnippet?.description || 'Curated high-value architectural source code.'}
          </span>
        </div>
        <span className="text-slate-400 font-mono text-[11px] shrink-0">
          {lines.length} lines
        </span>
      </div>

      {liveError && (
        <div className="p-3 text-xs text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200 dark:border-amber-900/60">
          {liveError} Showing curated architecture files instead.
        </div>
      )}

      {/* Editor Frame */}
      <div className="relative rounded-2xl bg-[#0b101b] text-slate-100 border border-slate-800 shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Editor Title Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-[#070b14] border-b border-slate-800 text-[11px] text-slate-400 select-none">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-slate-400 ml-2 font-mono font-medium">
              {liveFileContent ? 'README.md (Live)' : activeSnippet?.fileName}
            </span>
          </div>

          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500">
            UTF-8 • {activeSnippet?.language || 'Plain Text'}
          </span>
        </div>

        {/* Single Unified Table Scroll Container */}
        <div className="overflow-auto max-h-[400px] p-3 text-[12px] sm:text-[13px] leading-relaxed font-mono selection:bg-blue-600/40 overscroll-contain">
          <table className="w-full border-collapse min-w-max text-left">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 group transition-colors">
                  {/* Fixed-Width Synchronized Gutter Line Number */}
                  <td className="select-none pr-4 pl-1 text-right text-slate-600 font-mono text-[11px] align-top w-10 border-r border-slate-800/80 shrink-0 group-hover:text-slate-400">
                    {idx + 1}
                  </td>
                  {/* Code Line */}
                  <td className="pl-4 whitespace-pre font-mono text-slate-200 align-top">
                    {renderHighlightedLine(line)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
