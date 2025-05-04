import * as React from "react"

import { cn } from "@/lib/utils"
import { cva } from "class-variance-authority"

const SearchVariants = cva(
  `flex w-full border placeholder:text-muted-foreground text-base`,
  {
    variants:{
      variant:{
        default: `h-9 rounded-md border-input 
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

        search: `h-11 rounded-full border-border bg-white pl-10 pr-10 `
      },
    },
    defaultVariants:{
      variant:"default"
    },
  },
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { variant?: "default" | "search" }
>(({ className, type, maxLength, variant = "default", ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        SearchVariants({variant}), className
      )}
      ref={ref}
      maxLength={maxLength}
      {...props}
    />
  )
})
Input.displayName = "Input"

export { Input }
