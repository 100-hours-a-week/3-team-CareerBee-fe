import * as React from 'react';
import { useState } from 'react';

import { cn } from '@/src/shared/lib/utils';
import { cva } from 'class-variance-authority';

const divVariants = cva(``, {
  variants: {
    variant: {
      default: `flex flex-col h-40 w-full items-center justify-between
        rounded-lg border border-border shadow-sm bg-transparent
        px-3 py-2
        ring-offset-background 
        focus-within:border-ring
        focus-within:ring-1
        focus-within:ring-ring 
        disabled:cursor-not-allowed 
        disabled:opacity-50 `,
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});
const textVariants = cva(`flex w-full placeholder:text-text-secondary text-base`, {
  variants: {
    variant: {
      default: `flex w-full h-full items-center justify-between
        overflow-y-auto resize-none	bg-transparent
        text-sm font-medium text-text-primary
        data-[placeholder]:text-text-primary 
        focus:outline-none 
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
  HTMLTextAreaElement,
  React.ComponentProps<'textarea'> & { variant?: 'default'; showCount?: boolean }
>(({ className, maxLength, variant = 'default', onChange, showCount = true, ...props }, ref) => {
  const [textCount, setTextCount] = useState('000');
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextCount(
      String(e.target.value.length).padStart(maxLength ? String(maxLength).length : 3, '0'),
    );
    onChange?.(e);
  };

  return (
    <div className={cn(divVariants({ variant }), className)}>
      <textarea
        className={cn(textVariants({ variant }))}
        maxLength={maxLength}
        ref={ref}
        onChange={handleChange}
        {...props}
      />
      {showCount && (
        <p className="w-full text-end text-xs text-text-secondary">
          <span>{textCount}</span>
          <span>/{maxLength}</span>
        </p>
      )}
    </div>
  );
});
Textarea.displayName = 'Textarea';

export { Textarea };
