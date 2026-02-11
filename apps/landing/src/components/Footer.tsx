export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 md:flex-row md:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold">Dispatch</span>
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-text-dim">
              MVP
            </span>
          </div>
          <p className="mt-1 text-sm text-text-dim">
            Cheap AI compute for agents. Passive income for workers. Open source.
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="flex items-center gap-6">
            <a
              href="https://docs.dispatch.computer/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              Docs
            </a>
            <a
              href="https://github.com/pranit-garg/Dispatch"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              GitHub
            </a>
            <a
              href="https://github.com/pranit-garg/Dispatch/raw/main/docs/Dispatch_Litepaper.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-muted transition-colors hover:text-text"
            >
              Litepaper
            </a>
            <a href="/privacy" className="text-sm text-text-muted transition-colors hover:text-text">
              Privacy
            </a>
            <a href="/terms" className="text-sm text-text-muted transition-colors hover:text-text">
              Terms
            </a>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://x.com/pranit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-muted transition-colors hover:text-text"
              aria-label="Follow on X"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
