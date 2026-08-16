'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';

import style from './header.module.css';

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
  { text: 'Past Work', href: '/' },
];

interface Props {
  transparent?: boolean;
  'text-color'?: string;
  'accent-color'?: string;
  'bg-color'?: string;
}

export default function Header({
  transparent = false,
  'text-color': text_color,
  'accent-color': accent_color,
  'bg-color': bg_color,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header
      className={cn(style.header, transparent ? style.headerTransparent : style.headerOpaque)}
      style={
        {
          '--header-color-text': text_color,
          '--header-color-accent': accent_color,
          '--header-color-bg': bg_color,
        } as React.CSSProperties
      }
    >
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center justify-center h-17">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {nav_items.map((item, idx) => (
              <NavigationMenuItem key={idx}>
                {/* TODO double check there isnt a different way next wants us grabbing what the current page is */}
                <Link
                  href={item.href}
                  data-text={item.text}
                  className={cn(style.navLink, window.location.pathname === item.href && style.navLinkCurrent)}
                >
                  {item.text}
                </Link>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

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
