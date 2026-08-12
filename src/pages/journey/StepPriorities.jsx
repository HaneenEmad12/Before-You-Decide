import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import { X } from 'lucide-react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { Card } from '../../components/ui'
import { getPriorityBank } from '../../data/bank'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function StepPriorities() {
  const { decision, update, markComplete, uid } = useDecision()
  const { t, lang } = useLanguage()
  const s = t.steps.priorities
  const PRIORITY_BANK = getPriorityBank(lang)
  const [priorities, setPriorities] = useState(decision.priorities.length ? decision.priorities : [])

  const available = PRIORITY_BANK.filter((p) => !priorities.some((sel) => sel.label === p))

  const addPriority = (label) => {
    setPriorities((prev) => [...prev, { id: uid(), label, score: 60 }])
  }
  const removePriority = (id) => {
    setPriorities((prev) => prev.filter((p) => p.id !== id))
  }
  const setScore = (id, score) => {
    setPriorities((prev) => prev.map((p) => (p.id === id ? { ...p, score } : p)))
  }

  const handleNext = () => {
    update({ priorities })
    markComplete('priorities')
  }

  const radarData = priorities.map((p) => ({ label: p.label, score: p.score }))

  return (
    <JourneyLayout
      step="priorities"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={priorities.length < 3}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="teal" />
      </div>

      <p className="text-sm text-inkmute mb-4">{s.lead}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {available.map((p) => (
          <button
            key={p}
            onClick={() => addPriority(p)}
            className="text-sm font-medium text-ink bg-ink/[0.04] hover:bg-navy-soft hover:text-navy px-3.5 py-2 rounded-full transition-colors"
          >
            + {p}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <AnimatePresence>
            {priorities.map((p) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 12 }}
                layout
              >
                <Card className="!p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-ink">{p.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono text-inkmute w-9 text-right">{p.score}%</span>
                      <button onClick={() => removePriority(p.id)} className="text-inkmute hover:text-coral transition-colors">
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={p.score}
                    onChange={(e) => setScore(p.id, Number(e.target.value))}
                    className="w-full accent-navy"
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
          {priorities.length === 0 && (
            <p className="text-sm text-inkmute italic">{s.empty}</p>
          )}
        </div>

        <Card className="!p-4">
          {priorities.length >= 3 ? (
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData} outerRadius="72%">
                <PolarGrid stroke="#E5E2D8" />
                <PolarAngleAxis dataKey="label" tick={{ fill: '#565B77', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar dataKey="score" stroke="#1C2B5C" fill="#8778E0" fillOpacity={0.35} strokeWidth={2} isAnimationActive />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-[280px] grid place-items-center text-center text-sm text-inkmute px-6">
              {s.chartEmpty}
            </div>
          )}
        </Card>
      </div>
    </JourneyLayout>
  )
}
