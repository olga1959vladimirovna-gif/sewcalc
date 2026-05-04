import { AnimatePresence, motion } from 'framer-motion'

export default function Toast({ show, message = 'Готово!' }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 40, x: '-50%' }}
          animate={{ opacity: 1, y: 0,  x: '-50%' }}
          exit={{    opacity: 0, y: 40,  x: '-50%' }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-8 left-1/2 z-50 bg-dark border border-accent/40 text-white px-6 py-3 rounded-full shadow-2xl text-sm whitespace-nowrap"
        >
          <span className="text-accent mr-2">✓</span>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
