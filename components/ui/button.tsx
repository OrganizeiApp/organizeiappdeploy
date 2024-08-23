import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-bold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        ghostlist: "bg-transparent hover:bg-transparent hover:text-[#3A95EA]",
        link: "text-primary underline-offset-4 hover:underline",
        dashboard: "bg-[#F8F7FF] border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500 text-[#7935E8] font-extrabold text-lg",
        dashtog: "bg-[#7935E8] border-slate-200 border-2 border-b-4 active:border-b-2 hover:bg-slate-100 text-slate-500 text-[#7935E8] font-extrabold text-lg",
        entrar:"bg-green-500 text-primary-foreground hover:bg-green-500/90 activate:border-b-0",
        lembretes: "hover:bg-accent-[#fff6E5] hover:text-accent-[#fff6E5]",
        purple:"bg-[#7935E8] text-[#F8F7FF] hover:bg-[#7935E8]/90 border-[#40108E] border-b-4 activate:border-b-0",
        red:"bg-[#F0626A] text-[#F8F7FF] hover:bg-[#F0626A]/90 border-[#BD2B33] border-b-4 activate:border-b-0",
        blue:"bg-[#8DC3F5] text-[#F8F7FF] hover:bg-[#8DC3F5]/90 border-[#3A95EA] border-b-4 activate:border-b-0",
        yellow:"bg-[#F5CF8D] text-white hover:bg-[#F5CF8D]/90 border-[#F0BC62] border-b-4 activate:border-b-0",
        green:"bg-green-500 text-primary-foreground hover:bg-green-500/90 border-green-600 border-b-4 activate:border-b-0",
        lightpurple: "bg-[#D0B7F9] text-primary-foreground hover:bg-[pink-500/90] border-[#B189F2] border-b-4 activate:border-b-0",
        texted: "bg-white text-[#B189F2] border-[#B189F2] border-2",
        headinged: "bg-white text-[#8AF5B5] border-[#8AF5B5] border-2",
        imageed: "bg-white text-[#F58A90] border-[#F58A90] border-2",
        fonted: "bg-white text-[#8DC3F5] border-[#8DC3F5] border-2",
        paragraphed: "bg-white text-[#F5CF8D] border-[#F5CF8D] border-2",
        logo: "text-white normal-case font-extrabold text-xl",
        // lembrar adicionar a variante nova no components -> form -> form-submit.tsx
      },
      size: {
        default: "h-11 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-12 px-8",
        big: "h-20 w-80 text-lg text-white",
        tt: "h-12 w-40",
        sr: "h-10 px-8",
        icon: "h-10 w-10",
        rounded: "rounded-full",
        inline: "h-auto px-2 py-1.5 text-sm",
        calendar: "h-auto px-3 py-2.5 text-sm"
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
