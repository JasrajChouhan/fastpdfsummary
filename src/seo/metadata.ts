import type { Metadata } from 'next';

export const siteMetadata: Metadata = {
  title: 'FastPDFSummary — Summarize PDFs Instantly with AI',
  description:
    'FastPDFSummary is an AI-powered SaaS tool that summarizes PDFs in seconds. Extract insights, save time, and boost productivity effortlessly.',
  applicationName: 'FastPDFSummary',
  generator: 'Next.js',
  keywords: [
    'FastPDFSummary',
    'PDF summarizer',
    'AI PDF tool',
    'summarize PDFs online',
    'Next.js SaaS',
    'document summary app',
    'AI productivity tool',
    'PDF insight extractor',
  ],
  category: 'technology',
  authors: [
    { name: 'FastPDFSummary Team', url: 'https://fastpdfsummary.com/about' },
  ],
  icons: {
    icon: '/icons/favicon.ico',
    shortcut: '/icons/favicon-32x32.png',
    apple: '/icons/apple-touch-icon.png',
    other: [
      {
        rel: 'mask-icon',
        url: '/icons/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },
  openGraph: {
    title: 'FastPDFSummary — Summarize PDFs Instantly with AI',
    description:
      'Instant PDF summaries powered by AI. Get concise insights without reading the whole document.',
    url: 'https://fastpdfsummary.com',
    siteName: 'FastPDFSummary',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: 'https://fastpdfsummary.com/og-image.jpg', // Replace with your hosted image
        width: 1200,
        height: 630,
        alt: 'FastPDFSummary Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FastPDFSummary — Summarize PDFs Instantly with AI',
    description:
      'Use AI to extract insights from any PDF file in seconds. Fast, easy, and powerful.',
    creator: '@fastpdfsummary',
    images: ['https://fastpdfsummary.com/twitter-card.jpg'], // Replace with your hosted image
  },
};
