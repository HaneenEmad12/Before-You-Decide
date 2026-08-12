import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useLanguage } from '../i18n/LanguageContext'

export const STEP_PATHS = ['context', 'priorities', 'options', 'facts', 'risks', 'scenarios', 'clarity']

export default function ProgressStepper({ current, completedSteps = [] }) {
  const navigate = useNavigate()
  const { t } = useLanguage()
  const STEPS = STEP_PATHS.map((path) => ({ path, label: t.stepper[path] }))
  const currentIndex = STEPS.findIndex((s) => s.path === current)

  return (
    <div className="w-full overflow-x-auto no-scrollbar">
      <div className="flex items-center min-w-[640px] sm:min-w-0 px-1 py-2">
        {STEPS.map((step, i) => {
          const isDone = completedSteps.includes(step.path) && i !== currentIndex
          const isCurrent = i === currentIndex
          const isReachable = isDone || isCurrent || completedSteps.includes(STEPS[i - 1]?.path) || i === 0
          return (
            <div key={step.path} className="flex items-center flex-1 last:flex-none">
              <button
                disabled={!isReachable}
                onClick={() => isReachable && navigate(`/journey/${step.path}`)}
                className="flex flex-col items-center gap-1.5 group disabled:cursor-not-allowed"
              >
                <motion.span
                  initial={false}
                  animate={{
                    scale: isCurrent ? 1.08 : 1,
                    backgroundColor: isCurrent ? '#1C2B5C' : isDone ? '#159E82' : '#FFFFFF',
                    borderColor: isCurrent ? '#1C2B5C' : isDone ? '#159E82' : 'rgba(22,26,46,0.14)',
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                  className="relative grid place-items-center w-8 h-8 rounded-full border-2 text-xs font-mono font-medium"
                  style={{ color: isCurrent || isDone ? '#FFFFFF' : '#565B77' }}
                >
                  {isDone ? <Check size={14} strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
                </motion.span>
                <span
                  className={`text-[11px] font-medium whitespace-nowrap ${
                    isCurrent ? 'text-navy' : isDone ? 'text-teal-deep' : 'text-inkmute'
                  }`}
                >
                  {step.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <div className="flex-1 h-[2px] mx-1.5 rounded-full bg-ink/10 relative overflow-hidden -translate-y-3">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-teal"
                    initial={false}
                    animate={{ width: i < currentIndex || (isDone && i !== currentIndex) ? '100%' : '0%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
