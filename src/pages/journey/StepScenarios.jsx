import { useState } from 'react'
import { motion } from 'framer-motion'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

const KEYS = ['best', 'likely', 'worst']
const colorMap = {
  best: { border: 'border-teal/30', bg: 'bg-teal-soft/40', text: 'text-teal-deep', ring: 'focus:border-teal' },
  likely: { border: 'border-amber/30', bg: 'bg-amber-soft/40', text: 'text-amber-deep', ring: 'focus:border-amber' },
  worst: { border: 'border-coral/30', bg: 'bg-coral-soft/40', text: 'text-coral-deep', ring: 'focus:border-coral' },
}

export default function StepScenarios() {
  const { decision, update, markComplete } = useDecision()
  const { t } = useLanguage()
  const s = t.steps.scenarios
  const [scenarios, setScenarios] = useState(decision.scenarios)

  const setField = (key, val) => setScenarios((prev) => ({ ...prev, [key]: val }))

  const handleNext = () => {
    update({ scenarios })
    markComplete('scenarios')
  }

  const filled = Object.values(scenarios).filter((v) => v && v.trim()).length

  return (
    <JourneyLayout
      step="scenarios"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={filled < 2}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="navy" />
      </div>

      {/* Timeline */}
      <div className="relative mb-10 px-2">
        <div className="h-px bg-ink/15 absolute left-2 right-2 top-1/2" />
        <div className="flex justify-between relative">
          {s.timeline.map((tl, i) => (
            <motion.div
              key={tl}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.12, duration: 0.4 }}
              className="flex flex-col items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-navy" />
              <span className="text-[11px] font-mono text-inkmute whitespace-nowrap">{tl}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {KEYS.map((key, i) => {
          const card = s.cards[i]
          const c = colorMap[key]
          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -3 }}
              className={`rounded-2xl border-2 p-5 ${c.border} ${c.bg}`}
            >
              <div className="text-2xl mb-2">{card.emoji}</div>
              <h3 className={`font-display text-lg mb-1 ${c.text}`}>{card.title}</h3>
              <p className="text-xs text-inkmute mb-3">{card.prompt}</p>
              <textarea
                value={scenarios[key]}
                onChange={(e) => setField(key, e.target.value)}
                rows={6}
                placeholder={s.writePh}
                className={`w-full rounded-xl border border-ink/10 bg-surface px-3.5 py-3 text-sm text-ink outline-none focus:ring-2 focus:ring-ink/5 resize-none ${c.ring}`}
              />
            </motion.div>
          )
        })}
      </div>
    </JourneyLayout>
  )
}
