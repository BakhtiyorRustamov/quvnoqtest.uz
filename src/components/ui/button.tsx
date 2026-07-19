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
          'bg-brand-blue text-white shadow-[0_5px_0_#1583b3,0_10px_18px_-8px_rgba(21,131,179,.6)] hover:brightness-105 active:shadow-[0_2px_0_#1583b3]',
        success:
          'bg-brand-green text-white shadow-[0_5px_0_#6fa22f,0_10px_18px_-8px_rgba(111,162,47,.6)] hover:brightness-105 active:shadow-[0_2px_0_#6fa22f]',
        sunny:
          'bg-brand-orange text-white shadow-[0_5px_0_#cf7d10,0_10px_18px_-8px_rgba(207,125,16,.6)] hover:brightness-105 active:shadow-[0_2px_0_#cf7d10]',
        outline:
          'border-2 border-ink/15 bg-white text-ink shadow-[0_5px_0_rgba(30,58,95,.14)] hover:border-brand-blue/60 hover:bg-brand-blue/5 active:shadow-[0_2px_0_rgba(30,58,95,.14)]',
        ghost: 'text-ink hover:bg-ink/5 active:translate-y-0',
        destructive:
          'bg-error text-white shadow-[0_5px_0_#b23636,0_10px_18px_-8px_rgba(178,54,54,.6)] hover:brightness-105 active:shadow-[0_2px_0_#b23636]',
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
