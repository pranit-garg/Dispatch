import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dispatch",
  description: "Terms of service for Dispatch, the decentralized compute network.",
  alternates: {
    canonical: "https://www.dispatch.computer/terms",
  },
};

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)]">
      <div className="mx-auto max-w-2xl px-6 py-24">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
          Terms of Service
        </h1>
        <p className="text-[var(--color-text-muted)] mb-12 text-sm">
          Last updated: February 10, 2026
        </p>

        <div className="space-y-10 text-[var(--color-text-muted)] leading-relaxed text-[15px]">
          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              1. What Dispatch is
            </h2>
            <p>
              Dispatch is a decentralized compute network where mobile devices
              and desktops run AI tasks for agents. Workers earn BOLT for
              completing jobs. The protocol uses ed25519 signed receipts to prove
              work and x402 micropayments for settlement.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              2. Testnet disclaimer
            </h2>
            <p>
              Dispatch is currently in{" "}
              <strong className="text-[var(--color-accent)]">
                testnet / beta
              </strong>
              . This means:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-3">
              <li>
                Earnings displayed in the app are simulated and may not reflect
                real value
              </li>
              <li>
                The network may experience downtime, bugs, or data loss without
                notice
              </li>
              <li>Smart contracts are unaudited stubs, not production-ready</li>
              <li>
                Token transfers and payment settlement may not function as
                expected
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              3. No guaranteed earnings
            </h2>
            <p>
              Dispatch does not guarantee any level of earnings, job
              availability, or payment settlement. Job routing depends on
              network demand, device availability, and coordinator capacity.
              Displayed earnings are estimates and may differ from actual
              settled amounts.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              4. Your responsibilities
            </h2>
            <ul className="list-disc list-inside space-y-2">
              <li>
                You are responsible for safeguarding your device keypair and
                wallet credentials
              </li>
              <li>
                Do not use Dispatch to process illegal content or circumvent any
                laws
              </li>
              <li>
                You agree that jobs run on your device are sandboxed heuristic
                tasks, not arbitrary code execution
              </li>
              <li>
                You accept the inherent risks of interacting with blockchain
                networks and smart contracts
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              5. Limitation of liability
            </h2>
            <p>
              Dispatch is provided &ldquo;as is&rdquo; without warranties of any
              kind. To the maximum extent permitted by law, the creators of
              Dispatch shall not be liable for any damages arising from use of
              the app, including but not limited to: loss of funds, loss of
              data, device damage, or inability to earn.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              6. Intellectual property
            </h2>
            <p>
              The Dispatch protocol is open source. The Dispatch name, logo, and
              brand assets are the property of their respective creators. You
              may not use them to imply endorsement without permission.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              7. Privacy
            </h2>
            <p>
              Your use of Dispatch is also governed by our{" "}
              <a
                href="/privacy"
                className="text-[var(--color-accent)] hover:underline"
              >
                Privacy Policy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              8. Changes to these terms
            </h2>
            <p>
              We may update these terms at any time. Continued use of Dispatch
              after changes constitutes acceptance. Material changes will be
              communicated through app release notes or this page.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--color-text)] mb-3">
              9. Contact
            </h2>
            <p>
              Questions about these terms? Reach out on{" "}
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
