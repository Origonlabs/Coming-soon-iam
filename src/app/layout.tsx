
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Próximamente — Opendex',
  description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto!',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#E5F0FF' },
    { media: '(prefers-color-scheme: dark)', color: '#111728' },
  ],
  openGraph: {
    title: 'Próximamente — Opendex',
    description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto!',
    type: 'website',
    locale: 'es_ES',
  },
  twitter: {
    card: 'summary',
    title: 'Próximamente — Opendex',
    description: 'Estamos construyendo algo nuevo y emocionante. ¡Vuelve pronto!',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/vlt3uxc.css" />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
