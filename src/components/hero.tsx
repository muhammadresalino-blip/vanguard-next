import { DashboardPreview } from './dashboard-preview'
import type { PublicStats } from '@/lib/api'
import { ArrowRight, PlayCircle } from 'lucide-react'

export function Hero({ stats }: { stats: PublicStats | null }) {
  return (
    <section id="top" className="relative overflow-hidden bg-white reveal-item">
      {/* Latar lembut: blob gradien samar, bukan gambar */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 20% 0%, rgba(59,130,246,0.10), transparent 70%), radial-gradient(50% 40% at 90% 10%, rgba(99,102,241,0.08), transparent 70%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-24 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="reveal-item">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" aria-hidden="true" />
              New: AI-powered campaign insights
            </p>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.1] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Grow Your Business with{' '}
              <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Smarter Marketing
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-500">
              Capture every lead, close deals faster, and see exactly which campaigns drive
              revenue — all in one clean, connected workspace.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#cta"
                className="btn-primary btn-lg"
              >
                Get Started Free
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                href="#product"
                className="btn-outline btn-lg"
              >
                <PlayCircle className="h-5 w-5 text-blue-500" aria-hidden="true" />
                See how it works
              </a>
            </div>

            <p className="mt-6 text-xs text-slate-400">
              Free 14-day trial · No credit card required
            </p>
          </div>

          <div className="reveal-item">
            <DashboardPreview stats={stats} />
          </div>
        </div>
      </div>
    </section>
  )
}