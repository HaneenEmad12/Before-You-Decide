import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus } from 'lucide-react'
import JourneyLayout from '../../components/JourneyLayout'
import EncouragementBanner from '../../components/EncouragementBanner'
import { Card } from '../../components/ui'
import { useDecision } from '../../context/DecisionContext'
import { useLanguage } from '../../i18n/LanguageContext'

function Bubble({ item, containerRef, onDrag, onRemove, bg }) {
  return (
    <motion.div
      drag
      dragMomentum={false}
      dragConstraints={containerRef}
      onDragEnd={(_, info) => onDrag(item.id, info.point, containerRef)}
      className="absolute cursor-grab active:cursor-grabbing select-none group"
      style={{ left: `${item.risk * 10}%`, top: `${100 - item.impact * 10}%`, translateX: '-50%', translateY: '-50%' }}
      whileDrag={{ scale: 1.12, zIndex: 20 }}
      animate={{ y: [0, -3, 0] }}
      transition={{ y: { duration: 3 + (item.id.charCodeAt(0) % 3), repeat: Infinity, ease: 'easeInOut' } }}
    >
      <div
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium text-white shadow-lift whitespace-nowrap"
        style={{ background: bg }}
      >
        {item.label}
        <button
          onClick={(e) => { e.stopPropagation(); onRemove(item.id) }}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
          onPointerDown={(e) => e.stopPropagation()}
        >
          <X size={12} />
        </button>
      </div>
    </motion.div>
  )
}

export default function StepRisks() {
  const { decision, update, markComplete, uid } = useDecision()
  const { t } = useLanguage()
  const s = t.steps.risks
  const TYPE_BG = { risk: '#DD6B58', opportunity: '#159E82' }
  const [items, setItems] = useState(decision.riskItems.length ? decision.riskItems : [])
  const [controllable, setControllable] = useState(decision.controllable)
  const [uncontrollable, setUncontrollable] = useState(decision.uncontrollable)
  const [draft, setDraft] = useState('')
  const [draftType, setDraftType] = useState('risk')
  const containerRef = useRef(null)

  const addItem = () => {
    if (!draft.trim()) return
    setItems((prev) => [...prev, { id: uid(), label: draft.trim(), type: draftType, risk: 5, impact: 5 }])
    setDraft('')
  }

  const handleDrag = (id, point, ref) => {
    const rect = ref.current.getBoundingClientRect()
    const x = Math.max(0, Math.min(1, (point.x - rect.left) / rect.width))
    const y = Math.max(0, Math.min(1, (point.y - rect.top) / rect.height))
    setItems((prev) => prev.map((it) => (it.id === id ? { ...it, risk: +(x * 10).toFixed(1), impact: +((1 - y) * 10).toFixed(1) } : it)))
  }

  const removeItem = (id) => setItems((prev) => prev.filter((it) => it.id !== id))

  const [ctlDraft, setCtlDraft] = useState('')
  const [unctlDraft, setUnctlDraft] = useState('')

  const handleNext = () => {
    update({ riskItems: items, controllable, uncontrollable })
    markComplete('risks')
  }

  return (
    <JourneyLayout
      step="risks"
      kicker={s.kicker}
      title={s.title}
      onNext={handleNext}
      nextDisabled={items.length < 2}
    >
      <div className="mb-6">
        <EncouragementBanner text={s.banner} tone="coral" />
      </div>

      <Card className="mb-4">
        <div className="flex flex-col sm:flex-row gap-2 mb-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addItem()}
            placeholder={s.placeholder}
            className="flex-1 rounded-xl border border-ink/10 px-4 py-2.5 text-sm outline-none focus:border-navy"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setDraftType('risk')}
              className={`text-xs font-medium px-3 py-2.5 rounded-xl transition-colors ${draftType === 'risk' ? 'bg-coral text-white' : 'bg-coral-soft text-coral-deep'}`}
            >
              {s.risk}
            </button>
            <button
              onClick={() => setDraftType('opportunity')}
              className={`text-xs font-medium px-3 py-2.5 rounded-xl transition-colors ${draftType === 'opportunity' ? 'bg-teal text-white' : 'bg-teal-soft text-teal-deep'}`}
            >
              {s.opportunity}
            </button>
            <button onClick={addItem} className="flex items-center gap-1 text-xs font-medium px-3 py-2.5 rounded-xl bg-ink/[0.05] hover:bg-ink/10">
              <Plus size={14} /> {s.add}
            </button>
          </div>
        </div>
        <p className="text-xs text-inkmute">{s.dragHint}</p>
      </Card>

      <Card className="mb-8 !p-4">
        <div className="relative w-full aspect-[4/3] sm:aspect-[16/9]" ref={containerRef}>
          {/* axes */}
          <div className="absolute inset-0 border-l border-b border-ink/15" />
          <div className="absolute inset-0" style={{ background: 'linear-gradient(to top right, rgba(221,107,88,0.06), transparent 55%, rgba(21,158,130,0.06))' }} />
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-ink/[0.06]" />
          <div className="absolute top-1/2 left-0 right-0 h-px bg-ink/[0.06]" />
          <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[10px] text-inkmute font-mono">{s.axisX}</span>
          <span className="absolute top-1/2 -left-1 -translate-y-1/2 -translate-x-full -rotate-90 text-[10px] text-inkmute font-mono origin-right whitespace-nowrap hidden sm:block">{s.axisY}</span>
          <AnimatePresence>
            {items.map((item) => (
              <Bubble key={item.id} item={item} containerRef={containerRef} onDrag={handleDrag} onRemove={removeItem} bg={TYPE_BG[item.type]} />
            ))}
          </AnimatePresence>
          {items.length === 0 && (
            <div className="absolute inset-0 grid place-items-center text-sm text-inkmute text-center px-8">
              {s.emptyMap}
            </div>
          )}
        </div>
      </Card>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <h4 className="text-sm font-semibold text-ink mb-2">{s.controllable}</h4>
          <div className="flex gap-2 mb-3">
            <input
              value={ctlDraft}
              onChange={(e) => setCtlDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && ctlDraft.trim()) { setControllable((p) => [...p, ctlDraft.trim()]); setCtlDraft('') } }}
              placeholder={s.controllablePh}
              className="flex-1 rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {controllable.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-medium bg-navy-soft text-navy px-3 py-1.5 rounded-full">
                {c}
                <button onClick={() => setControllable((prev) => prev.filter((_, idx) => idx !== i))}><X size={11} /></button>
              </span>
            ))}
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold text-ink mb-2">{s.uncontrollable}</h4>
          <div className="flex gap-2 mb-3">
            <input
              value={unctlDraft}
              onChange={(e) => setUnctlDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && unctlDraft.trim()) { setUncontrollable((p) => [...p, unctlDraft.trim()]); setUnctlDraft('') } }}
              placeholder={s.uncontrollablePh}
              className="flex-1 rounded-xl border border-ink/10 px-3 py-2 text-sm outline-none focus:border-navy"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {uncontrollable.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5 text-xs font-medium bg-ink/[0.06] text-inkmute px-3 py-1.5 rounded-full">
                {c}
                <button onClick={() => setUncontrollable((prev) => prev.filter((_, idx) => idx !== i))}><X size={11} /></button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </JourneyLayout>
  )
}
