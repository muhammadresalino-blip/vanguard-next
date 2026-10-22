import { KPIS, TRAFFIC_SOURCES, TOP_CAMPAIGNS } from '@/lib/data'
import type { PublicStats } from '@/lib/api'
import {
  DollarSign,
  Users,
  Target,
  Sparkles,
  Percent,
  Clock,
  Wallet,
} from 'lucide-react'

const SAMPLE_ICONS = [DollarSign, Users, Target, Sparkles]
const REAL_ICONS = [Users, Percent, Clock, Wallet]
const TINTS = [
  'from-blue-50 to-blue-100/60',
  'from-indigo-50 to-indigo-100/60',
  'from-emerald-50 to-emerald-100/60',
  'from-violet-50 to-violet-100/60',
]
const DONUT_COLORS = ['#22D3EE', '#6366F1', '#10B981', '#FBBF24', '#94A3B8']

export function formatRupiah(n: number): string {
  if (n >= 1_000_000_000) return `Rp${(n / 1_000_000_000).toFixed(1)}B`
  if (n >= 1_000_000) return `Rp${Math.round(n / 1_000_000)}M`
  return `Rp${n.toLocaleString('id-ID')}`
}

/**
 * Preview dashboard dari komponen UI asli.
 * Ambil data live dari API bila tersedia; kalau tidak, pakai data contoh.
 * aria-hidden — dekoratif, bukan ringkasan konten.
 */
export function DashboardPreview({ stats }: { stats: PublicStats | null }) {
  const kpis = stats
    ? [
        { label: 'Total Leads', value: String(stats.totalLeads), delta: 'live' },
        { label: 'Conversion Rate', value: `${stats.conversionRate}%`, delta: 'qualified+' },
        {
          label: 'Avg. Response',
          value: stats.avgResponseMinutes != null ? `${stats.avgResponseMinutes}m` : '—',
          delta: 'first reply',
        },
        { label: 'Pipeline Value', value: formatRupiah(stats.pipelineValue), delta: 'open' },
      ]
    : KPIS
  const icons = stats ? REAL_ICONS : SAMPLE_ICONS

  const sources = stats
    ? stats.leadsBySource.map((s) => ({
        name: s.source,
        pct: Math.round((s.count / Math.max(stats.totalLeads, 1)) * 100),
        count: s.count,
      }))
    : TRAFFIC_SOURCES.map((s) => ({ name: s.name, pct: s.value, count: Number(s.visitors.replace(/,/g, '')) }))

  const campaigns = stats
    ? stats.topCampaigns.map((c, i) => ({
        name: c.name,
        metric: `${c.leads} leads`,
        badge: ['Best', 'Highest', 'Fastest', 'Most'][i] ?? '',
      }))
    : TOP_CAMPAIGNS

  return (
    <div
      aria-hidden="true"
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-900/10 sm:p-5"
    >
      {/* KPI row */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {kpis.map((kpi, i) => {
          const Icon = icons[i]
          return (
            <div key={kpi.label} className={`rounded-xl bg-gradient-to-br p-3 ${TINTS[i]}`}>
              <div className="flex items-center gap-1.5">
                <Icon className="h-3.5 w-3.5 text-slate-500" />
                <span className="truncate text-[11px] font-medium text-slate-600">{kpi.label}</span>
              </div>
              <p className="mt-1.5 text-lg font-extrabold text-slate-900">{kpi.value}</p>
              <p className="mt-0.5 truncate text-[10px] font-semibold text-emerald-600">
                {kpi.delta}
              </p>
            </div>
          )
        })}
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        {/* Traffic sources + donut */}
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-700">
            {stats ? 'Leads by Source' : 'Traffic Sources'}
          </p>
          <div className="mt-3 flex items-center gap-4">
            <Donut sources={sources} />
            <ul className="min-w-0 flex-1 space-y-1.5">
              {sources.map((s, i) => (
                <li key={s.name} className="flex items-center justify-between gap-2 text-[11px]">
                  <span className="flex min-w-0 items-center gap-1.5 text-slate-600">
                    <span
                      className={`h-2 w-2 shrink-0 rounded-full ${DONUT_COLORS[i % DONUT_COLORS.length]}`}
                    />
                    <span className="truncate">{s.name}</span>
                  </span>
                  <span className="font-semibold text-slate-900">{s.pct}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top campaigns */}
        <div className="rounded-xl border border-slate-100 p-4">
          <p className="text-xs font-semibold text-slate-700">Top Performing Campaigns</p>
          <ul className="mt-3 space-y-2.5">
            {campaigns.map((c, i) => (
              <li key={c.name} className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-[11px] font-semibold text-slate-800">{c.name}</p>
                  <p className="truncate text-[10px] text-slate-400">{c.metric}</p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white ${DONUT_COLORS[i % DONUT_COLORS.length]}`}
                >
                  {c.badge}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function Donut({ sources }: { sources: { pct: number }[] }) {
  const r = 26
  const c = 2 * Math.PI * r
  const total = Math.max(
    sources.reduce((sum, s) => sum + s.pct, 0),
    1,
  )
  let offset = 0

  return (
    <svg viewBox="0 0 64 64" className="h-20 w-20 shrink-0 -rotate-90">
      {sources.map((s, i) => {
        const dash = (s.pct / total) * c
        const el = (
          <circle
            key={i}
            cx="32"
            cy="32"
            r={r}
            fill="none"
            stroke={DONUT_COLORS[i % DONUT_COLORS.length]}
            strokeWidth="9"
            strokeDasharray={`${dash} ${c - dash}`}
            strokeDashoffset={offset}
          />
        )
        offset += dash
        return el
      })}
    </svg>
  )
}
