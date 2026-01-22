import { useState } from "react"

export function useToggle(initial = false) {
  const [value, setValue] = useState(initial)

  const toggle = () => setValue(v => !v)
  const open = () => setValue(true)
  const close = () => setValue(false)

  return { value, toggle, open, close }
}