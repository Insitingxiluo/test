import { Box, HStack, IconButton, Stack, Text } from '@chakra-ui/react'
import { memo, useCallback, useState } from 'react'
import { HiOutlineChevronLeft, HiOutlineChevronRight } from 'react-icons/hi2'
import { Word } from '../types'
import { WordCard } from './WordCard'

export type WordCarouselProps = {
  words: Word[]
  favorites: Record<string, boolean>
  onFavoriteChange: (id: string, value: boolean) => void
}

export const WordCarousel = memo(function WordCarousel({ words, favorites, onFavoriteChange }: WordCarouselProps) {
  const [index, setIndex] = useState(0)

  const goNext = useCallback(() => {
    setIndex(prev => (prev + 1) % words.length)
  }, [words.length])

  const goPrev = useCallback(() => {
    setIndex(prev => (prev - 1 + words.length) % words.length)
  }, [words.length])

  if (!words.length) {
    return (
      <Stack spacing={4} align="center" py={16}>
        <Text color="gray.500">暂无学习单词，试试刷新吧。</Text>
      </Stack>
    )
  }

  return (
    <Stack spacing={4} align="center">
      <WordCard
        word={words[index]}
        isFavorite={Boolean(favorites[words[index].id])}
        onFavoriteChange={onFavoriteChange}
        onNext={goNext}
        onPrev={goPrev}
      />
      <HStack spacing={3}>
        <IconButton aria-label="上一张" icon={<HiOutlineChevronLeft />} onClick={goPrev} variant="ghost" />
        <Text fontSize="sm" color="gray.500">
          {index + 1} / {words.length}
        </Text>
        <IconButton aria-label="下一张" icon={<HiOutlineChevronRight />} onClick={goNext} variant="ghost" />
      </HStack>
      <Box fontSize="xs" color="gray.400">
        点击翻转查看例句，长按查看详细解释
      </Box>
    </Stack>
  )
})
