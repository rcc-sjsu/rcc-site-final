import Image from 'next/image';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { PixelCta } from '@/components/ui/pixel-button';

export default function WhatDoWeDo() {
  return (
    <section className="bg-background py-20 sm:py-28" aria-labelledby="mission-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            id="mission-heading"
            eyebrow="What we do"
            title="Changing the conversation around AI"
            description="Our mission is to change the conversation around AI and emerging technologies, focusing on their social, ethical, and environmental impact rather than just the technical side."
          />
          <span className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            To make RCC relevant to all majors (and minors) and to hone their collective strengths, we&apos;ve created
            dedicated teams focused on areas like workshops, consulting, marketing, web dev, and so much more!
          </span>
          <PixelCta
            href="/ambassadors"
            className="w-fit font-mono text-sm tracking-wide uppercase ring-1 shadow-md shadow-rcc-ink/10 ring-rcc-ink/15"
          >
            Meet our ambassadors
          </PixelCta>
        </div>

        <Reveal delay={120} className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/about/collection-of-rcc-images.png"
            alt="A collage of photos from RCC events"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
