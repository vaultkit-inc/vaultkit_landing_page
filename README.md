# vaultkit.io

The VaultKit landing page. Next.js (App Router), TypeScript and Tailwind CSS v4.
The page is prerendered to static HTML at build time; only the design partner
CTAs and dialog hydrate. Deployed on Vercel.

## Develop

```bash
npm install
cp .env.example .env.local   # then fill in the values you need
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run build` | Production build (prerenders `/`, the OG image and the Twitter image) |
| `npm run lint` | ESLint |
| `npm run typecheck` | `tsc --noEmit` |
| `npm test` | Vitest component and route tests |
| `npm run icons` | Regenerates the favicon and touch icon from `docs/redesign/logo/` |

## Where things live

- `content/` — all copy. Edit text here, not in components.
- `lib/config.ts` — external links from env. An unset link hides its CTA.
- `app/globals.css` — design tokens (colors, type scale, radii, spacing).
- `components/ui/` — primitives: Button, Container, Section, Card, Badge, CodeBlock, Logo, Field.
- `components/landing/` — page sections and the design partner dialog.
- `app/api/design-partner/route.ts` — validates and stores design partner leads.

## Design partner leads

Submissions go to the Agent Readiness Index Supabase project, table `ari_leads`,
with `source = 'design_partner'`. The route uses the service-role key on the
server only (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`). The table's schema
lives in `vaultkit-inc/aai-readiness` under `supabase/migrations/`.
