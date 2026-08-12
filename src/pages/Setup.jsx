import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import NavBar from '../components/NavBar'
import { getCategories, getExampleDecisions } from '../data/bank'
import { useDecision } from '../context/DecisionContext'
import { useLanguage } from '../i18n/LanguageContext'

const colorClasses = {
  navy: 'bg-navy-soft text-navy border-navy/20',
  violet: 'bg-violet-soft text-violet-deep border-violet/25',
  teal: 'bg-teal-soft text-teal-deep border-teal/25',
  amber: 'bg-amber-soft text-amber-deep border-amber/25',
  coral: 'bg-coral-soft text-coral-deep border-coral/25',
}

export default function Setup() {
  const location = useLocation()
  const navigate = useNavigate()
  const { decision, update } = useDecision()
  const { t, lang, isRtl } = useLanguage()
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight
  const CATEGORIES = getCategories(lang)
  const EXAMPLE_DECISIONS = getExampleDecisions(lang)
  const [category, setCategory] = useState(decision.category)
  const [title, setTitle] = useState(decision.title || location.state?.prefill || '')

  const handleContinue = () => {
    update({ category, title })
    navigate('/journey/context')
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-3xl mx-auto px-5 sm:px-8 pt-14 pb-28">
        <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-xs font-mono uppercase tracking-widest text-teal-deep mb-3">{t.setup.eyebrow}</div>
          <h1 className="font-display text-3xl sm:text-4xl text-ink text-balance mb-3">{t.setup.title}</h1>
          <p className="text-inkmute mb-8">{t.setup.lead}</p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-10">
            {CATEGORIES.map((c) => {
              const Icon = Icons[c.icon] || Icons.Sparkles
              const active = category === c.id
              return (
                <motion.button
                  key={c.id}
                  onClick={() => setCategory(c.id)}
                  whileTap={{ scale: 0.97 }}
                  className={`flex flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-all ${
                    active ? colorClasses[c.color] + ' shadow-soft' : 'bg-surface border-ink/[0.08] hover:border-ink/20'
                  }`}
                >
                  <Icon size={20} strokeWidth={2} />
                  <span className="text-sm font-medium text-ink">{c.label}</span>
                </motion.button>
              )
            })}
          </div>

          <AnimatePresence>
            {category && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                <label className="block mb-2 text-sm font-medium text-ink">{t.setup.describeLabel}</label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder={t.setup.placeholder}
                  rows={3}
                  className="w-full rounded-2xl border border-ink/10 bg-surface px-5 py-4 text-lg font-display text-ink placeholder:text-inkmute/50 placeholder:font-sans placeholder:text-base focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-colors resize-none shadow-soft mb-4"
                />
                <div className="flex flex-wrap gap-2 mb-8">
                  {EXAMPLE_DECISIONS.slice(0, 4).map((ex) => (
                    <button
                      key={ex}
                      onClick={() => setTitle(ex)}
                      className="text-xs font-medium text-inkmute bg-ink/[0.04] hover:bg-ink/[0.08] px-3 py-1.5 rounded-full transition-colors"
                    >
                      {ex}
                    </button>
                  ))}
                </div>

                <button
                  onClick={handleContinue}
                  disabled={!title.trim()}
                  className="inline-flex items-center gap-2 bg-navy text-paper font-medium px-6 py-3.5 rounded-full shadow-soft hover:bg-navy-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {t.setup.begin} <CtaArrow size={17} />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
