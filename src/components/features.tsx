import { FEATURES } from '@/lib/data'
import { Reveal } from './reveal'
import { Globe, Users, Target, Zap, BarChart3 } from 'lucide-react'

const ICONS = { Globe, Users, Target, Zap, BarChart3 }

export function Features() {
  return (
    <section id="features" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
            Features
          </p>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Everything your marketing team needs
          </h2>
          <p className="mt-4 text-lg text-slate-500">
            Five connected modules, built for growing teams that want one clear workflow.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = ICONS[feature.icon]
            return (
              <Reveal key={feature.title} delay={i * 0.06}>
                <div className="group h-full rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10">
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition-colors duration-200 group-hover:bg-blue-500 group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">{feature.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {feature.description}
                  </p>
                </div>
              </Reveal>
            )
          })}

          {/* CTA card keeps the grid balanced on 3-col layouts */}
          <Reveal delay={FEATURES.length * 0.06}>
            <div className="flex h-full flex-col justify-between rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-6 text-white">
              <div>
                <h3 className="text-lg font-bold">Ready to see it live?</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">
                  Start free and connect your first campaign in minutes.
                </p>
              </div>
              <a
                href="#cta"
                className="mt-6 inline-flex w-fit items-center gap-1.5 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-blue-600 transition-colors duration-200 hover:bg-blue-50"
              >
                Get Started
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
