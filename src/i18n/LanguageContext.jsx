import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { translations } from './translations'

const STORAGE_KEY = 'byd:lang:v1'
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved === 'en' || saved === 'ar') return saved
    } catch (e) { /* ignore */ }
    return 'en'
  })

  const dir = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = dir
    document.documentElement.classList.toggle('font-arabic', lang === 'ar')
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch (e) { /* ignore */ }
  }, [lang, dir])

  const toggleLang = useCallback(() => {
    setLang((l) => (l === 'en' ? 'ar' : 'en'))
  }, [])

  const t = useMemo(() => translations[lang], [lang])

  const value = useMemo(() => ({ lang, dir, t, toggleLang, setLang, isRtl: dir === 'rtl' }), [lang, dir, t, toggleLang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}
