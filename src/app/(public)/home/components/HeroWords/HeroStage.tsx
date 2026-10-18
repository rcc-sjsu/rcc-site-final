import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import HeroPhoto from '@/components/HeroPhoto';
import PixelVeil from '@/components/PixelVeil';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import { cn } from '@/lib/utils';
import styles from './HeroWords.module.css';
import heroImage from '@/public/home_images/hero-background-image.png';

const stats = [
  { value: '364', label: 'Total members' },
  { value: '66', label: 'Active members' },
  { value: '18%', label: 'Non-tech majors' },
];

export default function HeroStage({ nextEvent }: { nextEvent: { title: string; date: string } | null }) {
  return (
    <section
      className={cn(styles.stage, '-mt-14')}
      data-intersecting-header-theme="Homepage"
      aria-labelledby="hero-title"
    >
      <HeroPhoto src={heroImage} alt="" priority sizes="100vw" data-hero-photo="" />
      {/* pixel veil drawn from the photo above; without WebGL it stays hidden and the photo shows */}
      <PixelVeil imageSelector="img[data-hero-photo]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rcc-ink/60 via-rcc-navy/40 to-rcc-violet/40" />
      {/* soft dark glow behind the centered text so it stays readable over the pixels */}
      <div className="absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_55%_50%_at_50%_52%,rgb(11_29_47/0.78),rgb(11_29_47/0.35)_60%,transparent_85%)]" />

      <div className={styles.hero}>
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
    </section>
  );
}
