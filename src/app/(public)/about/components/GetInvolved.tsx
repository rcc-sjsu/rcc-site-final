import Image from 'next/image';
import Link from 'next/link';
import BackgroundGradient from '@/components/BackgroundGradient';
import Heading from '@/components/Heading';
import styles from '../getinvolved.module.css';

export default function GetInvolved() {
  return (
    <section id="get-involved" className={styles.container}>
      <Heading headingTag="h2"> Get Involved</Heading>

      <p className={styles.description}>Want to join RCC? See which option below fits you the best.</p>

      <ul className="flex flex-col lg:grid lg:grid-cols-2 auto-cols-max gap-15 md:gap-20 xl:gap-30 place-items-center justify-between w-full md:w-[75%] xl:w-full h-auto md:h-full lg:h-auto mt-5 md:mt-7 xl:mt-10 text-brand-indigo">
        {/* Students - Become a Member */}
        <BackgroundGradient className={styles.gradient1} color="purple" />
        <li className="bg-white h-auto md:h-full flex flex-col sm:justify-center md:justify-normal border-3 md:border-4 border-brand-indigo rounded-2xl pb-3 shadow-[10px_10px_0_var(--color-brand-indigo)] md:shadow-[15px_15px_0_var(--color-brand-indigo)]">
          <div className="bg-[#F2E4FE] p-5 md:p-10 rounded-t-xl border-b-3 md:border-b-4 border-brand-indigo">
            <p className="text-2xl md:text-4xl font-semibold">Students</p>
          </div>
          <div className=" flex flex-col justify-center items-center h-full px-7 xl:px-15 py-5 sm:py-10 gap-5 sm:gap-8 md:gap-10">
            <p className="text-[1rem] sm:text-xl xl:text-2xl ">
              Are you a student interested in joining RCC? Become a member today for free!
            </p>
            <Link
              href="/membership"
              className="flex items-center justify-center bg-brand-indigo px-6 md:px-5 py-2 md:py-3 w-full sm:w-[90%] md:w-[40%] lg:w-[80%] text-lg lg:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
            >
              Become a Member
            </Link>
          </div>
        </li>

        {/* Industry Partners - Reach to RCC via Contact Form */}
        <BackgroundGradient className={styles.gradient2} color="purple" />
        <li className="bg-white h-auto md:h-full lg:h-auto flex flex-col justify-center border-3 md:border-4 border-brand-indigo rounded-2xl pb-3 shadow-[10px_10px_0_var(--color-brand-indigo)] md:shadow-[15px_15px_0_var(--color-brand-indigo)]">
          <div className="bg-[#F2E4FE] p-5 md:p-10 rounded-t-xl border-b-3 md:border-b-4 border-brand-indigo">
            <p className="text-2xl md:text-4xl font-semibold">Industry Partners</p>
          </div>
          <div className="flex flex-col px-7 justify-center items-center xl:px-15 py-5 sm:py-10 gap-5 sm:gap-8 md:gap-10">
            <p className="text-[1rem] sm:text-xl xl:text-2xl ">
              Are you a company, industry professional, or other industry partner looking to connect with RCC? Reach out
              to us through our contact form!
            </p>
            <Link
              href="#"
              className="flex items-center justify-center bg-brand-indigo px-6 md:px-5 py-2 md:py-3 w-full sm:w-[90%] md:w-[40%] lg:w-[80%] text-lg lg:text-xl text-white rounded-lg hover:bg-brand-dark-violet focus:outline-3 focus:outline-offset-0 focus:outline-brand-dark-purple focus:bg-brand-lavender focus:text-brand-dark-purple focus:font-semibold active:outline-offset-0 active:outline-brand-dark-purple active:bg-brand-lavender active:text-brand-dark-purple active:font-semibold"
            >
              Reach Out to RCC
            </Link>
          </div>
        </li>
      </ul>
    </section>
  );
}
