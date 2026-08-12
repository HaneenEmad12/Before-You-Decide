import { motion } from 'framer-motion'
import { useLanguage } from '../i18n/LanguageContext'

const LABELS = {
  en: { today: 'Today', optionA: 'Option A', wait: 'Wait', optionB: 'Option B', outcomes: 'Possible outcomes', aria: 'A single path from today branching into three possible options, each leading to a different outcome' },
  ar: { today: 'اليوم', optionA: 'الخيار أ', wait: 'انتظار', optionB: 'الخيار ب', outcomes: 'نتائج محتملة', aria: 'مسار واحد من اليوم يتفرع إلى ثلاثة خيارات محتملة، كل منها يؤدي إلى نتيجة مختلفة' },
}

// Signature visual: "Today" branches into possible paths, echoing the
// journey stepper used throughout the product. Hand-authored SVG, animated
// path draw-on with framer-motion.
export default function DecisionPathHero() {
  const { lang } = useLanguage()
  const L = LABELS[lang] || LABELS.en
  const draw = (delay = 0) => ({
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { pathLength: { delay, duration: 1.1, ease: [0.16, 1, 0.3, 1] }, opacity: { delay, duration: 0.3 } },
    },
  })

  const nodeIn = (delay = 0) => ({
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { delay, duration: 0.5, type: 'spring', stiffness: 260, damping: 18 } },
  })

  return (
    <motion.svg
      viewBox="0 0 480 460"
      className="w-full h-auto max-w-md mx-auto"
      initial="hidden"
      animate="visible"
      role="img"
      aria-label={L.aria}
    >
      <circle cx="240" cy="230" r="200" fill="#8778E0" opacity="0.06" />
      <circle cx="240" cy="230" r="150" fill="#159E82" opacity="0.05" />

      {/* Today -> decision point */}
      <motion.path d="M240 50 V128" stroke="#1C2B5C" strokeWidth="2.5" strokeLinecap="round" fill="none" variants={draw(0.2)} />

      {/* Branch to option A */}
      <motion.path d="M240 150 C240 190, 120 190, 96 260" stroke="#159E82" strokeWidth="2" strokeLinecap="round" fill="none" variants={draw(0.6)} />
      {/* Branch to wait */}
      <motion.path d="M240 150 V260" stroke="#E2A73B" strokeWidth="2" strokeLinecap="round" fill="none" variants={draw(0.75)} />
      {/* Branch to option B */}
      <motion.path d="M240 150 C240 190, 360 190, 384 260" stroke="#DD6B58" strokeWidth="2" strokeLinecap="round" fill="none" variants={draw(0.9)} />

      {/* Outcomes fan out further */}
      <motion.path d="M96 282 C96 320, 60 320, 48 360" stroke="#159E82" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" fill="none" variants={draw(1.3)} opacity="0.6" />
      <motion.path d="M96 282 C96 320, 130 320, 140 360" stroke="#159E82" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" fill="none" variants={draw(1.35)} opacity="0.6" />
      <motion.path d="M240 282 V360" stroke="#E2A73B" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" fill="none" variants={draw(1.4)} opacity="0.6" />
      <motion.path d="M384 282 C384 320, 350 320, 340 360" stroke="#DD6B58" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" fill="none" variants={draw(1.45)} opacity="0.6" />
      <motion.path d="M384 282 C384 320, 420 320, 432 360" stroke="#DD6B58" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="4 6" fill="none" variants={draw(1.5)} opacity="0.6" />

      {/* Today node */}
      <motion.g variants={nodeIn(0)}>
        <circle cx="240" cy="36" r="14" fill="#1C2B5C" />
        <text x="240" y="70" textAnchor="middle" fontSize="13" fontFamily="Inter, sans-serif" fill="#565B77">{L.today}</text>
      </motion.g>

      {/* Decision node */}
      <motion.g variants={nodeIn(0.5)}>
        <circle cx="240" cy="140" r="10" fill="#FFFFFF" stroke="#1C2B5C" strokeWidth="2.5" />
      </motion.g>

      {/* Option A */}
      <motion.g variants={nodeIn(1.0)}>
        <circle cx="96" cy="270" r="9" fill="#159E82" />
        <text x="96" y="252" textAnchor="middle" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" fill="#0D6E5C">{L.optionA}</text>
      </motion.g>
      {/* Wait */}
      <motion.g variants={nodeIn(1.1)}>
        <circle cx="240" cy="270" r="9" fill="#E2A73B" />
        <text x="240" y="252" textAnchor="middle" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" fill="#A8721E">{L.wait}</text>
      </motion.g>
      {/* Option B */}
      <motion.g variants={nodeIn(1.2)}>
        <circle cx="384" cy="270" r="9" fill="#DD6B58" />
        <text x="384" y="252" textAnchor="middle" fontSize="12" fontFamily="Inter, sans-serif" fontWeight="600" fill="#A9432F">{L.optionB}</text>
      </motion.g>

      {/* Outcome dots */}
      {[48, 140, 240, 340, 432].map((x, i) => (
        <motion.circle
          key={x}
          cx={x}
          cy={368}
          r="5"
          fill={i === 2 ? '#E2A73B' : i < 2 ? '#159E82' : '#DD6B58'}
          opacity={0.85}
          variants={nodeIn(1.6 + i * 0.08)}
          className="animate-float"
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}

      <motion.text
        x="240" y="410" textAnchor="middle" fontSize="12.5" fontFamily="Inter, sans-serif" fill="#565B77"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1, duration: 0.6 }}
      >
        {L.outcomes}
      </motion.text>
    </motion.svg>
  )
}
