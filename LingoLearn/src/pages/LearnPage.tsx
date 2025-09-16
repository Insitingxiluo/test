import { Box, Stack } from '@chakra-ui/react'
import { useCallback, useState } from 'react'
import { PullToRefresh } from '../components/PullToRefresh'
import { WordCarousel } from '../components/WordCarousel'
import { LessonData } from '../types'

export function LearnPage({ data, onRefresh }: { data: LessonData; onRefresh: () => Promise<void> }) {
  const [favorites, setFavorites] = useState<Record<string, boolean>>({})

  const handleFavoriteChange = useCallback((id: string, value: boolean) => {
    setFavorites(prev => ({ ...prev, [id]: value }))
  }, [])

  return (
    <PullToRefresh onRefresh={onRefresh}>
      <Box px={4} py={6} pb={24}>
        <Stack spacing={6}>
          {/* WordCarousel 集成卡片翻转、左右滑动与收藏等交互 */}
          <WordCarousel words={data.words} favorites={favorites} onFavoriteChange={handleFavoriteChange} />
        </Stack>
      </Box>
    </PullToRefresh>
  )
}
