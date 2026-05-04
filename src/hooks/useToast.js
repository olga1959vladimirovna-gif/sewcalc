import { useState } from 'react'

export function useToast(duration = 3500) {
  const [show, setShow] = useState(false)

  const trigger = () => {
    setShow(true)
    setTimeout(() => setShow(false), duration)
  }

  return { show, trigger }
}
