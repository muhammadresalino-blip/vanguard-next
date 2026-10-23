import type { PublicStats } from '@/lib/api'
import { TrendingUp, TrendingDown, Timer } from 'lucide-react'

/**
 * Kartu manfaat dengan ilustrasi dashboard dari komponen UI asli.
 * Mode live: angka dari API (tren lead, respons harian, SLA).
 * Fallback (API mati): data contoh dengan widget yang sama bentuknya.
 */

const SAMPLE_BARS = [40, 65, 52, 78, 60, 92, 70, 84, 58, 96]
const SAMPLE_A = [30, 45, 38, 55, 42, 60, 48]
const SAMPLE_B = [20, 28, 52, 34, 46, 38, 55]

export function Product({ stats }: { stats: PublicStats | null }) {
  return (
    <section id="product" className="bg-slate-50 py-20 sm:py-28 reveal-item">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal-item">
          <p className="text-sm font-semibold uppercase tracking-wider text-indigo-600">
            Why Vanguard
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Results your team can see every day
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            {stats ? 'Live numbers from your workflow — not vanity metrics.' : 'Clear metrics from the workflow — not vanity metrics.'}
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {stats ? (
            <>
              <div className="card reveal-item">
                <LeadsWeekCard stats={stats} />
              </div>
              <div className="card reveal-item" style={{ transitionDelay: '80ms' }}>
                <ResponseCard stats={stats} />
              </div>
              <div className="card reveal-item" style={{ transitionDelay: '160ms' }}>
                <SlaCard stats={stats} />
              </div>
            </>
          ) : (
            <>
              <div className="card reveal-item">
                <SampleBarsCard />
              </div>
              <div className="card reveal-item" style={{ transitionDelay: '80ms' }}>
                <SampleLineCard />
              </div>
              <div className="card reveal-item" style={{ transitionDelay: '160ms' }}>
                <SampleCounterCard />
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}

/* ============================ LIVE WIDGETS ============================ */

function LeadsWeekCard({ stats }: { stats: PublicStats }) {
  const max = Math.max(...stats.leadsTrend.map((d) => d.count), 1)
  const up = (stats.trendDeltaPct ?? 0) >= 0

  return (
    <article className="card">
      <p className="text-sm font-medium text-slate-500">Leads This Week</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">{stats.trendTotal}</span>
        {stats.trendDeltaPct != null && (
          <span
            className={`flex items-center gap-0.5 text-xs font-semibold ${up ? 'text-emerald-600' : 'text-rose-500'}`}
          >
            {up ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {up ? '+' : ''}
            {stats.trendDeltaPct}%
          </span>
        )}
        <span className="text-xs text-slate-400">vs minggu lalu</span>
      </p>

      <div className="mt-5 flex h-24 items-end gap-1.5" aria-hidden="true">
        {stats.leadsTrend.map((d, i) => (
          <div key={d.date} className="flex flex-1 flex-col items-center gap-1">
            <div
              className={`w-full rounded-t-sm ${i === stats.leadsTrend.length - 1 ? 'bg-indigo-500' : 'bg-blue-400/70'}`}
              style={{ height: `${Math.max((d.count / max) * 88, d.count > 0 ? 8 : 3)}%` }}
            />
          </div>
        ))}
      </div>
      <div className="mt-2 flex gap-1.5" aria-hidden="true">
        {stats.leadsTrend.map((d) => (
          <span key={d.date} className="flex-1 text-center text-[9px] text-slate-400">
            {d.date.slice(8)}
          </span>
        ))}
      </div>
    </article>
  )
}

function ResponseCard({ stats }: { stats: PublicStats }) {
  const points = stats.responseTrend
    .map((d, i) => ({ ...d, i, avg: d.avg }))
    .filter((d): d is { date: string; i: number; avg: number } => d.avg != null)
  const max = Math.max(...points.map((p) => p.avg), 1)
  const w = 240
  const h = 90
  const step = (w - 20) / 6

  return (
    <article className="card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Avg. Response</p>
        <span className="flex items-center gap-1 text-[10px] font-medium text-slate-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" /> menit
        </span>
      </div>
      <p className="mt-1 text-3xl font-extrabold text-slate-900">
        {stats.avgResponseMinutes != null ? stats.avgResponseMinutes : '—'}
        <span className="ml-1 text-sm font-semibold text-slate-400">min</span>
      </p>

      <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 h-24 w-full" aria-hidden="true">
        {points.length >= 2 ? (
          <polyline
            points={points
              .map((p) => `${10 + p.i * step},${h - 8 - (p.avg / max) * (h - 20)}`)
              .join(' ')}
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <line
            x1="10"
            y1={h / 2}
            x2={w - 10}
            y2={h / 2}
            stroke="#CBD5E1"
            strokeWidth="2"
            strokeDasharray="5 5"
          />
        )}
        {points.map((p) => (
          <circle
            key={p.date}
            cx={10 + p.i * step}
            cy={h - 8 - (p.avg / max) * (h - 20)}
            r="3.5"
            fill="#3B82F6"
          />
        ))}
      </svg>
      <p className="mt-1 text-xs text-slate-400">
        Target: di bawah {stats.sla.targetMinutes} menit
      </p>
    </article>
  )
}

function SlaCard({ stats }: { stats: PublicStats }) {
  const pct = stats.sla.withinTargetPct ?? 0

  return (
    <article className="card overflow-hidden">
      <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500">
        <Timer className="h-4 w-4 text-slate-400" aria-hidden="true" />
        Response SLA
      </p>

      <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex items-center justify-center gap-1.5" aria-hidden="true">
          {String(pct)
            .padStart(2, '0')
            .split('')
            .map((digit, i) => (
              <span
                key={i}
                className="rounded-md bg-white/15 px-3 py-1.5 font-mono text-2xl font-bold"
              >
                {digit}
              </span>
            ))}
          <span className="text-lg font-bold text-white/70">%</span>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/20" aria-hidden="true">
          <div className="h-full rounded-full bg-white transition-all duration-500" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-2 text-center text-[10px] font-medium uppercase tracking-wider text-white/70">
          within {stats.sla.targetMinutes} min
        </p>
      </div>

      <p className="mt-4 text-sm font-semibold text-slate-900">
        {stats.sla.withinTargetPct != null ? stats.sla.withinTargetPct : '—'}% dari{' '}
        {stats.sla.respondedCount} lead terjawab tepat waktu
      </p>
    </article>
  )
}

/* ========================== SAMPLE FALLBACK ========================== */

function SampleBarsCard() {
  return (
    <article className="card">
      <p className="text-sm font-medium text-slate-500">Leads Assigned</p>
      <p className="mt-1 flex items-baseline gap-2">
        <span className="text-3xl font-extrabold text-slate-900">506</span>
        <span className="text-xs font-semibold text-emerald-600">+24%</span>
        <span className="text-xs text-slate-400">VS Last Week</span>
      </p>
      <div className="mt-5 flex h-24 items-end gap-1.5" aria-hidden="true">
        {SAMPLE_BARS.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-t-sm ${i === SAMPLE_BARS.length - 1 ? 'bg-indigo-500' : 'bg-blue-400/70'}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    </article>
  )
}

function SampleLineCard() {
  return (
    <article className="card">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500">Messages Sent</p>
        <div className="flex items-center gap-3 text-[10px] font-medium text-slate-400">
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-blue-500" /> Vanguard AI
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2 w-2 rounded-full bg-emerald-500" /> Team
          </span>
        </div>
      </div>
      <LineChart a={SAMPLE_A} b={SAMPLE_B} className="mt-5 h-24 w-full" />
      <p className="mt-3 text-xs text-slate-400">7 hari terakhir</p>
    </article>
  )
}

function SampleCounterCard() {
  return (
    <article className="card overflow-hidden">
      <p className="text-sm font-medium text-slate-500">Work Days Saved</p>
      <div className="mt-4 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 p-4 text-white">
        <div className="flex justify-center gap-2" aria-hidden="true">
          {['03', '47', '51', '09'].map((pair) => (
            <span
              key={pair}
              className="rounded-md bg-white/15 px-2.5 py-1.5 font-mono text-lg font-bold tracking-widest"
            >
              {pair}
            </span>
          ))}
        </div>
        <div className="mt-3 flex justify-between text-[9px] font-medium uppercase tracking-wider text-white/60">
          <span>Days</span>
          <span>Hours</span>
          <span>Minutes</span>
          <span>Seconds</span>
        </div>
      </div>
      <p className="mt-4 text-sm font-semibold text-slate-900">Last before due!</p>
      <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-slate-100" aria-hidden="true">
        <div className="h-full w-[82%] rounded-full bg-blue-500" />
      </div>
    </article>
  )
}

function LineChart({
  a,
  b,
  className,
}: {
  a: readonly number[]
  b: readonly number[]
  className?: string
}) {
  const w = 240
  const h = 90
  const max = Math.max(...a, ...b)
  const toPath = (series: readonly number[]) => {
    const step = w / (series.length - 1)
    return series
      .map((v, i) => `${i === 0 ? 'M' : 'L'}${(i * step).toFixed(1)},${(h - (v / max) * (h - 10)).toFixed(1)}`)
      .join(' ')
  }

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} preserveAspectRatio="none" aria-hidden="true">
      <path d={toPath(a)} fill="none" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
      <path d={toPath(b)} fill="none" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}