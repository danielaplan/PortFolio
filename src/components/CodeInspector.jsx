import React, { useState, useMemo } from 'react';
import {
  Copy, Check, ArrowSquareOut, FileCode, Database,
  ArrowsClockwise
} from '@phosphor-icons/react';
import { projectCodeSnippets } from '../data/codeSnippets';

// Helper to render file icon based on extension/language
function getFileIcon(fileName = '') {
  const lower = fileName.toLowerCase();
  if (lower.endsWith('.cs')) {
    return <span style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'monospace' }}>C#</span>;
  }
  if (lower.endsWith('.sql')) {
    return <Database size={14} weight="bold" style={{ color: '#60a5fa' }} />;
  }
  if (lower.endsWith('.ts') || lower.endsWith('.tsx')) {
    return <span style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'monospace' }}>TS</span>;
  }
  if (lower.endsWith('.js') || lower.endsWith('.jsx')) {
    return <span style={{ color: '#60a5fa', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'monospace' }}>JS</span>;
  }
  if (lower.endsWith('.py')) {
    return <span style={{ color: '#34d399', fontWeight: 'bold', fontSize: '0.75rem', fontFamily: 'monospace' }}>PY</span>;
  }
  return <FileCode2 size={14} weight="bold" style={{ color: '#60a5fa' }} />;
}

// Line Tokenizer & Syntax Highlighter
function renderHighlightedLine(line) {
  if (!line && line !== '') return ' ';

  const trimmed = line.trim();
  if (trimmed.startsWith('//') || trimmed.startsWith('--') || trimmed.startsWith('#')) {
    return <span style={{ color: '#64748b', fontStyle: 'italic' }}>{line}</span>;
  }

  const escaped = line
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const formatted = escaped
    .replace(/(&quot;.*?&quot;|&#39;.*?&#39;|".*?"|'.*?'|`.*?`)/g, '<span style="color:#34d399">$1</span>')
    .replace(
      /\b(export|import|from|class|public|private|static|readonly|async|await|return|if|else|for|const|let|var|new|interface|type|using|namespace|throw|function|default|case|switch)\b/g,
      '<span style="color:#a78bfa;font-weight:600">$1</span>'
    )
    .replace(
      /\b(CREATE|TABLE|PRIMARY|KEY|DEFAULT|NVARCHAR|DATETIME2|UNIQUEIDENTIFIER|UNIQUE|CHECK|BETWEEN|AND|CONSTRAINT|FOREIGN|REFERENCES|CASCADE|NONCLUSTERED|INDEX|ON|INSERT|SELECT|FROM|WHERE|INT|DECIMAL|NULL)\b/g,
      '<span style="color:#60a5fa;font-weight:bold">$1</span>'
    )
    .replace(
      /\b(string|number|boolean|void|Task|ActionResult|Guid|DateTime|int|decimal|Array|Map|Set|List)\b/g,
      '<span style="color:#22d3ee;font-family:monospace">$1</span>'
    )
    .replace(/\b(\d+)\b/g, '<span style="color:#3b82f6;font-family:monospace">$1</span>');

  return <span dangerouslySetInnerHTML={{ __html: formatted || ' ' }} />;
}

export default function CodeInspector({ project, repoName }) {
  const projectId = project?.id || '';
  const snippets = useMemo(() => {
    if (projectCodeSnippets[projectId]) {
      return projectCodeSnippets[projectId];
    }
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

  const handleFetchLiveGitHub = async () => {
    const targetRepo = repoName || project?.repoName;
    if (!targetRepo) return;

    setLiveLoading(true);
    setLiveError(null);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);
    const branches = ['main', 'master'];
    let fetchedText = null;

    try {
      for (const branch of branches) {
        try {
          const url = `https://raw.githubusercontent.com/danielaplan/${targetRepo}/${branch}/README.md`;
          const res = await fetch(url, { signal: controller.signal });
          if (res.ok) {
            fetchedText = await res.text();
            break;
          }
        } catch (e) {
          if (controller.signal.aborted) break;
        }
      }
    } finally {
      clearTimeout(timeoutId);
    }

    if (fetchedText) {
      setLiveFileContent(fetchedText);
    } else if (controller.signal.aborted) {
      setLiveError('Request timed out fetching the live README. Showing curated architecture files instead.');
    } else {
      setLiveError('Could not locate raw README.md on main/master branches.');
    }
    setLiveLoading(false);
  };

  const lines = useMemo(() => displayedCode.split('\n'), [displayedCode]);

  return (
    <div className="space-y-4">
      {/* Top File Selector Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-2" style={{ borderBottom: '1px solid #1e293b' }}>

        {/* File Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto max-w-full pb-1" style={{ scrollbarWidth: 'none' }}>
          {snippets.map((file, index) => {
            const isActive = index === activeFileIndex && !liveFileContent;
            return (
              <button
                key={file.fileName}
                onClick={() => { setActiveFileIndex(index); setLiveFileContent(null); }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0"
                style={isActive
                  ? { backgroundColor: '#3b82f6', color: '#ffffff', border: '1px solid #3b82f6' }
                  : { backgroundColor: '#1e293b', color: '#94a3b8', border: '1px solid #334155' }
                }
              >
                {getFileIcon(file.fileName)}
                <span>{file.fileName}</span>
              </button>
            );
          })}

          {/* Live README Fetcher */}
          <button
            onClick={handleFetchLiveGitHub}
            disabled={liveLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition cursor-pointer shrink-0"
            style={liveFileContent
              ? { backgroundColor: '#3b82f6', color: '#ffffff', border: '1px solid #3b82f6' }
              : { backgroundColor: '#1e293b', color: '#64748b', border: '1px solid #334155' }
            }
          >
            <ArrowsClockwise size={12} weight="bold" className={liveLoading ? 'animate-spin' : ''} />
            <span>Live README.md</span>
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer"
            style={{ backgroundColor: '#1e293b', color: '#e2e8f0', border: '1px solid #334155' }}
          >
            {copied ? (
              <>
                <Check size={13} weight="bold" style={{ color: '#34d399' }} />
                <span style={{ color: '#34d399', fontWeight: 600 }}>Copied!</span>
              </>
            ) : (
              <>
                <Copy size={13} weight="bold" />
                <span>Copy Code</span>
              </>
            )}
          </button>

          <a
            href={project?.link || `https://github.com/danielaplan/${repoName || project?.repoName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition"
            style={{ backgroundColor: '#1e293b', color: '#e2e8f0', border: '1px solid #334155' }}
          >
            <ArrowSquareOut size={13} weight="bold" />
            <span>GitHub</span>
          </a>
        </div>
      </div>

      {/* Description Header */}
      <div
        className="flex items-start justify-between gap-3 text-xs p-3 rounded-xl"
        style={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', color: '#94a3b8' }}
      >
        <div className="flex items-start gap-2">
          <span style={{ fontSize: '0.875rem', color: '#60a5fa' }}>&#9670;</span>
          <span>
            {liveFileContent
              ? 'Displaying live raw repository documentation streamed from GitHub.'
              : activeSnippet?.description || 'Curated high-value architectural source code.'}
          </span>
        </div>
        <span className="font-mono text-[11px] shrink-0" style={{ color: '#475569' }}>
          {lines.length} lines
        </span>
      </div>

      {liveError && (
        <div
          className="p-3 text-xs rounded-xl"
          style={{ backgroundColor: 'rgba(252,165,165,0.1)', border: '1px solid rgba(252,165,165,0.2)', color: '#fca5a5' }}
        >
          {liveError} Showing curated architecture files instead.
        </div>
      )}

      {/* Editor Frame — intentionally dark (IDE contrast element) */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{ backgroundColor: '#0b101b', border: '1px solid #1e293b' }}
      >
        {/* Editor Title Bar */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ backgroundColor: '#070b14', borderBottom: '1px solid #1e293b' }}
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#ef4444' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#f59e0b' }} />
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: '#22c55e' }} />
            </div>
            <span className="text-[11px] font-mono" style={{ color: '#64748b', marginLeft: '0.5rem' }}>
              {liveFileContent ? 'README.md (Live)' : activeSnippet?.fileName}
            </span>
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: '#334155' }}>
            UTF-8 &bull; {activeSnippet?.language || 'Plain Text'}
          </span>
        </div>

        {/* Code Table */}
        <div
          data-lenis-prevent
          className="overflow-auto"
          style={{ maxHeight: '400px', fontFamily: "'Geist Mono', 'SF Mono', monospace" }}
        >
          <table className="w-full border-collapse min-w-max text-left">
            <tbody>
              {lines.map((line, idx) => (
                <tr key={idx} className="hover:bg-slate-800/40 transition-colors" style={{ backgroundColor: 'transparent' }}>
                  <td
                    className="select-none pr-4 pl-1 text-right font-mono text-[11px] align-top w-10"
                    style={{ color: '#334155', borderRight: '1px solid #1e293b' }}
                  >
                    {idx + 1}
                  </td>
                  <td
                    className="pl-4 font-mono text-[12px] sm:text-sm leading-relaxed align-top"
                    style={{ color: '#e2e8f0' }}
                  >
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
