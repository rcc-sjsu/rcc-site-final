'use client';

import { motion, useReducedMotion } from 'motion/react';

// strong ease-out (matches --ease-cta): most of the travel happens up front, so content feels quick to arrive
const EASE_OUT = [0.23, 1, 0.32, 1] as const;

/**
 * Fades and lifts its children into place the first time they scroll into view. `delay` (ms) staggers siblings.
 * For reduced motion it only fades, with no movement.
 */
export default function Reveal({
  delay = 0,
  className,
  children,
}: {
  delay?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      // full transform strings (not the x/y shorthands) so the animation stays on the compositor. The starting state
      // matches the server render; reduced motion only changes the (client-side) transition, so hydration agrees
      initial={{ opacity: 0, transform: 'translateY(10px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{
        delay: delay / 1000,
        opacity: { duration: reduceMotion ? 0.2 : 0.6, ease: EASE_OUT },
        // the lift snaps into place while still invisible, so reduced motion sees a plain fade
        transform: { duration: reduceMotion ? 0 : 0.6, ease: EASE_OUT },
      }}
    >
      {children}
    </motion.div>
  );
}
