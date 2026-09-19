"use client";

import * as React from "react";
import { cn } from "../lib/cn";

/* Kit de componentes MODERNOS da suíte, todos em cima dos tokens do tema (@graduu/ui/theme.css):
   Section, Tabs, Toggle, Sparkline, StatCard, Select, EmptyState, Kbd, TableShell, Avatar, Progress.
   Dependem só de `cn` + tokens — funcionam em qualquer app que importe o theme.css do pacote. */

/* ---- Seção com cabeçalho + ações ---- */
export function Section({
  title,
  desc,
  actions,
  children,
  className,
}: {
  title?: string;
  desc?: string;
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={cn("flex flex-col gap-4", className)}>
      {(title || actions) && (
        <div className="flex items-end justify-between gap-3">
          <div className="flex flex-col gap-0.5">
            {title && <h2 className="text-lg font-bold tracking-tight text-ink">{title}</h2>}
            {desc && <p className="text-sm text-muted">{desc}</p>}
          </div>
          {actions}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---- Abas (controladas por estado próprio) ---- */
export function Tabs({
  items,
  value,
  onChange,
}: {
  items: { id: string; label: string; count?: number }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="inline-flex gap-1 rounded-[var(--r)] bg-canvas2 p-1" role="tablist">
      {items.map((t) => {
        const on = t.id === value;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-[calc(var(--r)-4px)] px-3.5 py-1.5 text-sm font-semibold transition",
              on ? "bg-card text-ink shadow-[var(--sh-sm)]" : "text-ink2 hover:text-ink",
            )}
          >
            {t.label}
            {t.count != null && (
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-bold tabular-nums",
                  on ? "bg-brand-tint text-brand" : "bg-ink/10 text-ink2",
                )}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/* ---- Toggle (switch acessível) ---- */
export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label?: string;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative h-6 w-11 shrink-0 rounded-full transition",
        checked ? "bg-brand" : "bg-line2",
      )}
    >
      <span
        className={cn(
          "absolute top-0.5 left-0.5 size-5 rounded-full bg-white shadow-[var(--sh-sm)] transition",
          checked && "translate-x-5",
        )}
      />
    </button>
  );
}

/* ---- Sparkline (SVG minúsculo) ---- */
export function Sparkline({
  points,
  trend = "up",
  className,
}: {
  points: number[];
  trend?: "up" | "down";
  className?: string;
}) {
  const w = 96;
  const h = 30;
  const max = Math.max(...points);
  const min = Math.min(...points);
  const span = max - min || 1;
  const step = w / (points.length - 1);
  const d = points
    .map((p, i) => `${i === 0 ? "M" : "L"}${(i * step).toFixed(1)},${(h - ((p - min) / span) * h).toFixed(1)}`)
    .join(" ");
  const stroke = trend === "down" ? "var(--danger)" : "var(--success)";
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={cn("h-8 w-24", className)} fill="none" aria-hidden>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={stroke} opacity="0.10" />
      <path d={d} stroke={stroke} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={w} cy={(h - ((points[points.length - 1] - min) / span) * h).toFixed(1)} r="2.5" fill={stroke} />
    </svg>
  );
}

/* ---- KPI card ---- */
export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  spark,
  hint,
}: {
  label: string;
  value: string;
  delta?: string;
  trend?: "up" | "down";
  spark?: number[];
  /** Subtítulo neutro (sem seta/cor de tendência) — ex.: "70% dos leads viraram matrícula". */
  hint?: string;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-[var(--r-lg)] border border-line bg-card p-5 shadow-[var(--sh-sm)]">
      <p className="text-xs font-semibold text-muted">{label}</p>
      <div className="flex items-end justify-between gap-2">
        <p className="text-3xl font-extrabold tracking-tight tabular-nums text-ink">{value}</p>
        {spark && <Sparkline points={spark} trend={trend} />}
      </div>
      {delta && (
        <p className={cn("text-xs font-bold", trend === "down" ? "text-danger" : "text-success")}>
          {trend === "down" ? "▼" : "▲"} {delta}
        </p>
      )}
      {hint && <p className="text-xs text-muted">{hint}</p>}
    </div>
  );
}

/* ---- Select estilizado (nativo) ---- */
export function Select({
  value,
  onChange,
  children,
  className,
  "aria-label": ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
  className?: string;
  "aria-label"?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        aria-label={ariaLabel}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full appearance-none rounded-[var(--r)] border border-line2 bg-bg px-3.5 pr-9 text-sm font-medium text-ink outline-none transition focus:border-brand focus:ring-[3px] focus:ring-brand-tint"
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
        width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}

/* ---- Estado vazio ---- */
export function EmptyState({
  title,
  desc,
  action,
}: {
  title: string;
  desc?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-2 rounded-[var(--r-lg)] border border-dashed border-line2 bg-card/50 px-6 py-12 text-center">
      <p className="font-semibold text-ink">{title}</p>
      {desc && <p className="max-w-sm text-sm text-muted">{desc}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/* ---- Atalho de teclado ---- */
export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded-md border border-line2 bg-canvas2 px-1.5 py-0.5 font-mono text-[11px] font-semibold text-ink2">
      {children}
    </kbd>
  );
}

/* ---- Tabela (shell com scroll + classes de célula) ---- */
export const thClass =
  "px-4 py-3 text-left text-[11px] font-bold uppercase tracking-[0.08em] text-muted border-b border-line whitespace-nowrap";
export const tdClass = "px-4 py-3 text-sm text-ink2 border-b border-line";

export function TableShell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("overflow-x-auto rounded-[var(--r-lg)] border border-line bg-card", className)}>
      <table className="w-full border-collapse">{children}</table>
    </div>
  );
}

/* ---- Avatar de iniciais ---- */
export function Avatar({ nome, className }: { nome: string; className?: string }) {
  const ini = nome
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className={cn(
        "inline-grid size-8 place-items-center rounded-full text-[11px] font-bold text-white",
        className,
      )}
      style={{ backgroundImage: "var(--grad)" }}
    >
      {ini}
    </span>
  );
}

/* ---- Barra de progresso ---- */
export function Progress({ value }: { value: number }) {
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-canvas2">
      <div className="h-full rounded-full bg-brand transition-[width]" style={{ width: `${value}%` }} />
    </div>
  );
}
