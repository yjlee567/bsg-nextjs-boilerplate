"use client";

import { ComponentPropsWithoutRef, ElementRef, FC, forwardRef } from "react";
import * as SelectPrimitive from "@radix-ui/react-select";
import { cva, type VariantProps } from "class-variance-authority";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn, widthVariant } from "@/utils/styles";
import { Item, Width } from "@/types/ui";

const selectVariants = cva(
  "flex gap-2 w-full items-center justify-between rounded-md border bg-background ring-offset-background placeholder:text-main-gray focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1",
  {
    variants: {
      size: {
        sm: "h-9 px-2 py-1 text-sm",
        md: "h-10 px-3 py-2 text-sm",
        lg: "h-12 px-4 py-3 text-base",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

const Select = SelectPrimitive.Root;
// const SelectValue = SelectPrimitive.Value;

const SelectTrigger = forwardRef<
  ElementRef<typeof SelectPrimitive.Trigger>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger> &
    VariantProps<typeof widthVariant> &
    VariantProps<typeof selectVariants>
>(({ className, width, size, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(selectVariants({ size }), widthVariant({ width }), className)}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown className="h-4 w-4 opacity-50 shrink-0" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const SelectScrollUpButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = forwardRef<
  ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn("flex cursor-default items-center justify-center py-1", className)}
    {...props}
  >
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = forwardRef<
  ElementRef<typeof SelectPrimitive.Content>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Content> & VariantProps<typeof widthVariant>
>(({ className, children, position = "popper", width, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        "relative z-50 max-h-96 w-full overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
        position === "popper" &&
          "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
        widthVariant({ width }),
        className,
      )}
      position={position}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          "p-1",
          position === "popper" &&
            "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]",
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = forwardRef<
  ElementRef<typeof SelectPrimitive.Label>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label
    ref={ref}
    className={cn("py-1.5 pl-8 pr-2 text-sm font-semibold", className)}
    {...props}
  />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = forwardRef<
  ElementRef<typeof SelectPrimitive.Item>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-muted focus:text-main-black data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
      className,
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = forwardRef<
  ElementRef<typeof SelectPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator
    ref={ref}
    className={cn("-mx-1 my-1 h-px bg-muted", className)}
    {...props}
  />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

interface SelectOptionProps
  extends SelectPrimitive.SelectProps,
    VariantProps<typeof selectVariants> {
  currentItem?: Item | null;
  list: Item[];
  placeholder?: string;
  className?: string;
  width?: Width;
  onChange?: (item: Item, name?: string) => void;
}

interface CustomSelectValueProps extends SelectPrimitive.SelectValueProps {}

const CustomSelectValue: FC<CustomSelectValueProps> = ({ placeholder, defaultValue, children }) => {
  const renderValue = () => {
    if (children) {
      return children;
    }

    if (defaultValue) {
      return defaultValue;
    }

    return placeholder;
  };
  return <span className="!block text-ellipsis pointer-events-none">{renderValue()}</span>;
};

const SelectBox: FC<SelectOptionProps> = ({
  currentItem,
  list,
  placeholder = "선택해주세요",
  className,
  width,
  name,
  size,
  onChange,
  onValueChange,
  ...props
}) => {
  const handleChange = (value: string) => {
    onValueChange?.(value);
    const targetItem = list.find(item => item.value.toString() === value);
    if (targetItem) {
      onChange?.(targetItem, name);
    }
  };

  return (
    <Select
      value={currentItem?.value.toString()}
      onValueChange={handleChange}
      name={name}
      {...props}
    >
      <SelectTrigger className={cn("text-ellipsis", className)} width={width} size={size}>
        <CustomSelectValue placeholder={placeholder} defaultValue={currentItem?.value.toString()}>
          {currentItem?.label}
        </CustomSelectValue>
      </SelectTrigger>
      {list.length > 0 && (
        <SelectContent width={width}>
          {list.map(item => (
            <SelectItem
              key={item.value.toString()}
              value={item.value.toString()}
              className="hover:cursor-pointer"
              defaultChecked={currentItem?.value === item.value}
              data-state={currentItem?.value === item.value ? "checked" : "unchecked"}
            >
              {item.label}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
};

export default SelectBox;
