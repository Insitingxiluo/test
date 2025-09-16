import { HStack, Progress, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

export function PracticeTimer({ seconds, onExpire }: { seconds: number; onExpire: () => void }) {
  const [timeLeft, setTimeLeft] = useState(seconds)

  useEffect(() => {
    setTimeLeft(seconds)
  }, [seconds])

  useEffect(() => {
    if (timeLeft <= 0) {
      onExpire()
      return
    }

    const timer = window.setTimeout(() => {
      setTimeLeft(prev => prev - 1)
    }, 1000)

    return () => window.clearTimeout(timer)
  }, [timeLeft, onExpire])

  const percent = (timeLeft / seconds) * 100

  return (
    <HStack w="full" spacing={3} align="center">
      <Text fontWeight="bold">{timeLeft}s</Text>
      <Progress value={percent} w="full" borderRadius="full" colorScheme={percent > 40 ? 'blue' : 'red'} />
    </HStack>
  )
}
