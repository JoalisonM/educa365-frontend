import { ComponentProps } from "react";
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
      ghost: "rounded-md p-1 text-zinc-500 hover:bg-zinc-50 shadow-none",
      danger:
        "rounded-full border-4 border-transparent p-1 text-zinc-500 hover:border-error-100 hover:bg-error-200 hover:text-error-600 shadow-none",
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = ComponentProps<"button"> & VariantProps<typeof button>;

export const Button = ({ variant, className, ...props }: ButtonProps) => {
  return <button className={button({ variant, className })} {...props} />;
};
