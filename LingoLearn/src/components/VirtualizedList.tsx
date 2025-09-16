import { Box } from '@chakra-ui/react'
import { FixedSizeList, ListChildComponentProps } from 'react-window'
import { ReactNode, memo, useMemo } from 'react'

type ItemData<Item> = {
  items: Item[]
  renderItem: (item: Item, index: number) => ReactNode
}

type Props<Item> = {
  items: Item[]
  itemSize: number
  height: number
  renderItem: (item: Item, index: number) => ReactNode
}

function VirtualizedListComponent<Item>({ items, itemSize, height, renderItem }: Props<Item>) {
  const itemData = useMemo<ItemData<Item>>(
    () => ({ items, renderItem }),
    [items, renderItem]
  )

  // react-window 保持流畅滚动体验，适合移动端长列表
  const Row = ({ index, style, data }: ListChildComponentProps<ItemData<Item>>) => (
    <Box style={style}>{data.renderItem(data.items[index], index)}</Box>
  )

  return (
    <FixedSizeList
      height={height}
      itemCount={items.length}
      itemSize={itemSize}
      width="100%"
      itemData={itemData}
      overscanCount={3}
    >
      {Row}
    </FixedSizeList>
  )
}

export const VirtualizedList = memo(VirtualizedListComponent)
