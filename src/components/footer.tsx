import { Logo } from './logo'
import { NAV_LINKS } from '@/lib/data'

const PRODUCT_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Pipeline', href: '#pipeline' },
  { label: 'Why Vanguard', href: '#product' },
]

export const COMPANY_LINKS = [
  { label: 'Get Started', href: '#cta' },
  { label: 'Login', href: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:5173'}/admin/login` },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              The all-in-one marketing platform to capture leads, manage your pipeline,
              and understand campaign performance.
            </p>
          </div>

          <nav aria-label="Product">
            <h3 className="text-sm font-semibold text-slate-900">Product</h3>
            <ul className="mt-4 space-y-3">
              {PRODUCT_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-sm font-semibold text-slate-900">Company</h3>
            <ul className="mt-4 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-slate-500 transition-colors duration-200 hover:text-slate-900"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 border-t border-slate-100 pt-6">
          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} Vanguard Marketing. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
