import { Box, Flex, Text, VStack } from '@chakra-ui/react'
import { memo } from 'react'

export type StatsChartProps = {
  data: { date: string; wordsLearned: number }[]
}

export const StatsChart = memo(function StatsChart({ data }: StatsChartProps) {
  const maxValue = Math.max(...data.map(item => item.wordsLearned), 1)

  return (
    <VStack align="stretch" spacing={3} w="full">
      <Text fontSize="md" fontWeight="medium">
        每日词汇量
      </Text>
      {/* 使用简化柱状图满足移动端展示，避免额外图表依赖 */}
      <Flex align="end" justify="space-between" w="full" h="32">
        {data.map(item => (
          <VStack key={item.date} spacing={2} flex={1} px={1}>
            <Box
              bgGradient="linear(to-t, blue.400, purple.400)"
              borderRadius="lg"
              w="full"
              transition="height 0.3s"
              height={`${(item.wordsLearned / maxValue) * 100}%`}
            />
            <Text fontSize="xs" color="gray.500">
              {item.date.slice(5)}
            </Text>
          </VStack>
        ))}
      </Flex>
    </VStack>
  )
})
