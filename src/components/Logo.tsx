import { Link } from "react-router-dom"

export function Logo({ size = "default", showTagline = true }: { size?: "sm" | "default", showTagline?: boolean }) {
  const box = size === "sm" ? 32 : 44
  const textSize = size === "sm" ? "text-base" : "text-lg"
  return (
    <Link to="/" className="flex items-center gap-2.5 font-bold text-text no-underline shrink-0 group">
      <div className="flex items-center justify-center shrink-0 rounded-full group-hover:scale-105 transition-transform" style={{ height: box, width: box }}>
        <svg viewBox="0 0 48 48" fill="none" className="h-full w-full">
          <circle cx="24" cy="24" r="20" fill="#3b82f6" opacity="0.1"/>
          <g transform="translate(12, 10) scale(1.05)">
            <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" fill="#3b82f6" stroke="none"/>
          </g>
          <circle cx="24" cy="40" r="2.5" fill="#10b981"/>
        </svg>
      </div>
      <span className={`font-display tracking-tight ${textSize}`}>
        <span className="text-[#3b82f6]">قطرة</span><span className="text-[#10b981]">Sol</span>
      </span>
      {showTagline && <span className="hidden sm:inline text-[10px] font-semibold text-text-tertiary tracking-[0.2em] uppercase ml-0.5">Maroc</span>}
    </Link>
  )
}
