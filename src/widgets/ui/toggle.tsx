import * as React from 'react';
import * as TogglePrimitive from '@radix-ui/react-toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/src/shared/lib/utils';

const toggleVariants = cva(
  `inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors 
  hover:text-border/80
  focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring 
  disabled:pointer-events-none disabled:opacity-50 
  [&_svg]:pointer-events-none [&_svg]:shrink-0 `,
  {
    variants: {
      variant: {
        default: 'bg-transparent',
        pill: `border border-border bg-background shadow-sm rounded-full
          hover:bg-accent hover:text-accent-foreground
          data-[state=on]:bg-secondary data-[state=on]:border-transparent`,
        save: `flex items-center bg-transparent
          data-[state=on]:fill-primary,`,
      },
      size: {
        xs: 'h-6 px-1 min-w-6',
        sm: 'h-8 px-1.5 min-w-8',
        md: 'h-9 px-2 min-w-9',
        lg: 'h-10 px-2.5 min-w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  },
);
export interface ToggleProps
  extends React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root>,
    VariantProps<typeof toggleVariants> {
  label?: React.ReactNode;
}

const Toggle = React.forwardRef<React.ElementRef<typeof TogglePrimitive.Root>, ToggleProps>(
  ({ className, variant, size, label, ...props }, ref) => (
    <TogglePrimitive.Root
      ref={ref}
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    >
      {label}
    </TogglePrimitive.Root>
  ),
);

Toggle.displayName = TogglePrimitive.Root.displayName;

export { Toggle, toggleVariants };
