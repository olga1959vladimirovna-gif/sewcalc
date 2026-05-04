# SewCalc — контекст проекта для Claude

## Что строим
Одностраничный лендинг + интерактивный калькулятор стоимости пошива коллекции одежды.
Стек: React 18 + Vite + Tailwind CSS v3 + Framer Motion + React Hook Form.

## Полный бриф
Все детали — в [BRIEF.md](./BRIEF.md): дизайн-система, структура страниц, логика калькулятора, формула расчёта.

## Стек
- React 18 + Vite (`.jsx`, не TypeScript)
- Tailwind CSS v3 с кастомными токенами из брифа
- Framer Motion — анимации
- React Hook Form — форма заявки
- Google Fonts: Cormorant Garamond (заголовки) + DM Sans (текст)

## Структура компонентов
```
src/
  components/
    Nav.jsx          — sticky-навигация
    Hero.jsx         — первый экран, тёмный фон #2b231a
    PriceBreakdown.jsx — 4 карточки «из чего складывается цена»
    Calculator.jsx   — мультишаговый калькулятор (4 шага)
    HowItWorks.jsx   — 3 шага таймлайна
    Stats.jsx        — цифры производства, тёмный фон
    FAQ.jsx          — аккордеон 6 вопросов
    Footer.jsx       — финальный CTA + форма заявки
```

## CSS-переменные (уже в src/index.css)
```
--color-dark: #2b231a
--color-bg: #f7f3ed
--color-surface: #ede8df
--color-accent: #b8862a
--color-accent2: #d4a54a
--color-muted: #9a8068
--color-text: #3d3128
--color-border: #d8cfbf
```

## Команды
```bash
npm run dev      # dev-сервер на localhost:5173
npm run build    # production-сборка
npm run preview  # превью сборки
```

## Прогресс этапов
- [x] Этап 1 — Инициализация (структура, конфиги, стаб-компоненты)
- [ ] Этап 2 — Nav + Hero
- [ ] Этап 3 — Калькулятор
- [ ] Этап 4 — Контентные секции
- [ ] Этап 5 — Форма + Footer
- [ ] Этап 6 — Анимации + адаптив
- [ ] Этап 7 — Деплой
