'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ 
    className, 
    variant = 'primary', 
    size = 'md', 
    loading = false,
    icon,
    iconPosition = 'left',
    children, 
    disabled,
    ...props 
  }, ref) => {
    const baseStyles = 'btn-touch font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible';
    
    const variants = {
      primary: 'bg-primary-500 text-white hover:bg-primary-600 active:bg-primary-700 focus:ring-primary-500',
      secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:bg-gray-300 focus:ring-gray-500',
      outline: 'border border-border bg-surface text-foreground hover:bg-gray-50 active:bg-gray-100 focus:ring-primary-500',
      ghost: 'bg-transparent text-foreground hover:bg-gray-100 active:bg-gray-200 focus:ring-primary-500',
      danger: 'bg-error text-white hover:bg-red-600 active:bg-red-700 focus:ring-red-500',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-4 py-2 text-base min-h-[44px]',
      lg: 'px-6 py-3 text-lg min-h-[48px]',
    };

    const isDisabled = disabled || loading;

    return (
      <button
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          isDisabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        ref={ref}
        disabled={isDisabled}
        {...props}
      >
        <span className="flex items-center justify-center gap-2">
          {loading && (
            <svg 
              className="animate-spin h-4 w-4" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24"
            >
              <circle 
                className="opacity-25" 
                cx="12" 
                cy="12" 
                r="10" 
                stroke="currentColor" 
                strokeWidth="4"
              />
              <path 
                className="opacity-75" 
                fill="currentColor" 
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          )}
          {!loading && icon && iconPosition === 'left' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
          {children && <span>{children}</span>}
          {!loading && icon && iconPosition === 'right' && (
            <span className="flex-shrink-0">{icon}</span>
          )}
        </span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };