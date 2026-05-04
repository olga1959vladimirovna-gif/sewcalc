import { useState } from 'react'
import { useForm } from 'react-hook-form'

// ─── Данные ───────────────────────────────────────────────────────────────────

const ITEM_TYPES = [
  { id: 'top',     label: 'Топ',     emoji: '👕', coef: 1.0 },
  { id: 'pants',   label: 'Брюки',   emoji: '👖', coef: 1.2 },
  { id: 'dress',   label: 'Платье',  emoji: '👗', coef: 1.5 },
  { id: 'jacket',  label: 'Жакет',   emoji: '🧥', coef: 1.8 },
  { id: 'coat',    label: 'Пальто',  emoji: '🧣', coef: 2.2 },
  { id: 'other',   label: 'Другое',  emoji: '✂️', coef: 1.4 },
]

const QUANTITIES = [
  { id: 'small',    label: '30–50 ед.',   sub: 'малый тираж',     coef: 1.15, qMin: 30,  qMax: 50  },
  { id: 'standard', label: '51–100 ед.',  sub: 'стандарт',        coef: 1.00, qMin: 51,  qMax: 100 },
  { id: 'wholesale',label: '101–300 ед.', sub: 'оптовая скидка',  coef: 0.90, qMin: 101, qMax: 300 },
  { id: 'bulk',     label: '300+ ед.',    sub: 'крупный опт',     coef: 0.80, qMin: 300, qMax: 500 },
]

const MATERIALS = [
  { id: 'own',    label: 'Ваш материал',   price: 0,    usage: 0   },
  { id: 'cotton', label: 'Хлопок',         price: 300,  usage: 2   },
  { id: 'knit',   label: 'Трикотаж',       price: 400,  usage: 1.5 },
  { id: 'silk',   label: 'Шёлк',           price: 900,  usage: 2   },
  { id: 'denim',  label: 'Деним',          price: 500,  usage: 1.8 },
  { id: 'coat',   label: 'Пальтовая ткань',price: 1200, usage: 2.5 },
]

const COMPLEXITIES = [
  { id: 'simple',  label: 'Простая',  desc: 'Базовый крой без декора',         coef: 1.0 },
  { id: 'medium',  label: 'Средняя',  desc: 'Карманы, молнии, детали',          coef: 1.3 },
  { id: 'high',    label: 'Высокая',  desc: 'Декор, подкладка, сложный крой',   coef: 1.7 },
  { id: 'couture', label: 'Кутюр',    desc: 'Ручная работа, уникальный крой',   coef: 2.2 },
]

const URGENCIES = [
  { id: 'standard', label: 'Стандарт', sub: '6 недель', coef: 1.0, badge: null    },
  { id: 'fast',     label: 'Быстро',   sub: '3 недели', coef: 1.2, badge: '+20%'  },
  { id: 'urgent',   label: 'Срочно',   sub: '1 неделя', coef: 1.5, badge: '+50%'  },
]

const STEP_LABELS = ['Изделие', 'Тираж', 'Материал', 'Срочность']

// ─── Формула ──────────────────────────────────────────────────────────────────

function calculate({ itemType, quantity, material, complexity, urgency }) {
  const labor    = 1500 * itemType.coef * complexity.coef
  const mat      = material.price * material.usage
  const overhead = (labor + mat) * 0.15
  const perUnit  = labor + mat + overhead

  const base = perUnit * quantity.coef * urgency.coef

  const range = (val) => [Math.round(val * 0.85), Math.round(val * 1.15)]

  const [lMin, lMax] = range(labor    * quantity.coef * urgency.coef)
  const [mMin, mMax] = range(mat      * quantity.coef * urgency.coef)
  const [oMin, oMax] = range(overhead * quantity.coef * urgency.coef)
  const [uMin, uMax] = range(base)

  return {
    labor:    [lMin, lMax],
    material: [mMin, mMax],
    overhead: [oMin, oMax],
    perUnit:  [uMin, uMax],
    batch:    [Math.round(uMin * quantity.qMin), Math.round(uMax * quantity.qMax)],
  }
}

const fmt = (n) => n.toLocaleString('ru-RU')

// ─── UI-примитивы ─────────────────────────────────────────────────────────────

function ProgressBar({ step }) {
  return (
    <div className="flex items-center mb-10">
      {STEP_LABELS.map((label, i) => (
        <div key={i} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                i < step
                  ? 'bg-accent text-white'
                  : i === step
                  ? 'bg-accent text-white ring-4 ring-accent/20'
                  : 'bg-border text-muted'
              }`}
            >
              {i < step ? '✓' : i + 1}
            </div>
            <span className={`text-xs mt-1 whitespace-nowrap ${i === step ? 'text-accent font-medium' : 'text-muted'}`}>
              {label}
            </span>
          </div>
          {i < STEP_LABELS.length - 1 && (
            <div className={`flex-1 h-px mx-2 mb-4 ${i < step ? 'bg-accent' : 'bg-border'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

function SelectCard({ label, sub, emoji, badge, selected, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
        selected
          ? 'border-accent bg-accent/5'
          : 'border-border bg-bg hover:border-accent/40'
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {emoji && <span className="text-xl">{emoji}</span>}
          <div>
            <p className="text-sm font-medium text-text-main">{label}</p>
            {sub && <p className="text-xs text-muted mt-0.5">{sub}</p>}
          </div>
        </div>
        {badge && (
          <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full font-medium">
            {badge}
          </span>
        )}
        {selected && (
          <span className="text-accent text-sm font-bold ml-2">✓</span>
        )}
      </div>
    </button>
  )
}

// ─── Шаги ─────────────────────────────────────────────────────────────────────

function StepItemType({ value, onChange }) {
  return (
    <div>
      <h3 className="font-heading text-2xl italic text-text-main mb-6">Что шьём?</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {ITEM_TYPES.map((item) => (
          <SelectCard
            key={item.id}
            label={item.label}
            emoji={item.emoji}
            selected={value?.id === item.id}
            onClick={() => onChange(item)}
          />
        ))}
      </div>
    </div>
  )
}

function StepQuantity({ value, onChange }) {
  return (
    <div>
      <h3 className="font-heading text-2xl italic text-text-main mb-6">Тираж коллекции</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {QUANTITIES.map((q) => (
          <SelectCard
            key={q.id}
            label={q.label}
            sub={q.sub}
            selected={value?.id === q.id}
            onClick={() => onChange(q)}
          />
        ))}
      </div>
    </div>
  )
}

function StepMaterial({ material, complexity, onMaterial, onComplexity }) {
  return (
    <div className="space-y-8">
      <div>
        <h3 className="font-heading text-2xl italic text-text-main mb-2">Материал</h3>
        <p className="text-muted text-sm mb-4">Если привезёте свою ткань — материал бесплатно</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {MATERIALS.map((m) => (
            <SelectCard
              key={m.id}
              label={m.label}
              sub={m.price > 0 ? `${fmt(m.price)} ₽/м · ${m.usage} м` : 'ваша ткань'}
              selected={material?.id === m.id}
              onClick={() => onMaterial(m)}
            />
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-heading text-2xl italic text-text-main mb-2">Сложность конструкции</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {COMPLEXITIES.map((c) => (
            <SelectCard
              key={c.id}
              label={c.label}
              sub={c.desc}
              selected={complexity?.id === c.id}
              onClick={() => onComplexity(c)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function StepUrgency({ value, onChange }) {
  return (
    <div>
      <h3 className="font-heading text-2xl italic text-text-main mb-6">Срок изготовления</h3>
      <div className="grid grid-cols-1 gap-3">
        {URGENCIES.map((u) => (
          <SelectCard
            key={u.id}
            label={u.label}
            sub={u.sub}
            badge={u.badge}
            selected={value?.id === u.id}
            onClick={() => onChange(u)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Результат ────────────────────────────────────────────────────────────────

function ResultRow({ label, min, max, bold }) {
  return (
    <div className={`flex justify-between items-center py-3 ${bold ? 'font-medium' : ''}`}>
      <span className={bold ? 'text-text-main' : 'text-muted text-sm'}>{label}</span>
      <span className={`tabular-nums ${bold ? 'text-text-main' : 'text-text-main text-sm'}`}>
        {fmt(min)} — {fmt(max)} ₽
      </span>
    </div>
  )
}

function Result({ selections, onReset }) {
  const result = calculate(selections)
  const [submitted, setSubmitted] = useState(false)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const onSubmit = () => setSubmitted(true)

  return (
    <div className="space-y-6">
      {/* Разбивка */}
      <div className="bg-bg rounded-2xl border border-border p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-heading text-2xl italic text-text-main">Результат расчёта</h3>
          <button onClick={onReset} className="text-muted hover:text-text-main text-xs transition-colors">
            ← Пересчитать
          </button>
        </div>

        {/* Параметры */}
        <div className="flex flex-wrap gap-2 mb-6">
          {[
            selections.itemType.label,
            selections.quantity.label,
            selections.material.label,
            selections.complexity.label,
            selections.urgency.label,
          ].map((tag) => (
            <span key={tag} className="bg-surface text-muted text-xs px-3 py-1 rounded-full border border-border">
              {tag}
            </span>
          ))}
        </div>

        {/* Строки разбивки */}
        <div className="divide-y divide-border">
          <ResultRow label="Работа мастеров"   min={result.labor[0]}    max={result.labor[1]}    />
          <ResultRow label="Материалы"          min={result.material[0]} max={result.material[1]} />
          <ResultRow label="Накладные расходы"  min={result.overhead[0]} max={result.overhead[1]} />
        </div>

        <div className="mt-4 pt-4 border-t-2 border-text-main space-y-2">
          <ResultRow label="Итого за единицу" min={result.perUnit[0]} max={result.perUnit[1]} bold />
          <div className="flex justify-between items-center">
            <span className="text-muted text-sm">Итого за партию ({selections.quantity.label})</span>
            <span className="font-heading text-2xl text-accent tabular-nums">
              {fmt(result.batch[0])} — {fmt(result.batch[1])} ₽
            </span>
          </div>
        </div>

        <p className="text-muted text-xs mt-4">
          * Диапазон учитывает возможные отклонения ±15%. Точная стоимость — после замеров и согласования.
        </p>
      </div>

      {/* Форма заявки */}
      <div className="bg-dark rounded-2xl p-8">
        {submitted ? (
          <div className="text-center py-4">
            <p className="font-heading text-2xl italic text-white mb-2">Заявка отправлена!</p>
            <p className="text-muted">Мы свяжемся с вами в течение часа.</p>
          </div>
        ) : (
          <>
            <h3 className="font-heading text-2xl italic text-white mb-2">
              Хотите точный расчёт?
            </h3>
            <p className="text-muted text-sm mb-6">
              Оставьте заявку — ответим в течение часа с учётом ваших параметров.
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  {...register('name', { required: 'Введите имя' })}
                  placeholder="Ваше имя"
                  className="w-full bg-[#3d3128] text-white placeholder-muted rounded-lg px-4 py-3 text-sm border border-[#4d3d2e] focus:outline-none focus:border-accent"
                />
                {errors.name && <p className="text-accent text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <input
                  {...register('brand')}
                  placeholder="Название бренда (необязательно)"
                  className="w-full bg-[#3d3128] text-white placeholder-muted rounded-lg px-4 py-3 text-sm border border-[#4d3d2e] focus:outline-none focus:border-accent"
                />
              </div>
              <div>
                <input
                  {...register('telegram', { required: 'Введите Telegram или телефон' })}
                  placeholder="Telegram или телефон"
                  className="w-full bg-[#3d3128] text-white placeholder-muted rounded-lg px-4 py-3 text-sm border border-[#4d3d2e] focus:outline-none focus:border-accent"
                />
                {errors.telegram && <p className="text-accent text-xs mt-1">{errors.telegram.message}</p>}
              </div>
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent2 text-white font-medium py-4 rounded-lg transition-colors"
              >
                Отправить заявку
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ─── Главный компонент ────────────────────────────────────────────────────────

export default function Calculator() {
  const [step, setStep] = useState(0)
  const [sel, setSel] = useState({
    itemType: null, quantity: null,
    material: null, complexity: null, urgency: null,
  })

  const set = (key) => (val) => setSel((s) => ({ ...s, [key]: val }))

  const canNext = [
    () => !!sel.itemType,
    () => !!sel.quantity,
    () => !!(sel.material && sel.complexity),
    () => !!sel.urgency,
  ][step]

  const showResult = step === 4

  return (
    <section id="calculator" className="bg-surface py-20 px-6">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-4xl md:text-5xl italic text-text-main text-center mb-3">
          Калькулятор стоимости
        </h2>
        <p className="text-muted text-center mb-12">
          4 шага — и вы узнаете примерную стоимость пошива вашей коллекции
        </p>

        {!showResult ? (
          <div className="bg-bg rounded-2xl shadow-sm border border-border p-8">
            <ProgressBar step={step} />

            {step === 0 && <StepItemType   value={sel.itemType}  onChange={set('itemType')}  />}
            {step === 1 && <StepQuantity   value={sel.quantity}  onChange={set('quantity')}  />}
            {step === 2 && (
              <StepMaterial
                material={sel.material}   onMaterial={set('material')}
                complexity={sel.complexity} onComplexity={set('complexity')}
              />
            )}
            {step === 3 && <StepUrgency    value={sel.urgency}   onChange={set('urgency')}   />}

            <div className="flex justify-between items-center mt-8 pt-6 border-t border-border">
              {step > 0 ? (
                <button
                  onClick={() => setStep((s) => s - 1)}
                  className="text-muted hover:text-text-main text-sm transition-colors"
                >
                  ← Назад
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext?.()}
                className={`px-8 py-3 rounded-lg font-medium text-sm transition-colors ${
                  canNext?.()
                    ? 'bg-accent hover:bg-accent2 text-white'
                    : 'bg-border text-muted cursor-not-allowed'
                }`}
              >
                {step === 3 ? 'Рассчитать →' : 'Далее →'}
              </button>
            </div>
          </div>
        ) : (
          <Result
            selections={sel}
            onReset={() => {
              setStep(0)
              setSel({ itemType: null, quantity: null, material: null, complexity: null, urgency: null })
            }}
          />
        )}
      </div>
    </section>
  )
}
