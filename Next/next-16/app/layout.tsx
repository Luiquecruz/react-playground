import type {Metadata} from 'next';
import { Schibsted_Grotesk, Martian_Mono } from 'next/font/google';
import LightRays from '@/components/LightRays';
import Header from '@/components/Header';
import './globals.css';

const schibstedGrotesk = Schibsted_Grotesk({
  variable: '--font-schibsted-grotesk',
  subsets: ['latin'],
});

const martianMono = Martian_Mono({
  variable: '--font-martian-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Dev Whatever',
  description: 'Nice hub and so on...',
};

export default function RootLayout({
 children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <html lang="en">
    <body className={`${schibstedGrotesk.variable} ${martianMono.variable} antialiased min-h-screen`}>
      <div className="absolute inset-0 top-0 z-[-1]">
        <LightRays
          raysOrigin="top-center"
          raysColor="#00ffff"
          raysSpeed={1.5}
          lightSpread={0.8}
          rayLength={1.2}
          followMouse={true}
          mouseInfluence={0.1}
          noiseAmount={0.1}
          distortion={0.05}
          className="custom-rays"
        />
      </div>

      <Header />

      <main>
        {children}
      </main>
    </body>
  </html>
  );
}
