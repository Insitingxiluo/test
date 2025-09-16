import { useQuery } from '@tanstack/react-query'
import { LessonData } from '../types'

async function loadLessonData(): Promise<LessonData> {
  const response = await fetch('/data/lessons.json')
  if (!response.ok) {
    throw new Error('无法加载学习数据')
  }
  return response.json()
}

export function useLessonData() {
  return useQuery<LessonData>({
    queryKey: ['lesson-data'],
    queryFn: loadLessonData,
    staleTime: 1000 * 60 * 5
  })
}
