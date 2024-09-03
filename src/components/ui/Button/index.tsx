import { forwardRef, ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/styles";
import { Loader2 } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-main-black text-snow-white hover:bg-primary/80",
        primary: "bg-primary text-primary-foreground hover:bg-primary/80",
        bsgNavy: "bg-bsg-navy text-snow-white hover:bg-bsg-navy/80",
        outline: "border bg-background hover:bg-muted hover:text-main-black",
        muted: "bg-muted text-main-black hover:bg-muted/60",
        info: "bg-info text-info-foreground hover:bg-info/80",
        warning: "bg-warning text-warning-foreground hover:bg-warning/80",
        success: "bg-success text-success-foreground hover:bg-success/80",
        error: "bg-error text-error-foreground hover:bg-error/80",
        text: "hover:bg-muted hover:text-main-black",
        link: "text-main-black underline-offset-4 hover:underline",
        ghost: "hover:font-semibold",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        xs: "h-7 rounded-md px-3 text-xs",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        "icon-sm": "h-8 w-8",
        "icon-xs": "h-6 w-6",
        auto: "rounded-md px-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface Props
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, Props>(
  ({ className, variant, size, loading = false, children, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading}
        {...props}
      >
        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children && children}
      </button>
    );
  },
);
Button.displayName = "Button";

export default Button;
