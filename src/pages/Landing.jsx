import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ArrowLeft, Compass, Target, GitCompare, Layers3, TrendingUp, Map } from 'lucide-react'
import DecisionPathHero from '../components/DecisionPathHero'
import NavBar from '../components/NavBar'
import { getExampleDecisions } from '../data/bank'
import { useLanguage } from '../i18n/LanguageContext'

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] } }),
}

const STAGE_ICONS = [Compass, Target, GitCompare, Layers3, TrendingUp, Map]
const STAGE_COLORS = ['navy', 'violet', 'teal', 'amber', 'coral', 'navy']

const colorClasses = {
  navy: 'bg-navy-soft text-navy',
  violet: 'bg-violet-soft text-violet-deep',
  teal: 'bg-teal-soft text-teal-deep',
  amber: 'bg-amber-soft text-amber-deep',
  coral: 'bg-coral-soft text-coral-deep',
}

export default function Landing() {
  const { t, lang, isRtl } = useLanguage()
  const CtaArrow = isRtl ? ArrowLeft : ArrowRight
  const exampleDecisions = getExampleDecisions(lang)

  return (
    <div>
      <NavBar />

      {/* Hero */}
      <section className="relative overflow-hidden bg-grain">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 pt-16 sm:pt-24 pb-20 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <motion.div initial="hidden" animate="visible" custom={0} variants={fadeUp}
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-violet-deep bg-violet-soft px-3 py-1.5 rounded-full mb-6">
              {t.landing.eyebrow}
            </motion.div>
            <motion.h1 initial="hidden" animate="visible" custom={1} variants={fadeUp}
              className="font-display text-5xl sm:text-6xl leading-[1.05] text-ink text-balance">
              {t.landing.title}
            </motion.h1>
            <motion.p initial="hidden" animate="visible" custom={2} variants={fadeUp}
              className="font-display text-2xl sm:text-3xl text-navy mt-4 text-balance">
              {t.landing.subtitle1}<br />{t.landing.subtitle2}
            </motion.p>
            <motion.p initial="hidden" animate="visible" custom={3} variants={fadeUp}
              className="text-inkmute text-lg mt-6 max-w-md leading-relaxed">
              {t.landing.lead}
            </motion.p>
            <motion.div initial="hidden" animate="visible" custom={4} variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-8">
              <Link to="/new" className="inline-flex items-center gap-2 bg-navy text-paper font-medium px-6 py-3.5 rounded-full shadow-lift hover:bg-navy-deep transition-colors">
                {t.landing.cta} <CtaArrow size={17} />
              </Link>
              <a href="#how-it-works" className="inline-flex items-center gap-2 text-ink font-medium px-6 py-3.5 rounded-full border border-ink/12 hover:border-navy hover:text-navy transition-colors">
                {t.landing.how}
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <DecisionPathHero />
          </motion.div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28 scroll-mt-16">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}>
          <div className="text-xs font-mono uppercase tracking-widest text-teal-deep mb-3">{t.landing.howEyebrow}</div>
          <h2 className="font-display text-3xl sm:text-4xl text-ink max-w-xl text-balance">{t.landing.howTitle}</h2>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-12">
          {t.landing.stages.map((s, i) => {
            const Icon = STAGE_ICONS[i]
            const color = STAGE_COLORS[i]
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
                whileHover={{ y: -4 }}
                className="bg-surface rounded-2xl border border-ink/[0.06] shadow-soft p-6"
              >
                <div className={`w-11 h-11 rounded-xl grid place-items-center mb-4 ${colorClasses[color]}`}>
                  <Icon size={20} strokeWidth={2} />
                </div>
                <div className="font-display text-lg text-ink mb-1.5">{s.title}</div>
                <p className="text-sm text-inkmute leading-relaxed">{s.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Example decisions */}
      <section className="max-w-6xl mx-auto px-5 sm:px-8 py-20 sm:py-28">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.6 }}
          className="bg-navy rounded-[2rem] px-6 sm:px-14 py-14 sm:py-16 relative overflow-hidden">
          <div className="absolute -right-16 -top-16 w-72 h-72 rounded-full bg-violet opacity-20 blur-0" />
          <div className="relative">
            <div className="text-xs font-mono uppercase tracking-widest text-amber mb-3">{t.landing.examplesEyebrow}</div>
            <h2 className="font-display text-3xl sm:text-4xl text-paper max-w-xl text-balance mb-8">{t.landing.examplesTitle}</h2>
            <div className="flex flex-wrap gap-3">
              {exampleDecisions.map((ex, i) => (
                <motion.div
                  key={ex}
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                >
                  <Link
                    to="/new"
                    state={{ prefill: ex }}
                    className="inline-block text-sm font-medium text-navy bg-paper/95 hover:bg-paper px-4 py-2.5 rounded-full transition-colors"
                  >
                    {ex}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Closing */}
      <section className="max-w-3xl mx-auto px-5 sm:px-8 pb-28 text-center">
        <motion.p initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="font-display text-2xl sm:text-3xl text-ink text-balance">
          {t.landing.closingQuote}
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.2 }}>
          <Link to="/new" className="inline-flex items-center gap-2 bg-navy text-paper font-medium px-6 py-3.5 rounded-full shadow-lift hover:bg-navy-deep transition-colors mt-8">
            {t.landing.cta} <CtaArrow size={17} />
          </Link>
        </motion.div>
      </section>

      <footer className="border-t border-ink/[0.06] py-8">
        <div className="max-w-6xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-inkmute">
          <span>{t.landing.footerLeft}</span>
          <span>{t.landing.footerRight}</span>
        </div>
      </footer>
    </div>
  )
}
