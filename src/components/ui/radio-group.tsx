import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';

import { cn } from '@/lib/utils';

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return <RadioGroupPrimitive.Root className={cn('grid', className)} {...props} ref={ref} />;
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        ` relative h-5 w-5 flex items-center justify-center
          border-2 border-text-secondary rounded-full 
          p-0 
          focus-visible:outline-none 
          focus-visible:ring-2
           focus-visible:ring-ring 
           focus-visible:ring-offset-2
           data-[state=checked]:border-primary
        `,
        className,
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute w-4 h-4 flex items-center justify-center pointer-events-none">
        <div className="h-[0.625rem] w-[0.625rem] rounded-full bg-primary" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
