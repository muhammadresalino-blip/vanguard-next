'use client'

import { useState, useEffect } from 'react'
import { Menu, X, ArrowRight } from 'lucide-react'
import { Logo } from './logo'
import { NAV_LINKS, APP_URL } from '@/lib/data'

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  const revealClass = mounted ? 'reveal-item' : ''

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="shrink-0" aria-label="Vanguard Marketing home">
          <Logo />
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 ${revealClass}`}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={`${APP_URL}/admin/login`}
            className="btn-ghost btn-sm"
          >
            Login
          </a>
          <a
            href="#cta"
            className="btn-primary btn-sm"
          >
            Get Started
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-600 transition-colors hover:bg-slate-100 md:hidden"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-slate-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
          <div className="mt-2 flex items-center gap-3 border-t border-slate-100 pt-3">
            <a
              href={`${APP_URL}/admin/login`}
              onClick={() => setOpen(false)}
              className="flex-1 btn-ghost btn-sm"
            >
              Login
            </a>
            <a
              href="#cta"
              onClick={() => setOpen(false)}
              className="flex-1 btn-primary btn-sm"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
