import { motion } from 'framer-motion'

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero() {
  return (
    <section className="bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32 grid md:grid-cols-2 gap-12 md:gap-16 items-center">

        {/* Левая колонка */}
        <div>
          <motion.p {...fadeUp(0)} className="text-muted text-xs tracking-[0.2em] uppercase mb-6">
            Швейное производство · B2B
          </motion.p>
          <motion.h1 {...fadeUp(0.1)} className="font-heading text-4xl md:text-6xl italic leading-[1.1] mb-6">
            Ваша коллекция начинается с точного расчёта
          </motion.h1>
          <motion.p {...fadeUp(0.2)} className="text-[#c4b9ad] text-lg leading-relaxed mb-10 max-w-md">
            Узнайте стоимость пошива за 2 минуты — до звонка в ателье.
            Прозрачный расчёт по параметрам вашей коллекции.
          </motion.p>
          <motion.a
            {...fadeUp(0.3)}
            href="#calculator"
            className="inline-block bg-accent hover:bg-accent2 text-white font-medium px-8 py-4 rounded transition-colors"
          >
            Рассчитать коллекцию →
          </motion.a>
        </div>

        {/* Правая колонка — превью калькулятора */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="bg-surface rounded-2xl p-8 shadow-2xl"
        >
          <p className="font-heading text-xl text-text-main mb-6">Быстрый расчёт</p>

          <div className="space-y-4 mb-6">
            <PreviewField label="Изделие" value="Платье" />
            <PreviewField label="Тираж" value="51–100 единиц" />
            <PreviewField label="Материал" value="Шёлк" />
          </div>

          <div className="border-t border-border pt-5">
            <p className="text-muted text-xs uppercase tracking-widest mb-2">Примерная стоимость</p>
            <p className="font-heading text-3xl text-text-main leading-tight">
              4 590 — 6 210{' '}
              <span className="text-xl font-normal">₽/ед.</span>
            </p>
            <p className="text-muted text-sm mt-1">За партию: 234 090 — 316 710 ₽</p>
          </div>

          <a
            href="#calculator"
            className="mt-6 block w-full bg-accent hover:bg-accent2 text-white text-sm font-medium py-3 rounded text-center transition-colors"
          >
            Рассчитать свою коллекцию
          </a>
        </motion.div>

      </div>
    </section>
  )
}

function PreviewField({ label, value }) {
  return (
    <div>
      <p className="text-muted text-xs uppercase tracking-widest mb-1">{label}</p>
      <div className="bg-bg rounded-lg px-4 py-3 text-text-main text-sm border border-border">
        {value}
      </div>
    </div>
  )
}
