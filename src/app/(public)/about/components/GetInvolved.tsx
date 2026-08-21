import Heading from '@/components/Heading';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';

const involvementActions = [
  {
    id: 'students-action',
    title: 'Students',
    description: 'Are you a student interested in joining RCC? Sign up and become a member today for free!',
    buttonText: 'Join Us',
    href: '/membership',
    imageSrc: '/images/picnic-social-2.jpg',
    overlayClassName: 'bg-brand-orange/80',
    hoverTextClassName: 'group-hover/action-button:text-brand-orange/80',
    imageClassName: 'object-[45%_center]',
  },
  {
    id: 'industry-action',
    title: 'Industry',
    description:
      'Are you a company, industry professional, or other industry partner? Connect with RCC through our contact form!',
    buttonText: 'Connect With Us',
    href: '/contact',
    imageSrc: '/images/rcc-case-comp.png',
    overlayClassName: 'bg-brand-pink/80',
    hoverTextClassName: 'group-hover/action-button:text-brand-pink/80',
    imageClassName: 'object-[55%_center]',
  },
];

export default function GetInvolved() {
  return (
    <section id="get-involved" className="pt-26 md:pt-30">
      <div className="mx-auto max-w-[1200px] px-6 text-center">
        <Heading headingTag="h2">How Can You Get Involved?</Heading>

        <div className="mx-auto mt-6 flex max-w-[1200px] flex-col gap-5">
          <p className="text-base leading-[1.5] md:text-xl xl:text-2xl">
            {/* TODO: Link "the past" to projects page once implemented. */}
            Take a look at what we&apos;ve done in <span className="text-[var(--purple)]">the past</span> and what
            we&apos;re doing <Link href="/events">right now</Link> so you can get an idea of what you can contribute to
            in <span className="text-[var(--purple)]">the future</span>.
          </p>

          <p className="text-base leading-[1.5] md:text-xl xl:text-2xl">
            Start now and see which option below fits you best.
          </p>
        </div>
      </div>

      <div className="relative left-1/2 mt-16 grid w-[calc(100vw+2px)] max-w-[2562px] -translate-x-1/2 overflow-hidden md:grid-cols-2">
        {involvementActions.map((action) => (
          <article
            key={action.id}
            id={action.id}
            className="relative flex min-h-[420px] items-center justify-center overflow-hidden px-8 py-16 text-center md:min-h-[540px] lg:min-h-[640px]"
          >
            <Image
              src={action.imageSrc}
              alt=""
              className={`object-cover grayscale -z-10 ${action.imageClassName}`}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
            />
            <div className={`absolute inset-0 -z-9 ${action.overlayClassName}`} />

            <div className="relative z-10 flex max-w-[500px] flex-col items-center text-white">
              <Heading
                headingTag="h3"
                tone="light"
                customStyle={{ fontSize: 'clamp(3.75rem, 8vw, 6rem)', lineHeight: 1 }}
              >
                {action.title}
              </Heading>

              <p className="mt-6 text-base font-medium leading-[1.2] text-white md:min-h-20 md:text-xl xl:text-2xl">
                {action.description}
              </p>

              <Link
                href={action.href}
                className={buttonVariants({
                  variant: 'inverse',
                  size: 'lg',
                  className: 'group/action-button mt-8 h-auto rounded-md px-6 py-2',
                })}
              >
                <span className={action.hoverTextClassName}>{action.buttonText}</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
