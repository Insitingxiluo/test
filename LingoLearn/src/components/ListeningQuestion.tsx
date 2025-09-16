import { Button, Stack, Text } from '@chakra-ui/react'
import { useMemo } from 'react'
import { AudioButton } from './AudioButton'

export function ListeningQuestion({
  prompt,
  audio,
  onReveal
}: {
  prompt: string
  audio: string
  onReveal: () => void
}) {
  const audioLabel = useMemo(() => prompt.replace(/\s+/g, ''), [prompt])

  return (
    <Stack spacing={4} align="center">
      <Text fontSize="lg" fontWeight="medium">
        听力理解
      </Text>
      <AudioButton src={audio} label={audioLabel} />
      <Button size="sm" variant="outline" onClick={onReveal}>
        显示答案
      </Button>
    </Stack>
  )
}
