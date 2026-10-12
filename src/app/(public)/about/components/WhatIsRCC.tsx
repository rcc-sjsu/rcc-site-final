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
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div className="flex flex-col gap-10">
          <SectionHeading
            id="who-heading"
            eyebrow="Who we are"
            title="Every major has a seat at the table"
            description="We believe everyone, whether you're in arts, humanities, or sciences, plays a key role in shaping tech that truly serves people first!"
          />
          <ul className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            {values.map((value, index) => (
              <li key={value.title}>
                <Reveal delay={index * 90} className="h-full">
                  <div className="group/tile flex h-full flex-col gap-4">
                    <div className="relative size-28 overflow-hidden rounded-xl bg-linear-to-br from-rcc-violet to-[#6a1fc2] shadow-lg shadow-rcc-violet/20 transition-transform duration-300 ease-cta group-hover/tile:-translate-y-1 motion-reduce:group-hover/tile:translate-y-0">
                      <WireShape kind={value.shape} className="absolute inset-0 size-full" />
                    </div>
                    <span className="text-lg font-semibold tracking-tight text-foreground">{value.title}</span>
                    <span className="text-sm leading-relaxed text-muted-foreground">{value.text}</span>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={120} className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-muted">
          <Image
            src="/about/who-are-we-tabling.jpeg"
            alt="RCC tabling board with notes and stickers"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </Reveal>
      </div>
    </section>
  );
}
