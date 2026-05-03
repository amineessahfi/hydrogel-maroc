import { Link } from "react-router-dom"

export function Logo({ size = "default", showTagline = true }: { size?: "sm" | "default", showTagline?: boolean }) {
  const textSize = size === "sm" ? "text-base" : "text-lg"
  const dropSize = size === "sm" ? 14 : 18

  return (
    <Link to="/" className="flex items-center gap-2 font-bold text-text no-underline shrink-0 group">
      {/* قطرة in Cairo */}
      <span className={`tracking-tight ${textSize}`} style={{ fontFamily: 'Cairo, sans-serif', fontWeight: 800, color: '#3b82f6' }}>
        قطرة
      </span>
      {/* Sol with droplet as o */}
      <span className={`flex items-baseline tracking-tight ${textSize}`}>
        <span className="font-display text-[#fafafa]" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>S</span>
        <span className="inline-flex items-center justify-center mx-[1px]" style={{ width: dropSize, height: dropSize }}>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" fill="#3b82f6" stroke="none"/>
            <circle cx="12" cy="12" r="1.5" fill="#fafafa"/>
          </svg>
        </span>
        <span className="font-display text-[#10b981]" style={{ fontFamily: 'Sora, sans-serif', fontWeight: 700 }}>l</span>
      </span>
      {showTagline && <span className="hidden sm:inline text-[10px] font-semibold text-text-tertiary tracking-[0.2em] uppercase ml-0.5">Maroc</span>}
    </Link>
  )
}
