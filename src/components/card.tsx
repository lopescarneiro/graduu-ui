import * as React from "react";
import { cn } from "../lib/cn";

/** Superfície elevada. A borda/sombra dizem "objeto separado" — use por papel. */
export function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "rounded-[var(--r-card)] border border-line bg-card shadow-[var(--sh-sm)]",
        className,
      )}
      {...props}
    />
  );
}
