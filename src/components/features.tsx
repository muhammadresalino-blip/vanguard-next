import { FEATURES } from '@/lib/data'
import { Globe, Users, Target, Zap, BarChart3, ArrowRight } from 'lucide-react'

const ICONS = { Globe, Users, Target, Zap, BarChart3 }

export function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28 reveal-item">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center reveal-item">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything your marketing team needs
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Five connected modules, built for growing teams that want one clear workflow.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon]
            return (
              <div key={feature.title} className="card-pad group reveal-item" style={{ transitionDelay: `${i * 60}ms` }}>
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-500 group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {feature.description}
                </p>
              </div>
            )
          })}

          {/* CTA card keeps the grid balanced on 3-col layouts */}
          <div className="card-pad flex flex-col justify-between bg-gradient-to-br from-blue-500 to-indigo-600 text-white reveal-item" style={{ transitionDelay: `${FEATURES.length * 60}ms` }}>
            <div>
              <h3 className="text-lg font-bold">Ready to see it live?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/80">
                Start free and connect your first campaign in minutes.
              </p>
            </div>
            <a
              href="#cta"
              className="mt-6 inline-flex w-fit items-center gap-1.5 btn-dark"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}