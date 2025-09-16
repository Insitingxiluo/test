import {
  Badge,
  Box,
  Card,
  CardBody,
  CardHeader,
  HStack,
  Image,
  Stack,
  Text,
  useBoolean
} from '@chakra-ui/react'
import { TouchEvent, memo, useCallback, useRef, useState } from 'react'
import { Word } from '../types'
import { FavoriteToggle } from './FavoriteToggle'
import { AudioButton } from './AudioButton'
import { useSwipe } from '../hooks/useSwipe'

const LONG_PRESS_MS = 600

export type WordCardProps = {
  word: Word
  isFavorite: boolean
  onFavoriteChange: (id: string, value: boolean) => void
  onNext: () => void
  onPrev: () => void
}

export const WordCard = memo(function WordCard({ word, isFavorite, onFavoriteChange, onNext, onPrev }: WordCardProps) {
  const [isFlipped, setIsFlipped] = useBoolean(false)
  const [showDetail, setShowDetail] = useState(false)
  const pressTimer = useRef<number>()

  const clearTimer = () => {
    if (pressTimer.current) {
      window.clearTimeout(pressTimer.current)
      pressTimer.current = undefined
    }
  }

  const handleLongPress = useCallback(() => {
    setShowDetail(true)
  }, [])

  const swipeHandlers = useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev
  })

  const handleTouchStart = (event: TouchEvent) => {
    swipeHandlers.onTouchStart(event)
    clearTimer()
    // 长按触发详细释义，兼顾滑动与翻转操作
    pressTimer.current = window.setTimeout(handleLongPress, LONG_PRESS_MS)
  }

  const handleTouchEnd = (event: TouchEvent) => {
    clearTimer()
    setShowDetail(false)
    swipeHandlers.onTouchEnd(event)
  }

  const handleToggleFavorite = useCallback(
    (value: boolean) => {
      onFavoriteChange(word.id, value)
    },
    [onFavoriteChange, word.id]
  )

  const front = (
    <Stack spacing={3} align="center" textAlign="center" h="full">
      <Image src={word.image} alt={word.term} borderRadius="2xl" objectFit="cover" w="full" h="48" loading="lazy" />
      <Text fontSize="4xl" fontWeight="bold">
        {word.term}
      </Text>
      <Text fontSize="lg" color="gray.500">
        {word.translation}
      </Text>
      <HStack spacing={2}>
        {word.pronunciations.map(pronunciation => (
          <AudioButton key={pronunciation.accent} src={pronunciation.audio} label={`${word.term} ${pronunciation.accent}`} />
        ))}
      </HStack>
      <Text fontSize="md" color="gray.600">
        {word.example}
      </Text>
      <HStack spacing={2} flexWrap="wrap" justify="center">
        {word.tags.map(tag => (
          <Badge key={tag} colorScheme="blue" variant="subtle">
            {tag}
          </Badge>
        ))}
      </HStack>
    </Stack>
  )

  const back = (
    <Stack spacing={3} textAlign="left" h="full">
      <Text fontSize="sm" color="gray.400">
        详细释义
      </Text>
      <Text fontSize="md">{word.term} 的详细信息，包含词根、常见搭配与考试频率。</Text>
      <Text fontSize="sm" color="gray.500">
        长按可快速查看，松开收起。
      </Text>
    </Stack>
  )

  return (
    <Card
      bgGradient="linear(to-br, white, gray.100)"
      shadow="xl"
      onClick={setIsFlipped.toggle}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      position="relative"
      minH="sm"
      overflow="hidden"
    >
      <CardHeader>
        <HStack justify="space-between">
          <Text fontSize="sm" color="gray.500">
            左右滑动切换
          </Text>
          <FavoriteToggle isFavorite={isFavorite} onToggle={handleToggleFavorite} />
        </HStack>
      </CardHeader>
      <CardBody>
        <Box sx={{ perspective: '1200px' }}>
          <Box
            position="relative"
            transformStyle="preserve-3d"
            transition="transform 0.6s"
            transform={isFlipped || showDetail ? 'rotateY(180deg)' : 'rotateY(0deg)'}
            minH="64"
          >
            <Box
              position="absolute"
              inset={0}
              sx={{ backfaceVisibility: 'hidden' }}
            >
              {front}
            </Box>
            <Box
              position="absolute"
              inset={0}
              sx={{ backfaceVisibility: 'hidden' }}
              transform="rotateY(180deg)"
            >
              {back}
            </Box>
          </Box>
        </Box>
      </CardBody>
    </Card>
  )
})
