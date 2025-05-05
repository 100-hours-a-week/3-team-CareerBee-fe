import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  `inline-flex items-center justify-center gap-2 whitespace-nowrap 
  rounded-md font-medium transition-colors 
  focus-visible:outline-none 
  focus-visible:ring-2 
  focus-visible:ring-ring 
  disabled:pointer-events-none 
  disabled:opacity-50 
  [&_svg]:pointer-events-none 
  [&_svg]:size-4 
  [&_svg]:shrink-0`,
  {
    variants: {
      variant: {
        primary: "bg-primary text-text-primary hover:bg-primary/80",
        secondary: "bg-secondary text-text-primary hover:bg-secondary/80",
        transparent: "bg-transparent text-text-primary",
        danger: "bg-error text-white hover:bg-error/80",
        link: "text-primary underline-offset-4 hover:underline",
        icon: "bg-transparent text-border hover:text-border/80",
      },
      size: {
        sm: "h-8 rounded-md text-xs",
        md: "h-9 rounded-md text-sm",
        lg: "h-10 rounded-md text-base",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  label?: React.ReactNode; 
  value?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, fullWidth, label, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, fullWidth, className }))}
        ref={ref}
        {...props}
      >
      {label}
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

