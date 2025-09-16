import { Badge, Grid, GridItem, Stack, Text } from '@chakra-ui/react'
import { memo } from 'react'

export type ProgressBadgesProps = {
  badges: { id: string; title: string; description: string; icon: string }[]
}

export const ProgressBadges = memo(function ProgressBadges({ badges }: ProgressBadgesProps) {
  return (
    <Stack spacing={3}>
      <Text fontSize="md" fontWeight="medium">
        成就徽章
      </Text>
      <Grid templateColumns="repeat(2, minmax(0, 1fr))" gap={3}>
        {badges.map(badge => (
          <GridItem key={badge.id} borderRadius="xl" borderWidth="1px" borderColor="gray.100" bg="white" p={3} shadow="sm">
            <Stack spacing={2}>
              <Badge colorScheme="yellow" fontSize="sm" borderRadius="lg" alignSelf="flex-start">
                {badge.icon}
              </Badge>
              <Text fontWeight="semibold">{badge.title}</Text>
              <Text fontSize="sm" color="gray.500">
                {badge.description}
              </Text>
            </Stack>
          </GridItem>
        ))}
      </Grid>
    </Stack>
  )
})
