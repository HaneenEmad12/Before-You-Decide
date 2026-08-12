import { useState } from 'react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { BigTextArea } from '../../components/ui'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

export default function StepContext() {
  const { decision, update, markComplete } = useDecision()
  const { t } = useLanguage()
  const s = t.steps.context
  const [title, setTitle] = useState(decision.title)
  const [why, setWhy] = useState(decision.why)
  const [change, setChange] = useState(decision.change)

  const handleNext = () => {
    update({ title, why, change })
    markComplete('context')
  }

  return (
    <JourneyLayout
      step="context"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={!title.trim()}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="violet" />
      </div>
      <div className="space-y-6">
        <BigTextArea
          label={s.q1}
          value={title}
          onChange={setTitle}
          placeholder={s.q1ph}
          rows={2}
        />
        <BigTextArea
          label={s.q2}
          value={why}
          onChange={setWhy}
          placeholder={s.q2ph}
          rows={4}
        />
        <BigTextArea
          label={s.q3}
          value={change}
          onChange={setChange}
          placeholder={s.q3ph}
          rows={4}
        />
      </div>
      <p className="text-sm text-inkmute mt-6">{s.footer}</p>
    </JourneyLayout>
  )
}
