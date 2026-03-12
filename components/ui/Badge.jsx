import { cn } from "@/lib/utils"

export function Badge({ children, className, variant = "default", ...props }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    outline: "text-foreground border border-border",
    destructive: "bg-destructive text-destructive-foreground",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center px-2 py-0.5 text-xs font-semibold tracking-wider uppercase transition-colors",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
