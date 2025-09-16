import { IconButton, useToast } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { HiOutlineSpeakerWave } from 'react-icons/hi2'

export function AudioButton({ src, label }: { src: string; label: string }) {
  const toast = useToast()
  const [isPlaying, setIsPlaying] = useState(false)

  const audio = useMemo(() => new Audio(src), [src])

  useEffect(() => {
    return () => {
      audio.pause()
    }
  }, [audio])

  const handlePlay = useCallback(async () => {
    try {
      setIsPlaying(true)
      audio.currentTime = 0
      await audio.play()
      audio.onended = () => setIsPlaying(false)
    } catch (error) {
      setIsPlaying(false)
      toast({
        title: '无法播放音频',
        description: (error as Error).message,
        status: 'error'
      })
    }
  }, [audio, toast])

  return (
    <IconButton
      aria-label={`播放${label}`}
      icon={<HiOutlineSpeakerWave />}
      variant="ghost"
      isRound
      size="sm"
      isLoading={isPlaying}
      onClick={handlePlay}
    />
  )
}
