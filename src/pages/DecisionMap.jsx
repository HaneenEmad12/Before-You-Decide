import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts'
import { Sparkles, TrendingUp, TrendingDown, HelpCircle, CheckCircle2, ListChecks, Download, RefreshCcw, Lightbulb } from 'lucide-react'
import NavBar from '../components/NavBar'
import { Card } from '../components/ui'
import ScoreRing from '../components/ScoreRing'
import { useDecision } from '../context/DecisionContext'
import { computeScores, selectMissingInfo, topN, generateAdvice } from '../data/insights'
import { getCategories } from '../data/bank'
import { useLanguage } from '../i18n/LanguageContext'

const BAR_COLORS = ['#1C2B5C', '#159E82', '#E2A73B', '#DD6B58']

export default function DecisionMap() {
  const { decision, reset } = useDecision()
  const navigate = useNavigate()
  const { t, lang } = useLanguage()
  const m = t.map
  const scores = useMemo(() => computeScores(decision), [decision])
  const missing = useMemo(() => selectMissingInfo(decision, lang), [decision, lang])
  const category = getCategories(lang).find((c) => c.id === decision.category)

  const radarData = decision.priorities.map((p) => ({ label: p.label, score: p.score }))
  const topPriorities = topN(decision.priorities, 'score', 3)

  const optionNames = decision.optionNames.map((n, i) => n.trim() || `${t.steps.options.optionPh} ${i + 1}`).filter((_, i) => decision.optionNames[i].trim() !== '')
  const factorChart = decision.factors
    .filter((f) => f.label.trim())
    .map((f) => {
      const row = { factor: f.label }
      optionNames.forEach((name, i) => {
        row[name] = decision.optionScores[i]?.[f.id] ?? 0
      })
      return row
    })

  const optionTotals = optionNames.map((name, i) => {
    const total = decision.factors.reduce((sum, f) => sum + (decision.optionScores[i]?.[f.id] ?? 0), 0)
    return { name, total }
  }).sort((a, b) => b.total - a.total)

  const opportunities = topN(decision.riskItems.filter((r) => r.type === 'opportunity').map((r) => ({ ...r, weight: r.impact })), 'weight', 3)
  const risks = topN(decision.riskItems.filter((r) => r.type === 'risk').map((r) => ({ ...r, weight: r.risk * r.impact })), 'weight', 3)
  const unknowns = decision.assumptions.slice(0, 3)
  const nextSteps = missing.slice(0, 3)

  const advice = useMemo(
    () => generateAdvice(decision, scores, optionTotals, t, nextSteps[0]),
    [decision, scores, optionTotals, t, nextSteps]
  )

  const [restartConfirm, setRestartConfirm] = useState(false)

  const handleRestart = () => {
    if (!restartConfirm) { setRestartConfirm(true); return }
    reset()
    navigate('/')
  }

  const handlePrint = () => window.print()

  if (!decision.title) {
    return (
      <div>
        <NavBar />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <h1 className="font-display text-2xl text-ink mb-3">{m.empty.title}</h1>
          <p className="text-inkmute mb-6">{m.empty.desc}</p>
          <Link to="/new" className="inline-flex items-center gap-2 bg-navy text-paper font-medium px-6 py-3 rounded-full">{m.empty.cta}</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-24">
      <NavBar />
      <div className="max-w-5xl mx-auto px-5 sm:px-8 pt-10">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="text-xs font-mono uppercase tracking-widest text-teal-deep">{m.eyebrow}</div>
            <div className="flex gap-2">
              <button onClick={handlePrint} className="inline-flex items-center gap-1.5 text-xs font-medium text-ink bg-ink/[0.05] hover:bg-ink/10 px-3.5 py-2 rounded-full transition-colors">
                <Download size={13} /> {m.save}
              </button>
              <button onClick={handleRestart} className="inline-flex items-center gap-1.5 text-xs font-medium text-coral-deep bg-coral-soft hover:bg-coral/20 px-3.5 py-2 rounded-full transition-colors">
                <RefreshCcw size={13} /> {restartConfirm ? m.confirmStartOver : m.startOver}
              </button>
            </div>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-ink text-balance mb-1">{decision.title}</h1>
          {category && <span className="text-sm text-inkmute">{category.label}</span>}
        </motion.div>

        {/* Score rings */}
        <section className="mt-10">
          <Card className="!p-6 sm:!p-8">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-items-center">
              <ScoreRing value={scores.clarity} label={m.scores.clarity} color="#1C2B5C" soft="#E9EDF7" />
              <ScoreRing value={scores.confidence} label={m.scores.confidence} color="#159E82" soft="#E1F5EF" />
              <ScoreRing value={scores.uncertainty} label={m.scores.uncertainty} color="#8778E0" soft="#EFECFC" />
              <ScoreRing value={scores.riskExposure} label={m.scores.riskExposure} color="#DD6B58" soft="#FBE7E2" />
            </div>
            <p className="text-center text-xs text-inkmute mt-6 max-w-md mx-auto">
              {m.scoreNote}
            </p>
          </Card>
        </section>

        {/* Why it matters + what would change */}
        {(decision.why || decision.change) && (
          <section className="mt-6 grid sm:grid-cols-2 gap-5">
            {decision.why && (
              <Card>
                <h4 className="text-xs font-mono uppercase tracking-wide text-inkmute mb-2">{m.whyMatters}</h4>
                <p className="text-sm text-ink leading-relaxed">{decision.why}</p>
              </Card>
            )}
            {decision.change && (
              <Card>
                <h4 className="text-xs font-mono uppercase tracking-wide text-inkmute mb-2">{m.whatChange}</h4>
                <p className="text-sm text-ink leading-relaxed">{decision.change}</p>
              </Card>
            )}
          </section>
        )}

        {/* Priorities */}
        {decision.priorities.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-xl text-ink mb-4">{m.whatMatters}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              <Card>
                <div className="space-y-3">
                  {topN(decision.priorities, 'score', decision.priorities.length).map((p) => (
                    <div key={p.id}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-ink">{p.label}</span>
                        <span className="text-inkmute font-mono text-xs">{p.score}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink/[0.06] overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${p.score}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                          className="h-full bg-violet rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
              <Card>
                <ResponsiveContainer width="100%" height={240}>
                  <RadarChart data={radarData} outerRadius="72%">
                    <PolarGrid stroke="#E5E2D8" />
                    <PolarAngleAxis dataKey="label" tick={{ fill: '#565B77', fontSize: 10 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar dataKey="score" stroke="#1C2B5C" fill="#8778E0" fillOpacity={0.35} strokeWidth={2} />
                  </RadarChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </section>
        )}

        {/* Options */}
        {optionNames.length > 0 && (
          <section className="mt-6">
            <h2 className="font-display text-xl text-ink mb-4">{m.yourOptions}</h2>
            <Card>
              {factorChart.length > 0 && (
                <ResponsiveContainer width="100%" height={Math.max(200, factorChart.length * 60)}>
                  <BarChart data={factorChart} layout="vertical" margin={{ left: 8, right: 16 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E2D8" horizontal={false} />
                    <XAxis type="number" domain={[0, 10]} tick={{ fontSize: 11, fill: '#565B77' }} />
                    <YAxis type="category" dataKey="factor" width={110} tick={{ fontSize: 12, fill: '#161A2E' }} />
                    <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid rgba(22,26,46,0.08)', fontSize: 13 }} />
                    {optionNames.map((name, i) => (
                      <Bar key={name} dataKey={name} fill={BAR_COLORS[i % BAR_COLORS.length]} radius={[0, 6, 6, 0]} />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              )}
              {optionTotals.length >= 2 && (
                <p className="text-sm text-ink mt-5 pt-5 border-t border-ink/[0.06]">
                  <strong className="font-semibold">{optionTotals[0].name}</strong> {m.optionStrongMid}{' '}
                  <strong className="font-semibold">{optionTotals[optionTotals.length - 1].name}</strong> {m.optionStrongSuffix}
                </p>
              )}
            </Card>
          </section>
        )}

        {/* Opportunities / Risks / Unknowns */}
        <section className="mt-6 grid sm:grid-cols-3 gap-5">
          <Card className="border-t-4 border-teal !pt-5">
            <div className="flex items-center gap-2 mb-3 text-teal-deep">
              <TrendingUp size={16} />
              <h3 className="font-display text-base">{m.opportunities}</h3>
            </div>
            {opportunities.length ? (
              <ul className="space-y-2 text-sm text-ink">
                {opportunities.map((o) => <li key={o.id}>• {o.label}</li>)}
              </ul>
            ) : <p className="text-xs text-inkmute">{m.noneMapped}</p>}
          </Card>
          <Card className="border-t-4 border-coral !pt-5">
            <div className="flex items-center gap-2 mb-3 text-coral-deep">
              <TrendingDown size={16} />
              <h3 className="font-display text-base">{m.risks}</h3>
            </div>
            {risks.length ? (
              <ul className="space-y-2 text-sm text-ink">
                {risks.map((r) => <li key={r.id}>• {r.label}</li>)}
              </ul>
            ) : <p className="text-xs text-inkmute">{m.noneMapped}</p>}
          </Card>
          <Card className="border-t-4 border-violet !pt-5">
            <div className="flex items-center gap-2 mb-3 text-violet-deep">
              <HelpCircle size={16} />
              <h3 className="font-display text-base">{m.unknowns}</h3>
            </div>
            {unknowns.length ? (
              <ul className="space-y-2 text-sm text-ink">
                {unknowns.map((u, i) => <li key={i}>• {u}</li>)}
              </ul>
            ) : <p className="text-xs text-inkmute">{m.noneRecorded}</p>}
          </Card>
        </section>

        {/* Facts / assumptions */}
        {(decision.facts.length > 0 || decision.assumptions.length > 0) && (
          <section className="mt-6 grid sm:grid-cols-2 gap-5">
            <Card>
              <div className="flex items-center gap-2 mb-3 text-teal-deep">
                <CheckCircle2 size={16} />
                <h3 className="font-display text-base">{m.whatYouKnow}</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink">
                {decision.facts.map((f, i) => <li key={i}>• {f}</li>)}
              </ul>
            </Card>
            <Card>
              <div className="flex items-center gap-2 mb-3 text-violet-deep">
                <HelpCircle size={16} />
                <h3 className="font-display text-base">{m.whatYoureAssuming}</h3>
              </div>
              <ul className="space-y-2 text-sm text-ink">
                {decision.assumptions.map((a, i) => <li key={i}>• {a}</li>)}
              </ul>
            </Card>
          </section>
        )}

        {/* Next steps */}
        {nextSteps.length > 0 && (
          <section className="mt-6">
            <Card className="bg-navy border-none">
              <div className="flex items-center gap-2 mb-4 text-amber">
                <ListChecks size={18} />
                <h3 className="font-display text-lg text-paper">{m.nextSteps}</h3>
              </div>
              <div className="grid sm:grid-cols-3 gap-4">
                {nextSteps.map((n, i) => (
                  <div key={i} className="bg-white/[0.06] rounded-xl p-4">
                    <p className="text-sm text-paper font-medium mb-1.5">{n.next}</p>
                    <p className="text-xs text-paper/60">{n.q}</p>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        )}

        {/* Real advice */}
        <section className="mt-6">
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <Card className="!p-6 sm:!p-8 border-2 border-amber/40 bg-gradient-to-br from-amber-soft/60 via-surface to-teal-soft/30">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-widest text-amber-deep bg-amber/15 px-3 py-1 rounded-full mb-4">
                {m.adviceBadge}
              </div>
              <div className="flex items-start gap-3 mb-3">
                <span className="grid place-items-center w-10 h-10 rounded-xl bg-navy text-amber shrink-0">
                  <Lightbulb size={20} />
                </span>
                <div>
                  <div className="text-xs font-mono uppercase tracking-wide text-inkmute mb-1">{m.adviceTitle}</div>
                  <h3 className="font-display text-xl sm:text-2xl text-ink text-balance">{advice.title}</h3>
                </div>
              </div>
              <p className="text-sm sm:text-base text-ink leading-relaxed">{advice.body}</p>
              {advice.nextStep && (
                <div className="mt-5 pt-5 border-t border-ink/[0.08] flex items-start gap-3">
                  <span className="text-lg">✅</span>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wide text-teal-deep">{t.advice.nextStepLabel}</span>
                    <p className="text-sm text-ink mt-0.5 font-medium">{advice.nextStep.next}</p>
                  </div>
                </div>
              )}
            </Card>
          </motion.div>
        </section>

        <section className="mt-10 text-center">
          <Sparkles className="mx-auto text-amber mb-3" size={22} />
          <p className="font-display text-xl text-ink text-balance max-w-lg mx-auto">
            {m.closing}
          </p>
        </section>
      </div>
    </div>
  )
}
