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
    <section id="get-involved" className="pt-20 md:pt-28">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <Heading headingTag="h2">How Can You Get Involved?</Heading>

        <div className="mx-auto mt-6 flex max-w-3xl flex-col gap-5">
          <p className="text-base leading-relaxed md:text-lg xl:text-xl">
            Take a look at{' '}
            <Link href="/events" className="text-base underline underline-offset-4 md:text-lg xl:text-xl">
              what we&apos;ve done in the past
            </Link>{' '}
            and{' '}
            <Link href="/events" className="text-base underline underline-offset-4 md:text-lg xl:text-xl">
              what we&apos;re doing right now
            </Link>{' '}
            so you can get an idea of what you can contribute to in the future.
          </p>

          <p className="text-base leading-relaxed md:text-lg xl:text-xl">
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

            <div className="relative z-10 flex max-w-md flex-col items-center text-white">
              <Heading headingTag="h3" tone="light" className="text-5xl leading-tight md:text-6xl lg:text-7xl">
                {action.title}
              </Heading>

              <p className="mt-6 text-base font-semibold leading-snug text-white md:min-h-20 md:text-lg xl:text-xl">
                {action.description}
              </p>

              <Link
                href={action.href}
                className={buttonVariants({
                  variant: 'inverse',
                  size: 'lg',
                  className:
                    'group/action-button mt-8 h-auto rounded-md px-6 py-2 text-base font-bold md:text-lg bg-clip-border',
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
