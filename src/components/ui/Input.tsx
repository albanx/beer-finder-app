'use client';

import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'search';
  size?: 'sm' | 'md' | 'lg';
  error?: boolean;
  helperText?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClear?: () => void;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ 
    className, 
    variant = 'default',
    size = 'md',
    error = false,
    helperText,
    startIcon,
    endIcon,
    onClear,
    type = 'text',
    value,
    ...props 
  }, ref) => {
    const baseStyles = 'w-full border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variants = {
      default: error 
        ? 'border-error focus:border-error focus:ring-red-500' 
        : 'border-border focus:border-primary-500 focus:ring-primary-500',
      search: 'border-border focus:border-primary-500 focus:ring-primary-500 bg-surface',
    };

    const sizes = {
      sm: 'px-3 py-2 text-sm h-9 rounded-md',
      md: 'px-4 py-2.5 text-base h-11 rounded-lg',
      lg: 'px-5 py-3 text-lg h-12 rounded-lg',
    };

    const hasStartIcon = !!startIcon;
    const hasEndIcon = !!endIcon || (onClear && value);
    const showClearButton = onClear && value;

    return (
      <div className="w-full">
        <div className="relative">
          {hasStartIcon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
              {startIcon}
            </div>
          )}
          
          <input
            type={type}
            className={cn(
              baseStyles,
              variants[variant],
              sizes[size],
              hasStartIcon && 'pl-10',
              hasEndIcon && 'pr-10',
              className
            )}
            ref={ref}
            value={value}
            {...props}
          />
          
          {hasEndIcon && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {showClearButton && (
                <button
                  type="button"
                  onClick={onClear}
                  className="text-muted hover:text-foreground transition-colors p-0.5 rounded focus:outline-none focus:ring-1 focus:ring-primary-500"
                  aria-label="Clear input"
                >
                  <svg 
                    className="h-4 w-4" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" 
                    />
                  </svg>
                </button>
              )}
              {endIcon && !showClearButton && (
                <div className="text-muted pointer-events-none">
                  {endIcon}
                </div>
              )}
            </div>
          )}
        </div>
        
        {helperText && (
          <p className={cn(
            'mt-1 text-sm',
            error ? 'text-error' : 'text-muted'
          )}>
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };