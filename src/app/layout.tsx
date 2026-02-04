import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E5F0FF' },
    { media: '(prefers-color-scheme: dark)', color: '#111728' },
  ],
  colorScheme: 'dark light',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://opendex.com'),
  title: {
    default: 'Próximamente — Opendex',
    template: '%s | Opendex',
  },
  description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto para descubrirlo!',
  keywords: ['Opendex', 'próximamente', 'coming soon', 'innovación', 'tecnología'],
  authors: [{ name: 'Opendex Corporation' }],
  creator: 'Opendex Corporation',
  publisher: 'Opendex Corporation',
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
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180' },
    ],
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://opendex.com',
    siteName: 'Opendex',
    title: 'Próximamente — Opendex',
    description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto!',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Opendex - Próximamente',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Próximamente — Opendex',
    description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto!',
    images: ['/og-image.png'],
    creator: '@opendex',
  },
  alternates: {
    canonical: 'https://opendex.com',
  },
  category: 'technology',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        {/* Preconnect to external resources for better performance */}
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://use.typekit.net" />
        
        {/* Adobe Fonts (Typekit) */}
        <link rel="stylesheet" href="https://use.typekit.net/vlt3uxc.css" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: 'Próximamente — Opendex',
              description: 'Estamos construyendo algo nuevo y emocionante.',
              publisher: {
                '@type': 'Organization',
                name: 'Opendex Corporation',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://opendex.com/logo_opendex.png',
                },
              },
            }),
          }}
        />
      </head>
      <body className="font-body antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
