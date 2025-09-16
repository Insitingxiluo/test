import { TouchEvent, useCallback, useRef } from 'react'

export type SwipeHandlers = {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
}

export function useSwipe({ onSwipeLeft, onSwipeRight }: SwipeHandlers) {
  const touchStartX = useRef<number | null>(null)
  const threshold = 40

  const onTouchStart = useCallback((event: TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }, [])

  const onTouchEnd = useCallback(
    (event: TouchEvent) => {
      if (touchStartX.current == null) return
      const deltaX = (event.changedTouches[0]?.clientX ?? 0) - touchStartX.current
      if (Math.abs(deltaX) < threshold) return
      if (deltaX < 0) {
        onSwipeLeft?.()
      } else {
        onSwipeRight?.()
      }
      touchStartX.current = null
    },
    [onSwipeLeft, onSwipeRight]
  )

  return { onTouchStart, onTouchEnd }
}
