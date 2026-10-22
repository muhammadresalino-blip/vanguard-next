# Vanguard Marketing — Landing Page

Landing page SaaS marketing platform. Next.js 16 (App Router) + TypeScript + Tailwind CSS 4 + Framer Motion + Lucide icons.

## Menjalankan

```bash
pnpm install
pnpm dev        # development -> http://localhost:3000
pnpm build      # build produksi
pnpm start      # jalankan build produksi
```

## Struktur

```
src/
  app/
    layout.tsx        # root layout: font (Plus Jakarta Sans + Inter), metadata
    page.tsx          # komposisi section halaman landing
    globals.css       # tema Tailwind + reset gerak (prefers-reduced-motion)
  components/
    logo.tsx          # logo SVG "V" geometris (ikon saja + horizontal)
    navbar.tsx        # navigasi sticky, responsif, menu mobile
    hero.tsx          # headline + CTA + preview dashboard
    dashboard-preview.tsx  # preview dashboard dari komponen UI asli (KPI, donut, sparkline)
    features.tsx      # 5 kartu fitur + kartu CTA
    product.tsx       # kartu manfaat + ilustrasi UI nyata (bar, line chart, counter)
    pipeline.tsx      # kanban New -> Won
    cta.tsx           # form waitlist (validasi email, konfirmasi lokal)
    footer.tsx        # navigasi + info produk
    reveal.tsx        # animasi fade+slide saat masuk viewport (hormati reduced motion)
  lib/
    data.ts           # data contoh yang konsisten untuk semua section
```

## Catatan

- Warna: `#3B82F6` (primary), `#6366F1` (secondary), `#10B981` (accent), `#0F172A` (navy) — memakai token default Tailwind (`blue-500`, `indigo-500`, `emerald-500`, `slate-900`).
- Semua chart SVG digambar sendiri (tanpa library chart) agar ringan.
- Form waitlist masih front-end saja; sambungkan ke API dengan mengganti blok `handleSubmit` di `src/components/cta.tsx`.
