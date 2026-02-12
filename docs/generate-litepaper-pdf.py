#!/usr/bin/env python3
"""Generate academic-style PDF of the Dispatch litepaper.

Uses pandoc + tectonic (XeTeX) for NeurIPS/SIGGRAPH-quality typesetting.
Two-pass approach: pandoc generates LaTeX, then tectonic compiles to PDF.
"""

import re
import subprocess
import tempfile
import textwrap
from pathlib import Path

DOCS_DIR = Path(__file__).parent
LITEPAPER_MD = DOCS_DIR / "litepaper-full.md"
OUTPUT_PDF = DOCS_DIR / "Dispatch_Litepaper.pdf"


def clean_markdown(md_text: str) -> str:
    """Clean the markdown for academic formatting."""
    # Remove [IMPLEMENTED] / [DESIGNED] / [FUTURE] tags
    md_text = re.sub(r'\s*\[(?:IMPLEMENTED|DESIGNED|FUTURE)\]', '', md_text)

    # Remove the title (we'll set it in YAML frontmatter)
    md_text = re.sub(r'^#\s+.+\n', '', md_text, count=1)

    # Remove version line and its surrounding dashes
    md_text = re.sub(r'\*\*Version[^*]+\*\*\s*\n+---', '', md_text)

    # Remove ASCII art diagrams (box-drawing characters)
    def replace_ascii_diagram(m):
        content = m.group(1)
        if any(c in content for c in '\u250c\u2510\u2514\u2518\u2502\u2500\u251c\u2524\u252c\u2534\u253c'):
            lines = content.strip().split('\n')
            labels = []
            for line in lines:
                text_parts = re.findall(r'[A-Za-z][\w\s/().+]*[A-Za-z)]', line)
                for part in text_parts:
                    part = part.strip()
                    if len(part) > 3 and part not in labels:
                        labels.append(part)
            if labels:
                desc = ", ".join(labels[:8])
                return f'\n*[Figure: {desc}]*\n'
            return '\n*[Figure: System architecture diagram]*\n'
        return m.group(0)

    md_text = re.sub(r'```\n?(.*?)```', replace_ascii_diagram, md_text, flags=re.DOTALL)

    # NOTE: Wide comparison table (Section 9) is kept — handled as table* in LaTeX

    # Remove leading whitespace/dashes
    md_text = md_text.lstrip('\n -')

    return md_text


def fix_longtable_in_latex(latex: str) -> str:
    """Replace longtable environments with tabular for twocolumn compat."""

    # Step 1: Handle the full {\def\LTcaptype{none} ... \end{longtable}\n} blocks
    def replace_lt_block(m):
        inner = m.group(1)
        return process_longtable_inner(inner)

    latex = re.sub(
        r'\{\\def\\LTcaptype\{none\}[^\n]*\n(.*?)\\end\{longtable\}\s*\}',
        replace_lt_block,
        latex,
        flags=re.DOTALL
    )

    # Step 2: Handle any remaining bare longtable
    latex = re.sub(
        r'\\begin\{longtable\}.*?\\end\{longtable\}',
        lambda m: process_longtable_inner(m.group(0)),
        latex,
        flags=re.DOTALL
    )

    return latex


def process_longtable_inner(inner: str) -> str:
    """Convert a longtable block to a tabular block."""
    # Remove longtable-specific commands
    inner = re.sub(r'\\endhead\s*', '', inner)
    inner = re.sub(r'\\endlastfoot\s*', '', inner)
    inner = re.sub(r'\\endfirsthead\s*', '', inner)
    inner = re.sub(r'\\endfoot\s*', '', inner)

    # Fix \linewidth -> \columnwidth
    inner = inner.replace(r'\linewidth', r'\columnwidth')

    # Strip minipage wrappers from table headers, keep content as bold
    inner = re.sub(r'\\begin\{minipage\}\[b\]\{[^}]*\}\\raggedright\s*', '', inner)
    inner = re.sub(r'\\end\{minipage\}', '', inner)

    # Count columns by looking for max & count across all data rows
    data_lines = [l for l in inner.split('\n') if '&' in l and 'begin{' not in l]
    if data_lines:
        ncols = max(l.count('&') for l in data_lines) + 1
    else:
        ncols = 2

    # Wide tables (6+ columns) get full-width table* environment
    is_wide = ncols >= 6

    # Use tabularx so tables fit cleanly
    if is_wide:
        # Full-width: use textwidth, all columns flexible
        env = "tabularx"
        colspec = "l" + "Y" * (ncols - 1)
        width_cmd = r"\textwidth"
    elif ncols == 5:
        env = "tabularx"
        colspec = r"lrrrY"
        width_cmd = r"\columnwidth"
    elif ncols == 4:
        env = "tabularx"
        colspec = r"lrrY"
        width_cmd = r"\columnwidth"
    elif ncols == 3:
        env = "tabularx"
        colspec = r"lrY"
        width_cmd = r"\columnwidth"
    elif ncols == 2:
        env = "tabularx"
        colspec = r"lY"
        width_cmd = r"\columnwidth"
    else:
        env = "tabular"
        colspec = "l" * ncols
        width_cmd = None

    # Remove everything from \begin{longtable} up to \toprule
    inner = re.sub(
        r'\\begin\{longtable\}.*?(?=\\toprule)',
        '',
        inner,
        flags=re.DOTALL
    )

    # Remove \end{longtable} if still present
    inner = inner.replace(r'\end{longtable}', '')

    if env == "tabularx":
        begin = rf"\begin{{tabularx}}{{{width_cmd}}}{{{colspec}}}"
        end = r"\end{tabularx}"
    else:
        begin = r"\begin{tabular}{" + colspec + "}"
        end = r"\end{tabular}"

    # Wide tables use table* (full-width float spanning both columns)
    if is_wide:
        return (
            r"\begin{table*}[t]" "\n"
            r"\centering\footnotesize" "\n"
            r"\setlength{\tabcolsep}{4pt}" "\n"
            + begin + "\n"
            + inner.strip() + "\n"
            + end + "\n"
            r"\end{table*}"
        )
    else:
        return (
            r"\begin{center}\footnotesize" "\n"
            r"\setlength{\tabcolsep}{4pt}" "\n"
            + begin + "\n"
            + inner.strip() + "\n"
            + end + "\n"
            r"\end{center}"
        )


# ─────────────────────────────────────────────────
# LaTeX Template — NeurIPS/SIGGRAPH-quality B&W
# ─────────────────────────────────────────────────
LATEX_TEMPLATE = r"""
\documentclass[10pt,twocolumn,letterpaper]{article}

% ── Fonts (Palatino + Menlo — academic standard) ──
\usepackage{fontspec}
\setmainfont{Palatino}[
  BoldFont       = Palatino Bold,
  ItalicFont     = Palatino Italic,
  BoldItalicFont = Palatino Bold Italic,
  Ligatures      = TeX
]
\setmonofont{Menlo}[Scale=0.82]
\frenchspacing  % single space after periods (modern academic standard)

% ── Layout ──
\usepackage[
  margin=0.75in,
  top=0.85in,
  bottom=0.85in,
  columnsep=0.3in
]{geometry}

% ── Core packages ──
\usepackage{graphicx}
\usepackage{booktabs}
\usepackage{array}
\usepackage{tabularx}
\usepackage{longtable}
\usepackage{xurl}
\usepackage{hyperref}
\usepackage{xcolor}
\usepackage{fancyhdr}
\usepackage{titlesec}
\usepackage{enumitem}
\usepackage{fancyvrb}
\usepackage{fvextra}
\usepackage{float}
\usepackage[protrusion=true]{microtype}

% ── Colors (B&W only — no brand colors) ──
\definecolor{linkblue}{RGB}{0,51,153}
\definecolor{codebg}{HTML}{F5F5F5}
\definecolor{codeframe}{HTML}{CCCCCC}
\definecolor{rulecolor}{HTML}{333333}
\definecolor{headergray}{HTML}{888888}
\definecolor{tableheadbg}{HTML}{F0F0F0}

% ── Hyperref ──
\hypersetup{
    colorlinks=true,
    linkcolor=linkblue,
    urlcolor=linkblue,
    citecolor=linkblue,
    breaklinks=true,
    pdftitle={$title$},
    pdfauthor={$for(author)$$author$$sep$, $endfor$},
}

% Better wrapping for long links/monospace in narrow columns
\Urlmuskip=0mu plus 2mu\relax
\setlength{\emergencystretch}{5em}

% ── Code blocks: gray background + thin frame ──
\fvset{
  breaklines=true,
  breakanywhere=true,
  fontsize=\footnotesize
}
\RecustomVerbatimEnvironment{verbatim}{Verbatim}{
  breaklines=true,
  breakanywhere=true,
  frame=single,
  rulecolor=\color{codeframe},
  fillcolor=\color{codebg},
  framesep=6pt,
  fontsize=\footnotesize
}

% ── Disable section auto-numbering (markdown has manual numbers) ──
\setcounter{secnumdepth}{-1}

% ── Section formatting: thin rule beneath ──
\titleformat{\section}
    {\normalfont\large\bfseries}
    {}{0pt}{}[\vspace{2pt}\titlerule]
\titleformat{\subsection}
    {\normalfont\normalsize\bfseries}
    {}{0pt}{}
\titleformat{\subsubsection}
    {\normalfont\normalsize\itshape\bfseries}
    {}{0pt}{}

\titlespacing*{\section}{0pt}{14pt plus 2pt minus 2pt}{6pt plus 1pt}
\titlespacing*{\subsection}{0pt}{10pt plus 2pt minus 1pt}{4pt plus 1pt}
\titlespacing*{\subsubsection}{0pt}{8pt plus 1pt minus 1pt}{3pt}

% ── Paragraph spacing ──
\setlength{\parskip}{3pt plus 1pt minus 1pt}
\setlength{\parindent}{1em}

% ── Headers & footers ──
\pagestyle{fancy}
\fancyhf{}
\fancyhead[L]{\small\color{headergray}\textit{Dispatch: Agent-Native Compute}}
\fancyhead[R]{\small\color{headergray}\thepage}
\renewcommand{\headrulewidth}{0.4pt}
\renewcommand{\footrulewidth}{0pt}

% First page: no header
\fancypagestyle{plain}{
  \fancyhf{}
  \fancyfoot[C]{\small\thepage}
  \renewcommand{\headrulewidth}{0pt}
}

% ── List formatting ──
\setlist[itemize]{nosep,leftmargin=1.5em,topsep=2pt}
\setlist[enumerate]{nosep,leftmargin=1.5em,topsep=2pt}

% ── Table formatting ──
\renewcommand{\arraystretch}{1.4}
\newcolumntype{Y}{>{\raggedright\arraybackslash}X}

% ── Pandoc tightlist ──
\providecommand{\tightlist}{%
  \setlength{\itemsep}{0pt}\setlength{\parskip}{0pt}}

$if(highlighting-macros)$
$highlighting-macros$
$endif$

% (abstract box is inlined in the template body — no macro needed)

% ── Begin document ──
\begin{document}
\sloppy
\setlength{\emergencystretch}{3em}
\thispagestyle{plain}

% ── Title block (full-width) ──
\twocolumn[
\begin{@twocolumnfalse}
\begin{center}
    \vspace{4pt}
    {\LARGE\bfseries $title$ \par}
    \vspace{14pt}
    {\large $for(author)$$author$$sep$ \and $endfor$ \par}
    \vspace{4pt}
    {\normalsize Dispatch \par}
    \vspace{4pt}
    {\small $date$ \par}
    \vspace{2pt}
    {\small\url{https://www.dispatch.computer} \par}
    \vspace{16pt}
\end{center}

$if(abstract)$
\setlength{\fboxsep}{10pt}%
\noindent\fcolorbox{black}{codebg}{%
\begin{minipage}{\dimexpr\textwidth-20pt-2\fboxrule}%
\begin{center}{\small\bfseries\scshape Abstract}\end{center}
\vspace{2pt}
\small\noindent $abstract$
$if(keywords)$
\vspace{8pt}
\noindent\textbf{\footnotesize Keywords:} {\footnotesize $keywords$}
$endif$
\end{minipage}%
}
$endif$

\vspace{12pt}
\end{@twocolumnfalse}
]

$body$

\end{document}
"""


def main():
    md_text = LITEPAPER_MD.read_text()

    # Extract abstract before cleaning
    abstract_match = re.search(
        r'## Abstract\s*\n(.*?)(?=\n---|\n## )',
        md_text, re.DOTALL
    )
    abstract_text = abstract_match.group(1).strip() if abstract_match else ""

    # Clean the markdown
    cleaned = clean_markdown(md_text)

    # Remove the abstract section from body
    cleaned = re.sub(r'## Abstract\s*\n.*?(?=\n---|\n## )', '', cleaned, flags=re.DOTALL)
    cleaned = cleaned.lstrip('\n -')

    # Indent abstract for YAML block scalar (every line needs 2-space indent)
    abstract_indented = textwrap.indent(abstract_text, "  ")

    # Build the pandoc-ready markdown with YAML frontmatter
    pandoc_md = f"""---
title: "Dispatch: Agent-Native Compute via x402 Payment, ERC-8004 Reputation, and BOLT Token Settlement"
author:
  - Pranit Garg
date: "February 2026"
abstract: |
{abstract_indented}
keywords: "agent compute, x402 micropayments, ERC-8004, onchain reputation, BOLT token, decentralized inference, Solana, Monad, ed25519 receipts"
---

{cleaned}
"""

    # Write template and markdown to temp files
    with tempfile.NamedTemporaryFile(mode='w', suffix='.latex', delete=False) as tf:
        tf.write(LATEX_TEMPLATE)
        template_path = tf.name

    with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as mf:
        mf.write(pandoc_md)
        md_path = mf.name

    # Step 1: Generate LaTeX from pandoc
    latex_path = tempfile.mktemp(suffix='.tex')
    cmd_latex = [
        "pandoc", md_path,
        "-o", latex_path,
        f"--template={template_path}",
        "--syntax-highlighting=kate",
    ]
    print("Step 1: Generating LaTeX...")
    r1 = subprocess.run(cmd_latex, capture_output=True, text=True)
    if r1.returncode != 0:
        print("Pandoc error:", r1.stderr[-2000:])
        raise SystemExit(1)

    # Step 2: Post-process LaTeX to fix longtable issues
    print("Step 2: Fixing longtable for twocolumn...")
    latex_content = Path(latex_path).read_text()
    # Add nonstopmode to prevent halting on recoverable errors
    latex_content = latex_content.replace(
        r'\begin{document}',
        r'\nonstopmode' + '\n' + r'\begin{document}'
    )
    latex_content = fix_longtable_in_latex(latex_content)
    Path(latex_path).write_text(latex_content)

    # Step 3: Compile with tectonic
    print("Step 3: Compiling PDF with tectonic...")
    cmd_pdf = ["tectonic", "-X", "compile", latex_path, "-o", str(DOCS_DIR)]
    r2 = subprocess.run(cmd_pdf, capture_output=True, text=True)

    # Check if PDF was actually produced
    tex_name = Path(latex_path).stem
    generated_pdf = DOCS_DIR / f"{tex_name}.pdf"
    if not generated_pdf.exists() and r2.returncode != 0:
        print("Tectonic error:", r2.stderr[-3000:])
        raise SystemExit(1)

    # Rename output (tectonic names it after the .tex file)
    if generated_pdf.exists():
        generated_pdf.rename(OUTPUT_PDF)

    if r2.stderr:
        warnings = [l for l in r2.stderr.split('\n') if 'warning' in l.lower()]
        if warnings:
            print(f"({len(warnings)} warnings during compilation)")

    print(f"PDF written to {OUTPUT_PDF}")

    # Clean up
    for p in [template_path, md_path, latex_path]:
        Path(p).unlink(missing_ok=True)


if __name__ == "__main__":
    main()
