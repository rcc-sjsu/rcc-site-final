import Image from 'next/image';
import Link from 'next/link';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { PixelCta, TickButton } from '@/components/ui/pixel-button';

const involvementActions = [
  {
    id: 'students-action',
    title: 'Students',
    description: 'Are you a student interested in joining RCC? Sign up and become a member today for free!',
    buttonText: 'Join Us',
    href: 'https://forms.gle/5yxmDebP4LWWWfw37',
    external: true,
    imageSrc: '/images/picnic-social-2.jpg',
    overlayClassName: 'from-rcc-ink/90 via-rcc-navy/70 to-rcc-violet/60',
    imageClassName: 'object-[45%_center]',
  },
  {
    id: 'industry-action',
    title: 'Industry',
    description:
      'Are you a company, industry professional, or other industry partner? Connect with RCC through our contact form!',
    buttonText: 'Connect With Us',
    href: '/contact',
    external: false,
    imageSrc: '/images/rcc-case-comp.png',
    overlayClassName: 'from-rcc-ink/90 via-rcc-violet/70 to-rcc-magenta/60',
    imageClassName: 'object-[55%_center]',
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="scroll-mt-20 bg-muted py-20 sm:py-28" aria-labelledby="involved-heading">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 sm:px-10">
        <SectionHeading
          id="involved-heading"
          eyebrow="Get involved"
          title="How can you get involved?"
          align="center"
          description="Take a look at what we're doing right now to get an idea of what you can contribute to in the future, then pick the option that fits you best."
        >
          <Link
            href="/events"
            className="text-sm font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary"
          >
            See what we&apos;re doing right now
          </Link>
        </SectionHeading>

        <div className="grid gap-6 md:grid-cols-2">
          {involvementActions.map((action, index) => (
            <Reveal key={action.id} delay={index * 90} className="h-full">
              <article
                id={action.id}
                className="relative isolate flex h-full min-h-[420px] flex-col justify-end overflow-hidden rounded-2xl p-8 text-white sm:p-10"
              >
                <Image
                  src={action.imageSrc}
                  alt=""
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className={`-z-20 object-cover ${action.imageClassName}`}
                />
                <div className={`absolute inset-0 -z-10 bg-linear-to-t ${action.overlayClassName}`} />

                <div className="flex flex-col items-start gap-4">
                  <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-white/80 uppercase">
                    <span aria-hidden className="size-2 bg-[#f0479a]" />
                    For {action.title.toLowerCase()}
                  </span>
                  <h3 className="text-3xl leading-tight font-semibold tracking-[-0.02em] sm:text-4xl">
                    {action.title}
                  </h3>
                  <span className="max-w-md text-base leading-relaxed text-white/85">{action.description}</span>
                  {index === 0 ? (
                    <PixelCta
                      href={action.href}
                      target={action.external ? '_blank' : undefined}
                      rel={action.external ? 'noopener noreferrer' : undefined}
                      className="mt-2 font-mono text-sm tracking-wide uppercase"
                    >
                      {action.buttonText}
                    </PixelCta>
                  ) : (
                    <TickButton href={action.href} className="mt-2">
                      {action.buttonText}
                    </TickButton>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
