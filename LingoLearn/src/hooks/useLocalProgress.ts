import { useEffect, useState } from 'react'
import { ProgressSummary } from '../types'

const STORAGE_KEY = 'lingolearn-progress'

export function useLocalProgress(initialValue?: ProgressSummary) {
  const [progress, setProgress] = useState<ProgressSummary | undefined>(() => {
    if (typeof window === 'undefined') return initialValue
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return initialValue
    try {
      return JSON.parse(stored) as ProgressSummary
    } catch (error) {
      console.error('读取进度失败', error)
      return initialValue
    }
  })

  useEffect(() => {
    if (!progress) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  return { progress, setProgress }
}
