import * as React from "react";
import { cn } from "../lib/cn.ts";

/** Classes do input, reaproveitáveis em <textarea>/<select> ou inputs com ícone. */
export const inputClasses =
  "h-10 w-full rounded-[var(--r)] border border-line2 bg-bg px-[13px] font-sans text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand focus:bg-card focus:ring-[3px] focus:ring-brand-tint aria-[invalid]:border-danger aria-[invalid]:ring-[3px] aria-[invalid]:ring-danger-tint";

/** Input de texto. Passe `invalid` para o estado de erro (aria-invalid + estilo). */
export type InputProps = React.ComponentProps<"input"> & { invalid?: boolean };

export function Input({ className, invalid, ...props }: InputProps) {
  return (
    <input
      data-slot="input"
      aria-invalid={invalid || undefined}
      className={cn(inputClasses, className)}
      {...props}
    />
  );
}

/** Rótulo + campo + dica/erro empilhados. Passe `error` para pintar a dica de vermelho. */
export type FieldProps = {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: string;
  htmlFor?: string;
  className?: string;
  children: React.ReactNode;
};

export function Field({ label, hint, error, htmlFor, className, children }: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <label htmlFor={htmlFor} className="text-[12.5px] font-semibold text-ink2">
          {label}
        </label>
      )}
      {children}
      {(error || hint) && (
        <span className={cn("text-[11.5px]", error ? "text-danger" : "text-muted")}>
          {error || hint}
        </span>
      )}
    </div>
  );
}
