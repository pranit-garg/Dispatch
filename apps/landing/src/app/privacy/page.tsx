export const metadata = {
  title: "Privacy Policy | Dispatch",
  description: "Privacy policy for Dispatch, the decentralized compute network.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Privacy Policy
        </h1>
        <p className="text-[var(--color-text-muted)] mb-12 text-sm">
          Last updated: February 10, 2026
        </p>

        <div className="space-y-10 text-[var(--color-text-muted)] leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              What Dispatch collects
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-[var(--color-text)]">
                  Ed25519 public keys
                </strong>
                : your device-generated worker identity or wallet address. Used
                to route jobs and verify signed receipts.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
                  Job metadata
                </strong>
                : task type, duration, timestamps, and success/failure status.
                Used for earnings tracking and network health.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
                  Earnings data
                </strong>
                : SOL amounts credited per completed job. Stored locally on your
                device.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
                  Connection logs
                </strong>
                : coordinator URL and connection timestamps. Used for
                diagnostics.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              What Dispatch does NOT collect
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>No name, email, phone number, or personal identifiers</li>
              <li>No location data or device fingerprinting</li>
              <li>No private keys (these never leave your device)</li>
              <li>No job input/output content, only metadata</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              How data is stored
            </h2>
            <p>
              Earnings history and job logs are stored locally on your device
              using AsyncStorage. Your ed25519 keypair is stored in the
              device&apos;s secure enclave via expo-secure-store. The coordinator
              server stores only the public key and job metadata needed to route
              work and verify receipts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              Third-party sharing
            </h2>
            <p>
              Dispatch does not sell, rent, or share your data with third
              parties. Job receipts signed by your device may be posted onchain
              (Solana or Monad) as part of the ERC-8004 reputation protocol.
              These contain only your public key and job outcome, no personal
              information.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              Your controls
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                <strong className="text-[var(--color-text)]">
                  Reset identity
                </strong>
                : generate a new keypair at any time in Settings. This
                disassociates your device from all prior job history.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
                  Disconnect
                </strong>
                : stop the worker to cease all data transmission to the
                coordinator.
              </li>
              <li>
                <strong className="text-[var(--color-text)]">
                  Uninstall
                </strong>
                : removes all local data. The coordinator retains public-key job
                logs for network integrity.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              Changes to this policy
            </h2>
            <p>
              Updates will be posted at this URL. Material changes will be noted
              in app release notes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              Contact
            </h2>
            <p>
              Questions? Reach out on{" "}
              <a
                href="https://x.com/pranit"
                className="text-[var(--color-accent)] hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                X (@pranit)
              </a>{" "}
              or open an issue on GitHub.
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-[var(--color-border)]">
          <a
            href="/"
            className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors"
          >
            &larr; Back to dispatch.computer
          </a>
        </div>
      </div>
    </main>
  );
}
