# CSS Animation Library — Club Site

Reusable, copy-pasteable animation classes for the site. Each section below has: what it's for, the HTML structure it expects, the CSS to drop in, and notes on customizing it.

Status:

- [x] Marquee (partner/industry logos)
- [x] Card hover highlight
- [x] Button contrast (dark purple)

---

## 1. Marquee — scrolling partner/industry logos

**Use case:** horizontally auto-scrolling strip of logos, e.g. the "Industry Partners" section on the home page. Currently live there with our 3 real partner logos.

**Behavior:**

- Scrolls continuously, left, on a loop — zero JS driving the animation itself (plain CSS `@keyframes`), only React logic is computing width/duration from item count
- Edges fade out instead of hard-cutting (mask gradient)
- Wrapper width and scroll duration both scale with how many items are passed in, so it doesn't look sparse with few logos or feel rushed with many
- Falls back to a manually-scrollable strip if the visitor has "reduce motion" turned on

### Component: `components/ui/marquee.tsx`

![Marquee Example](https://private-user-images.githubusercontent.com/169002602/617356984-4505b09c-176c-4c26-b452-d3bc3594932d.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQ2MDQ4MDYsIm5iZiI6MTc4NDYwNDUwNiwicGF0aCI6Ii8xNjkwMDI2MDIvNjE3MzU2OTg0LTQ1MDViMDljLTE3NmMtNGMyNi1iNDUyLWQzYmMzNTk0OTMyZC5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcyMVQwMzI4MjZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT0zNTdiNDg1Yjk5YTZmZDUyNGZkOTRiMTllYzBkZWYyY2M2NjNkZjcwMmM4ZmY1MzZlZmVmMTE4M2FhYWMxOWQzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZnaWYifQ.F4vlx5538EHe3t9M5yxEAY0kdPIL4Y_lSnCOSVTGRBU)

```tsx
import Image from 'next/image';

export interface Partner {
  name: string;
  src: string;
  width?: number;
  height?: number;
}

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <figure className="marquee-item flex flex-col items-center justify-center gap-3">
      <Image
        src={partner.src}
        alt={partner.name}
        width={partner.width ?? 140}
        height={partner.height ?? 140}
        className="h-20 w-auto object-contain md:h-28"
      />
      <figcaption className="text-sm md:text-base font-semibold text-brand-indigo whitespace-nowrap">
        {partner.name}
      </figcaption>
    </figure>
  );
}

function MarqueeGroup({ partners, hidden }: { partners: Partner[]; hidden?: boolean }) {
  return (
    <div className="marquee-group" aria-hidden={hidden || undefined}>
      {partners.map((partner) => (
        <PartnerLogo key={partner.name} partner={partner} />
      ))}
    </div>
  );
}

export function Marquee({
  partners,
  secondsPerItem = 4,
  pxPerItem = 220,
  minWidth = 320,
  maxWidth = 900,
}: {
  partners: Partner[];
  secondsPerItem?: number;
  pxPerItem?: number;
  minWidth?: number;
  maxWidth?: number;
}) {
  const duration = Math.max(partners.length * secondsPerItem, 12);
  const wrapperWidth = Math.min(maxWidth, Math.max(minWidth, partners.length * pxPerItem));

  return (
    <div className="marquee-outer mx-auto" style={{ maxWidth: wrapperWidth }}>
      <div className="marquee-wrapper">
        <div className="marquee-track" style={{ animationDuration: `${duration}s` }}>
          <MarqueeGroup partners={partners} />
          {/* duplicate group, required for the seamless loop — hidden from screen readers */}
          <MarqueeGroup partners={partners} hidden />
        </div>
      </div>
    </div>
  );
}
```

### Usage (`page.tsx`)

```tsx
import { Marquee, type Partner } from '@/components/ui/marquee';

const industryPartners: Partner[] = [
  { name: 'Credo AI', src: '/home_images/credo_AI_logo.png', width: 190, height: 190 },
  { name: 'EPA/ESA', src: '/home_images/EPA_ESA_logo.png', width: 120, height: 120 },
  { name: 'The Creative Destination', src: '/home_images/the_creative_destination_logo.png', width: 110, height: 120 },
];

// ...inside the section:
<Marquee partners={industryPartners} />;
```

### CSS (`globals.css`, added after the `.dark { ... }` block, outside `@layer`)

```css
.marquee-outer {
  width: 100%;
}

.marquee-wrapper {
  overflow: hidden;
  width: 100%;
  -webkit-mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
  mask-image: linear-gradient(to right, transparent, black 2%, black 98%, transparent);
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee-scroll 28s linear infinite;
}

.marquee-group {
  display: flex;
  flex-shrink: 0;
}

.marquee-item {
  flex-shrink: 0;
  margin-right: 96px;
}

@keyframes marquee-scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
  .marquee-wrapper {
    overflow-x: auto;
  }
}
```

### How to reuse this elsewhere

- Pass any array of `{ name, src }` objects as `partners` — works for any logo strip, not just industry partners (e.g. a future "ambassador groups" or "sponsors" section).
- Tune `pxPerItem`/`secondsPerItem` if a specific instance feels too cramped or too fast/slow — these are props, no need to touch the CSS.
- **Spacing lives only on `.marquee-item`'s `margin-right`** — don't add a `gap` on `.marquee-group` too, or the seam between the two duplicated groups gets uneven spacing (learned this the hard way — see Gotchas).

### Gotchas

- The two `.marquee-group`s must render **identical** content — if they diverge, you'll see a visible "jump" at the loop seam.
- `width: max-content` on `.marquee-track` is required — without it, the track stretches to fill its parent instead of sizing to its actual content, and the `translateX(-50%)` math breaks (this actually happened during prototyping — the fix was adding `width: max-content` here specifically, not on the wrapper).
- We deliberately **removed** hover-pause behavior after testing — decided it felt unnecessary at this compact size. Add `.marquee-track:hover { animation-play-state: paused; }` back if a bigger/more content-dense version needs it later.
- No `overflow: hidden` on `.marquee-track` itself — that belongs on `.marquee-wrapper`, one level up.

---

## 2. Card hover highlight

![Card Hover Highlight Example](https://private-user-images.githubusercontent.com/169002602/617356959-b55d1ebe-bab1-4568-bff2-e59c6b88a083.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQ2MDQ4MDYsIm5iZiI6MTc4NDYwNDUwNiwicGF0aCI6Ii8xNjkwMDI2MDIvNjE3MzU2OTU5LWI1NWQxZWJlLWJhYjEtNDU2OC1iZmYyLWU1OWM2Yjg4YTA4My5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcyMVQwMzI4MjZaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04MGEwMmIzYWNmNmI3YTY3N2QwNmU1MTU0ZTQ2OWExZmM4OTA5OWY3MzNmMzY5NDk2M2VmMDRjNmI5OTUyYTkyJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZnaWYifQ.mtMVQ_Xi0uMgLCJJKQfKBSzpLhhsD941SQWBzyG72BE)

**Use case:** currently live on the three stat cards ("Total Members," "Active Members," "Non-Tech Majors") on the home page.

**Behavior:**

- Lifts up-and-left on hover (`translate(-3px, -3px)`), away from its existing hard-offset shadow, to "pop" — matches the site's flat, hard-shadow visual style rather than a soft blurred glow (a soft glow was tried first and looked visually inconsistent against the hard shadows already used here)
- Hover-only, no `:focus-visible` — the stat cards are plain `<li>`s, not links/buttons, so there's nothing meaningful to focus. Adding focusability just to show this effect would create dead tab-stops for keyboard users, which is worse than not having the effect on focus at all.
- Reduced-motion users get no transform, effect is skipped entirely (there's no non-motion fallback needed here since it's purely decorative, not conveying information)

### CSS (`globals.css`)

```css
.stat-card {
  transition: transform 0.2s ease-out;
}

.stat-card:hover {
  transform: translate(-3px, -3px);
}

@media (prefers-reduced-motion: reduce) {
  .stat-card:hover {
    transform: none;
  }
}
```

### Usage

Just add `stat-card` into the existing `className` string on whatever element you want the effect on — no structural changes needed:

```tsx
<li className="stat-card h-auto md:h-full ... [rest of existing classes]">
  <p className="text-xl md:text-2xl">364</p>
  <p className="text-xl md:text-2xl">Total Members</p>
</li>
```

### Known limitation — read before extending this

We originally wanted the shadow itself to grow on hover too (a fuller "pop," not just a lift) — something like:

```css
/* DON'T do this — see explanation below */
.stat-card:hover {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 var(--color-brand-indigo);
}
```

This causes a visible **lightening/flicker artifact** mid-transition. Browsers don't cleanly interpolate a hard-edged, non-blurred `box-shadow` frame-to-frame — as the offset grows, the redraw of that sharp edge produces a faint flash. We tested this directly and confirmed it's a rendering issue, not a typo in our CSS.

**A cleaner fix exists but wasn't implemented:** replace the animated `box-shadow` with a static `::after` pseudo-element sitting behind the card at a fixed offset (never animated), so only the card's own `transform` moves — the "shadow growing" illusion comes from uncovering more of an already-rendered static block, not from resizing a shadow. If a future team wants the fuller pop effect, build it this way instead of animating `box-shadow` directly:

```css
.stat-card {
  position: relative;
  transition: transform 0.2s ease-out;
}
.stat-card::after {
  content: '';
  position: absolute;
  inset: 0;
  background: var(--color-brand-indigo);
  border-radius: inherit;
  transform: translate(7px, 7px); /* fixed, never animates */
  z-index: -1;
}
.stat-card:hover {
  transform: translate(-3px, -3px);
}
```

Note: this needs the existing `box-shadow` utility removed from the element and `z-index: -1` behavior tested against the site's actual stacking context before relying on it — untested in this project as of writing.

### How to reuse this elsewhere

- The plain lift-only version (no shadow animation) is safe to drop onto any hard-shadow-style card as-is.
- If applying to something that _is_ interactive (a link/button-styled card), add `:focus-visible` back in alongside `:hover` so keyboard users get the same cue.

---

## 3. Button contrast + hover (dark purple theme)

![Button Example](https://private-user-images.githubusercontent.com/169002602/617356814-924ac885-e141-40e2-a7f7-cb800e817e6a.gif?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3ODQ2MDQ1NDUsIm5iZiI6MTc4NDYwNDI0NSwicGF0aCI6Ii8xNjkwMDI2MDIvNjE3MzU2ODE0LTkyNGFjODg1LWUxNDEtNDBlMi1hN2Y3LWNiODAwZTgxN2U2YS5naWY_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNzIxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDcyMVQwMzI0MDVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT00MDc3MTBkN2M5ZTU0NzkzOTEwNjE4MWU5NzczN2E4MTljZjE2OTRhNGJhYmRjNTI4NTE1ZTc2YmVlOWNhMzFiJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZyZXNwb25zZS1jb250ZW50LXR5cGU9aW1hZ2UlMkZnaWYifQ.0XIH7D3DpB94kH1gr8PI_wf32KrkAUmZbL8xKEWeuzo)

**Use case:** currently live on the two hero CTAs, "Get Involved" (primary) and "Get to Know Us" (secondary).

**The actual bug this fixes:** it was never a text-contrast problem — white text on the purple fill already read fine. The real issue (per team feedback / GitHub issue #46) was that the **hover state** shifted to a color too close to the resting color (dark purple → dark blue), so hovering didn't visibly register as an interactive state change at all.

### Root cause — check this first if reusing shadcn/Tailwind tokens elsewhere

`--primary` in `globals.css` was still shadcn's out-of-the-box placeholder gray (`oklch(0.205 0 0)`), never pointed at our actual brand purple. Any component reading `bg-primary`/`text-primary` was silently rendering black/white instead of brand colors. Fixed by pointing it at the brand token instead:

```css
:root {
  --primary: var(--color-brand-indigo);
  --primary-foreground: oklch(1 0 0); /* white */
}
```

**If a `bg-primary`/`text-primary`/`border-primary` class isn't rendering purple somewhere else in the codebase, check this token chain first before assuming the component itself is broken.**

### The hover-contrast token

```css
:root {
  --color-brand-accent-orange: #d68a5c; /* muted terracotta — softened from an earlier, more saturated orange that felt jarring against the rest of the palette */
  --hover-accent: var(--color-brand-accent-orange);
}

@theme inline {
  --color-hover-accent: var(--hover-accent); /* registers it as a real Tailwind utility: hover:bg-hover-accent */
}
```

### `components/ui/button.tsx` — relevant variants

```tsx
const buttonVariants = cva(
  '...', // shared base classes, includes transition-all already
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-hover-accent',
        secondary:
          'bg-background text-primary border-primary hover:bg-hover-accent hover:text-primary-foreground hover:border-hover-accent aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
        // ...outline, ghost, destructive, link unchanged
      },
      // ...size variants unchanged
    },
  }
);
```

### Usage — applying variants to a `<Link>` (not `<Button>`)

Base UI's own docs explicitly say links shouldn't be routed through the `Button` component's `render` prop — a link should keep real link semantics. Use the exported `buttonVariants` function directly on a plain `<Link>` instead:

```tsx
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

<Link
  href="/about#get-involved"
  className={cn(
    buttonVariants({ variant: 'default', size: 'lg' }),
    'w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
  )}
>
  Get Involved
</Link>;
```

### Why `hover:border-hover-accent`, not `hover:border-transparent`

First attempt faded the `secondary` variant's border to transparent on hover. It looked like the button was shrinking (it wasn't — verified in DevTools that the box model dimensions were identical in both states; it's a perceptual illusion from the crisp edge softening). Transitioning the border **to the same color as the new fill** instead keeps the edge equally crisp throughout, no illusion.

### How to reuse this elsewhere

- Any button/link that needs to match this variant system: use `buttonVariants({ variant: 'default' | 'secondary', size })` rather than writing new hardcoded classes — keeps a single source of truth.
- **Currently only the 2 hero buttons use this system** — other buttons on the site are still hardcoded and haven't been migrated yet.

### Gotchas

- Don't animate `background`/`border` colors without `transition-colors` (or `transition-all`) on the element — without it, the hover color swap snaps instantly instead of easing.
- The terracotta hex (`#d68a5c`) is a placeholder pending final sign-off from design — check with the team before treating it as locked in.
