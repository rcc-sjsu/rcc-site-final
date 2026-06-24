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

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">
      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center justify-center h-17">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">
            <NavigationMenuItem>
              <Link href="/" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                About Us
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/events" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                Happening Now
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/membership" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                Membership
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/ambassadors" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                Ambassadors
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" className={cn(navigationMenuTriggerStyle(), 'text-[1.1rem]')}>
                Contact Us
              </Link>
            </NavigationMenuItem>
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
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/#about"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              About Us
            </Link>
            <Link
              href="/events"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Happening Now
            </Link>
            <Link
              href="/members"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Membership
            </Link>
            <Link
              href="/ambassadors"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Ambassadorship
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors"
            >
              Contact Us
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
