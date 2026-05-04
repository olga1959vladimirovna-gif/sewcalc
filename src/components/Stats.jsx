import { useEffect, useRef, useState } from 'react'

const STATS = [
  { value: 12, prefix: '', suffix: '+', label: 'лет на рынке',           sub: 'Работаем с 2012 года' },
  { value: 400, prefix: '', suffix: '+', label: 'коллекций выпущено',    sub: 'Для брендов из 12 городов' },
  { value: 30,  prefix: 'от ', suffix: '', label: 'единиц — минимальный тираж', sub: 'Беремся за небольшие партии' },
]

function useCounter(target, duration = 1500, active) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let start = null
    const step = (ts) => {
      if (!start) start = ts
      const progress = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, duration])

  return count
}

function StatItem({ value, prefix, suffix, label, sub, active }) {
  const count = useCounter(value, 1200, active)

  return (
    <div className="text-center">
      <p className="font-heading text-6xl md:text-7xl italic text-white leading-none mb-3">
        {prefix}{active ? count : 0}{suffix}
      </p>
      <p className="text-[#c4b9ad] font-medium mb-1">{label}</p>
      <p className="text-muted text-sm">{sub}</p>
    </div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.4 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="bg-dark py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl italic text-white text-center mb-16">
          Цифры говорят сами
        </h2>
        <div className="grid md:grid-cols-3 gap-12">
          {STATS.map((s) => (
            <StatItem key={s.label} {...s} active={active} />
          ))}
        </div>
      </div>
    </section>
  )
}
