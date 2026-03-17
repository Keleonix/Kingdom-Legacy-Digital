import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/50 disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 tracking-wide",
  {
    variants: {
      variant: {
        // Bouton principal — or/ambre médiéval
        default:
          "rounded-md shadow-sm border border-amber-700/40 bg-gradient-to-b from-amber-100 to-amber-200 text-amber-950 hover:from-amber-50 hover:to-amber-100 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm",

        // Bouton destructif — rouge désaturé, ton pierre
        destructive:
          "rounded-md shadow-sm border border-red-800/40 bg-gradient-to-b from-red-100 to-red-200 text-red-950 hover:from-red-50 hover:to-red-100 hover:-translate-y-px hover:shadow-md active:translate-y-0",

        // Outline — parchemin transparent avec bordure
        outline:
          "rounded-md border border-amber-800/30 bg-amber-50/60 text-amber-900 backdrop-blur-sm hover:bg-amber-100/80 hover:border-amber-700/50 hover:-translate-y-px active:translate-y-0",

        // Secondary — pierre grise/beige
        secondary:
          "rounded-md border border-stone-400/40 bg-gradient-to-b from-stone-100 to-stone-200 text-stone-800 hover:from-stone-50 hover:to-stone-100 hover:-translate-y-px hover:shadow-sm active:translate-y-0",

        // Ghost — discret, juste un hover
        ghost:
          "text-amber-900 hover:bg-amber-100/60 hover:text-amber-950 rounded-md",

        // Link — souligné façon manuscrit
        link:
          "text-amber-800 underline-offset-4 hover:underline hover:text-amber-950 decoration-amber-600/50",
          
        // Bleu — azur/saphir médiéval
        blue:
          "rounded-md shadow-sm border border-blue-800/40 bg-gradient-to-b from-blue-100 to-blue-200 text-blue-950 hover:from-blue-50 hover:to-blue-100 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm",

        // Violet — améthyste
        purple:
          "rounded-md shadow-sm border border-purple-800/40 bg-gradient-to-b from-purple-100 to-purple-200 text-purple-950 hover:from-purple-50 hover:to-purple-100 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm",

        // Vert — jade/forêt
        green:
          "rounded-md shadow-sm border border-green-800/40 bg-gradient-to-b from-green-100 to-green-200 text-green-950 hover:from-green-50 hover:to-green-100 hover:-translate-y-px hover:shadow-md active:translate-y-0 active:shadow-sm",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
