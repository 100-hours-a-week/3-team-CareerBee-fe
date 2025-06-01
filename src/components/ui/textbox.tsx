import * as React from 'react';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const variants = cva(`flex w-full placeholder:text-text-secondary text-base`, {
  variants: {
    variant: {
      default: `flex h-40 w-full items-center justify-between
        rounded-lg border border-border shadow-sm bg-transparent
        px-3 py-2 overflow-y-auto resize-none	
        text-sm font-medium text-text-primary
        ring-offset-background 
        data-[placeholder]:text-text-primary 
        focus:outline-none 
        focus:ring-1
        focus:ring-ring 
        disabled:cursor-not-allowed 
        disabled:opacity-50 
        [&>span]:line-clamp-1 leading-5`,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const Textarea = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<'textarea'> & { variant?: 'default' }
>(({ className, maxLength, variant = 'default', ...props }, ref) => {
  return (
    <textarea
      className={cn(variants({ variant }), className)}
      maxLength={maxLength}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
