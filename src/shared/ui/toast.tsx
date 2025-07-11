import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { cn } from '@/src/shared/lib/utils';

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed bottom-16 left-1/2 z-[100] flex w-auto -translate-x-1/2 flex-col items-center gap-2 p-0 min-w-24 max-w-sm',
      className,
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  `group pointer-events-auto relative flex w-full items-center justify-center text-center
  space-x-2 overflow-hidden rounded-full px-4 py-3 shadow-lg transition-all whitespace-pre-line
  data-[swipe=cancel]:translate-x-0 
  data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] 
  data-[swipe=end]:animate-out 
  data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] 
  data-[swipe=move]:transition-none 
  data-[state=closed]:animate-toast-slide-out
  data-[state=open]:animate-toast-slide-in`,
  {
    variants: {
      variant: {
        notify: 'bg-muted/90 text-text-primary',
        success: 'success border-2 border-primary bg-background text-text-primary bottom-24 px-2',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
      },
    },
    defaultVariants: {
      variant: 'notify',
    },
  },
);

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> & VariantProps<typeof toastVariants>
>(({ className, variant, duration, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      duration={duration}
      className={cn(toastVariants({ variant }), className)}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      `inline-flex h-8 shrink-0 items-center justify-center rounded-md 
      bg-transparent px-3 text-sm font-medium transition-colors 
      hover:bg-secondary 
      focus:outline-none 
      focus:ring-1 
      focus:ring-ring 
      disabled:pointer-events-none
      disabled:opacity-50 
      group-[.destructive]:border-muted/40 
      group-[.destructive]:hover:border-destructive/30 
      group-[.destructive]:hover:bg-destructive 
      group-[.destructive]:hover:text-destructive-foreground 
      group-[.destructive]:focus:ring-destructive`,
      className,
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      `absolute right-1 top-1 rounded-md p-1 text-foreground/50 transition-opacity 
      hover:text-foreground 
      focus:outline-none 
      focus:ring-1 
      group-hover:opacity-100 
      group-[.destructive]:text-red-300 
      group-[.destructive]:hover:text-red-50 
      group-[.destructive]:focus:ring-red-400 
      group-[.destructive]:focus:ring-offset-red-600`,
      className,
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn('text-sm font-semibold [&+div]:text-xs', className)}
    {...props}
  />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>;

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
};
