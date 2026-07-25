import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * shadcn/ui Button, adapted for this project (Tailwind v3 + React 18):
 *  - no Radix `Slot`/`asChild` (that package isn't installed) — it's a plain <button>
 *  - extra playful brand variants (blue / green / sunny) on top of shadcn's defaults,
 *    because the default slate `primary` is too dull for a kids' app.
 */
const buttonVariants = cva(
  // 3D push-button base: a solid coloured bottom edge (via box-shadow) that the
  // button visually "presses into" on click (translate down, edge shrinks).
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-bold transition-[transform,box-shadow,background-color] duration-100 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand-blue/40 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 active:translate-y-[3px]",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-[0_5px_0_hsl(var(--primary)/.5)] hover:brightness-105 active:shadow-[0_2px_0_hsl(var(--primary)/.5)]',
        brand:
          'bg-[#1583b3] text-white shadow-[0_5px_0_#0f6a92,0_10px_18px_-8px_rgba(15,106,146,.6)] hover:brightness-110 active:shadow-[0_2px_0_#0f6a92]',
        success:
          'bg-[#5f9127] text-white shadow-[0_5px_0_#48701c,0_10px_18px_-8px_rgba(72,112,28,.6)] hover:brightness-110 active:shadow-[0_2px_0_#48701c]',
        sunny:
          'bg-[#d9820f] text-white shadow-[0_5px_0_#ad6709,0_10px_18px_-8px_rgba(173,103,9,.6)] hover:brightness-110 active:shadow-[0_2px_0_#ad6709]',
        outline:
          'border-2 border-ink/15 bg-white text-ink shadow-[0_5px_0_rgba(30,58,95,.14)] hover:border-brand-blue/60 hover:bg-brand-blue/5 active:shadow-[0_2px_0_rgba(30,58,95,.14)]',
        ghost: 'text-ink hover:bg-ink/5 active:translate-y-0',
        destructive:
          'bg-[#c93b3b] text-white shadow-[0_5px_0_#9e2e2e,0_10px_18px_-8px_rgba(158,46,46,.6)] hover:brightness-110 active:shadow-[0_2px_0_#9e2e2e]',
      },
      size: {
        default: 'h-11 px-5 py-2',
        sm: 'h-9 px-3.5',
        lg: 'h-14 px-8 text-base',
        icon: 'h-11 w-11',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => (
    <button ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
);
Button.displayName = 'Button';

export { Button, buttonVariants };
