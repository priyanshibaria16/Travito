import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl"
  variant?: "default" | "primary" | "destructive" | "secondary"
}

const sizeMap = {
  sm: "h-4 w-4 border-2",
  md: "h-6 w-6 border-2",
  lg: "h-8 w-8 border-2",
  xl: "h-12 w-12 border-[3px]",
}

const variantMap = {
  default: "border-muted-foreground/25 border-t-muted-foreground",
  primary: "border-primary/25 border-t-primary",
  destructive: "border-destructive/25 border-t-destructive",
  secondary: "border-secondary/25 border-t-secondary",
}

export function LoadingSpinner({
  className,
  size = "md",
  variant = "default",
  ...props
}: LoadingSpinnerProps) {
  return (
    <div className={cn("flex items-center justify-center", className)} {...props}>
      <motion.div
        className={cn(
          "rounded-full",
          sizeMap[size],
          variantMap[variant]
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: 0.8,
          ease: "linear",
          repeat: Infinity,
        }}
      />
    </div>
  )
}

export function PageLoading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <LoadingSpinner size="xl" />
    </div>
  )
}
