import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

// 5x5 pixel arrow pointing right; each [row, col] is a lit pixel
const ARROW_PIXELS = [
  [0, 2],
  [1, 3],
  [2, 0],
  [2, 1],
  [2, 2],
  [2, 3],
  [2, 4],
  [3, 3],
  [4, 2],
];

function PixelArrow({ className }: { className?: string }) {
  return (
    <span aria-hidden className={cn('grid grid-cols-5 grid-rows-5 gap-px', className)}>
      {Array.from({ length: 25 }, (_, index) => {
        const row = Math.floor(index / 5);
        const col = index % 5;
        const lit = ARROW_PIXELS.some(([r, c]) => r === row && c === col);
        return (
          <span
            key={index}
            className={cn(
              'size-[3px] bg-current',
              lit
                ? 'group-hover/cta:animate-pixel-wave group-focus-visible/cta:animate-pixel-wave motion-reduce:animate-none!'
                : 'opacity-0'
            )}
            // pixels light up left to right while hovered, so the arrow looks like it's moving
            style={{ animationDelay: `${col * 90}ms` }}
          />
        );
      })}
    </span>
  );
}

/**
 * Primary call to action: a magenta pixel-arrow tile that, on hover, slides to the far end while the magenta fill
 * sweeps across the whole button and the label shifts over to make room.
 */
function PixelCta({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'group/cta relative isolate inline-flex h-12 min-w-52 items-center overflow-hidden rounded-[10px] bg-white pr-5 pl-[54px] text-base font-semibold whitespace-nowrap text-rcc-violet shadow-lg shadow-rcc-magenta/20 transition-transform duration-[120ms] ease-cta outline-none select-none focus-visible:ring-3 focus-visible:ring-white/60 active:scale-[0.985]',
        className
      )}
      {...props}
    >
      {/* magenta fill: starts clipped to the tile, expands to the full button on hover */}
      <span
        aria-hidden
        className="absolute inset-0 -z-10 bg-highlight transition-[clip-path] duration-[360ms] ease-cta [clip-path:inset(3px_calc(100%-45px)_3px_3px_round_8px)] group-hover/cta:[clip-path:inset(3px_round_8px)] group-focus-visible/cta:[clip-path:inset(3px_round_8px)] motion-reduce:transition-none"
      />
      {/* the tile rides along this rail from the left edge to the right edge */}
      <span
        aria-hidden
        className="absolute top-[3px] left-[3px] h-[42px] w-[calc(100%-6px)] transition-transform duration-[360ms] ease-cta group-hover/cta:translate-x-[calc(100%-42px)] group-focus-visible/cta:translate-x-[calc(100%-42px)] motion-reduce:transition-none"
      >
        <span className="flex size-[42px] items-center justify-center text-white">
          <PixelArrow />
        </span>
      </span>
      <span className="relative transition-[color,translate] duration-[360ms] ease-cta group-hover/cta:-translate-x-[42px] group-hover/cta:text-white group-focus-visible/cta:-translate-x-[42px] group-focus-visible/cta:text-white motion-reduce:transition-none">
        {children}
      </span>
    </Link>
  );
}

// L-shaped corner ticks, one per corner; on hover each moves diagonally in toward the label
const TICKS = [
  'top-[-1px] left-[-1px] rounded-tl-[10px] border-t-[1.5px] border-l-[1.5px] group-hover/tick:translate-x-[4px] group-hover/tick:translate-y-[4px]',
  'top-[-1px] right-[-1px] rounded-tr-[10px] border-t-[1.5px] border-r-[1.5px] group-hover/tick:-translate-x-[4px] group-hover/tick:translate-y-[4px]',
  'bottom-[-1px] left-[-1px] rounded-bl-[10px] border-b-[1.5px] border-l-[1.5px] group-hover/tick:translate-x-[4px] group-hover/tick:-translate-y-[4px]',
  'right-[-1px] bottom-[-1px] rounded-br-[10px] border-r-[1.5px] border-b-[1.5px] group-hover/tick:-translate-x-[4px] group-hover/tick:-translate-y-[4px]',
];

/**
 * Secondary call to action: a pale rounded block framed by four thin, rounded corner ticks, with mono uppercase text and an up-right
 * arrow. On hover the ticks close in toward the label and the arrow nudges toward its corner.
 */
function TickButton({ className, children, ...props }: React.ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        'group/tick relative inline-flex h-12 items-center gap-6 rounded-[10px] bg-[#efeaf8] px-6 font-mono text-sm font-medium tracking-[0.14em] whitespace-nowrap text-rcc-ink uppercase transition-[background-color,scale] duration-200 ease-hover outline-none select-none hover:bg-white focus-visible:ring-3 focus-visible:ring-white/60 active:scale-[0.985]',
        className
      )}
      {...props}
    >
      {TICKS.map((position) => (
        <span
          key={position}
          aria-hidden
          className={cn(
            'pointer-events-none absolute size-4 border-[#9b6cf2] transition-transform duration-300 ease-cta motion-reduce:transition-none',
            position
          )}
        />
      ))}
      {children}
      <ArrowUpRightIcon
        aria-hidden
        className="size-4 transition-transform duration-300 ease-cta group-hover/tick:translate-x-0.5 group-hover/tick:-translate-y-0.5 motion-reduce:transition-none"
      />
    </Link>
  );
}

export { PixelCta, PixelArrow, TickButton };
