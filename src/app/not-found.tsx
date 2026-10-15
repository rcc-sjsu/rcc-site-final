import type { Metadata } from 'next';
import MascotRocket from '@/components/MascotRocket';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Page not found | Responsible Computing Club @ SJSU',
};

// pixel stars scattered across the sky, as [left %, top %, size px]; a few are magenta
const STARS: [number, number, number][] = [
  [6, 14, 4],
  [14, 62, 3],
  [22, 28, 5],
  [31, 84, 3],
  [44, 10, 3],
  [52, 70, 4],
  [61, 22, 3],
  [68, 88, 5],
  [76, 8, 4],
  [84, 46, 3],
  [91, 18, 5],
  [95, 74, 3],
  [38, 46, 3],
  [3, 90, 4],
];
const MAGENTA_STARS = new Set([2, 7, 10]);

/** 404 page: "lost in space", with the mascot riding a rocket past a giant pixel 404. */
export default function NotFound() {
  return (
    <section
      className="relative isolate -mt-14 flex min-h-svh items-center overflow-hidden bg-linear-to-br from-rcc-ink via-rcc-navy to-rcc-violet pt-14 text-white"
      aria-labelledby="not-found-title"
    >
      {/* starfield */}
      <div aria-hidden className="absolute inset-0 -z-10">
        {STARS.map(([left, top, size], index) => (
          <span
            key={index}
            className={cn(
              'absolute motion-safe:animate-pulse',
              MAGENTA_STARS.has(index) ? 'bg-[#f0479a]' : 'bg-white/70'
            )}
            style={{ left: `${left}%`, top: `${top}%`, width: size, height: size, animationDelay: `${index * 0.4}s` }}
          />
        ))}
      </div>

      <div className="mx-auto grid w-full max-w-6xl items-center gap-6 px-6 py-16 sm:px-10 md:grid-cols-2">
        <div className="order-2 flex flex-col items-center gap-5 text-center md:order-1 md:items-start md:text-left motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
          <span className="flex items-center gap-2 font-pixel text-sm tracking-widest text-[#f0479a] uppercase">
            <span aria-hidden className="size-2 bg-[#f0479a]" />
            Error 404
          </span>
          <h1
            id="not-found-title"
            className="text-5xl leading-[1.02] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-7xl"
          >
            Lost in <span className="text-[#f0479a]">space.</span>
          </h1>
          <p className="max-w-md text-base leading-relaxed text-white/75 sm:text-lg">
            This page drifted out of orbit. The link might be broken, or the page may have moved. Let&apos;s get you
            back to base.
          </p>
          <div className="mt-2 flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
            <PixelCta href="/" className="font-mono text-sm tracking-wide uppercase">
              Back to base
            </PixelCta>
            <TickButton href="/events">See events</TickButton>
          </div>
        </div>

        {/* rocket rider in front of a giant pixel 404, with a speech bubble; hovering makes the mascot wave */}
        <div className="group/bot relative order-1 flex justify-center md:order-2">
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 text-center font-pixel text-[8rem] leading-none text-white/[0.06] select-none sm:text-[12rem] lg:text-[15rem]"
          >
            404
          </span>
          <div className="relative">
            <MascotRocket className="w-60 sm:w-72 lg:w-96" />
            <span className="absolute top-[2%] left-[56%] w-max rounded-2xl border-2 border-rcc-ink bg-white px-4 py-2.5 font-mono text-sm text-rcc-ink shadow-[4px_4px_0_0_#0b1d2f] transition-[translate,box-shadow] duration-300 ease-cta group-hover/bot:-translate-y-0.5 group-hover/bot:shadow-[6px_6px_0_0_#0b1d2f] max-sm:left-[42%]">
              Uh... where am I?
              {/* bubble tail pointing back at the mascot */}
              <span
                aria-hidden
                className="absolute bottom-[-9px] left-5 size-4 rotate-45 border-r-2 border-b-2 border-rcc-ink bg-white"
              />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
