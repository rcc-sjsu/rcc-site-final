// component imports
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function PastEvents() {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-brand-dark-violet font-bold pt-6 pb-2">
        Past Events
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
        {/* Data Feminism with Lauren Klein — dark-violet shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-dark-violet)' }}
          />
          <Card className="pop-hover pop-hover--bl h-full xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image
                src="/about/pastEvents/about-data-feminism-with-lauren-klein.svg"
                alt=""
                width={100}
                height={100}
                className="w-[80%] md:w-full object-cover rounded-xl border-2 border-brand-dark-violet"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">
                  Data Feminism with Lauren Klein
                </h4>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  Explore how data can be used not just as a tool, but as lens to examine power and inequality, through
                  questioning whose voices are amplified and whose stories are left out in data practices.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* RCC Case Competition: AI and Fraud — indigo shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-indigo)' }}
          />
          <Card className="pop-hover pop-hover--bl h-full xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image
                src="/about/pastEvents/ai-and-fraud-comp.svg"
                alt=""
                width={100}
                height={100}
                className="w-[80%] md:w-full object-cover rounded-xl border-2 border-brand-indigo"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">
                  RCC Case Competition: AI and Fraud
                </h4>
              </CardTitle>
              <CardDescription>
                <p className="text-xs md:text-sm xl:text-base text-black">
                  Explore how AI is transforming fraud detection at the intersection of technology and finance. Teams will
                  design innovative solutions&mdash;whether through policy safeguards, or technical improvements&mdash;to
                  tackle one of the most pressing challenges in the financial world today.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Design in Tech: Workshop and Panel — dark-violet shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-dark-violet)' }}
          />
          <Card className="pop-hover pop-hover--bl xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-dark-violet border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image
                src="/about/pastEvents/design-in-tech-workshop-and-panel.svg"
                alt=""
                width={100}
                height={100}
                className="w-[80%] md:w-full object-cover rounded-xl border-2 border-brand-dark-violet"
              />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">
                  Design in Tech: Workshop and Panel
                </h4>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  This event features a workshop on Figma and a panel that brings together industry professionals across
                  UI/UX design, product design, and UX research to share real-world perspectives.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Link
        href="/events"
        className={cn(
          buttonVariants({ variant: 'default', size: 'default' }),
          'h-auto mb-5 md:mb-15 gap-2 px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
        )}
      >
        See Recent Events
      </Link>
    </>
  );
}
