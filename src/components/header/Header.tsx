'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { NavigationMenu } from '@base-ui/react/navigation-menu';
import { cn } from '@/lib/utils';

import style from './header.module.css';
import { usePathname } from 'next/navigation';

interface NavItem {
  text: string;
  href: string;
}

const nav_items: NavItem[] = [
  { text: 'Home', href: '/' },
  { text: 'About Us', href: '/about' },
  { text: 'Happening Now', href: '/events' },
  { text: 'Membership', href: '/membership' },
  { text: 'Ambassadors', href: '/ambassadors' },
  { text: 'Contact Us', href: '/contact' },
  // FIXME needs the actual link for whatever page thats gonna be
  { text: 'Past Work', href: '/TODO' },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // we special-case style stuff based on being the homepage
  const is_homepage = pathname === '/';

  return (
    <header className={cn(style.header, is_homepage ? style.headerHomepage : style.headerStandard)}>
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center justify-center h-20 mx-5">
        {/* TODO a11y best practices question -- should this be labeled as button that goes to homepage, or should it be skipped entirely since theres alread a home button on the navbar which makes this redundant screenreader-wise */}
        <Link href="/" aria-label="Home" className={style.logoImageContainer}>
          <Image alt="" fill src="/RCC_Main_Logo_Final.png" />
        </Link>
        {/* (padding bodge) */} <div className="grow min-w-2" />
        <NavigationMenu.Root>
          <NavigationMenu.List className={style.navLinksList}>
            {nav_items.map((item, idx) => (
              <NavigationMenu.Item key={idx} className={style.navLinkContainer}>
                <Link
                  href={item.href}
                  data-text={item.text}
                  className={cn(style.navLink, pathname === item.href && style.navLinkCurrent)}
                >
                  {item.text}
                </Link>
              </NavigationMenu.Item>
            ))}
          </NavigationMenu.List>
        </NavigationMenu.Root>
        {/* (padding bodge) */} <div className="min-w-2 max-w-8 grow-[0.1]" />
        {/* TODO temp placeholder for the sign in button & pfp circle */}
        <div className="bg-[lime] min-w-16 w-16 h-8.5 rounded-full" />
        <div className="bg-[lime] min-w-8.5 w-8.5 h-8.5 rounded-full" />
      </div>

      {/* TODO need to deal w/ the mobile stuff */}
      {/* Mobile Nav */}
      <div className="sm:hidden flex items-center h-14 px-4">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-full shadow-sm bg-white border border-gray-200"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-14 left-4 z-50 bg-white rounded-lg shadow-md min-w-44 py-1 border border-gray-100">
            {nav_items.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
              >
                {item.text}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
