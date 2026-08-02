import Heading from '@/components/Heading';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function GetInvolved() {
  return (
    <section id="get-involved" className="flex-col flex-center flex-wrap">
      <Heading headingTag="h2">How Can You Get Involved?</Heading>

      <p className="text-center">
        Take a loot at what we&apos;ve done in the past and what we&apos;re doing right now so you can get an idea of
        what you can contribute to in the future.
      </p>

      <p className="text-center">Start now and see which option below fits you best.</p>

      <div className="flex flex-wrap">
        <div
          id="students-action"
          className="relative overflow-hidden flex flex-col flex-1 items-center justify-center text-center "
        >
          <Image src="/images/picnic-social-2.jpg" alt="" className="grayscale object-cover -z-10" fill />
          <div className="absolute inset-0 bg-brand-orange/80 -z-10" />
          <Heading headingTag="h3" className="text-white">
            Students
          </Heading>
          <p className="text-white">
            Are you a student interested in joining RCC? Sign up and become a member today for free!
          </p>
          <Button>Join Us</Button>
        </div>

        <div
          id="industry-action"
          className="relative overflow-hidden flex flex-col flex-1 items-center justify-center text-center"
        >
          <Image src="/images/rcc-case-comp.png" alt="" className="grayscale object-cover -z-10" fill />
          <div className="absolute inset-0 bg-brand-pink/80 -z-10" />

          <Heading headingTag="h3">Industry</Heading>
          <p className="text-white">
            Are you a company, industry professional, or other industry partner? Connect with RCC through our contact
            form!
          </p>
          <Button>Connect With Us</Button>
        </div>
      </div>
    </section>
  );
}
