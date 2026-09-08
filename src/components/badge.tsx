import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../lib/cn.ts";

/** Pílula de estado. `tone` semântico; `dot` mostra o pontinho de status. */
export const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border border-transparent px-2.5 py-1 text-xs font-semibold leading-tight",
  {
    variants: {
      tone: {
        brand: "bg-brand-tint text-brand",
        success: "bg-success-tint text-success",
        neutral: "bg-canvas2 text-ink2",
        warn: "bg-warn-tint text-warn",
        danger: "bg-danger-tint text-danger",
        info: "bg-info-tint text-info",
      },
    },
    defaultVariants: { tone: "neutral" },
  },
);

export type BadgeProps = React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { dot?: boolean };

export function Badge({ className, tone, dot, children, ...props }: BadgeProps) {
  return (
    <span data-slot="badge" className={cn(badgeVariants({ tone }), className)} {...props}>
      {dot && <span className="size-1.5 rounded-full bg-current" />}
      {children}
    </span>
  );
}
