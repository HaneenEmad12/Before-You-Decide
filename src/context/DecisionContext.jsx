import { createContext, useContext, useEffect, useState, useCallback } from 'react'

const STORAGE_KEY = 'byd:decision:v1'

const uid = () => Math.random().toString(36).slice(2, 10)

export const emptyDecision = () => ({
  id: uid(),
  createdAt: Date.now(),
  category: null,
  title: '',
  why: '',
  change: '',
  priorities: [], // { id, label, score }
  optionNames: [], // ['Stay', 'Leave']
  factors: [], // { id, label }
  optionScores: {}, // { [optionIndex]: { [factorId]: number } }
  facts: [],
  assumptions: [],
  riskItems: [], // { id, label, type: 'risk'|'opportunity', risk: 1-10, impact: 1-10 }
  controllable: [],
  uncontrollable: [],
  scenarios: { best: '', likely: '', worst: '' },
  completedSteps: [],
})

const DecisionContext = createContext(null)

export function DecisionProvider({ children }) {
  const [decision, setDecision] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) return { ...emptyDecision(), ...JSON.parse(raw) }
    } catch (e) {
      /* ignore corrupted storage */
    }
    return emptyDecision()
  })

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(decision))
    } catch (e) {
      /* storage may be unavailable, fail silently */
    }
  }, [decision])

  const update = useCallback((patch) => {
    setDecision((d) => ({ ...d, ...(typeof patch === 'function' ? patch(d) : patch) }))
  }, [])

  const markComplete = useCallback((step) => {
    setDecision((d) => ({
      ...d,
      completedSteps: d.completedSteps.includes(step) ? d.completedSteps : [...d.completedSteps, step],
    }))
  }, [])

  const reset = useCallback(() => {
    const fresh = emptyDecision()
    setDecision(fresh)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh))
    } catch (e) {}
  }, [])

  return (
    <DecisionContext.Provider value={{ decision, update, markComplete, reset, uid }}>
      {children}
    </DecisionContext.Provider>
  )
}

export function useDecision() {
  const ctx = useContext(DecisionContext)
  if (!ctx) throw new Error('useDecision must be used within DecisionProvider')
  return ctx
}
