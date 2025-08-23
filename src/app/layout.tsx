import type { Metadata } from 'next';
import { Geist, Geist_Mono, Zilla_Slab } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import styles from './page.module.css';

// UPDATE FOR RCC SITE
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const zillaSlab = Zilla_Slab({
  variable: '--font-zilla-slab',
  subsets: ['latin'],
  weight: ['500','600','700']
})

export const metadata: Metadata = {
  title: 'RCC Site',
  description: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${zillaSlab.variable} ${geistSans.variable} ${geistMono.variable} antialiased ${styles.container}`}>
        {/* The Header component will appear on all pages */}
        <Header />
        {/* All your page content will be rendered inside this main tag */}
        <main className={styles.pageContent}>{children}</main>
      </body>
    </html>
  );
}
