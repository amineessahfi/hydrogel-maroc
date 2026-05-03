import { Link } from "react-router-dom"

interface LogoProps {
  size?: "sm" | "default"
  showTagline?: boolean
}

export function Logo({ size = "default", showTagline = true }: LogoProps) {
  const box = size === "sm" ? 32 : 40

  return (
    <Link to="/" className="flex items-center gap-2.5 font-bold text-text no-underline shrink-0 group">
      {/* Interlocking H + droplet mark */}
      <div
        className="flex items-center justify-center shrink-0 rounded-lg group-hover:scale-105 transition-transform"
        style={{ height: box, width: box }}
      >
        <svg viewBox="0 0 32 28" fill="none" className="h-full w-full">
          {/* H left stem */}
          <rect x="1" y="0" width="4.5" height="28" rx="2.25" className="fill-brand-500" />
          {/* H crossbar */}
          <path d="M2 13L18 7" className="stroke-brand-500" strokeWidth="4.5" strokeLinecap="round" />
          {/* H right stem */}
          <rect x="15" y="0" width="4.5" height="28" rx="2.25" className="fill-brand-500" />
          {/* Droplet dot */}
          <circle cx="18" cy="7" r="3" className="fill-brand-500" />
          <circle cx="18" cy="7" r="1.3" className="fill-white" />
        </svg>
      </div>
      {/* Wordmark */}
      <span className={`font-display tracking-tight ${size === "sm" ? "text-base" : "text-lg"}`}>
        hydro<span className="text-brand-500">gel</span>
      </span>
      {showTagline && (
        <span className="hidden sm:inline text-[10px] font-semibold text-text-tertiary tracking-[0.2em] uppercase ml-0.5">
          maroc
        </span>
      )}
    </Link>
  )
}
