import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown, ChevronUp } from 'lucide-react';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/cn';

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between rounded-lg border bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
  {
    variants: {
      variant: {
        default: 'border-primary-200 text-primary-200',
        error: 'border-danger-500 text-danger-900',
      },
      size: {
        sm: 'h-9 px-3 py-2 text-sm',
        md: 'h-11 px-4 py-2.5',
        lg: 'h-12 px-4 py-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

const selectContentVariants = cva(
  'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-primary-200 bg-white shadow-lg',
  {
    variants: {
      position: {
        popper:
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        'item-aligned': '',
      },
    },
    defaultVariants: {
      position: 'popper',
    },
  }
);

const Select = SelectPrimitive.Root;
const SelectGroup = SelectPrimitive.Group;
const SelectValue = SelectPrimitive.Value;

interface SelectTriggerProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Trigger
> {
  variant?: 'default' | 'error';
  size?: 'sm' | 'md' | 'lg';
}

const SelectTrigger = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Trigger>,
  SelectTriggerProps
>(({ className, children, variant = 'default', size = 'md', ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectTriggerVariants({ variant, size }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

interface SelectContentProps extends React.ComponentPropsWithoutRef<
  typeof SelectPrimitive.Content
> {
  position?: 'popper' | 'item-aligned';
}

const SelectContent = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Content>,
  SelectContentProps
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(selectContentVariants({ position }), className)}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]'
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn('px-2 py-1.5 text-primary-200', className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-pointer select-none items-center rounded-md py-2 pl-8 pr-2 outline-none transition-colors focus:bg-primary-100 focus:text-white data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4 text-primary-200" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ComponentRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn('-mx-1 my-1 h-px bg-primary-200', className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

// Helper component for full select with label
interface SelectFieldProps {
  label?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  children: React.ReactNode;
}

const SelectField = React.forwardRef<HTMLDivElement, SelectFieldProps>(
  ({ label, error, helperText, required, children }, ref) => {
    return (
      <div ref={ref} className="space-y-2">
        {label && (
          <label className="text-primary-200">
            {label}
            {required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        {children}
        {(error || helperText) && (
          <p
            className={cn(error ? 'text-danger-500' : 'text-primary-200'
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);
SelectField.displayName = 'SelectField';

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
  SelectField,
};
export type { SelectTriggerProps, SelectContentProps, SelectFieldProps };
