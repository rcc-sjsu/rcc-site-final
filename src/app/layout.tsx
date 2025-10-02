import type { Metadata } from 'next';
import { Inter, Nunito_Sans, Zilla_Slab } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from './page.module.css';
import { getUser } from './utils/authUtils/authHelpers';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: '400',
});

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  weight: ['200', '300', '400', '500', '600', '700', '800'],
});

const zillaSlab = Zilla_Slab({
  variable: '--font-zilla-slab',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'RCC Site',
  description: "Member Portal for SJSU's Responsible Computing Club",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // get current user on application load and pass to Navbar
  const user = await getUser();
  return (
    <html lang="en">
      <body className={`${styles.container} ${nunitoSans.variable} ${inter.variable} ${zillaSlab.variable}`}>
        <Header user={user} />
        {/* All your page content will be rendered inside this main tag */}
        <main className={styles.pageContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
