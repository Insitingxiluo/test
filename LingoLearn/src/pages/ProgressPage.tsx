import { Badge, Box, HStack, Stat, StatHelpText, StatLabel, StatNumber, Stack, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { ProgressBadges } from '../components/ProgressBadges'
import { StatsChart } from '../components/StatsChart'
import { VirtualizedList } from '../components/VirtualizedList'
import { useLocalProgress } from '../hooks/useLocalProgress'
import { LessonData } from '../types'

export function ProgressPage({ data }: { data: LessonData }) {
  const { progress, setProgress } = useLocalProgress(data.progress)

  useEffect(() => {
    // 将最新统计与本地进度合并持久化，保证离线体验
    setProgress(prev => (prev ? { ...prev, ...data.progress } : data.progress))
  }, [data.progress, setProgress])

  if (!progress) {
    return null
  }

  return (
    <Box px={4} py={6} pb={24}>
      <Stack spacing={6}>
        <Stack spacing={1}>
          <Text fontSize="lg" fontWeight="bold">
            学习进度
          </Text>
          <Text fontSize="sm" color="gray.500">
            保持节奏，持续进步
          </Text>
        </Stack>

        <HStack spacing={4} justify="space-between">
          <Stat>
            <StatLabel>连续天数</StatLabel>
            <StatNumber>{progress.streakDays}</StatNumber>
            <StatHelpText>坚持就是胜利</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>词汇量</StatLabel>
            <StatNumber>{progress.vocabularySize}</StatNumber>
            <StatHelpText>累计掌握数量</StatHelpText>
          </Stat>
          <Stat>
            <StatLabel>专注时长</StatLabel>
            <StatNumber>{progress.minutesStudied} 分钟</StatNumber>
            <StatHelpText>近七日</StatHelpText>
          </Stat>
        </HStack>

        <StatsChart data={progress.history} />

        <ProgressBadges badges={progress.badges} />

        <Stack spacing={3}>
          <HStack justify="space-between">
            <Text fontWeight="medium">学习记录</Text>
            <Badge colorScheme="blue" borderRadius="full">
              {progress.history.length} 天
            </Badge>
          </HStack>
          <Box borderRadius="2xl" bg="white" shadow="sm" borderWidth="1px" borderColor="gray.100">
            <VirtualizedList
              items={progress.history}
              itemSize={72}
              height={240}
              renderItem={item => (
                <HStack key={item.date} px={4} py={3} justify="space-between" borderBottomWidth="1px" borderColor="gray.50">
                  <Stack spacing={1}>
                    <Text fontWeight="semibold">{item.date}</Text>
                    <Text fontSize="sm" color="gray.500">
                      学习 {item.minutes} 分钟
                    </Text>
                  </Stack>
                  <Badge colorScheme="green" borderRadius="full" px={3}>
                    +{item.wordsLearned} 词
                  </Badge>
                </HStack>
              )}
            />
          </Box>
        </Stack>
      </Stack>
    </Box>
  )
}
