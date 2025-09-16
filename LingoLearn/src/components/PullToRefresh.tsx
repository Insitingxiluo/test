import { Box, Spinner, Text } from '@chakra-ui/react'
import { ReactNode, useMemo, useRef, useState } from 'react'

const PULL_THRESHOLD = 60

export function PullToRefresh({ children, onRefresh }: { children: ReactNode; onRefresh: () => Promise<void> }) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const startY = useRef<number | null>(null)

  const handleTouchStart = (event: React.TouchEvent) => {
    if (window.scrollY > 0 || isRefreshing) return
    startY.current = event.touches[0]?.clientY ?? null
  }

  const handleTouchMove = (event: React.TouchEvent) => {
    if (startY.current == null) return
    const distance = Math.max(0, (event.touches[0]?.clientY ?? 0) - startY.current)
    setPullDistance(distance)
  }

  const handleTouchEnd = async () => {
    if (pullDistance > PULL_THRESHOLD) {
      setIsRefreshing(true)
      // 触发外部刷新逻辑，可对接服务端或缓存刷新
      await onRefresh()
      setIsRefreshing(false)
    }
    setPullDistance(0)
    startY.current = null
  }

  const indicator = useMemo(() => {
    if (isRefreshing) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" py={2}>
          <Spinner size="sm" mr={2} />
          <Text fontSize="sm">正在刷新...</Text>
        </Box>
      )
    }

    if (pullDistance > 0) {
      return (
        <Box textAlign="center" py={2} fontSize="xs" color="gray.500">
          {pullDistance > PULL_THRESHOLD ? '松开刷新' : '下拉刷新'}
        </Box>
      )
    }

    return null
  }, [isRefreshing, pullDistance])

  return (
    <Box onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} pt={pullDistance > 0 ? 4 : 0} transition="padding-top 0.2s">
      {indicator}
      {children}
    </Box>
  )
}
