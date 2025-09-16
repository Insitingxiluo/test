import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors
} from '@dnd-kit/core'
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Badge, HStack } from '@chakra-ui/react'
import { useMemo, useState } from 'react'

function SortableToken({ id, text }: { id: string; text: string }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 2 : 1
  }

  return (
    <Badge ref={setNodeRef} {...attributes} {...listeners} style={style} px={3} py={2} borderRadius="lg" colorScheme="purple">
      {text}
    </Badge>
  )
}

export function DragOrderQuestion({
  sentence,
  onChange
}: {
  sentence: string[]
  onChange: (ordered: string[]) => void
}) {
  const [tokens, setTokens] = useState(sentence.map((word, index) => ({ id: `${index}`, word })))
  const [activeId, setActiveId] = useState<string | null>(null)
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { delay: 120, tolerance: 6 } }))

  const activeToken = useMemo(() => tokens.find(token => token.id === activeId)?.word, [activeId, tokens])

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    if (!over || active.id === over.id) {
      setActiveId(null)
      return
    }
    setTokens(items => {
      const oldIndex = items.findIndex(item => item.id === active.id)
      const newIndex = items.findIndex(item => item.id === over.id)
      const reordered = arrayMove(items, oldIndex, newIndex)
      onChange(reordered.map(item => item.word))
      return reordered
    })
    setActiveId(null)
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      onDragStart={({ active }) => setActiveId(String(active.id))}
      onDragCancel={() => setActiveId(null)}
    >
      <SortableContext items={tokens.map(token => token.id)} strategy={horizontalListSortingStrategy}>
        <HStack spacing={3} flexWrap="wrap" justify="center">
          {tokens.map(token => (
            <SortableToken key={token.id} id={token.id} text={token.word} />
          ))}
        </HStack>
      </SortableContext>
      <DragOverlay>
        {activeToken ? (
          <Badge px={3} py={2} borderRadius="lg" colorScheme="purple">
            {activeToken}
          </Badge>
        ) : null}
      </DragOverlay>
    </DndContext>
  )
}
