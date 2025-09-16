import { Badge, Box, Button, HStack, Stack, Text } from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { PracticeQuestion } from '../components/PracticeQuestion'
import { PracticeTimer } from '../components/PracticeTimer'
import { LessonData } from '../types'

const TIMER_SECONDS = 60

export function PracticePage({ data }: { data: LessonData }) {
  const [questionIndex, setQuestionIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle')
  const autoAdvanceRef = useRef<number>()

  const question = useMemo(() => data.quizzes[questionIndex], [data.quizzes, questionIndex])

  const handleNext = useCallback(() => {
    setQuestionIndex(prev => (prev + 1) % data.quizzes.length)
    setStatus('idle')
  }, [data.quizzes.length])

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      setStatus(isCorrect ? 'correct' : 'incorrect')
      if (isCorrect) {
        setScore(prev => prev + 1)
      }
    },
    []
  )

  const handleExpire = useCallback(() => {
    handleNext()
  }, [handleNext])

  useEffect(() => {
    if (status !== 'correct') return
    // 回答正确时延迟自动切换，保留反馈提示
    autoAdvanceRef.current = window.setTimeout(() => {
      handleNext()
    }, 1200)

    return () => {
      if (autoAdvanceRef.current) {
        window.clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [handleNext, status])

  useEffect(() => {
    return () => {
      if (autoAdvanceRef.current) {
        window.clearTimeout(autoAdvanceRef.current)
      }
    }
  }, [])

  return (
    <Box px={4} py={6} pb={24}>
      <Stack spacing={6}>
        <HStack justify="space-between" align="center">
          <Stack spacing={1}>
            <Text fontSize="lg" fontWeight="bold">
              练习测试
            </Text>
            <Text fontSize="sm" color="gray.500">
              题目 {questionIndex + 1} / {data.quizzes.length}
            </Text>
          </Stack>
          <Badge colorScheme="green" borderRadius="full" px={3} py={1} fontSize="sm">
            得分 {score}
          </Badge>
        </HStack>

        <PracticeTimer key={question.id} seconds={TIMER_SECONDS} onExpire={handleExpire} />

        <PracticeQuestion question={question} onAnswer={handleAnswer} />

        <Button onClick={handleNext} variant="outline" borderRadius="full">
          下一题
        </Button>
      </Stack>
    </Box>
  )
}
