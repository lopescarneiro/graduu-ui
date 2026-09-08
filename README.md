# @graduu/ui

Design system unificado da suíte Graduu — **uma marca, seis produtos**.
Tokens (cor/forma/tipografia), tema claro/escuro e componentes acessíveis
(Base UI + Tailwind v4). A cor da marca é **um token** (`--brand`): trocar a
marca inteira é trocar um valor.

> Proposta visual aprovada: roxo de ação, navy de estrutura, assinatura
> roxo→magenta; verde reservado só para o estado de sucesso.

## Stack

- **Tailwind v4** (CSS-first, `@theme inline`) — já é padrão nos 6 apps
- **Base UI** (`@base-ui/react`) — primitivos acessíveis (prop `render`, não `asChild`)
- **cva + tailwind-merge + clsx** — variantes e merge de classes
- **Montserrat** — a fonte da suíte (via `--font-montserrat`)

O pacote é consumido como **fonte** (ships `.tsx`), sem passo de build próprio:
o app o transpila. Combina com Next 16 + Turbopack via `transpilePackages`.

## Como um app consome

1. Instalar (ver "Distribuição" abaixo — registro ainda a definir):
   ```bash
   npm i @graduu/ui
   ```
2. `next.config.ts` — transpilar o pacote:
   ```ts
   const nextConfig = { transpilePackages: ["@graduu/ui"] };
   ```
3. `src/app/globals.css` — logo após o Tailwind, importar o tema e garantir o scan:
   ```css
   @import "tailwindcss";
   @import "@graduu/ui/theme.css";
   @source "../../node_modules/@graduu/ui";
   ```
   (Remover o bloco de tokens local do app — o tema passa a vir do pacote.)
4. Usar:
   ```tsx
   import { Button, Badge, Card, Field, Input } from "@graduu/ui";

   <Button>Salvar</Button>
   <Button variant="secondary">Cancelar</Button>
   <Button variant="gradient">Contratar</Button>
   <Button render={<Link href="/x" />} nativeButton={false}>Ir</Button>

   <Badge tone="success" dot>Ativo</Badge>
   <Field label="CNPJ" error="Incompleto"><Input invalid /></Field>
   ```

Dark mode: os apps já usam next-themes (classe `.dark`). O tema responde sozinho.

## Componentes

| Já no pacote | Próximos (roadmap) |
|---|---|
| Button, Badge, Card, Field, Input | Select, Checkbox, Switch, Tabs, Dialog, Tooltip, Table, Toast, Skeleton, Avatar |

Depois, as composições da suíte (AppHeader, PageHeader, Tile/launcher, StatCard, Sidebar).

## Distribuição (a definir com o Paulo)

O pacote está pronto como código; falta escolher **como os apps o instalam**, já que
os 6 repos são separados e o build roda na Vercel:

- **npm público** (`@graduu/ui`) — precisa criar a org `graduu` no npm. Mais simples na Vercel (sem token).
- **GitHub Packages privado** (`@lopescarneiro/graduu-ui`) — privado; exige `.npmrc` + token no Vercel.
- **Dependência git** — sem publicar; a Vercel resolve via token de repositório.

Ver o plano de adoção (piloto no Hub → apps Base UI → Atende/Site).

## Tokens (resumo)

`--brand` `--brand-soft` `--brand-tint` `--on-brand` · `--navy` `--magenta` ·
`--success(-tint)` `--warn(-tint)` `--danger(-tint)` `--info(-tint)` ·
superfícies `--bg` `--canvas2` `--card` `--elev` · texto `--ink` `--ink2` `--muted` ·
`--line` `--line2` · forma `--r-sm/-r/-lg/-card/-pill`, `--sh-sm/md/lg`, `--grad`.
