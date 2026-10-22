import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Vanguard Marketing — Grow Your Business with Smarter Marketing',
  description:
    'A modern SaaS marketing platform to capture leads, manage your pipeline, and understand campaign performance in one workflow.',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-white text-slate-900">{children}</body>
    </html>
  )
}
