import Image from 'next/image';
import Link from 'next/link';
import { MailIcon } from 'lucide-react';
import { SiDiscord, SiInstagram } from 'react-icons/si';
import { FaLinkedin } from 'react-icons/fa';
import { PAPER_COLOR, PAPER_GRAIN } from '@/lib/grain';
import { RccBot } from './RccBot';

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

const LINK_CLASS =
  'inline-flex items-center gap-2.5 text-base text-rcc-ink/75 transition-colors duration-200 ease-hover hover:text-rcc-violet focus-visible:text-rcc-violet focus-visible:outline-none';

/**
 * Mascot with a speech bubble inviting people to get involved. The whole thing is one link; hovering it makes the
 * mascot wave.
 */
function MascotInvite({ compact = false }: { compact?: boolean }) {
  return (
    <Link
      href="/about#get-involved"
      className={`group/bot flex w-fit items-end gap-3 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 ${compact ? 'mx-auto' : 'ml-auto'}`}
    >
      <span className="relative mb-24 flex flex-col gap-1 rounded-2xl border-2 border-rcc-ink bg-white px-4 py-3 shadow-[4px_4px_0_0_#102a43] transition-[translate,box-shadow] duration-300 ease-cta group-hover/bot:-translate-y-0.5 group-hover/bot:shadow-[6px_6px_0_0_#102a43]">
        <span className="font-mono text-sm whitespace-nowrap text-rcc-ink">Built by students like you.</span>
        <span className="font-mono text-sm font-bold text-[#d00870]">
          Come build with us{' '}
          <span
            aria-hidden
            className="inline-block transition-transform duration-300 ease-cta group-hover/bot:translate-x-1"
          >
            →
          </span>
        </span>
        {/* bubble tail pointing at the mascot */}
        <span
          aria-hidden
          className="absolute -right-[9px] bottom-4 size-4 rotate-45 border-t-2 border-r-2 border-rcc-ink bg-white"
        />
      </span>
      <RccBot className={compact ? 'w-32 shrink-0' : 'w-48 shrink-0'} />
    </Link>
  );
}

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden text-rcc-ink"
      style={{ backgroundColor: PAPER_COLOR, backgroundImage: PAPER_GRAIN }}
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8 sm:px-10">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-[minmax(0,1.3fr)_auto_auto_minmax(0,1.7fr)] lg:gap-14">
          <div className="col-span-2 flex flex-col gap-5 lg:col-span-1">
            <Link href="/" className="flex w-fit items-center gap-3 text-rcc-ink">
              <Image
                src="/images/footer/rcc-footer-logo.png"
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full"
              />
              <span className="text-lg leading-tight font-semibold tracking-tight">Responsible Computing Club</span>
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

          <nav aria-label="Explore" className="flex flex-col gap-4">
            <h2 className="text-sm font-bold text-rcc-ink">Explore</h2>
            <ul className="flex flex-col gap-3">
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
            <h2 className="text-sm font-bold text-rcc-ink">Get in touch</h2>
            <ul className="flex flex-col gap-3">
              {contactLinks.map((link) => {
                const isEmail = link.href.startsWith('mailto:');
                return (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className={LINK_CLASS}
                    >
                      <link.icon className="size-4 shrink-0" aria-hidden />
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden self-end lg:block">
            <MascotInvite />
          </div>
        </div>

        <div className="mt-12 lg:hidden">
          <MascotInvite compact />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-rcc-ink/80 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-rcc-ink/75">
            © {new Date().getFullYear()} Responsible Computing Club · San José State University
          </span>
          <ul className="flex items-center gap-4">
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
