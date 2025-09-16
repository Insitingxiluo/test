import { Box, Flex, IconButton, Text } from '@chakra-ui/react'
import { ReactElement, ReactNode } from 'react'
import { HiOutlineAcademicCap, HiOutlineBookOpen, HiOutlineChartBar } from 'react-icons/hi2'

type TabKey = 'learn' | 'practice' | 'progress'

const tabs: { key: TabKey; icon: ReactElement; label: string }[] = [
  { key: 'learn', icon: <HiOutlineBookOpen />, label: '单词' },
  { key: 'practice', icon: <HiOutlineAcademicCap />, label: '练习' },
  { key: 'progress', icon: <HiOutlineChartBar />, label: '进度' }
]

export function MobileLayout({
  active,
  onChange,
  children
}: {
  active: TabKey
  onChange: (key: TabKey) => void
  children: ReactNode
}) {
  return (
    <Flex direction="column" minH="100vh" bg="gray.50">
      <Box flex="1 1 auto">{children}</Box>
      <Flex
        as="nav"
        justify="space-around"
        borderTopWidth="1px"
        borderColor="gray.100"
        bg="white"
        py={2}
        position="sticky"
        bottom={0}
        zIndex={10}
      >
        {tabs.map(tab => (
          <Flex key={tab.key} direction="column" align="center" gap={1}>
            <IconButton
              aria-label={tab.label}
              icon={tab.icon}
              variant={active === tab.key ? 'solid' : 'ghost'}
              colorScheme={active === tab.key ? 'blue' : 'gray'}
              isRound
              size="sm"
              onClick={() => onChange(tab.key)}
            />
            <Text fontSize="xs" color={active === tab.key ? 'blue.500' : 'gray.500'}>
              {tab.label}
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  )
}
