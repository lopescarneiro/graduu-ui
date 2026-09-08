import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

/**
 * Botão da suíte. Base UI por baixo (acessível; aceita `render` para virar link:
 *   <Button render={<Link href="…" />} nativeButton={false}>…</Button>
 * API enxuta por fora: `variant` + `size`.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[var(--r)] font-sans font-semibold outline-none transition-[filter,background-color,color,transform,box-shadow] duration-150 focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] active:translate-y-px disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "bg-brand text-on-brand shadow-[var(--sh-sm)] hover:brightness-110",
        secondary: "border border-line2 bg-card text-ink hover:bg-canvas2",
        ghost: "bg-transparent text-ink2 hover:bg-canvas2 hover:text-ink",
        danger: "bg-danger text-white hover:brightness-110",
        gradient: "bg-[image:var(--grad)] text-white shadow-[var(--sh-md)] hover:brightness-105",
      },
      size: {
        sm: "h-8 rounded-[var(--r-sm)] px-3 text-[13px]",
        md: "h-10 px-[18px] text-sm",
        lg: "h-[46px] px-[22px] text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export type ButtonProps = React.ComponentProps<typeof ButtonPrimitive> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
