import Image from 'next/image';
import Link from 'next/link';
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function PastProjects() {
  return (
    <>
      <h3 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl text-brand-dark-violet font-bold pt-6 pb-2">
        Past Projects
      </h3>

      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 auto-cols-max lg:items-center xl:auto-cols-auto gap-15 w-[90%] md:w-[85%] xl:w-280 pb-10">
        <Card className="h-auto justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-indigo)] md:shadow-[-12px_12px_0_var(--color-brand-indigo)]">
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

        <Card className="h-auto xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 lg:py-10 w-full border-brand-dark-violet border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-dark-violet)] md:shadow-[-12px_12px_0_var(--color-brand-dark-violet)]">
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

        <Card className="h-auto xl:h-min justify-center px-2 py-6 sm:py-8 md:p-5 w-full border-brand-indigo border-2 ring-0 shadow-[-10px_10px_0_var(--color-brand-indigo)] md:shadow-[-12px_12px_0_var(--color-brand-indigo)]">
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

      <Link
        href="/projects"
        className="flex gap-2 items-center justify-center bg-brand-indigo px-6 md:px-10 py-2 md:py-3 w-[92%] sm:w-[75%] md:w-auto text-lg md:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
      >
        See Recent Projects
      </Link>
    </>
  );
}
