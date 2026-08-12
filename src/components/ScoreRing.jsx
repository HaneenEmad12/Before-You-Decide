import { motion, useMotionValue, animate } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function ScoreRing({ value, label, color = '#1C2B5C', soft = '#E9EDF7', size = 128, sublabel }) {
  const [display, setDisplay] = useState(0)
  const r = (size - 14) / 2
  const circumference = 2 * Math.PI * r

  useEffect(() => {
    const controls = animate(0, value, {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [value])

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="-rotate-90">
          <circle cx={size / 2} cy={size / 2} r={r} stroke={soft} strokeWidth={10} fill="none" />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={r}
            stroke={color}
            strokeWidth={10}
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: circumference - (value / 100) * circumference }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div className="absolute inset-0 grid place-items-center">
          <span className="font-display text-2xl text-ink">{display}%</span>
        </div>
      </div>
      <div className="text-center">
        <div className="text-sm font-semibold text-ink">{label}</div>
        {sublabel && <div className="text-xs text-inkmute mt-0.5">{sublabel}</div>}
      </div>
    </div>
  )
}
