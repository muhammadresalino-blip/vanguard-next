import { useId } from 'react'

/**
 * Geometric "V" mark — dua stroke bulat bertemu di satu titik verteks.
 * Lengan kiri (indigo -> biru) di atas lengan kanan (cyan -> teal);
 * irisan membentuk lipatan indigo yang bersih.
 * SVG tajam & bisa diskalakan. Ikon saja (LogoMark) dan horizontal (Logo).
 */
export function LogoMark({ className = 'h-9 w-9' }: { className?: string }) {
  const uid = useId().replace(/:/g, '')
  const idL = `vl-${uid}`
  const idR = `vr-${uid}`

  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      role="img"
      aria-label="Vanguard Marketing"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={idL} x1="18" y1="13" x2="33" y2="51" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1400E5" />
          <stop offset="100%" stopColor="#4F46E5" />
        </linearGradient>
        <linearGradient id={idR} x1="46" y1="13" x2="30" y2="45" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#5BC8F5" />
          <stop offset="100%" stopColor="#2EE6D6" />
        </linearGradient>
      </defs>

      {/* Lengan kanan (cyan -> teal), di bawah */}
      <path d="M46 13 L31 46" stroke={`url(#${idR})`} strokeWidth="10" strokeLinecap="round" />

      {/* Lengan kiri (indigo -> biru), di atas — menutup verteks jadi satu titik rapi */}
      <path d="M18 13 L33 51" stroke={`url(#${idL})`} strokeWidth="10" strokeLinecap="round" />
    </svg>
  )
}

export function Logo({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <LogoMark className="h-9 w-9" />
      <span className="flex flex-col leading-none">
        <span className="font-heading text-[17px] font-extrabold tracking-tight text-slate-900">
          Vanguard
        </span>
        <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Marketing
        </span>
      </span>
    </span>
  )
}
