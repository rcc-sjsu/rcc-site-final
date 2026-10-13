import HeroPhoto from '@/components/HeroPhoto';
import Link from 'next/link';
import { ArrowUpRightIcon } from 'lucide-react';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';
import events, { getEventEndDate } from '../../events/data/Events';
import PixelVeil from '@/components/PixelVeil';

const stats = [
  { value: '364', label: 'Total members' },
  { value: '66', label: 'Active members' },
  { value: '18%', label: 'Non-tech majors' },
];

export default function Hero() {
  const nextEvent = events.find((event) => getEventEndDate(event) >= new Date());

  return (
    <section
      className="relative isolate -mt-14 flex min-h-svh flex-col justify-center overflow-hidden"
      data-intersecting-header-theme="Homepage"
      aria-labelledby="hero-heading"
    >
      <HeroPhoto src="/home_images/hero-background-image.png" alt="" priority sizes="100vw" data-hero-photo="" />
      {/* pixel veil drawn from the photo above; without WebGL it stays hidden and the photo shows */}
      <PixelVeil imageSelector="img[data-hero-photo]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-rcc-ink/60 via-rcc-navy/40 to-rcc-violet/40" />
      {/* soft dark glow behind the centered text so it stays readable over the pixels */}
      <div className="absolute inset-0 -z-[4] bg-[radial-gradient(ellipse_55%_50%_at_50%_52%,rgb(11_29_47/0.78),rgb(11_29_47/0.35)_60%,transparent_85%)]" />

      <div className="mx-auto flex w-full max-w-7xl justify-center px-5 pt-28 pb-16 sm:px-10">
        <div className="flex w-full max-w-3xl flex-col items-center gap-6 text-center text-white motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700">
          {nextEvent && (
            <Link
              href="/events"
              className="group/next flex w-fit max-w-full items-center gap-2.5 rounded-full border border-white/20 bg-white/10 py-1 pr-1 pl-3.5 text-sm text-white/75 backdrop-blur-md transition-colors duration-200 ease-hover hover:border-white/35 hover:bg-white/15"
            >
              <span aria-hidden className="size-2 shrink-0 bg-[#f0479a]" />
              <span className="min-w-0 truncate">
                Next up: <span className="font-medium text-white">{nextEvent.title}</span>
              </span>
              <span className="flex shrink-0 items-center gap-1 rounded-full bg-white px-2.5 py-0.5 font-mono text-xs font-bold text-rcc-violet">
                {nextEvent.date.replace('October', 'Oct')}
                <ArrowUpRightIcon
                  aria-hidden
                  className="size-3 transition-transform duration-300 ease-cta group-hover/next:translate-x-0.5 group-hover/next:-translate-y-0.5"
                />
              </span>
            </Link>
          )}

          <h1
            id="hero-heading"
            className="text-[2.5rem] leading-[1.05] font-semibold tracking-[-0.03em] text-balance sm:text-6xl lg:text-[4.25rem]"
          >
            With great tech comes <span className="text-[#f0479a]">great responsibility.</span>
          </h1>

          <span className="max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">
            The Responsible Computing Club at San José State University explores the ethics of tech through hands-on,
            cross-disciplinary events and projects.
          </span>

          <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <PixelCta href="/about#get-involved" className="font-mono text-sm tracking-wide uppercase">
              Get involved
            </PixelCta>
            <TickButton href="/about">Get to know us</TickButton>
          </div>

          <dl className="mt-8 grid w-full max-w-lg grid-cols-3 divide-x divide-white/15 border-t border-white/15">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-3 pt-5">
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
