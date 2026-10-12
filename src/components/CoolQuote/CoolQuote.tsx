import Reveal from '@/components/Reveal';

export default function CoolQuote() {
  return (
    <section className="bg-muted py-20 sm:py-28" aria-label="Quote from RCC founder">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center sm:px-10">
        <span aria-hidden className="font-mono text-6xl leading-none font-bold text-highlight">
          &ldquo;
        </span>
        <figure className="flex flex-col items-center gap-8">
          <blockquote>
            <span className="block text-2xl leading-snug font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-4xl">
              Our goal isn&rsquo;t just to study technology, but to question it, to understand its effects, and to make
              sure it&rsquo;s applied <span className="text-highlight">responsibly.</span>
            </span>
          </blockquote>
          <figcaption className="flex items-center gap-2 font-mono text-sm tracking-widest text-muted-foreground uppercase">
            <span aria-hidden className="size-2 bg-highlight" />
            Julia, RCC Founder
          </figcaption>
        </figure>
      </Reveal>
    </section>
  );
}
