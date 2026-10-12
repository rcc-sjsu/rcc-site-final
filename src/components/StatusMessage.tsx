import { TickButton } from '@/components/ui/pixel-button';

/** Centered status card for simple standalone pages (auth confirmations, errors). */
export default function StatusMessage({
  eyebrow,
  title,
  description,
  tone = 'default',
}: {
  eyebrow: string;
  title: string;
  description: string;
  tone?: 'default' | 'error';
}) {
  return (
    <section className="flex min-h-[60svh] items-center justify-center bg-muted px-6 py-20">
      <div className="flex w-full max-w-lg flex-col items-center gap-5 rounded-2xl bg-card p-8 text-center ring-1 ring-foreground/10 sm:p-12">
        <span className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <span aria-hidden className={tone === 'error' ? 'size-2 bg-destructive' : 'size-2 bg-highlight'} />
          {eyebrow}
        </span>
        <h1 className="text-3xl leading-tight font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-4xl">
          {title}
        </h1>
        <span className="text-base leading-relaxed text-muted-foreground">{description}</span>
        <TickButton href="/" className="mt-2">
          Back to home
        </TickButton>
      </div>
    </section>
  );
}
