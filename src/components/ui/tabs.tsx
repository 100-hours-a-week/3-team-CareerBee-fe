import * as React from 'react';
import * as TabsPrimitive from '@radix-ui/react-tabs';

import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn('inline-flex h-9 w-full items-center justify-center ', className)}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

const TabsVariants = cva(
  `inline-flex items-center justify-center w-1/5
  rounded-none whitespace-nowrap px-4 py-2 bg-background
  text-base font-medium ring-offset-background transition-all 
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-ring 
  disabled:pointer-events-none 
  disabled:opacity-50 
  data-[state=active]:shadow`,
  {
    variants: {
      variant: {
        company: `relative top-0 text-text-primary 
        data-[state=active]:font-semibold
        data-[state=active]:after:bg-primary 
        data-[state=active]:bg-secondary/80 
        after:content-[''] 
        after:absolute 
        after:top-0 
        after:left-0 
        after:h-0.5 
        after:w-full 
        after:bg-secondary 
        `,
      },
    },
    defaultVariants: {
      variant: 'company',
    },
  },
);
const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger> & {
    variant?: 'company' | null | undefined;
  }
>(({ className, variant, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(TabsVariants({ variant }), className)}
    {...props}
  />
));
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      'mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      className,
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
