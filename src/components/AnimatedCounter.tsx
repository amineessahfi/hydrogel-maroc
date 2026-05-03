import { useState, useEffect, useRef } from "react"

export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1500,
}: {
  value: string
  suffix?: string
  duration?: number
}) {
  const [display, setDisplay] = useState("0")
  const ref = useRef<HTMLDivElement>(null)
  const triggered = useRef(false)

  const numeric = parseInt(value.replace(/\D/g, ""), 10)
  const isNum = !isNaN(numeric)

  useEffect(() => {
    const node = ref.current
    if (!node || triggered.current) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          triggered.current = true
          if (isNum) {
            const start = performance.now()
            const animate = (now: number) => {
              const elapsed = now - start
              const progress = Math.min(elapsed / duration, 1)
              const eased = 1 - Math.pow(1 - progress, 3)
              setDisplay(Math.floor(eased * numeric) + suffix)
              if (progress < 1) requestAnimationFrame(animate)
            }
            requestAnimationFrame(animate)
          } else {
            setDisplay(value)
          }
          obs.unobserve(node)
        }
      },
      { threshold: 0.3 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [numeric, isNum, value, suffix, duration])

  return <span ref={ref}>{display}</span>
}
