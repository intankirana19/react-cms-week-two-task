import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/cn';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 cursor-pointer disabled:pointer-events-none disabled:opacity-40 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary: 'bg-primary-200 text-white hover:bg-primary-100 active:bg-primary-300',
        secondary:
          'border border-primary-200 bg-white text-primary-200 hover:bg-primary-100 hover:text-white active:bg-primary-200 active:text-white',
        tertiary: 'border border-secondary-200 bg-white text-secondary-200 hover:bg-secondary-100  hover:text-white active:bg-secondary-300 active:text-white',
        text: 'bg-transparent text-secondary-200',

      },
      size: {
        xs: 'h-7 px-2 text-[10px] rounded-md',
        sm: 'h-8 px-3 text-xs rounded-md',
        md: 'h-10 px-4 text-sm rounded-lg',
        lg: 'h-12 px-6 text-base rounded-lg',
        xl: 'h-14 px-8 text-lg rounded-xl',
      },
      isIconOnly: {
        true: 'px-0 aspect-square',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
      isIconOnly: false,
    },
  }
);

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isIconOnly, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, isIconOnly, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
