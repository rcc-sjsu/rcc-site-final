import Image, { type ImageProps } from 'next/image';
import { cn } from '@/lib/utils';

/**
 * Full-bleed hero photo that never shows a flat gray box while it downloads. Pass a static import as `src` and the
 * browser paints a blurred preview with the HTML, then swaps in the photo as soon as it arrives; nothing waits on
 * hydration, and a cached photo shows instantly on client navigation. A dark gradient sits underneath in case the
 * preview is missing (e.g. a string `src`).
 */
export default function HeroPhoto({ alt, className, src, ...props }: Omit<ImageProps, 'fill'>) {
  return (
    <>
      <div aria-hidden className="absolute inset-0 -z-30 bg-linear-to-br from-rcc-ink via-rcc-navy to-rcc-violet/70" />
      <Image
        {...props}
        src={src}
        alt={alt}
        fill
        placeholder={typeof src === 'object' ? 'blur' : 'empty'}
        className={cn('-z-20 object-cover', className)}
      />
    </>
  );
}
