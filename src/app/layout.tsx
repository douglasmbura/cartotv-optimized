import type { Metadata, Viewport } from 'next'
import { ReactNode } from 'react'
import './globals.css'

export const metadata: Metadata = {
  title: 'CartoTV - Watch Live TV from Around the World',
  description: 'Stream live television from 180+ countries in 11 languages. Free, unlimited access to global TV channels.',
  keywords: ['live TV', 'streaming', 'international television', 'IPTV', 'global channels'],
  metadataBase: new URL('https://cartotv.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://cartotv.com',
    siteName: 'CartoTV',
    title: 'CartoTV - Watch Live TV from Around the World',
    description: 'Stream live television from 180+ countries in 11 languages.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'CartoTV - Global Live TV Streaming',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CartoTV - Watch Live TV from Around the World',
    description: 'Stream live television from 180+ countries in 11 languages.',
    creator: '@cartotv',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://cartotv.com',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-LVEWCM7QE2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-LVEWCM7QE2', { page_path: window.location.pathname });
            `,
          }}
        />

        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2116450199889361"
          crossOrigin="anonymous"
        />

        {/* OneSignal Push Notifications */}
        <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.OneSignal = window.OneSignal || [];
              OneSignal.push(function() {
                OneSignal.init({
                  appId: "4c598172-f798-4bd2-9483-90e2aefaf259",
                });
              });
            `,
          }}
        />

        {/* Preconnect to external APIs */}
        <link rel="preconnect" href="https://flagcdn.com" />
        <link rel="preconnect" href="https://raw.githubusercontent.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  )
}
