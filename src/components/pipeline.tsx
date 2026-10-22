import { Reveal } from './reveal'
import { PIPELINE_STAGES } from '@/lib/data'
import type { PublicStats } from '@/lib/api'
import { formatRupiah } from './dashboard-preview'
import { ArrowRight } from 'lucide-react'

const STAGE_META: Record<string, { label: string; color: string }> = {
  new: { label: 'New', color: 'bg-blue-500' },
  contacted: { label: 'Contacted', color: 'bg-indigo-500' },
  qualified: { label: 'Qualified', color: 'bg-violet-500' },
  proposal: { label: 'Proposal', color: 'bg-amber-500' },
  won: { label: 'Won', color: 'bg-emerald-500' },
}

/**
 * Perjalanan prospek New -> Won. Ambil hitungan lead + nilai deal dari API;
 * kalau API tidak tersedia, tampilkan kartu contoh.
 */
export function Pipeline({ stats }: { stats: PublicStats | null }) {
  const stages = stats
    ? stats.leadsByStatus.map(({ stage, count }) => {
        const deals = stats.dealValueByStage[stage]
        const meta = STAGE_META[stage]
        return {
          name: meta.label,
          color: meta.color,
          value: count,
          detail: deals
            ? `${deals.count} deals · ${formatRupiah(deals.value)}`
            : 'menunggu deal',
          deals: null,
        }
      })
    : PIPELINE_STAGES.map((s) => ({
        name: s.name,
        color: s.color,
        value: s.value,
        detail: null,
        deals: s.deals,
      }))

  return (
    <section id="pipeline" className="bg-slate-900 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-400">
            Sales Pipeline
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            From first click to closed deal
          </h2>
          <p className="mt-4 text-lg text-slate-400">
            Every lead moves through clear stages, so your team always knows what to do next.
          </p>
          {stats && (
            <p className="mt-2 text-xs text-slate-500">
              Live data · updated {new Date(stats.updatedAt).toLocaleString('id-ID')}
            </p>
          )}
        </Reveal>

        <div className="mt-14 -mx-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:px-0">
          <div className="flex min-w-max gap-4">
            {stages.map((stage, i) => (
              <Reveal key={stage.name} delay={i * 0.07} className="w-64 shrink-0">
                <div className="h-full rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${stage.color}`} />
                      <h3 className="text-sm font-semibold text-white">{stage.name}</h3>
                    </div>
                    <span className="text-xs font-medium text-slate-400">{stage.value}</span>
                  </div>

                  {stage.deals ? (
                    <ul className="mt-4 space-y-3">
                      {stage.deals.map((deal) => (
                        <li
                          key={deal.name}
                          className="rounded-xl bg-slate-800/80 p-3 transition-colors duration-200 hover:bg-slate-800"
                        >
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-white">{deal.name}</p>
                            <p className="text-xs font-semibold text-emerald-400">{deal.amount}</p>
                          </div>
                          <span className="mt-2 inline-flex rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                            {deal.tag}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div className="mt-4 rounded-xl bg-slate-800/80 p-3">
                      <p className="text-2xl font-extrabold text-white">{stage.value}</p>
                      <p className="mt-1 text-[11px] text-slate-400">leads</p>
                      <p className="mt-3 text-xs font-semibold text-emerald-400">{stage.detail}</p>
                    </div>
                  )}

                  {i < stages.length - 1 && (
                    <ArrowRight
                      className="mx-auto mt-4 h-4 w-4 text-slate-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
