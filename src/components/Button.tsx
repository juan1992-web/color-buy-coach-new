import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export function Button({ 
  className, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  ...props 
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-bold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
        {
          // Primary: Red for CTA (as requested by user)
          'bg-brand-red text-white hover:bg-red-700 shadow-glow focus:ring-brand-red': variant === 'primary',
          // Secondary: Viva Magenta or Coral
          'bg-brand-magenta text-white hover:bg-rose-800 shadow-card focus:ring-brand-magenta': variant === 'secondary',
          // Outline
          'border-2 border-brand-dark text-brand-dark hover:bg-gray-100 focus:ring-gray-500': variant === 'outline',
          // Ghost
          'text-brand-dark hover:bg-gray-100': variant === 'ghost',
          
          // Sizes
          'px-4 py-2 text-sm': size === 'sm',
          'px-6 py-3 text-base': size === 'md',
          'px-8 py-4 text-lg': size === 'lg',
          
          // Width
          'w-full': fullWidth,
        },
        className
      )}
      {...props}
    />
  );
}
