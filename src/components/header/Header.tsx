'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRightIcon, Menu, X } from 'lucide-react';
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
  { text: 'Events', href: '/events' },
  { text: 'Ambassadors', href: '/ambassadors' },
  { text: 'Contact Us', href: '/contact' },
  // TODO: replace the href w/ link to the Past Work page and uncomment me
  // when the Past Work page is ready for deployment.
  // { text: 'Past Work', href: '/TODO' },
];

// pages that open with a dark hero the header overlaps (see PageHero / the homepage hero)
const DARK_HERO_PAGES = ['/', '/about', '/events', '/ambassadors', '/contact'];

function initialHeaderThemeFor(pathname: string): string {
  return DARK_HERO_PAGES.includes(pathname) ? 'Homepage' : 'Standard';
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const headerRef = useRef<HTMLElement | null>(null);

  // here we default the header theme to whatever the initial page's header theme
  // should probably be. doing this solves a brief flash of the wrong theme as
  // the page is first loading
  const [headerTheme, setHeaderTheme] = useState(initialHeaderThemeFor(pathname));

  // It would be cleaner to not have to hardcode this page-specific logic in the
  // header itself, but given that A) it's only used in a single page currently,
  // B) we're already doing pathname-specific logic for highlighting the current
  // page, and C) actually letting the page actually signal what header style it
  // wants would either need some structural refactoring of stuff OR necessitate
  // some janky or way-overcomplicated-for-this-situation (or both) solutions to
  // facilitate that. So all things considered I think this is probably the best
  // choice for now and if we start needing page-specific header styles in other
  // pages too sometime down the line, then we can revisit this and do it right.
  //                                                                       -amgg
  const has_dark_hero = DARK_HERO_PAGES.includes(pathname);

  // FIXME should maybe be debounced a bit?
  const updateHeaderTheme = useCallback(() => {
    if (headerRef.current === null) return;
    const bounds = headerRef.current.getBoundingClientRect();
    const x = (bounds.left + bounds.right) / 2;
    const y = (bounds.top + bounds.bottom) * 0.75;
    const theme = document
      .elementsFromPoint(x, y)
      .map((elem) => elem.closest('[data-intersecting-header-theme]') as HTMLElement | SVGElement)
      .find((elem) => elem !== null)?.dataset?.intersectingHeaderTheme;
    setHeaderTheme(theme ?? 'Standard');
  }, []);
  useEffect(() => {
    // checks at most once per frame while scrolling
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        updateHeaderTheme();
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    // polling really isn't ideal but if there's some weird edge case where it doesn't otherwise get fired AND the user
    // doesn't scroll, this will at least set it to the correct thing within a few seconds.
    const timeout = setInterval(updateHeaderTheme, 2_000);
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
      clearInterval(timeout);
    };
  }, [updateHeaderTheme]);

  // re-calculate the header theme immediately after navigation, so that it'll be
  // correct even before the user scrolls.
  useEffect(() => {
    updateHeaderTheme();
  }, [pathname, updateHeaderTheme]);

  // close the mobile menu with Escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobileOpen]);

  const dark = headerTheme === 'Homepage' && !mobileOpen;

  return (
    <header
      ref={headerRef}
      className={cn(
        style.header,
        has_dark_hero && style.headerOverlappingContent,
        dark ? style.headerDark : style.headerLight
      )}
    >
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-4 sm:h-16 sm:px-8">
        {/* accessibility note: aria-hidden since the nav below also links home (see w3.org/TR/wai-aria-1.2/#aria-hidden) */}
        <Link href="/" className="group/logo flex shrink-0 items-center gap-2.5" aria-hidden tabIndex={-1}>
          <span className="relative size-9 overflow-hidden rounded-full bg-white ring-2 ring-[#9b6cf2] transition-transform duration-300 ease-cta group-hover/logo:rotate-[-8deg]">
            <Image alt="" fill src="/rcc-logo-transparent.png" sizes="36px" />
          </span>
          <span className={cn('hidden font-mono text-sm font-bold tracking-wider uppercase lg:block', style.text)}>
            Responsible Computing Club
          </span>
        </Link>

        <div className="grow" />

        {/* Desktop Nav */}
        <DesktopNav pathname={pathname} />

        <Link
          href="/about#get-involved"
          className={cn(
            'group/cta hidden h-9 shrink-0 items-center gap-1.5 rounded-full bg-[#d00870] px-4 font-mono text-xs font-bold tracking-wide text-white uppercase transition-[background-color,scale] duration-200 ease-hover outline-none hover:bg-[#b0065e] focus-visible:ring-3 focus-visible:ring-[#f0479a]/50 active:scale-[0.97] md:inline-flex'
          )}
        >
          Join RCC
          <ArrowRightIcon
            aria-hidden
            className="size-3.5 transition-transform duration-300 ease-cta group-hover/cta:translate-x-0.5"
          />
        </Link>

        {/* Mobile Nav */}
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(
            'flex size-10 items-center justify-center rounded-full transition-colors outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:hidden',
            style.menuButton
          )}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav"
        >
          {mobileOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {mobileOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-t border-rcc-ink/10 bg-white px-4 pt-2 pb-5 shadow-lg shadow-rcc-ink/10 md:hidden motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2"
        >
          <ul className="flex flex-col">
            {nav_items.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={current ? 'page' : undefined}
                    className={cn(
                      'flex items-center gap-2.5 rounded-lg px-3 py-3 text-base text-rcc-ink transition-colors hover:bg-accent',
                      current && 'bg-accent font-semibold text-rcc-violet'
                    )}
                  >
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/about#get-involved"
            onClick={() => setMobileOpen(false)}
            className="mt-3 flex h-11 items-center justify-center gap-1.5 rounded-full bg-[#d00870] font-mono text-sm font-bold tracking-wide text-white uppercase"
          >
            Join RCC
            <ArrowRightIcon aria-hidden className="size-4" />
          </Link>
        </nav>
      )}
    </header>
  );
}

/**
 * Desktop links with a Vercel-style sliding highlight: one pill glides to whichever link is hovered or focused, and
 * glides back to the current page's link when the pointer leaves. Positioned straight from the DOM (no re-renders).
 */
function DesktopNav({ pathname }: { pathname: string }) {
  const listRef = useRef<HTMLUListElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);

  const moveTo = useCallback((target: HTMLElement | null, animate = true) => {
    const pill = pillRef.current;
    const list = listRef.current;
    if (!pill || !list) return;
    if (!target) {
      pill.style.opacity = '0';
      return;
    }
    pill.style.transitionDuration = animate ? '' : '0s';
    pill.style.opacity = '1';
    pill.style.width = `${target.offsetWidth}px`;
    pill.style.transform = `translateX(${target.offsetLeft}px)`;
  }, []);

  const currentLink = useCallback(
    () => listRef.current?.querySelector<HTMLElement>('a[aria-current="page"]') ?? null,
    []
  );

  // snap to the current page on first paint, glide on later navigations, and keep aligned on resize/font load
  const mounted = useRef(false);
  useLayoutEffect(() => {
    moveTo(currentLink(), mounted.current);
    mounted.current = true;
  }, [pathname, moveTo, currentLink]);
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const observer = new ResizeObserver(() => moveTo(currentLink(), false));
    observer.observe(list);
    return () => observer.disconnect();
  }, [moveTo, currentLink]);

  return (
    <NavigationMenu.Root className="hidden md:block">
      <NavigationMenu.List
        ref={listRef}
        className={cn('relative flex items-center gap-1 rounded-full p-1', style.navTrack)}
        onPointerLeave={() => moveTo(currentLink())}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) moveTo(currentLink());
        }}
      >
        <span ref={pillRef} aria-hidden className={style.navPill} />
        {nav_items.map((item) => {
          const current = pathname === item.href;
          return (
            <NavigationMenu.Item key={item.href}>
              <Link
                href={item.href}
                className={cn(style.navLink, current && style.navLinkCurrent)}
                aria-current={current ? 'page' : undefined}
                onPointerEnter={(event) => moveTo(event.currentTarget)}
                onFocus={(event) => moveTo(event.currentTarget)}
              >
                {item.text}
              </Link>
            </NavigationMenu.Item>
          );
        })}
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
}
