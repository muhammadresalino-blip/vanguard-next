'use client'

import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

/**
 * CTA + waitlist form. Front-end only: validasi email, lalu konfirmasi lokal.
 * Saat backend tersedia, ganti blok submit dengan POST ke API (lihat README).
 */
export function CTA() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState<'idle' | 'error' | 'done'>('idle')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    setState(valid ? 'done' : 'error')
  }

  return (
    <section id="cta" className="bg-white py-20 sm:py-28 reveal-item">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl rounded-3xl bg-gradient-to-br from-blue-500 to-indigo-600 px-6 py-14 text-center sm:px-14 reveal-item">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Grow your business with smarter marketing
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-blue-100">
            Join the waitlist and be the first to launch your pipeline on Vanguard.
          </p>

          {state === 'done' ? (
            <p
              role="status"
              className="mx-auto mt-8 flex w-fit items-center gap-2 rounded-full bg-white/15 px-6 py-3 text-sm font-semibold text-white"
            >
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
              Thanks — you&apos;re on the list. We&apos;ll be in touch.
            </p>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex_row"
              noValidate
            >
              <label htmlFor="waitlist-email" className="sr-only">
                Email address
              </label>
              <input
                id="waitlist-email"
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (state === 'error') setState('idle')
                }}
                placeholder="you@company.com"
                aria-invalid={state === 'error'}
                className={`input ${state === 'error' ? 'border-red-300' : 'border-transparent'}`}
              />
              <button
                type="submit"
                className="btn-dark"
              >
                Get Started
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          )}

          {state === 'error' && (
            <p role="alert" className="mt-3 text-sm font-medium text-blue-100">
              Please enter a valid email address.
            </p>
          )}
        </div>
      </div>
    </section>
  )
}