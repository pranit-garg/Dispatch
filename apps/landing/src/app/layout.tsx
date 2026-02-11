import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#0a0a0f",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.dispatch.computer"),
  title: "Dispatch: Cheap AI Compute for Agents, Passive Income for Workers",
  description:
    "Dispatch is a compute service where AI agents submit jobs over HTTP and workers earn USDC from idle hardware. Ed25519 verified results. Live on Monad and Solana testnet.",
  keywords: [
    "Dispatch",
    "AI compute network",
    "agent compute",
    "x402 micropayments",
    "ERC-8004",
    "idle hardware",
    "DePIN",
    "Monad",
    "Solana",
    "decentralized compute",
    "AI inference",
    "onchain reputation",
    "Solana Seeker",
    "distributed computing",
    "BOLT token",
  ],
  icons: { icon: "/favicon.svg", apple: "/favicon.svg" },
  alternates: {
    canonical: "https://www.dispatch.computer",
  },
  openGraph: {
    title: "Dispatch: Cheap AI Compute for Agents",
    description:
      "Dispatch is a compute service where AI agents submit jobs over HTTP and workers earn USDC from idle hardware. Ed25519 verified results. Live on Monad and Solana testnet.",
    type: "website",
    siteName: "Dispatch",
    url: "https://www.dispatch.computer",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dispatch: Cheap AI Compute for Agents",
    description:
      "Dispatch is a compute service where AI agents submit jobs over HTTP and workers earn USDC from idle hardware. Ed25519 verified results. Live on Monad and Solana testnet.",
    creator: "@pranit",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Dispatch",
  alternateName: "Dispatch Compute Network",
  description:
    "Dispatch is a compute service where AI agents submit jobs over HTTP and workers earn USDC from idle hardware. Ed25519 verified results. Live on Monad and Solana testnet.",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Cross-platform",
  url: "https://www.dispatch.computer",
  author: {
    "@type": "Person",
    name: "Pranit Garg",
    url: "https://x.com/pranit",
  },
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Open source, testnet MVP",
  },
  keywords: "AI compute, x402, ERC-8004, Monad, Solana, DePIN, idle hardware, agent compute, BOLT token",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="AwpOhyGmyBeMIhUiazfBs4NTelU2Rb-mp9h4MWtH9Y0" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-grid bg-noise min-h-screen">
        {children}

        {/* Google Analytics. TODO: Pranit needs to set NEXT_PUBLIC_GA_ID env var on Vercel */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('consent', 'default', {
                  analytics_storage: 'granted'
                });
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
