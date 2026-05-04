import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const STEPS = [
  {
    n: '01',
    title: 'Рассчитайте',
    text: 'Введите параметры коллекции в калькуляторе — тип изделия, тираж, материал и срок. Займёт 2 минуты.',
  },
  {
    n: '02',
    title: 'Обсудите детали',
    text: 'Мы свяжемся в течение часа, уточним замеры, конструкцию и дадим точную смету под ваш проект.',
  },
  {
    n: '03',
    title: 'Получите коллекцию',
    text: 'Запускаем производство по согласованной смете. Сдаём в срок — без сюрпризов по цене.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

export default function HowItWorks() {
  return (
    <section id="how" className="bg-bg py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl italic text-text-main mb-4">
            Как это работает
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            От расчёта до готовой коллекции — три простых шага
          </p>
        </FadeIn>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="relative grid md:grid-cols-3 gap-10"
        >
          {/* Линия между шагами (desktop) */}
          <div className="hidden md:block absolute top-8 left-[calc(16.66%+1rem)] right-[calc(16.66%+1rem)] h-px bg-border" />

          {STEPS.map((step) => (
            <motion.div key={step.n} variants={item} className="flex flex-col items-center text-center">
              <div className="relative w-16 h-16 rounded-full bg-surface border-2 border-accent flex items-center justify-center mb-6 z-10">
                <span className="font-heading text-xl font-semibold text-accent">{step.n}</span>
              </div>
              <h3 className="font-heading text-2xl italic text-text-main mb-3">{step.title}</h3>
              <p className="text-muted text-sm leading-relaxed max-w-xs">{step.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
