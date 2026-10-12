import type { Metadata } from 'next';
import Script from 'next/script';
import { DotGothic16, Nunito_Sans, Space_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import styles from './page.module.css';
import { cn } from '@/lib/utils';

// variable font: one file covers every weight the site uses (instead of synthesizing bold from a single weight)
const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  variable: '--font-nunito-sans',
  display: 'swap',
});

const spaceMono = Space_Mono({
  variable: '--font-space-mono',
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

// only used for small section labels below the fold, so it isn't preloaded
const dotGothic16 = DotGothic16({
  variable: '--font-dot-gothic-16',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
  preload: false,
});

// Some browser extensions (e.g. Bitdefender's anti-tracker) stamp attributes such as `bis_skin_checked` onto the page
// before React hydrates, which React then reports as a hydration mismatch. This runs before hydration, strips just
// those extension-added attributes as they appear, and stops watching shortly after the page has loaded.
const STRIP_EXTENSION_ATTRIBUTES = `(() => {
  const isExtensionAttr = (name) => name === 'bis_skin_checked' || name === 'bis_register' || name.startsWith('__processed_');
  const clean = (el) => {
    if (!el.attributes) return;
    for (const attr of Array.from(el.attributes)) if (isExtensionAttr(attr.name)) el.removeAttribute(attr.name);
  };
  const observer = new MutationObserver((mutations) => {
    for (const m of mutations) {
      if (m.type === 'attributes' && isExtensionAttr(m.attributeName)) m.target.removeAttribute(m.attributeName);
      else for (const node of m.addedNodes) if (node.nodeType === 1) { clean(node); node.querySelectorAll('*').forEach(clean); }
    }
  });
  observer.observe(document.documentElement, { attributes: true, childList: true, subtree: true });
  document.querySelectorAll('*').forEach(clean);
  addEventListener('load', () => setTimeout(() => observer.disconnect(), 3000), { once: true });
})();`;

export const metadata: Metadata = {
  title: 'Responsible Computing Club @ SJSU',
  description: "Website for SJSU's Responsible Computing Club",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn('font-sans', nunitoSans.variable)} suppressHydrationWarning>
      <head>
        <Script id="strip-extension-attributes" strategy="beforeInteractive">
          {STRIP_EXTENSION_ATTRIBUTES}
        </Script>
      </head>
      <body suppressHydrationWarning className={cn(styles.container, dotGothic16.variable, spaceMono.variable)}>
        <Header />
        {/* All your page content will be rendered inside this main tag */}
        <main className={styles.pageContent}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
