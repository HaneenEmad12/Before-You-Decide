import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { X, Plus } from 'lucide-react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { Card } from '../../components/ui'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

const BAR_COLORS = ['#1C2B5C', '#159E82', '#E2A73B', '#DD6B58']

export default function StepOptions() {
  const { decision, update, markComplete, uid } = useDecision()
  const { t, lang } = useLanguage()
  const s = t.steps.options
  const defaultFactors = lang === 'ar'
    ? ['الاستقرار المالي', 'النمو', 'الخطر']
    : ['Financial stability', 'Growth', 'Risk']
  const [optionNames, setOptionNames] = useState(decision.optionNames.length ? decision.optionNames : ['', ''])
  const [factors, setFactors] = useState(decision.factors.length ? decision.factors : defaultFactors.map((label) => ({ id: uid(), label })))
  const [scores, setScores] = useState(decision.optionScores || {})

  const setOptionName = (i, val) => {
    setOptionNames((prev) => prev.map((n, idx) => (idx === i ? val : n)))
  }
  const addOption = () => {
    if (optionNames.length >= 4) return
    setOptionNames((prev) => [...prev, ''])
  }
  const removeOption = (i) => {
    setOptionNames((prev) => prev.filter((_, idx) => idx !== i))
  }

  const addFactor = () => setFactors((prev) => [...prev, { id: uid(), label: '' }])
  const setFactorLabel = (id, val) => setFactors((prev) => prev.map((f) => (f.id === id ? { ...f, label: val } : f)))
  const removeFactor = (id) => setFactors((prev) => prev.filter((f) => f.id !== id))

  const setScore = (optIdx, factorId, val) => {
    setScores((prev) => ({
      ...prev,
      [optIdx]: { ...(prev[optIdx] || {}), [factorId]: val },
    }))
  }

  const validOptions = optionNames.map((n, i) => ({ name: n.trim() || `${s.optionPh} ${i + 1}`, idx: i })).filter((o, i) => optionNames[i].trim() !== '')

  const chartData = factors
    .filter((f) => f.label.trim())
    .map((f) => {
      const row = { factor: f.label }
      validOptions.forEach((o) => {
        row[o.name] = (scores[o.idx]?.[f.id]) ?? 0
      })
      return row
    })

  const handleNext = () => {
    update({ optionNames, factors, optionScores: scores })
    markComplete('options')
  }

  return (
    <JourneyLayout
      step="options"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={validOptions.length < 2 || factors.filter((f) => f.label.trim()).length < 1}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="teal" />
      </div>

      {/* Option names */}
      <div className="flex flex-wrap gap-3 mb-6">
        {optionNames.map((name, i) => (
          <div key={i} className="flex items-center gap-1.5 bg-surface border border-ink/10 rounded-full pl-4 pr-2 py-1.5 shadow-soft">
            <span className="w-2.5 h-2.5 rounded-full" style={{ background: BAR_COLORS[i % BAR_COLORS.length] }} />
            <input
              value={name}
              onChange={(e) => setOptionName(i, e.target.value)}
              placeholder={`${s.optionPh} ${i + 1}`}
              className="outline-none text-sm font-medium text-ink bg-transparent w-28"
            />
            {optionNames.length > 2 && (
              <button onClick={() => removeOption(i)} className="text-inkmute hover:text-coral p-1">
                <X size={13} />
              </button>
            )}
          </div>
        ))}
        {optionNames.length < 4 && (
          <button onClick={addOption} className="flex items-center gap-1 text-sm font-medium text-navy border border-dashed border-navy/40 rounded-full px-4 py-1.5 hover:bg-navy-soft transition-colors">
            <Plus size={14} /> {s.addOption}
          </button>
        )}
      </div>

      {/* Factors + score grid */}
      <Card className="mb-8 overflow-x-auto">
        <table className="w-full text-sm min-w-[480px]">
          <thead>
            <tr>
              <th className="text-left font-medium text-inkmute pb-3 pr-3">{s.factorHeader}</th>
              {validOptions.map((o) => (
                <th key={o.idx} className="text-center font-medium text-ink pb-3 px-2 min-w-[90px]">{o.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {factors.map((f) => (
                <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="border-t border-ink/[0.06]">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-1.5">
                      <input
                        value={f.label}
                        onChange={(e) => setFactorLabel(f.id, e.target.value)}
                        placeholder={s.factorPh}
                        className="outline-none text-sm font-medium text-ink bg-transparent w-full min-w-[100px]"
                      />
                      <button onClick={() => removeFactor(f.id)} className="text-inkmute hover:text-coral shrink-0">
                        <X size={13} />
                      </button>
                    </div>
                  </td>
                  {validOptions.map((o) => (
                    <td key={o.idx} className="text-center py-2.5 px-2">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        value={scores[o.idx]?.[f.id] ?? ''}
                        onChange={(e) => setScore(o.idx, f.id, Math.max(0, Math.min(10, Number(e.target.value))))}
                        className="w-14 text-center rounded-lg border border-ink/10 py-1.5 outline-none focus:border-navy"
                      />
                      <span className="text-inkmute text-xs">/10</span>
                    </td>
                  ))}
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        <button onClick={addFactor} className="flex items-center gap-1 text-sm font-medium text-navy mt-4 hover:underline">
          <Plus size={14} /> {s.addFactor}
        </button>
      </Card>

      {chartData.length > 0 && validOptions.length >= 2 && (
        <Card>
          <ResponsiveContainer width="100%" height={Math.max(220, chartData.length * 70)}>
            <BarChart data={chartData} layout="vertical" margin={{ left: 8, right: 16 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" horizontal={false} />
              <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11, fill: '#565B77' }} />
              <YAxis type="category" dataKey="factor" width={110} tick={{ fontSize: 12, fill: '#161A2E' }} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(22,26,46,0.08)', fontSize: 13 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {validOptions.map((o, i) => (
                <Bar key={o.idx} dataKey={o.name} fill={BAR_COLORS[i % BAR_COLORS.length]} radius={[0, 6, 6, 0]} isAnimationActive />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Card>
      )}
    </JourneyLayout>
  )
}
