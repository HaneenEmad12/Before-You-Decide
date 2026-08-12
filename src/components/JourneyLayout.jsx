import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProgressStepper, { STEP_PATHS } from './ProgressStepper'
import { useDecision } from '../context/DecisionContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function JourneyLayout({ step, title, kicker, children, onNext, nextLabel, nextDisabled = false, hideNext = false }) {
  const navigate = useNavigate()
  const { decision } = useDecision()
  const { t, isRtl } = useLanguage()
  const BackIcon = isRtl ? ArrowRight : ArrowLeft
  const NextIcon = isRtl ? ArrowLeft : ArrowRight
  const idx = STEP_PATHS.findIndex((s) => s === step)
  const prevPath = idx > 0 ? STEP_PATHS[idx - 1] : null
  const nextPath = idx < STEP_PATHS.length - 1 ? STEP_PATHS[idx + 1] : null

  const handleNext = () => {
    if (onNext) onNext()
    if (nextPath) navigate(`/journey/${nextPath}`)
    else navigate('/map')
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-8 pt-8 pb-28">
      <ProgressStepper current={step} completedSteps={decision.completedSteps} />
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="mt-8"
      >
        {kicker && <div className="text-xs font-mono uppercase tracking-widest text-teal-deep mb-3">{kicker}</div>}
        {title && <h1 className="font-display text-3xl sm:text-4xl text-ink text-balance mb-6">{title}</h1>}
        {children}
      </motion.div>

      <div className="fixed bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-paper via-paper/95 to-transparent pt-8 pb-5">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex items-center justify-between">
          <button
            onClick={() => (prevPath ? navigate(`/journey/${prevPath}`) : navigate('/new'))}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-inkmute hover:text-ink transition-colors px-3 py-2"
          >
            <BackIcon size={16} /> {t.layout.back}
          </button>
          {!hideNext && (
            <button
              onClick={handleNext}
              disabled={nextDisabled}
              className="inline-flex items-center gap-2 bg-navy text-paper font-medium px-6 py-3 rounded-full shadow-soft hover:bg-navy-deep transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {nextLabel || t.layout.continue} <NextIcon size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
