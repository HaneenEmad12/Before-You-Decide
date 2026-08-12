import { motion } from 'framer-motion'
import { HelpCircle, ArrowRight, ArrowLeft } from 'lucide-react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { Card } from '../../components/ui'
import { useDecision } from '../../context/DecisionContext'
import { selectMissingInfo } from '../../data/insights'
import { useLanguage } from '../../i18n/LanguageContext'

export default function StepClarity() {
  const { decision, markComplete } = useDecision()
  const { t, lang, isRtl } = useLanguage()
  const s = t.steps.clarity
  const FooterIcon = isRtl ? ArrowLeft : ArrowRight
  const questions = selectMissingInfo(decision, lang)

  const handleNext = () => {
    markComplete('clarity')
  }

  return (
    <JourneyLayout
      step="clarity"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextLabel={s.nextLabel}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="violet" />
      </div>
      <p className="text-inkmute mb-8 max-w-xl">
        {s.lead}
      </p>

      <div className="grid sm:grid-cols-2 gap-5">
        {questions.map((q, i) => (
          <motion.div
            key={q.q}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.5 }}
          >
            <Card className="h-full">
              <div className="flex items-start gap-3 mb-3">
                <span className="grid place-items-center w-8 h-8 rounded-lg bg-violet-soft text-violet-deep shrink-0">
                  <HelpCircle size={16} />
                </span>
                <h3 className="font-display text-base text-ink leading-snug pt-1">{q.q}</h3>
              </div>
              <div className="mb-3">
                <span className="text-[11px] font-mono uppercase tracking-wide text-inkmute">{s.whyMatters}</span>
                <p className="text-sm text-ink mt-0.5">{q.why}</p>
              </div>
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wide text-teal-deep">{s.nextStep}</span>
                <p className="text-sm text-ink mt-0.5">{q.next}</p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-10 flex items-center gap-2 text-sm text-inkmute">
        <FooterIcon size={15} />
        <span>{s.footer}</span>
      </div>
    </JourneyLayout>
  )
}
