import React from "react";
import { Slot } from "@radix-ui/react-slot";
import { tv, VariantProps } from "tailwind-variants";

const button = tv({
  base: [
    "rounded-lg px-6 py-2 font-bold outline-none shadow-sm disabled:bg-zinc-500 disabled:cursor-not-allowed",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-100",
    "active:opacity-80",
  ],

  variants: {
    variant: {
      primary:
        "bg-blueLagoon text-white hover:opacity-90 disabled:hover:opacity-100",
      outline: "border border-zinc-300 text-zinc-700 hover:bg-zinc-50",
      none: "p-0 transparent text-zinc-500 hover:text-error-600",
      ghost: "rounded-md p-1 font-normal text-zinc-500 hover:bg-zinc-50 shadow-none",
      icon: "flex items-center gap-1 bg-blueLagoon text-white hover:opacity-90 disabled:hover:opacity-100",
      danger:
        "rounded-md border-4 border-transparent p-1 text-zinc-500 hover:border-error-100 hover:bg-error-200 hover:text-error-600 shadow-none",
      iconDanger:
      [
        "flex items-center gap-1 border-4 border-transparent p-1 text-zinc-500 shadow-none",
        "hover:border-error-100 hover:bg-error-200 hover:text-error-600",
        "disabled:bg-transparent disabled:border-none disabled:text-zinc-500",
      ],
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

// type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant, className, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    return <Comp ref={ref} className={button({ variant, className })} {...props} />;
  },
);
