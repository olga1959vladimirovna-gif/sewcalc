import { motion } from 'framer-motion'
import FadeIn from './FadeIn'

const CARDS = [
  {
    emoji: '🧵',
    title: 'Работа мастеров',
    text: 'Зарплата швей, раскройщиков и технологов. Зависит от типа изделия и сложности конструкции.',
  },
  {
    emoji: '🪡',
    title: 'Материалы',
    text: 'Ткань, фурнитура, нитки и отделка по вашим параметрам. Можете привезти свои — стоимость снизится.',
  },
  {
    emoji: '📦',
    title: 'Накладные расходы',
    text: 'Аренда цеха, обслуживание оборудования, упаковка и логистика внутри производства.',
  },
  {
    emoji: '⚡',
    title: 'Срочность',
    text: 'Ускоренный запуск требует перераспределения мощностей. Стандартный срок — без доплат.',
  },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function PriceBreakdown() {
  return (
    <section id="production" className="bg-bg py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <h2 className="font-heading text-4xl md:text-5xl italic text-text-main mb-4">
            Из чего складывается цена
          </h2>
          <p className="text-muted max-w-xl mx-auto">
            Калькулятор учитывает все статьи — никаких скрытых наценок после согласования
          </p>
        </FadeIn>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {CARDS.map((c) => (
            <motion.div
              key={c.title}
              variants={card}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className="bg-surface rounded-2xl p-6 border border-border hover:border-accent/30 hover:shadow-md transition-colors"
            >
              <span className="text-3xl block mb-4">{c.emoji}</span>
              <h3 className="font-heading text-xl text-text-main mb-2">{c.title}</h3>
              <p className="text-muted text-sm leading-relaxed">{c.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
