# HydroGel Maroc — Project Context

## What This Is
Low-budget hydrogel distribution project for the **Rhamna region, Morocco**. Solo founder: **Amine Essahfi**, software engineer. Goal: entry point (trampoline) into hydrogel distribution, land farming, and eventually selling improved farmland.

## Stack
- Vite + React 19 + TypeScript + Tailwind CSS v4 + shadcn/ui + React Router
- SQLite tracking database (land listings, suppliers, funding programs)
- Playwright MCP for browser automation (scraping listings)
- DeepSeek V4 Pro via Anthropic-compatible API

## Key Files
| File | Purpose |
|------|---------|
| `BUSINESS_PLAN.md` | 14-section business plan (template — needs real numbers) |
| `PRICE_LAND_TRACKING.md` | Land prices, hydrogel suppliers, funding sources |
| `data/hydrogel.db` | SQLite tracking database — 4 tables, seeded with verified data |
| `scripts/db-query.mjs` | Query lands, suppliers, funding, FDA calculator |
| `scripts/db-add.mjs` | Add listings, update prices, change statuses |

## Funding Targets (Morocco-Only)
| Program | Type | Max | Status |
|---------|------|-----|--------|
| FDA — Irrigation Localisee | Subsidy | 23,000 DH/ha (80-100%) | Researching |
| FDA — Pompage Solaire | Subsidy | 30% of cost | Researching |
| Intilaka Al Qarawi | Loan | 1.2M MAD @ 1.75% | Researching |
| INDH Programme 3 | Grant | 80-300K MAD | Researching |

## Current Budget: 30-50K MAD
Best play at this budget: Lease 1-3 ha + FDA irrigation subsidy + hydrogel pilot.

## Key Decisions Made
- Focus on distribution/repackaging first, not manufacturing
- Lease land, don't buy (preserves runway)
- Bundle hydrogel inside FDA irrigation project (hydrogel alone not subsidized)
- Build farmer network through demo plots, not cold selling

## Next Actions
1. Find land to lease (Avito, Facebook, souk, personal contacts)
2. Order hydrogel sample (5 kg from Alibaba or Alquera Spain)
3. Visit INDH Benguerir for dossier requirements
4. Visit DPA Rhamna for FDA irrigation application
