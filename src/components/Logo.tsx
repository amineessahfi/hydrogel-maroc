import { Link } from "react-router-dom"

interface LogoProps {
  size?: "sm" | "default"
  showTagline?: boolean
}

export function Logo({ size = "default", showTagline = true }: LogoProps) {
  const h = size === "sm" ? 8 : 10

  return (
    <Link to="/" className="flex items-center gap-2.5 text-lg font-bold text-text no-underline shrink-0 group">
      <div
        className={`flex items-center justify-center rounded-xl bg-gradient-to-br from-brand-500 to-teal-500 text-white shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/40 transition-shadow`}
        style={{ height: `${h * 4}px`, width: `${h * 4}px`, minWidth: `${h * 4}px` }}
      >
        <svg viewBox="0 0 48 48" fill="none" className="h-5 w-5">
          <path d="M24 4C24 4 6 22 6 32C6 38.627 11.373 44 18 44C24.627 44 30 38.627 30 32C30 22 24 4 24 4Z" fill="currentColor" opacity="0.3"/>
          <path d="M18 26L18 36" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 26L24 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M18 26L12 20" stroke="white" strokeWidth="2" strokeLinecap="round"/>
          <path d="M24 20C24 20 21.5 16 24 14C26.5 16 24 20 24 20Z" fill="white"/>
        </svg>
      </div>
      <span className="font-display tracking-tight">
        Hydro<span className="text-brand-500">Gel</span>
      </span>
      {showTagline && (
        <span className="hidden sm:inline text-[10px] font-medium text-text-tertiary tracking-widest uppercase mt-0.5 ml-1">
          Maroc
        </span>
      )}
    </Link>
  )
}
