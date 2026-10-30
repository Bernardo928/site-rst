import { useEffect, useState } from 'react'
import { openStatus, type OpenStatus } from '../lib/hours'

// Calculado só no navegador: o HTML pré-renderizado não sabe a hora da visita.
export function useOpenStatus(): OpenStatus | null {
  const [status, setStatus] = useState<OpenStatus | null>(null)
  useEffect(() => {
    setStatus(openStatus())
    const id = setInterval(() => setStatus(openStatus()), 60_000)
    return () => clearInterval(id)
  }, [])
  return status
}
