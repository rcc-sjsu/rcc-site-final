import Reveal from '@/components/Reveal';
import { cn } from '@/lib/utils';

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = 'left',
  className,
  children,
}: {
  id?: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={cn(
        'flex flex-col gap-6 md:flex-row md:items-end md:justify-between',
        align === 'center' && 'items-center text-center md:flex-col md:items-center',
        className
      )}
    >
      <div className={cn('flex max-w-2xl flex-col gap-3', align === 'center' && 'items-center')}>
        <span className="flex items-center gap-2 font-pixel text-sm tracking-widest text-highlight uppercase">
          <span aria-hidden className="size-2 bg-highlight" />
          {eyebrow}
        </span>
        <h2
          id={id}
          className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-balance text-foreground sm:text-5xl"
        >
          {title}
        </h2>
        {description && <span className="text-base text-muted-foreground sm:text-lg">{description}</span>}
      </div>
      {children}
    </Reveal>
  );
}
