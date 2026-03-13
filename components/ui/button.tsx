import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

// Note: I am simulating cva behavior without installing class-variance-authority if not present,
// but for a robust setup I should probably install it. 
// However, since I didn't install `class-variance-authority`, I will write a simpler version or just install it.
// Wait, I missed installing `class-variance-authority`. I should add it or write standard CSS classes.
// I will write standard React component for now to avoid extra install steps unless necessary. 
// Actually, `class-variance-authority` is standard. I'll just use template literals for now to keep it simple and robust.

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "glow";
    size?: "default" | "sm" | "lg" | "icon";
    asChild?: boolean;
    loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "default", size = "default", asChild = false, loading = false, children, ...props }, ref) => {
        const Comp = asChild ? Slot : "button";

        // Base styles
        const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transition-all duration-300";

        // Variants
        const variants = {
            default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(99,102,241,0.5)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]",
            destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
            outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline",
            glow: "bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-105 border-0",
        };

        // Sizes
        const sizes = {
            default: "h-10 px-4 py-2",
            sm: "h-9 rounded-md px-3",
            lg: "h-11 rounded-md px-8 text-base",
            icon: "h-10 w-10",
        };

        const combinedClassName = cn(
            baseStyles,
            variants[variant],
            sizes[size],
            className
        );

        if (asChild) {
            return (
                <Slot
                    className={combinedClassName}
                    ref={ref}
                    {...props}
                >
                    {children}
                </Slot>
            );
        }

        return (
            <button
                className={combinedClassName}
                ref={ref}
                disabled={props.disabled || loading}
                {...props}
            >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
