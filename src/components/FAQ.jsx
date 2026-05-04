import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import FadeIn from './FadeIn'

const ITEMS = [
  {
    q: 'Каков минимальный тираж?',
    a: 'Минимальный тираж — 30 единиц одного изделия. Для смешанных коллекций обсуждаем индивидуально: например, 15 платьев + 15 жакетов.',
  },
  {
    q: 'Могу я принести свою ткань?',
    a: 'Да, мы работаем с давальческим сырьём. Привезите ткань — стоимость материалов в расчёте обнулится. Принимаем ткани от 10 метров.',
  },
  {
    q: 'Сколько времени занимает пошив?',
    a: 'Стандартный срок — 6 недель с момента согласования лекал. Ускоренное производство (3 недели) и срочное (1 неделя) возможны с наценкой.',
  },
  {
    q: 'Делаете ли вы примерки?',
    a: 'Да. После раскроя пробной партии (2–3 единицы) приглашаем на примерку или отправляем образцы. Правки вносим до запуска тиража.',
  },
  {
    q: 'Как происходит оплата?',
    a: '50% предоплата при подписании договора, 50% — после приёмки готового заказа. Работаем с ИП и юрлицами по безналу, с физлицами — наличными.',
  },
  {
    q: 'Что если результат мне не подойдёт?',
    a: 'Все параметры фиксируются в договоре с техническим описанием. Если изделие не соответствует ТЗ — переделываем за свой счёт.',
  },
]

function AccordionItem({ q, a, open, onToggle }) {
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex justify-between items-start gap-4 py-5 text-left"
      >
        <span className="font-medium text-text-main">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-accent text-xl leading-none flex-shrink-0 mt-0.5"
        >
          +
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{   height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="text-muted text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null)

  return (
    <section className="bg-surface py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <h2 className="font-heading text-4xl md:text-5xl italic text-text-main mb-4">
            Частые вопросы
          </h2>
          <p className="text-muted">Если не нашли ответ — напишите нам в Telegram</p>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-bg rounded-2xl border border-border px-8">
            {ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                q={item.q}
                a={item.a}
                open={openIdx === i}
                onToggle={() => setOpenIdx(openIdx === i ? null : i)}
              />
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
