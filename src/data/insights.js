import { MISSING_INFO_BANK, GENERIC_MISSING_INFO } from './bank'

// All heuristics below are deliberately simple and transparent.
// They are reflections of what the user entered, not predictions.
export function computeScores(d) {
  const stepsFilled = [
    d.title?.trim().length > 0,
    d.priorities?.length >= 3,
    d.optionNames?.length >= 2,
    d.facts?.length + d.assumptions?.length >= 2,
    d.riskItems?.length >= 2,
    d.scenarios?.best && d.scenarios?.likely && d.scenarios?.worst,
  ]
  const completeness = stepsFilled.filter(Boolean).length / stepsFilled.length

  const knownTotal = (d.facts?.length || 0) + (d.assumptions?.length || 0)
  const factRatio = knownTotal > 0 ? (d.facts.length / knownTotal) : 0.5

  const avgRisk = d.riskItems?.length
    ? d.riskItems.reduce((s, r) => s + (r.risk || 5), 0) / d.riskItems.length / 10
    : 0.4

  const avgImpact = d.riskItems?.length
    ? d.riskItems.reduce((s, r) => s + (r.impact || 5), 0) / d.riskItems.length / 10
    : 0.4

  const clarity = Math.round(clamp01(completeness * 0.6 + factRatio * 0.4) * 100)
  const confidence = Math.round(clamp01(factRatio * 0.5 + completeness * 0.3 + (1 - avgRisk) * 0.2) * 100)
  const uncertainty = Math.round(clamp01(1 - factRatio) * 100)
  const riskExposure = Math.round(clamp01(avgRisk * 0.6 + avgImpact * 0.4) * 100)

  return { clarity, confidence, uncertainty, riskExposure, completeness }
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n))
}

export function selectMissingInfo(d, lang = 'en') {
  const bankForCategory = MISSING_INFO_BANK[d.category] || []
  const combined = [...bankForCategory, ...GENERIC_MISSING_INFO]
  // De-duplicate and cap at 5
  const seen = new Set()
  const out = []
  for (const item of combined) {
    const key = item.q.en
    if (seen.has(key)) continue
    seen.add(key)
    out.push({ q: item.q[lang] || item.q.en, why: item.why[lang] || item.why.en, next: item.next[lang] || item.next.en })
    if (out.length >= 5) break
  }
  return out
}

export function topN(arr, key, n = 3) {
  return [...arr].sort((a, b) => (b[key] || 0) - (a[key] || 0)).slice(0, n)
}

// Generates one concrete, honest recommendation from the numbers the user
// actually entered — not a prediction, but a real read of their own data.
export function generateAdvice(decision, scores, optionTotals, t, nextStep) {
  const a = t.advice
  const hasOptions = optionTotals.length >= 2
  const completeness = scores.completeness ?? 0

  // Not enough entered yet to say anything meaningful.
  if (completeness < 0.5) {
    return { title: a.lowInfoTitle, body: a.lowInfoBody, nextStep }
  }

  if (hasOptions) {
    const [top, second] = optionTotals
    const maxPossible = decision.factors.filter((f) => f.label.trim()).length * 10 || 1
    const gap = (top.total - second.total) / maxPossible

    if (gap >= 0.15) {
      return { title: a.leanTitle(top.name), body: a.leanBody(top.name, second.name), nextStep }
    }
    if (scores.riskExposure >= 65) {
      return { title: a.highRiskTitle, body: a.highRiskBody, nextStep }
    }
    return { title: a.closeTitle, body: a.closeBody(top.name, second.name), nextStep }
  }

  if (scores.riskExposure >= 65) {
    return { title: a.highRiskTitle, body: a.highRiskBody, nextStep }
  }

  if (scores.confidence >= 70 && scores.clarity >= 70) {
    return { title: a.highConfTitle, body: a.highConfBody, nextStep }
  }

  return { title: a.defaultTitle, body: a.defaultBody, nextStep }
}
