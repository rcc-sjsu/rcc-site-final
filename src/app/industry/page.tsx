'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function IndustryPage() {
  return (
    <div>
      <div className="px-6 sm:px-10 md:px-20 pt-5 md:pt-10">
        <section className="flex flex-col items-center">
          <h1 className="pb-2 sm:pb-4 md:pb-7 text-3xl sm:text-4xl md:text-5xl xl:text-[50pt]">
            <b>Industry</b>
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4 xl:gap-3">
            <p className="text-md md:text-lg text-center md:text-left xl:text-2xl flex flex-col m-0">
              The Industry Committee actively partners with professionals and companies to bring you inspiring speaker
              events and vibrant networking opportunities—all focused on responsible computing in action.
              <br />
              <br className="hidden md:flex" />
              We&apos;re here to help you build the skills and connections you need to grow, thrive, and succeed!
              <br />
              <br className="" />
              <b>
                Interested in hosting an event with us? Reach out to us at{' '}
                <span className="text-brand-indigo">rcc.sjsu@gmail.com</span> or fill out{' '}
                <span className="text-brand-indigo">
                  <Link href="#interest-form" className="hover:underline">
                    this interest form
                  </Link>
                </span>{' '}
                to get in contact!
              </b>
            </p>
            <Image
              src="/images/industry-lauren-klein.svg"
              alt=""
              width={250}
              height={250}
              className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:w-[250px] md:h-[250px]  lg:w-[300px] lg:h-[300px] xl:w-[250px] xl:h-[250px]"
            />
          </div>
        </section>

        <hr className="mt-7 mb-5 md:mt-15 md:mb-8 xl:mt-20 xl:mb-10"></hr>

        <section className="flex flex-col items-center">
          <h2 className="text-brand-indigo pb-3 sm:pb-4 md:pb-5 lg:pb-7 text-3xl sm:text-4xl md:text-5xl xl:text-[50pt]">
            <b>Past Events</b>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:space-x-10 md:space-x-0 md:gap-12 xl:gap-15 justify-center md:items-center lg:items-stretch text-sm md:text-lg text-center">
            <div className="flex flex-col items-center mb-3">
              <Image
                src="/images/women-in-tech-panel-katherine-d-harris.svg"
                alt=""
                width={350}
                height={350}
                className="mb-2 md:mb-4 w-[200px] h-[200px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
              />
              <p>
                <b>Women In Tech Panel</b>
                <br></br>
                April 16, 2025
              </p>
            </div>
            <div className="flex flex-col items-center mb-3">
              <Image
                src="/images/exploring-responsible-computing-paths-panelists.svg"
                alt=""
                width={350}
                height={350}
                className="mb-2 md:mb-4 w-[200px] h-[200px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
              />
              <p className="">
                <b>Data Feminism with Lauren Klein</b>
                <br></br>
                October 17th, 2025
              </p>
            </div>

            <div className="flex flex-col items-center sm:col-span-2 md:col-span-1 mb-0">
              <Image
                src="/images/data-feminism-with-lauren-klein.svg"
                alt=""
                width={350}
                height={350}
                className="mb-2 md:mb-0 lg:mb-4 w-[200px] h-[200px] md:w-[200px] md:h-[200px] lg:w-[300px] lg:h-[300px] xl:w-[350px] xl:h-[350px]"
              />
              <p className="">
                <b>Exploring Responsible Computing Paths</b>
                <br></br>
                April 23rd, 2025
              </p>
            </div>
          </div>
        </section>

        <hr className="my-4 md:my-8 xl:my-10"></hr>
      </div>

      <section id="interest-form" className="flex flex-col">
        <h2 className="text-brand-indigo pb-3 sm:pb-4 md:pb-7 text-3xl sm:text-4xl md:text-5xl xl:text-[50pt] md:px-20 text-center md:text-left">
          <b>Interest Form</b>
        </h2>
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSfLu2YuHYDi6YdLcCEPCO2ue3o8FeCTnzrB7gadmeeSJ_0wVw/viewform?embedded=true"
          width="100%"
          height="548"
          className="bg-[#F0EBF8]"
        >
          Loading…
        </iframe>
      </section>
    </div>
  );
}
