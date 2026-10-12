import Image from 'next/image';
import Reveal from '@/components/Reveal';
import SectionHeading from '@/components/SectionHeading';
import { TickButton } from '@/components/ui/pixel-button';

export default function OurStory() {
  return (
    <section id="our-story" className="scroll-mt-20 bg-muted py-20 sm:py-28" aria-labelledby="story-heading">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 sm:px-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <Reveal className="relative order-2 aspect-[4/3] overflow-hidden rounded-2xl bg-background lg:order-1">
          <Image
            src="/about/where-did-we-start-rcc-comp.png"
            alt="Students gathered around laptops at an RCC event"
            fill
            sizes="(max-width: 1024px) 100vw, 480px"
            className="object-cover"
          />
        </Reveal>

        <div className="order-1 flex flex-col gap-8 lg:order-2">
          <SectionHeading id="story-heading" eyebrow="Our story" title="Where did we start?" />
          <span className="max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            After participating in{' '}
            <a
              href="https://www.mozillafoundation.org/en/blog/responsible-computing-challenge-holds-trustworthy-ai-and-career-development-events-with-student-groups-at-san-jose-state-university/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-base font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:decoration-primary sm:text-lg"
            >
              Mozilla&rsquo;s Responsible Computing Challenge
            </a>
            , our club&rsquo;s founder was inspired to provide a space for San José State University students to explore
            technologies&rsquo; ethical implications on society.
          </span>
          <TickButton
            href="https://www.mozillafoundation.org/en/blog/announcing-the-responsible-computing-club-at-san-jos%C3%A9-state-university/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit bg-background"
          >
            Learn more
          </TickButton>
        </div>
      </div>
    </section>
  );
}
