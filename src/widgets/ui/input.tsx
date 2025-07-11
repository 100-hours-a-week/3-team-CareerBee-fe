import * as React from 'react';

import { cn } from '@/src/shared/lib/utils';
import { cva } from 'class-variance-authority';

const SearchVariants = cva(`flex w-full placeholder:text-text-secondary text-base`, {
  variants: {
    variant: {
      default: `border h-9 rounded-lg border-input 
        bg-transparent px-3 py-1
        file:border-0 file:bg-transparent 
        file:text-sm file:font-medium 
        file:text-foreground 
        focus-visible:outline-none 
        focus-visible:ring-1 
        focus-visible:ring-ring 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        md:text-sm`,
      resume: `flex h-10 w-full items-center justify-between whitespace-nowrap 
        rounded-lg border border-border 
        bg-transparent px-3 py-2 text-sm font-medium text-text-primary shadow-sm 
        ring-offset-background 
        data-[placeholder]:text-text-primary 
        focus:outline-none 
        focus:ring-1
        focus:ring-ring 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        [&>span]:line-clamp-1 leading-5`,

      search: `h-11 rounded-full pl-10 pr-10 focus-visible:outline-none `,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'input'> & { variant?: 'default' | 'search' | 'resume' }
>(({ className, type, maxLength, variant = 'default', ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(SearchVariants({ variant }), className)}
      ref={ref}
      maxLength={maxLength}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
