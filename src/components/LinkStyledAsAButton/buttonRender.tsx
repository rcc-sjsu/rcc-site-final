'use client';
import { linkProps } from './type';

import { buttonVariants } from '@/components/ui/button';

export function ButtonRender({ children }: linkProps) {
  return (
    <a href="#" className={buttonVariants({ variant: 'secondary', size: 'sm' })}>
      {children}
    </a>
  );
}
