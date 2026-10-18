import Image from 'next/image';
import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { SiDiscord, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { PAPER_COLOR, PAPER_GRAIN } from '@/lib/grain';
import { cn } from '@/lib/utils';
import MascotSwap from './MascotSwap';

const exploreLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Ambassadors', href: '/ambassadors' },
  { label: 'Contact Us', href: '/contact' },
];

const contactLinks = [
  { label: 'Join our Discord', href: 'https://discord.com/invite/RGG9dMw4Rc', icon: SiDiscord },
  { label: 'Instagram', href: 'https://www.instagram.com/rcc.sjsu/', icon: SiInstagram },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/rcc-sjsu', icon: FaLinkedin },
  { label: 'rcc.sjsu@gmail.com', href: 'mailto:rcc.sjsu@gmail.com', icon: MailIcon },
];

// below lg the link lists run horizontally under their headings; from lg up they stack in the four-column footer
const HEADING_CLASS =
  'font-pixel text-xs tracking-widest text-highlight uppercase lg:font-sans lg:text-sm lg:font-bold lg:tracking-normal lg:text-rcc-ink lg:normal-case';

const LINK_CLASS =
  'inline-flex items-center gap-2 text-base font-medium text-rcc-ink transition-colors duration-200 ease-hover hover:text-rcc-violet focus-visible:text-rcc-violet focus-visible:outline-none lg:gap-2.5 lg:font-normal lg:text-rcc-ink/75';

/**
 * Mascot with a speech bubble inviting people to get involved. The bubble is the link; the mascot is a button that
 * switches to a different look (color and face) on each click. Hovering either makes the mascot wave.
 */
function MascotInvite() {
  return (
    <div className="group/bot mx-auto flex w-fit flex-col items-center gap-4 lg:mr-0 lg:ml-auto lg:flex-row lg:items-end lg:gap-3">
      <Link
        href="/about#get-involved"
        className="relative flex flex-col gap-1 rounded-2xl lg:mb-24 border-2 border-rcc-ink bg-white px-4 py-3 shadow-[4px_4px_0_0_#102a43] transition-[translate,box-shadow] duration-300 ease-cta outline-none group-hover/bot:-translate-y-0.5 group-hover/bot:shadow-[6px_6px_0_0_#102a43] focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        <span className="font-mono text-sm whitespace-nowrap text-rcc-ink">Built by students like you.</span>
        {/* kept on one line so the arrow never wraps onto a line of its own */}
        <span className="font-mono text-sm font-bold whitespace-nowrap text-[#d00870]">
          Come build with us{' '}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-cta group-hover/bot:translate-x-1"
          >
            →
          </span>
        </span>
        {/* bubble tail pointing at the mascot: down to it below lg, across to it from lg */}
        <span
          aria-hidden
          className="absolute -bottom-[9px] left-1/2 size-4 -translate-x-1/2 rotate-45 border-r-2 border-b-2 border-rcc-ink bg-white lg:-right-[9px] lg:bottom-4 lg:left-auto lg:translate-x-0 lg:border-t-2 lg:border-b-0"
        />
      </Link>
      <MascotSwap className="w-24 shrink-0 sm:w-28 lg:w-48" />
    </div>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-rcc-ink"
      style={{ backgroundColor: PAPER_COLOR, backgroundImage: PAPER_GRAIN }}
    >
      <div className="mx-auto max-w-7xl px-6 pt-12 pb-24 sm:px-10 lg:pt-16">
        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.3fr)_auto_auto_minmax(0,1.7fr)] lg:gap-14">
          {/* always the last block: under everything on smaller screens, the right-hand column from lg */}
          <div className="order-last sm:col-span-2 lg:col-span-1 lg:self-end">
            <MascotInvite />
          </div>

          <nav aria-label="Explore" className="flex flex-col gap-4">
            <h2 className={HEADING_CLASS}>Explore</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5 lg:flex-col lg:gap-3">
              {exploreLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className={LINK_CLASS}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Get in touch" className="flex flex-col gap-4">
            <h2 className={HEADING_CLASS}>Get in touch</h2>
            <ul className="flex flex-wrap gap-x-5 gap-y-2.5 lg:flex-col lg:gap-3">
              {contactLinks.map((link) => {
                const isEmail = link.href.startsWith('mailto:');
                return (
                  <li key={link.label} className="max-w-full">
                    <a
                      href={link.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className={cn(LINK_CLASS, 'max-w-full')}
                    >
                      <link.icon className="size-4 shrink-0" aria-hidden />
                      {/* lets the email address wrap on the narrowest phones instead of running off the edge */}
                      <span className="min-w-0 [overflow-wrap:anywhere]">{link.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex flex-col gap-4 sm:col-span-2 lg:order-first lg:col-span-1 lg:gap-5">
            <Link href="/" className="w-fit">
              {/* full lockup: the wordmark already spells out the club name */}
              <Image
                src="/images/footer/rcc-logo-full.webp"
                alt="Responsible Computing Club"
                width={967}
                height={575}
                sizes="208px"
                className="h-auto w-36 lg:w-52"
              />
            </Link>
            <span className="max-w-xs text-sm leading-relaxed text-rcc-ink/70">
              Empowering SJSU students to shape the future of tech, in partnership with Mozilla.
            </span>
            <div className="flex items-center gap-4">
              <Image
                src="/images/footer/logo-sjsu.svg"
                alt="San José State University"
                width={120}
                height={60}
                className="h-8 w-auto opacity-80 brightness-0"
              />
              <Image
                src="/images/footer/mozilla-footer-logo.svg"
                alt="Mozilla"
                width={84}
                height={24}
                className="h-6 w-auto ring-1 ring-rcc-ink/15"
              />
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-rcc-ink/80 pt-6 sm:flex-row sm:items-center sm:justify-between lg:mt-12">
          <span className="flex flex-col text-sm text-rcc-ink/75 sm:flex-row sm:gap-1.5">
            <span>© {new Date().getFullYear()} Responsible Computing Club</span>
            <span aria-hidden className="hidden sm:inline">
              ·
            </span>
            <span>San José State University</span>
          </span>
          {/* the contact tiles already cover these below lg */}
          <ul className="hidden items-center gap-4 lg:flex">
            {contactLinks.slice(0, 3).map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex size-8 items-center justify-center rounded-md text-rcc-ink transition-[color,background-color,translate] duration-200 ease-hover hover:-translate-y-0.5 hover:bg-rcc-ink/5 hover:text-rcc-violet focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
                >
                  <social.icon className="size-4" aria-hidden />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
