import {
  Alert,
  AlertIcon,
  Button,
  HStack,
  Input,
  Stack,
  Tag,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { QuizQuestion } from '../types'
import { DragOrderQuestion } from './DragOrderQuestion'
import { ListeningQuestion } from './ListeningQuestion'

export function PracticeQuestion({
  question,
  onAnswer
}: {
  question: QuizQuestion
  onAnswer: (isCorrect: boolean) => void
}) {
  const [selection, setSelection] = useState<string>('')
  const [ordered, setOrdered] = useState<string[]>([])
  const [revealed, setRevealed] = useState(false)

  useEffect(() => {
    setSelection('')
    setOrdered([])
    setRevealed(false)
  }, [question.id])

  // 依据不同题型实时计算反馈，驱动提示与积分
  const feedback = useMemo(() => {
    switch (question.type) {
      case 'choice':
        if (!selection) return null
        return selection === question.answer
      case 'fill':
        if (!selection) return null
        return selection.trim().toLowerCase() === question.answer.trim().toLowerCase()
      case 'order':
        if (!ordered.length) return null
        return ordered.join(' ') === question.sentence.join(' ')
      case 'listening':
        if (!selection && !revealed) return null
        return selection.trim().toLowerCase() === question.answer.trim().toLowerCase()
      default:
        return null
    }
  }, [ordered, question, revealed, selection])

  const handleReveal = useCallback(() => {
    setRevealed(true)
  }, [])

  useEffect(() => {
    if (feedback == null) return
    onAnswer(feedback)
  }, [feedback, onAnswer])

  return (
    <Stack spacing={4}>
      <Text fontSize="lg" fontWeight="medium">
        {question.prompt}
      </Text>

      {question.type === 'choice' ? (
        <Stack spacing={3}>
          {question.options.map(option => {
            const isSelected = selection === option
            const variant = feedback == null ? 'outline' : option === question.answer ? 'solid' : 'outline'
            const colorScheme = feedback == null ? 'blue' : option === question.answer ? 'green' : 'red'
            return (
              <Button
                key={option}
                variant={variant}
                colorScheme={isSelected ? colorScheme : 'blue'}
                onClick={() => setSelection(option)}
              >
                {option}
              </Button>
            )
          })}
        </Stack>
      ) : null}

      {question.type === 'fill' ? (
        <Stack spacing={3}>
          <Input placeholder="输入答案" value={selection} onChange={event => setSelection(event.target.value)} />
          <Wrap>
            {question.bank.map(item => (
              <WrapItem key={item}>
                <Tag size="lg" colorScheme="gray">
                  {item}
                </Tag>
              </WrapItem>
            ))}
          </Wrap>
        </Stack>
      ) : null}

      {question.type === 'order' ? (
        <DragOrderQuestion
          sentence={question.sentence}
          onChange={value => {
            setOrdered(value)
          }}
        />
      ) : null}

      {question.type === 'listening' ? (
        <Stack spacing={3}>
          <ListeningQuestion audio={question.audio} prompt={question.prompt} onReveal={handleReveal} />
          <Input placeholder="输入听到的内容" value={selection} onChange={event => setSelection(event.target.value)} />
          {revealed ? (
            <Text fontSize="sm" color="gray.500">
              正确答案：{question.answer}
            </Text>
          ) : null}
        </Stack>
      ) : null}

      {feedback != null ? (
        <Alert status={feedback ? 'success' : 'error'} borderRadius="lg">
          <AlertIcon />
          {feedback ? '回答正确！' : '再试一次，加油！'}
        </Alert>
      ) : (
        <HStack fontSize="sm" color="gray.500">
          <Text>实时反馈已开启</Text>
        </HStack>
      )}
    </Stack>
  )
}
