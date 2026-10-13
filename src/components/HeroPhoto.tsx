'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Full-bleed hero photo that never shows a flat gray box while it downloads: a dark, slowly shimmering base sits
 * underneath, and the photo fades in and settles from a slight zoom once it has actually loaded.
 */
export default function HeroPhoto({ alt, className, onLoad, ...props }: Omit<ImageProps, 'fill'>) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 -z-30 bg-linear-to-br from-rcc-ink via-rcc-navy to-rcc-violet/70 transition-opacity duration-700',
          !loaded && 'motion-safe:animate-pulse',
          loaded && 'opacity-0'
        )}
      />
      <Image
        {...props}
        alt={alt}
        fill
        onLoad={(event) => {
          setLoaded(true);
          onLoad?.(event);
        }}
        className={cn(
          '-z-20 object-cover transition-[opacity,scale] duration-[1400ms] ease-out motion-reduce:transition-none',
          loaded ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          className
        )}
      />
    </>
  );
}
