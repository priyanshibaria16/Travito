import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { motion } from "framer-motion"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground shadow-lg hover:shadow-primary/30 hover:shadow-lg hover:scale-[1.02] active:scale-95",
        destructive: "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground shadow-lg hover:shadow-destructive/30 hover:shadow-lg hover:scale-[1.02] active:scale-95",
        outline: "border-2 border-input bg-background hover:bg-accent hover:text-accent-foreground hover:shadow-md hover:scale-[1.02] active:scale-95",
        secondary: "bg-gradient-to-r from-secondary to-secondary/90 text-secondary-foreground shadow-lg hover:shadow-secondary/30 hover:shadow-lg hover:scale-[1.02] active:scale-95",
        ghost: "hover:bg-accent hover:text-accent-foreground hover:shadow-sm hover:scale-[1.02] active:scale-95",
        link: "text-primary underline-offset-4 hover:underline hover:scale-[1.02] active:scale-95",
      },
      size: {
        default: "h-11 px-6 py-2 text-base",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-8 text-lg",
        xl: "h-14 rounded-xl px-10 text-xl font-semibold",
        icon: "h-10 w-10",
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
  loading?: boolean
  fullWidth?: boolean
  rounded?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant, 
    size, 
    asChild = false, 
    loading = false,
    fullWidth = false,
    rounded = 'md',
    children,
    disabled,
    ...props 
  }, ref) => {
    const Comp = asChild ? Slot : motion.button
    
    const roundedStyles = {
      sm: 'rounded',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full'
    }[rounded]

    return (
      <Comp
        className={cn(
          buttonVariants({ variant, size, className }),
          fullWidth && 'w-full',
          roundedStyles,
          'relative overflow-hidden group',
          loading && 'cursor-wait'
        )}
        ref={ref}
        disabled={disabled || loading}
        whileHover={{ 
          scale: 1.03,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        whileTap={{ 
          scale: 0.98,
          transition: { type: 'spring', stiffness: 400, damping: 10 }
        }}
        {...props}
      >
        <span className={`relative z-10 flex items-center justify-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}>
          {children}
        </span>
        
        {loading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <motion.span 
              className="h-5 w-5 rounded-full border-2 border-white border-t-transparent"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            />
          </span>
        )}
        
        {/* Ripple Effect */}
        <span className="absolute inset-0 -z-10 overflow-hidden">
          <span className="absolute left-1/2 top-1/2 h-0 w-0 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-white/20 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-100"></span>
        </span>
      </Comp>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants };