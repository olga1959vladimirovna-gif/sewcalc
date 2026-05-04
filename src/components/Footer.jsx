import { useForm } from 'react-hook-form'
import FadeIn from './FadeIn'
import Toast from './Toast'
import { useToast } from '../hooks/useToast'

const SOCIALS = [
  { label: 'Telegram',  href: 'https://t.me/OlgaMerdjanova' },
  { label: 'ВКонтакте', href: 'https://vk.ru/id84620412' },
  { label: 'WhatsApp',  href: 'https://wa.me/79649085822' },
]

function ContactForm() {
  const { show, trigger } = useToast()
  const { register, handleSubmit, reset, formState: { errors } } = useForm()

  const onSubmit = () => {
    trigger()
    reset()
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
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
              placeholder="Название бренда"
              className="w-full bg-[#3d3128] text-white placeholder-muted rounded-lg px-4 py-3 text-sm border border-[#4d3d2e] focus:outline-none focus:border-accent"
            />
          </div>
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
        <p className="text-muted text-xs text-center mt-3">
          Демо-версия · Форма подключается при запуске проекта
        </p>
      </form>
      <Toast show={show} message="Заявка отправлена! Свяжемся в течение часа." />
    </>
  )
}

export default function Footer() {
  return (
    <footer id="contact" className="bg-dark px-6 pt-20 pb-10">
      <div className="max-w-3xl mx-auto">

        {/* Цитата */}
        <FadeIn className="text-center mb-16">
          <span className="block text-accent font-heading text-6xl leading-none mb-2">"</span>
          <p className="font-heading text-2xl md:text-3xl italic text-white leading-snug">
            Мы считаем каждую деталь —<br className="hidden sm:block" />
            чтобы вы могли считать на нас
          </p>
        </FadeIn>

        {/* Форма */}
        <FadeIn delay={0.1} className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl italic text-white text-center mb-3">
            Начнём вашу коллекцию?
          </h2>
          <p className="text-muted text-sm text-center mb-8">
            Оставьте заявку — ответим в течение часа
          </p>
          <ContactForm />
        </FadeIn>

        {/* Низ */}
        <div className="border-t border-[#3d3128] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <span className="font-heading text-xl text-white">SewCalc</span>
          <div className="flex gap-6">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.href} className="text-muted hover:text-white text-sm transition-colors">
                {s.label}
              </a>
            ))}
          </div>
          <p className="text-muted text-xs">© 2026 SewCalc</p>
        </div>

      </div>
    </footer>
  )
}
