import Image from 'next/image';
import PixelVeil from '@/components/PixelVeil';
import { cn } from '@/lib/utils';

/**
 * Dark, centered hero used at the top of every inner page so they match the homepage: the page's photo under the
 * interactive pixel veil, a badge, a headline (`accent` is shown in magenta after `title`), a description, and
 * optional actions. The header renders in its light-on-dark theme over it.
 */
export default function PageHero({
  badge,
  title,
  accent,
  description,
  image,
  imagePosition = 'center',
  className,
  children,
}: {
  badge: string;
  title: string;
  accent?: string;
  description?: React.ReactNode;
  image: string;
  imagePosition?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        'relative isolate -mt-14 flex min-h-[560px] flex-col justify-center overflow-hidden pt-14 text-white lg:min-h-[68svh]',
        className
      )}
      data-intersecting-header-theme="Homepage"
      aria-labelledby="page-hero-heading"
    >
      <Image
        src={image}
        alt=""
        fill
        priority
        sizes="100vw"
        data-page-hero-photo=""
        className="-z-20 object-cover"
        style={{ objectPosition: imagePosition }}
      />
      {/* pixel veil drawn from the photo above; without WebGL it stays hidden and the photo shows */}
      <PixelVeil imageSelector="img[data-page-hero-photo]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rcc-ink/70 via-rcc-navy/50 to-rcc-violet/45" />
      {/* soft dark glow behind the centered text so it stays readable over the pixels */}
      <div className="absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_60%_55%_at_50%_52%,rgb(11_29_47/0.8),rgb(11_29_47/0.4)_60%,transparent_88%)]" />

      <div className="mx-auto flex w-full max-w-7xl justify-center px-5 pt-20 pb-16 sm:px-10">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
          <span className="flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-3.5 py-1 font-mono text-xs tracking-widest text-white/85 uppercase backdrop-blur-md">
            <span aria-hidden className="size-2 shrink-0 bg-[#f0479a]" />
            {badge}
          </span>

          <h1
            id="page-hero-heading"
            className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4rem]"
          >
            {title}
            {accent && (
              <>
                {' '}
                <span className="text-[#f0479a]">{accent}</span>
              </>
            )}
          </h1>

          {description && (
            <span className="max-w-xl text-base leading-relaxed text-pretty text-white/80 sm:text-lg">
              {description}
            </span>
          )}

          {children && <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">{children}</div>}
        </div>
      </div>
    </section>
  );
}
