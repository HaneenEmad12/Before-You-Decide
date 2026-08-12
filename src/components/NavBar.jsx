import { Link, useNavigate } from 'react-router-dom'
import { Compass, Languages } from 'lucide-react'
import { useDecision } from '../context/DecisionContext'
import { useLanguage } from '../i18n/LanguageContext'

export default function NavBar() {
  const { decision, reset } = useDecision()
  const navigate = useNavigate()
  const { t, lang, toggleLang } = useLanguage()

  const handleNew = () => {
    if (decision.title && !confirm(t.nav.confirmNew)) return
    reset()
    navigate('/new')
  }

  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-paper/80 border-b border-ink/[0.06]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-navy text-paper">
            <Compass size={17} strokeWidth={2.25} />
          </span>
          <span className="font-display text-lg tracking-tight text-ink">{t.nav.brand}</span>
        </Link>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLang}
            aria-label="Switch language / تبديل اللغة"
            className="inline-flex items-center gap-1.5 text-sm font-medium px-3.5 py-2 rounded-full border border-ink/10 text-ink hover:border-navy hover:text-navy transition-colors"
          >
            <Languages size={15} />
            {lang === 'en' ? 'العربية' : 'English'}
          </button>
          <button
            onClick={handleNew}
            className="text-sm font-medium px-4 py-2 rounded-full border border-ink/10 text-ink hover:border-navy hover:text-navy transition-colors"
          >
            {t.nav.startDecision}
          </button>
        </div>
      </div>
    </header>
  )
}
