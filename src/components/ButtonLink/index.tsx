import { Link, LinkProps } from "react-router-dom";
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
    },
  },

  defaultVariants: {
    variant: "primary",
  },
});

type ButtonLinkProps = LinkProps & VariantProps<typeof button>;

export const ButtonLink = ({
  variant,
  className,
  ...props
}: ButtonLinkProps) => {
  return <Link className={button({ variant, className })} {...props} />;
};
