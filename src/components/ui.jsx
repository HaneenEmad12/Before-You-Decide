export function BigTextArea({ value, onChange, placeholder, rows = 4, label }) {
  return (
    <label className="block">
      {label && <span className="block text-sm font-medium text-ink mb-2">{label}</span>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full rounded-2xl border border-ink/10 bg-surface px-5 py-4 text-lg font-display text-ink placeholder:text-inkmute/50 placeholder:font-sans placeholder:text-base focus:border-navy focus:ring-2 focus:ring-navy/10 outline-none transition-colors resize-none shadow-soft"
      />
    </label>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-surface rounded-2xl border border-ink/[0.06] shadow-soft p-6 ${className}`}>
      {children}
    </div>
  )
}
