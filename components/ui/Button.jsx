import { forwardRef } from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

const Button = forwardRef(({ className, variant = "primary", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-black/90 active:scale-[0.98]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98]",
    outline: "border border-border bg-background hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
    ghost: "hover:bg-accent hover:text-accent-foreground active:scale-[0.98]",
    link: "text-primary underline-offset-4 hover:underline",
  }

  const sizes = {
    default: "h-11 px-8 py-2",
    sm: "h-9 px-4 py-2 text-xs",
    lg: "h-14 px-10 py-3 text-base",
    icon: "h-10 w-10",
  }

  return (
    <Comp
      className={cn(
        "inline-flex items-center justify-center text-sm font-medium tracking-widest uppercase transition-all duration-300 disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      ref={ref}
      {...props}
    />
  )
})
Button.displayName = "Button"

export { Button }
