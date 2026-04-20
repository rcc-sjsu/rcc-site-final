"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'

const oldAmbassadorshipLinks = [
  { href: '/ambassadors', label: 'Ambassadors' },
  { href: '/projects', label: 'Projects' },
  { href: '/industry', label: 'Industry' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mobileOldAmbassOpen, setMobileOldAmbassOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100">

      {/* Desktop Nav */}
      <div className="hidden sm:flex items-center justify-center h-[4.25rem]">
        <NavigationMenu>
          <NavigationMenuList className="gap-6">

            <NavigationMenuItem>
              <Link href="/" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                Home
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/about" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                About Us
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/events" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                Happening Now
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/members" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                Membership
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/ambassadors" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                Ambassadors
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <Link href="/contact" className={cn(navigationMenuTriggerStyle(), "text-[1.1rem]")}>
                Contact Us
              </Link>
            </NavigationMenuItem>

            {/* Old Ambassadorship dropdown — preserved for reference */}
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-[1.1rem] text-gray-400">
                Old
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="flex flex-col w-44 p-1">
                  {oldAmbassadorshipLinks.map(({ href, label }) => (
                    <li key={href}>
                      <Link
                        href={href}
                        className="block px-3 py-2 text-sm rounded-md hover:bg-muted transition-colors"
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
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
            <Link href="/" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Home
            </Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              About Us
            </Link>
            <Link href="/events" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Happening Now
            </Link>
            <Link href="/members" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Membership
            </Link>
            <Link href="/ambassadors" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Ambassadorship
            </Link>
            <Link href="/contact" onClick={() => setMobileOpen(false)} className="block px-4 py-2 text-sm hover:bg-gray-50 transition-colors">
              Contact Us
            </Link>

            {/* Old Ambassadorship dropdown */}
            <button
              onClick={() => setMobileOldAmbassOpen(!mobileOldAmbassOpen)}
              className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:bg-gray-50 flex items-center justify-between transition-colors"
            >
              Old
              <span className={cn("transition-transform duration-200 text-xs", mobileOldAmbassOpen && "rotate-180")}>
                ▾
              </span>
            </button>

            {mobileOldAmbassOpen && (
              <div className="border-t border-gray-100">
                {oldAmbassadorshipLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-6 py-2 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

    </header>
  )
}
