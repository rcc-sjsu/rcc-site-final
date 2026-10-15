'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { RccBot, type MascotMood, type MascotTint } from './RccBot';

// the looks a click cycles through (colors from the 2026 sticker set)
const LOOKS: { tint: MascotTint; mood: MascotMood; name: string }[] = [
  { tint: 'gold', mood: 'happy', name: 'gold and smiling' },
  { tint: 'pink', mood: 'wink', name: 'pink and winking' },
  { tint: 'lilac', mood: 'wow', name: 'lilac and amazed' },
  { tint: 'coral', mood: 'happy', name: 'coral and smiling' },
  { tint: 'gold', mood: 'wow', name: 'gold and amazed' },
  { tint: 'pink', mood: 'dizzy', name: 'pink and dizzy' },
  { tint: 'lilac', mood: 'wink', name: 'lilac and winking' },
];

/** The footer mascot as a button: each click squashes it and pops it back in the next color and expression. */
export default function MascotSwap({ className }: { className?: string }) {
  const [index, setIndex] = useState(0);
  const look = LOOKS[index];

  return (
    <button
      type="button"
      onClick={() => setIndex((current) => (current + 1) % LOOKS.length)}
      aria-label="Change the mascot's look"
      className={cn(
        'cursor-pointer rounded-2xl outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className
      )}
    >
      {/* re-keyed on every change so the pop animation replays */}
      <span
        key={index}
        className={cn(
          'block origin-bottom',
          index > 0 && 'motion-safe:animate-[mascot-swap_0.45s_cubic-bezier(0.23,1,0.32,1)]'
        )}
      >
        <RccBot className="w-full" tint={look.tint} mood={look.mood} label={null} />
      </span>
      <span className="sr-only" aria-live="polite">
        {index > 0 && `The mascot is now ${look.name}.`}
      </span>
    </button>
  );
}
