import { useState, useEffect } from 'react'

const links = [
  { label: 'Производство', href: '#production' },
  { label: 'Расчёт', href: '#calculator' },
  { label: 'Как работает', href: '#how' },
  { label: 'Контакт', href: '#contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`sticky top-0 z-50 bg-bg transition-shadow duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-heading text-2xl font-semibold text-text-main">
          SewCalc
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-text-main transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#calculator"
            className="bg-accent hover:bg-accent2 text-white text-sm font-medium px-5 py-2.5 rounded transition-colors"
          >
            Рассчитать стоимость
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden text-text-main text-xl leading-none"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Меню"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-bg px-6 py-5 flex flex-col gap-4">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-text-main transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#calculator"
            className="bg-accent text-white text-sm font-medium px-5 py-3 rounded text-center"
            onClick={() => setMenuOpen(false)}
          >
            Рассчитать стоимость
          </a>
        </div>
      )}
    </nav>
  )
}
