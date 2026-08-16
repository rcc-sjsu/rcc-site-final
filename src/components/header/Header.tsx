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
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center justify-center h-17">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            {nav_items.map((item, idx) => (
              <NavigationMenuItem key={idx}>
                <Link href={item.href} className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
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
