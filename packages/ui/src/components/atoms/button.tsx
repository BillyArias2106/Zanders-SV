import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'

import { cn } from '../../lib/utils'

type ButtonVariant = 'primary' | 'secondary' | 'ghost'
type ButtonSize = 'sm' | 'md'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: ReactNode
  size?: ButtonSize
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'border-cyan-200/80 bg-cyan-200 text-deep-950 shadow-cyan hover:bg-silver-50',
  secondary:
    'border-cyan-200/35 bg-white/5 text-silver-50 hover:border-cyan-200/80 hover:text-cyan-200',
  ghost:
    'border-transparent bg-transparent text-silver-300 hover:bg-white/5 hover:text-silver-50'
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-5 text-sm'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, className, icon, size = 'md', type = 'button', variant = 'primary', ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 border font-heading font-bold uppercase tracking-[0] transition duration-200 disabled:pointer-events-none disabled:opacity-50',
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      <span>{children}</span>
      {icon ? <span className="inline-flex shrink-0">{icon}</span> : null}
    </button>
  )
)

Button.displayName = 'Button'
