import { motion } from 'framer-motion'
import { Sparkle } from 'lucide-react'

export default function EncouragementBanner({ text, tone = 'violet' }) {
  const toneMap = {
    violet: 'bg-violet-soft text-violet-deep',
    teal: 'bg-teal-soft text-teal-deep',
    amber: 'bg-amber-soft text-amber-deep',
    navy: 'bg-navy-soft text-navy',
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium ${toneMap[tone]}`}
    >
      <Sparkle size={14} strokeWidth={2.5} />
      <span>{text}</span>
    </motion.div>
  )
}
