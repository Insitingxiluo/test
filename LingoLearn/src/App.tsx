import { Center, Spinner } from '@chakra-ui/react'
import { useState } from 'react'
import { LearnPage } from './pages/LearnPage'
import { PracticePage } from './pages/PracticePage'
import { ProgressPage } from './pages/ProgressPage'
import { MobileLayout } from './layout/MobileLayout'
import { useLessonData } from './utils/fetchData'

export default function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'practice' | 'progress'>('learn')
  // 本地 JSON 通过 React Query 缓存，便于后续扩展为网络请求
  const { data, isLoading, refetch } = useLessonData()

  if (isLoading || !data) {
    return (
      <Center minH="100vh">
        <Spinner size="lg" />
      </Center>
    )
  }

  return (
    <MobileLayout active={activeTab} onChange={setActiveTab}>
      {activeTab === 'learn' ? <LearnPage data={data} onRefresh={async () => { await refetch({ throwOnError: false }) }} /> : null}
      {activeTab === 'practice' ? <PracticePage data={data} /> : null}
      {activeTab === 'progress' ? <ProgressPage data={data} /> : null}
    </MobileLayout>
  )
}
