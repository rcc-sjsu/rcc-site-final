// component imports
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { buttonVariants } from '@/components/ui/button';

// utilities
import { cn } from '@/lib/utils';

export default function PastProjects() {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-brand-dark-violet font-bold pt-6 pb-2">
        Past Projects
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max lg:items-center xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
        {/* Spartan Food Pantry Project — indigo shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-indigo)' }}
          />
          <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image src="/about/pastProjects/spartan-food-pantry-logo.png" alt="" width={150} height={150} />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">
                  Spartan Food Pantry Project
                </h4>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  An infographic to increase awareness of the Spartan Food Pantry as a basic needs resource.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* FairLens — dark-violet shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-dark-violet)' }}
          />
          <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 lg:py-10 w-full border-brand-dark-violet border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image src="/about/pastProjects/rcc-logo.png" alt="" width={150} height={150} />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-dark-violet font-bold">FairLens</h4>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  A machine learning bias detector for identifying bias in datasets.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Inclusive World Website — indigo shadow, bottom-left */}
        <div className="relative self-start">
          <div
            aria-hidden="true"
            className="pop-shadow pop-shadow--bl rounded-xl"
            style={{ background: 'var(--color-brand-indigo)' }}
          />
          <Card className="pop-hover pop-hover--bl h-full justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0">
            <div className="px-3 pt-3 pb-2 flex justify-center">
              <Image src="/IW-logo.png" alt="" width={150} height={150} />
            </div>
            <CardHeader className="pb-3">
              <CardTitle className="pb-1">
                <h4 className="text-lg md:text-xl xl:text-2xl text-brand-indigo font-bold">Inclusive World Website</h4>
              </CardTitle>
              <CardDescription>
                <p className="text-sm md:text-base xl:text-lg text-black">
                  A nonprofit portal website for students with intellectual and developmental disabilities (IDD) and
                  volunteers to register and pay for classes.
                </p>
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>

      <Link
        href="/projects"
        className={cn(
          buttonVariants({ variant: 'default', size: 'default' }),
          'h-auto gap-2 px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl transition-colors duration-200'
        )}
      >
        See Recent Projects
      </Link>
    </>
  );
}
