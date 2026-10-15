'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import HeroPhoto from '@/components/HeroPhoto';
import PixelVeil from '@/components/PixelVeil';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import { cn } from '@/lib/utils';
import styles from './HeroWords.module.css';

const PARAGRAPH =
  'Tech isn’t neutral. RCC brings engineers, designers, and policy minds together to question what we build, who it serves, and who it leaves out, because responsible computing is everyone’s job.';
const ACCENT_WORDS = new Set(['responsible', 'everyone’s']);
const words = PARAGRAPH.split(' ');

// words that float around the hero and, as you scroll, glide into their own spot in the paragraph. `word` is the
// paragraph word they become; x/y: hero spot as fractions of the stage (m: on phones); z: depth in px (negative =
// farther, so smaller)
const floats: { text: string; word: number; x: number; y: number; z: number; m: [number, number] }[] = [
  { text: 'engineers', word: 5, x: 0.16, y: 0.24, z: 60, m: [0.27, 0.15] },
  { text: 'designers', word: 6, x: 0.83, y: 0.2, z: 120, m: [0.73, 0.21] },
  { text: 'policy', word: 8, x: 0.13, y: 0.64, z: -60, m: [0.25, 0.77] },
  { text: 'responsible', word: 25, x: 0.86, y: 0.62, z: 100, m: [0.72, 0.76] },
  { text: 'everyone’s', word: 28, x: 0.29, y: 0.86, z: 20, m: [0.48, 0.87] },
];
const floatByWord = new Map(floats.map((float, i) => [float.word, i]));

const stats = [
  { value: '364', label: 'Total members' },
  { value: '66', label: 'Active members' },
  { value: '18%', label: 'Non-tech majors' },
];

const PERSPECTIVE = 900;
const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const range = (v: number, start: number, end: number) => clamp01((v - start) / (end - start));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

// pixel-dissolve entrance: each word is revealed through a 6x6 grid mask whose cells switch on in a shuffled order
const GRID = 6;
const DISSOLVE_STEPS = 6;
function dissolveMasks(seed: number) {
  const order = Array.from({ length: GRID * GRID }, (_, index) => index);
  let state = seed * 7919 + 17;
  for (let i = order.length - 1; i > 0; i--) {
    state = (state * 9301 + 49297) % 233280;
    const j = Math.floor((state / 233280) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  // masks for 1/6 … 5/6 of the cells; the last step drops the mask entirely
  return Array.from({ length: DISSOLVE_STEPS - 1 }, (_, step) => {
    const shown = order.slice(0, Math.round(((step + 1) / DISSOLVE_STEPS) * order.length));
    const rects = shown
      .map((cell) => `<rect x='${cell % GRID}' y='${Math.floor(cell / GRID)}' width='1.02' height='1.02'/>`)
      .join('');
    const svg = `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${GRID} ${GRID}' preserveAspectRatio='none' shape-rendering='crispEdges'>${rects}</svg>`;
    return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
  });
}

export default function HeroStage({ nextEvent }: { nextEvent: { title: string; date: string } | null }) {
  const stageRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const floatRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const anchorRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const heroRef = useRef<HTMLDivElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const sticky = stickyRef.current;
    if (!stage || !sticky) return;

    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const masks = floats.map((_, i) => dissolveMasks(i + 1));
    const maskLevel = floats.map(() => -1);
    const mountedAt = performance.now();
    const elapsed = () => (performance.now() - mountedAt) / 1000;
    const INTRO_DELAY = 0.35;

    let width = 0;
    let height = 0;
    let portrait = false;
    // how much a floating word must scale to match the paragraph's type size
    let landScale = 1;
    const halfWidth = floats.map(() => 0);

    const measure = () => {
      width = sticky.clientWidth;
      height = sticky.clientHeight;
      portrait = width / height < 0.85;
      const floatEl = floatRefs.current[0];
      const paragraph = paragraphRef.current;
      if (floatEl && paragraph) {
        landScale = parseFloat(getComputedStyle(paragraph).fontSize) / parseFloat(getComputedStyle(floatEl).fontSize);
      }
      floatRefs.current.forEach((el, i) => {
        if (el) halfWidth[i] = el.offsetWidth / 2;
      });
    };

    // 0 = floating in the hero, 1 = settled into its spot in the paragraph
    const travelOf = (i: number, p: number) => easeInOut(range(p, 0.12 + i * 0.04, 0.5 + i * 0.04));

    // a word hands off to the paragraph once it has arrived and the rest of the sentence has faded in around it
    const landed = (i: number, p: number) => travelOf(i, p) >= 1 && range(p, 0.6, 0.78) >= 1;

    const setLayer = (el: HTMLElement | null, opacity: number, transform: string) => {
      if (!el) return;
      el.style.opacity = String(opacity);
      el.style.visibility = opacity <= 0.001 ? 'hidden' : 'visible';
      el.style.transform = transform;
    };

    const render = (p: number, seconds: number) => {
      const reduced = reducedQuery.matches;
      const time = reduced ? 0 : seconds;

      // the paragraph stays put once revealed and simply scrolls away with the page when the stage ends
      const paraIn = easeOut(range(p, 0.6, 0.78));
      setLayer(paragraphRef.current, paraIn, reduced ? 'none' : `translateY(${(1 - paraIn) * 24}px)`);

      // read every landing spot before writing any float styles (avoids layout thrash)
      const stickyRect = sticky.getBoundingClientRect();
      const targets = floats.map((float) => {
        const rect = anchorRefs.current[float.word]?.getBoundingClientRect();
        return rect
          ? {
              x: rect.left + rect.width / 2 - (stickyRect.left + stickyRect.width / 2),
              y: rect.top + rect.height / 2 - (stickyRect.top + stickyRect.height / 2),
            }
          : { x: 0, y: 0 };
      });

      floats.forEach((float, i) => {
        const el = floatRefs.current[i];
        if (!el) return;
        const linear = reduced ? 1 : clamp01((seconds - INTRO_DELAY - i * 0.08) / 0.55);
        const entrance = easeOut(linear);

        // stepped pixel reveal; only touch the mask when the step changes
        const level = linear >= 1 ? DISSOLVE_STEPS : Math.floor(linear * DISSOLVE_STEPS);
        if (level !== maskLevel[i]) {
          maskLevel[i] = level;
          const mask = level >= DISSOLVE_STEPS ? 'none' : masks[i][Math.max(0, level - 1)];
          el.style.maskImage = mask;
          el.style.webkitMaskImage = mask;
        }

        const [fx, fy] = portrait ? float.m : [float.x, float.y];
        const heroScale = PERSPECTIVE / (PERSPECTIVE - float.z);
        const edge = halfWidth[i] * heroScale + 12;
        const homeX =
          Math.max(-width / 2 + edge, Math.min(width / 2 - edge, (fx - 0.5) * width)) +
          Math.sin(time * 0.7 + i * 1.3) * 7;
        const homeY = (fy - 0.5) * height + Math.cos(time * 0.55 + i * 2.1) * 7;

        let x: number;
        let y: number;
        let scale: number;
        let opacity: number;
        let chip: number;
        if (reduced) {
          // no travel: the floating word fades out and the paragraph shows it in place
          x = homeX;
          y = homeY;
          scale = heroScale;
          opacity = 1 - range(p, 0.1, 0.25);
          chip = 1;
        } else {
          const t = travelOf(i, p);
          // a gentle arc on the way in, so words swoop rather than slide
          const arc = Math.sin(Math.PI * t);
          x = lerp(homeX, targets[i].x, t);
          y = lerp(homeY, targets[i].y, t) - arc * height * 0.04;
          scale = lerp(heroScale, landScale, t) * (1 + 0.08 * arc);
          // the chip fades in flight; once the paragraph has faded in around it, the word hands off to the real one
          opacity = landed(i, p) ? 0 : 1;
          // accent words turn magenta on the way in, matching the paragraph
          if (ACCENT_WORDS.has(words[float.word]))
            el.style.color = `color-mix(in srgb, #f0479a ${Math.round(range(t, 0.3, 0.9) * 100)}%, #fff)`;
          chip = 1 - range(t, 0.2, 0.8);
        }
        opacity *= linear > 0 ? 1 : 0;
        const finalScale = scale * lerp(0.9, 1, entrance);
        el.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${finalScale})`;
        el.style.opacity = String(opacity);
        el.style.visibility = opacity <= 0.001 ? 'hidden' : 'visible';
        el.style.setProperty('--chip', String(chip));
      });

      if (scrimRef.current) scrimRef.current.style.opacity = String(range(p, 0.1, 0.4));

      const heroOut = range(p, 0.05, 0.25);
      setLayer(
        heroRef.current,
        1 - heroOut,
        reduced ? 'none' : `translateY(${-heroOut * 32}px) scale(${1 - heroOut * 0.04})`
      );

      wordRefs.current.forEach((word, i) => {
        if (!word) return;
        // a word that's still flying in stays hidden in the paragraph until it lands
        const floatIndex = floatByWord.get(i);
        const waiting = !reduced && floatIndex !== undefined && !landed(floatIndex, p);
        word.style.opacity = waiting ? '0' : '1';
      });
    };

    const progress = () => {
      const rect = stage.getBoundingClientRect();
      const runway = stage.offsetHeight - window.innerHeight;
      return runway > 0 ? clamp01(-rect.top / runway) : 0;
    };

    let frame = 0;
    const loop = () => {
      render(progress(), elapsed());
      frame = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    measure();
    render(progress(), elapsed());
    // word widths and type sizes settle once the web font arrives
    document.fonts?.ready.then(measure);

    const resizeObserver = new ResizeObserver(() => {
      measure();
      render(progress(), elapsed());
    });
    resizeObserver.observe(sticky);

    // only animate while the stage is on screen
    const intersectionObserver = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    intersectionObserver.observe(stage);

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
    };
  }, []);

  return (
    <section
      ref={stageRef}
      className={cn(styles.stage, '-mt-14')}
      data-intersecting-header-theme="Homepage"
      aria-labelledby="hero-title"
    >
      <div ref={stickyRef} className={styles.sticky}>
        <HeroPhoto src="/home_images/hero-background-image.png" alt="" priority sizes="100vw" data-hero-photo="" />
        {/* pixel veil drawn from the photo above; without WebGL it stays hidden and the photo shows */}
        <PixelVeil imageSelector="img[data-hero-photo]" />
        <div className="absolute inset-0 -z-10 bg-linear-to-br from-rcc-ink/60 via-rcc-navy/40 to-rcc-violet/40" />
        {/* soft dark glow behind the centered text so it stays readable over the pixels */}
        <div className="absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_55%_50%_at_50%_52%,rgb(11_29_47/0.78),rgb(11_29_47/0.35)_60%,transparent_85%)]" />
        <div ref={scrimRef} className={styles.scrim} />

        <div className={styles.floats} aria-hidden>
          {floats.map((float, i) => (
            <span
              key={float.text}
              ref={(el) => {
                floatRefs.current[i] = el;
              }}
              className={styles.float}
            >
              {float.text}
            </span>
          ))}
        </div>

        <div ref={heroRef} className={styles.hero}>
          <div className="flex flex-col items-center gap-5 sm:gap-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
            {nextEvent && (
              <Link
                href="/events"
                className="group/next flex w-fit max-w-[15rem] items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1 pr-1 pl-3.5 text-sm text-white/75 backdrop-blur-md transition-colors duration-200 ease-hover hover:border-white/35 hover:bg-white/15 sm:max-w-md"
              >
                <span aria-hidden className="size-2 shrink-0 bg-[#f0479a]" />
                <span className="min-w-0 truncate">
                  Next up: <span className="font-medium text-white">{nextEvent.title}</span>
                </span>
                <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-rcc-violet">
                  {nextEvent.date}
                  <ArrowUpRightIcon
                    aria-hidden
                    className="size-3 transition-transform duration-300 ease-cta group-hover/next:translate-x-0.5 group-hover/next:-translate-y-0.5"
                  />
                </span>
              </Link>
            )}

            <h1 id="hero-title" className={styles.title}>
              <span>With great tech comes</span> <span className="text-[#f0479a]">great responsibility.</span>
            </h1>

            <div className="flex flex-col items-center gap-3 sm:mt-1 sm:flex-row sm:gap-4">
              <PixelCta href="/about#get-involved" className="font-mono text-sm tracking-wide uppercase">
                Get involved
              </PixelCta>
              <TickButton href="/about">Get to know us</TickButton>
            </div>

            <dl className="mt-2 hidden w-full max-w-md grid-cols-3 divide-x divide-white/15 border-t border-white/15 sm:grid">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col items-center gap-1 px-3 pt-4">
                  <dt className="order-2 text-xs text-white/65">{stat.label}</dt>
                  <dd className="order-1 font-mono text-2xl font-bold">{stat.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <p ref={paragraphRef} className={styles.paragraph}>
          {words.map((word, i) => (
            <span key={i}>
              <span
                ref={(el) => {
                  wordRefs.current[i] = el;
                }}
                className={cn(styles.word, ACCENT_WORDS.has(word) && styles.accent)}
              >
                {/* the bare word (no punctuation) is where a floating word lands */}
                <span
                  ref={(el) => {
                    anchorRefs.current[i] = el;
                  }}
                >
                  {word.replace(/[.,]$/, '')}
                </span>
                {word.match(/[.,]$/)?.[0]}
              </span>{' '}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
