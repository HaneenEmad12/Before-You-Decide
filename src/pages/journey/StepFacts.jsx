import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, HelpCircle } from 'lucide-react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

function ChipInput({ placeholder, onAdd, accent, addLabel }) {
  const [val, setVal] = useState('')
  const submit = () => {
    if (!val.trim()) return
    onAdd(val.trim())
    setVal('')
  }
  return (
    <div className="flex gap-2">
      <input
        value={val}
        onChange={(e) => setVal(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && submit()}
        placeholder={placeholder}
        className={`flex-1 rounded-xl border border-ink/10 bg-surface px-4 py-2.5 text-sm outline-none focus:ring-2 ${accent}`}
      />
      <button onClick={submit} className="text-sm font-medium px-4 py-2.5 rounded-xl bg-ink/[0.05] hover:bg-ink/10 transition-colors">
        {addLabel}
      </button>
    </div>
  )
}

export default function StepFacts() {
  const { decision, update, markComplete } = useDecision()
  const { t } = useLanguage()
  const s = t.steps.facts
  const [facts, setFacts] = useState(decision.facts)
  const [assumptions, setAssumptions] = useState(decision.assumptions)

  const handleNext = () => {
    update({ facts, assumptions })
    markComplete('facts')
  }

  return (
    <JourneyLayout
      step="facts"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={facts.length + assumptions.length < 2}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="amber" />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <motion.div layout className="rounded-2xl border-2 border-teal/30 bg-teal-soft/40 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={18} className="text-teal-deep" />
            <h3 className="font-display text-lg text-teal-deep">{s.knowTitle}</h3>
          </div>
          <p className="text-xs text-inkmute mb-4">{s.knowDesc}</p>
          <ChipInput placeholder={s.knowPh} onAdd={(v) => setFacts((prev) => [...prev, v])} accent="focus:ring-teal/20 focus:border-teal" addLabel={s.add} />
          <div className="space-y-2 mt-4">
            <AnimatePresence>
              {facts.map((f, i) => (
                <motion.div
                  key={f + i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  className="flex items-center justify-between bg-surface rounded-xl px-4 py-2.5 text-sm text-ink shadow-soft"
                >
                  <span>{f}</span>
                  <button onClick={() => setFacts((prev) => prev.filter((_, idx) => idx !== i))} className="text-inkmute hover:text-coral shrink-0 ml-3">
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div layout className="rounded-2xl border-2 border-violet/30 bg-violet-soft/50 p-5">
          <div className="flex items-center gap-2 mb-4">
            <HelpCircle size={18} className="text-violet-deep" />
            <h3 className="font-display text-lg text-violet-deep">{s.assumeTitle}</h3>
          </div>
          <p className="text-xs text-inkmute mb-4">{s.assumeDesc}</p>
          <ChipInput placeholder={s.assumePh} onAdd={(v) => setAssumptions((prev) => [...prev, v])} accent="focus:ring-violet/20 focus:border-violet" addLabel={s.add} />
          <div className="space-y-2 mt-4">
            <AnimatePresence>
              {assumptions.map((a, i) => (
                <motion.div
                  key={a + i}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="flex items-center justify-between bg-surface rounded-xl px-4 py-2.5 text-sm text-ink shadow-soft"
                >
                  <span>{a}</span>
                  <button onClick={() => setAssumptions((prev) => prev.filter((_, idx) => idx !== i))} className="text-inkmute hover:text-coral shrink-0 ml-3">
                    <X size={14} />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </JourneyLayout>
  )
}
