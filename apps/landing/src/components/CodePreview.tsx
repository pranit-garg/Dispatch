"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const codeSnippet = `// Submit a job. x402 handles the payment automatically
const router = new ComputeRouter({
  monad: "http://coordinator-monad:4010",
  solana: "http://coordinator-solana:4020",
});

const result = await router.runTask({
  taskType: "summarize",
  input: "Your text content here...",
  policy: "CHEAP",        // Prefers mobile Seekers
  privacy: "PUBLIC",       // Any available worker
  chain: "monad",          // Settlement on Monad
});

// result.output  → { summary: "...", word_count: 42 }
// result.receipt → { job_id, output_hash, signature }`;

const protocolSnippet = `// Worker receives job over WebSocket
{
  "type": "job_assign",
  "job_id": "a1b2c3d4-...",
  "job_type": "TASK",
  "payload": {
    "task_type": "summarize",
    "input": "Your text content here..."
  },
  "policy": "CHEAP",
  "privacy_class": "PUBLIC"
}

// Worker responds with signed receipt
{
  "type": "job_complete",
  "job_id": "a1b2c3d4-...",
  "output": { "summary": "...", "word_count": 42 },
  "output_hash": "6fa2faf...",
  "receipt_signature": "base64..."
}`;

const KEYWORDS = /\b(const|let|var|await|import|from|new|type|function|return|export|async)\b/g;
const STRINGS = /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)/g;
const PUNCTUATION = /([{}[\]=()=>,:;]|=>)/g;

function highlightLine(line: string, index: number): React.ReactNode {
  // Comments take priority: the whole rest of the line is a comment
  const commentMatch = line.match(/^(.*?)(\/\/.*)$/);
  if (commentMatch) {
    const before = commentMatch[1];
    const comment = commentMatch[2];
    return (
      <span key={index}>
        {before ? highlightTokens(before) : null}
        <span className="text-text-dim italic">{comment}</span>
        {"\n"}
      </span>
    );
  }
  return (
    <span key={index}>
      {highlightTokens(line)}
      {"\n"}
    </span>
  );
}

function highlightTokens(text: string): React.ReactNode[] {
  // Split by strings first to avoid highlighting inside strings
  const parts = text.split(STRINGS);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    // Odd indices are matched strings
    if (i % 2 === 1) {
      // Check if this is a property key (followed by colon in the original text)
      // We detect this by checking context. Property keys like "type": appear as
      // the string right before a colon in JSON-like structures
      const afterPart = parts.slice(i + 1).join("");
      if (afterPart.trimStart().startsWith(":")) {
        nodes.push(
          <span key={i} className="text-amber">
            {part}
          </span>
        );
      } else {
        nodes.push(
          <span key={i} className="text-green">
            {part}
          </span>
        );
      }
      return;
    }

    // For non-string parts, highlight keywords and punctuation
    highlightNonString(part, i).forEach((n) => nodes.push(n));
  });

  return nodes;
}

function highlightNonString(
  text: string,
  keyBase: number
): React.ReactNode[] {
  // Split by keywords
  const parts = text.split(KEYWORDS);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part.match(/^(const|let|var|await|import|from|new|type|function|return|export|async)$/)) {
      nodes.push(
        <span key={`${keyBase}-kw-${i}`} className="text-accent-bright">
          {part}
        </span>
      );
      return;
    }

    // Split remaining by punctuation
    const puncParts = part.split(PUNCTUATION);
    puncParts.forEach((pp, j) => {
      if (pp.match(/^[{}[\]=(),:;]$/) || pp === "=>") {
        nodes.push(
          <span key={`${keyBase}-p-${i}-${j}`} className="text-text-dim">
            {pp}
          </span>
        );
      } else if (pp) {
        nodes.push(
          <span key={`${keyBase}-t-${i}-${j}`} className="text-text-muted">
            {pp}
          </span>
        );
      }
    });
  });

  return nodes;
}

function highlightCode(code: string): React.ReactNode[] {
  return code.split("\n").map((line, i) => highlightLine(line, i));
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-3 top-3 rounded p-1.5 text-text-dim transition-colors hover:text-text"
      aria-label="Copy code"
    >
      {copied ? (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      ) : (
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
      )}
    </button>
  );
}

export function CodePreview() {
  return (
    <section className="border-t border-border px-6 py-20 md:py-28" id="code">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold md:text-4xl">
            Built for developers
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-text-muted">
            TypeScript SDK, WebSocket protocol, and REST API.
            Everything is typed and documented.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green" />
              <span className="text-sm font-medium text-text-muted">
                SDK Usage
              </span>
            </div>
            <div className="code-block relative overflow-x-auto p-5">
              <CopyButton text={codeSnippet} />
              <pre>
                <code>{highlightCode(codeSnippet)}</code>
              </pre>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="mb-3 flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-accent" />
              <span className="text-sm font-medium text-text-muted">
                WebSocket Protocol
              </span>
            </div>
            <div className="code-block relative overflow-x-auto p-5">
              <CopyButton text={protocolSnippet} />
              <pre>
                <code>{highlightCode(protocolSnippet)}</code>
              </pre>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
