import { IconButton } from '@chakra-ui/react'
import { useCallback } from 'react'
import { HiOutlineHeart, HiMiniHeart } from 'react-icons/hi2'

export function FavoriteToggle({
  isFavorite,
  onToggle
}: {
  isFavorite: boolean
  onToggle: (value: boolean) => void
}) {
  const handleClick = useCallback(() => {
    onToggle(!isFavorite)
  }, [isFavorite, onToggle])

  return (
    <IconButton
      aria-label={isFavorite ? '取消收藏' : '收藏单词'}
      icon={isFavorite ? <HiMiniHeart /> : <HiOutlineHeart />}
      variant="ghost"
      colorScheme="pink"
      isRound
      onClick={handleClick}
    />
  )
}
