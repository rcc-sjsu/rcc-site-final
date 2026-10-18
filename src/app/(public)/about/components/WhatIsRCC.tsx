import Image from 'next/image';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import WireShape, { type WireShapeKind } from '@/components/WireShape';

const values: { shape: WireShapeKind; title: string; text: string }[] = [
  { shape: 'scales', title: 'Ethical design', text: 'Questioning how technology is built and who it is built for.' },
  { shape: 'leaf', title: 'Sustainability', text: 'Weighing the environmental cost of the tools we create.' },
  {
    shape: 'access',
    title: 'Accessibility',
    text: 'Making sure technology works for everyone, not just some.',
  },
];

export default function WhatIsRCC() {
  return (
    <section className="bg-background py-20 sm:py-28" aria-labelledby="who-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-10 lg:gap-16">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-12">
          <SectionHeading
            id="who-heading"
            eyebrow="Who we are"
            title="Every major has a seat at the table"
            description="We believe everyone, whether you're in arts, humanities, or sciences, plays a key role in shaping tech that truly serves people first!"
          />

          <Reveal delay={120} className="relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted">
            <Image
              src="/home_images/group_photo.jpg"
              alt="RCC members posing together on the steps outside a campus building"
              fill
              sizes="(max-width: 1024px) 100vw, 480px"
              className="object-cover"
            />
            {/* lands just after the photo so it reads as a caption, not a second headline */}
            <Reveal
              delay={360}
              className="absolute bottom-3 left-3 flex items-center gap-3 rounded-xl bg-white/90 py-2 pr-4 pl-3 shadow-lg shadow-rcc-ink/15 backdrop-blur-md sm:bottom-4 sm:left-4"
            >
              <span className="font-mono text-2xl font-bold text-rcc-violet">18%</span>
              <span className="text-xs leading-snug text-rcc-ink/75">
                of our members are
                <br />
                non-tech majors
              </span>
            </Reveal>
          </Reveal>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 sm:gap-5">
          {values.map((value, index) => (
            <li key={value.title}>
              <Reveal delay={index * 60} className="h-full">
                <div className="group/tile flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-4 transition-[translate,border-color] duration-200 ease-cta hover:-translate-y-0.5 hover:border-rcc-violet/30 sm:flex-col sm:gap-5 sm:p-6 motion-reduce:hover:translate-y-0">
                  <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-linear-to-br from-rcc-violet to-[#6a1fc2] shadow-md shadow-rcc-violet/20 sm:size-20">
                    <WireShape kind={value.shape} className="absolute inset-0 size-full" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-lg font-semibold tracking-tight text-foreground">{value.title}</span>
                    <span className="text-[0.9375rem] leading-relaxed text-muted-foreground">{value.text}</span>
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
