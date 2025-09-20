import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { PWALoader } from '@/components/pwa-loader';
import { Footer } from '@/components/footer';
import { TopLoader } from '@/components/top-loader';
import { Inter, Poppins } from 'next/font/google';

export const metadata: Metadata = {
  title: 'Delhi Seva Kendra',
  description: 'Your one-stop portal for essential services in Delhi.',
};

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <meta name="application-name" content="Delhi Seva Kendra" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Delhi Seva Kendra" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#3F51B5" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="font-body antialiased min-h-screen flex flex-col">
        <TopLoader />
        <PWALoader />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
