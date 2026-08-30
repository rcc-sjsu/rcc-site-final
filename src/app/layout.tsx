import type { Metadata } from 'next';
import { DotGothic16, Inter, Nunito_Sans, Zilla_Slab, Geist } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from './page.module.css';
import { cn } from '@/lib/utils';

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '400',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: '500',
});

const zillaSlab = Zilla_Slab({
  variable: '--font-zilla-slab',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  style: ['normal', 'italic'],
});

const dotGothic16 = DotGothic16({
  variable: '--font-dot-gothic-16',
  subsets: ['latin'],
  weight: '400',
});

export const metadata: Metadata = {
  title: 'Responsible Computing Club @ SJSU',
  description: "Member Portal for SJSU's Responsible Computing Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', geist.variable)}>
      <body
        className={cn(styles.container, nunitoSans.variable, inter.variable, zillaSlab.variable, dotGothic16.variable)}
      >
        <Header />
        {/* All your page content will be rendered inside this main tag */}
        <main className={styles.pageContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
