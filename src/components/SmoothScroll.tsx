'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// eased page scrolling site-wide; skipped entirely for people who ask for reduced motion
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // nested scrollers (dialogs, the Ask RCC log, combobox lists) keep their own native scrolling
    const lenis = new Lenis({ autoRaf: true, anchors: true, allowNestedScroll: true });
    return () => lenis.destroy();
  }, []);

  return null;
}
