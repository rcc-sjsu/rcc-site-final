import Image from 'next/image';
import { cn } from '@/lib/utils';
import { getEventEndDate, getEventStartDay, type RccEvent } from '../data/Events';

const CELL = 16;

// a few lit cells on the cover's pixel grid, picked from the event id so each cover looks different but stays stable
function litCells(id: string) {
  let hash = 0;
  for (const char of id) hash = (hash * 31 + char.charCodeAt(0)) >>> 0;
  const cells: { col: number; row: number; accent: boolean }[] = [];
  // up to 7 distinct cells (a repeat is skipped, so no two squares share a spot)
  for (let i = 0; i < 7; i++) {
    hash = (hash * 1103515245 + 12345) >>> 0;
    // counted from the top-right corner, kept clear of the date in the bottom-left
    const col = hash % 7;
    const row = (hash >>> 8) % 4;
    if (cells.some((cell) => cell.col === col && cell.row === row)) continue;
    cells.push({ col, row, accent: cells.length === 0 });
  }
  return cells;
}

/**
 * Artwork for an event card or popup. Shows the flyer when there is one; otherwise a branded cover: the date set big
 * on the navy-violet gradient with a pixel grid, in the same pixel language as the rest of the site.
 */
export default function EventCover({
  event,
  sizes,
  compact = false,
  className,
}: {
  event: RccEvent;
  sizes: string;
  compact?: boolean;
  className?: string;
}) {
  if (event.imageURL) {
    return (
      <div className={cn('relative overflow-hidden bg-muted', className)}>
        <Image src={event.imageURL} alt="" fill sizes={sizes} className="object-cover" />
      </div>
    );
  }

  const start = getEventStartDay(event);
  const end = getEventEndDate(event);
  const sameDay = start.toDateString() === end.toDateString();
  const month = start.toLocaleDateString('en-US', { month: 'short' });
  const days = sameDay ? `${start.getDate()}` : `${start.getDate()}–${end.getDate()}`;
  const weekday = sameDay
    ? start.toLocaleDateString('en-US', { weekday: 'long' })
    : `${start.toLocaleDateString('en-US', { weekday: 'short' })}–${end.toLocaleDateString('en-US', { weekday: 'short' })}`;

  return (
    <div
      aria-hidden
      className={cn(
        'relative isolate flex flex-col justify-between overflow-hidden bg-linear-to-br from-rcc-ink via-rcc-navy to-rcc-violet text-white',
        compact ? 'p-4' : 'p-4 sm:p-5',
        className
      )}
    >
      {/* pixel grid, aligned to the top-right corner so the lit cells below sit exactly in it */}
      <span
        className="absolute inset-0 -z-10 opacity-[0.09]"
        style={{
          backgroundImage:
            'linear-gradient(to left, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)',
          backgroundSize: `${CELL}px ${CELL}px`,
          backgroundPosition: 'right top',
        }}
      />
      {litCells(event.id).map(({ col, row, accent }) => (
        <span
          key={`${col}-${row}`}
          className={cn('absolute -z-10', accent ? 'bg-[#f0479a]/80' : 'bg-white/12')}
          style={{ width: CELL, height: CELL, right: col * CELL, top: row * CELL }}
        />
      ))}

      <span className="flex items-center gap-2 font-pixel text-xs tracking-widest text-white/80 uppercase">
        <span className="size-2 bg-[#f0479a]" />
        {event.kind}
      </span>

      <span className="flex items-end justify-between gap-3">
        <span className="flex flex-col">
          <span className="font-mono text-xs font-bold tracking-[0.2em] text-white/70 uppercase">{month}</span>
          <span
            className={cn(
              'leading-none font-semibold tracking-[-0.04em]',
              compact ? 'text-4xl' : 'text-5xl sm:text-6xl'
            )}
          >
            {days}
          </span>
        </span>
        <span className="pb-1 font-mono text-[11px] tracking-wider text-white/60 uppercase">{weekday}</span>
      </span>
    </div>
  );
}
