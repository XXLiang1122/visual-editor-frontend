import styled from '@emotion/styled'
import { templateStore } from 'store/template'
import { DragEvent } from 'react'
import { observer } from 'mobx-react'
import { createRect, createCircle } from 'utils/createNewLayer'

export const Rect = observer(() => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore
  const onUseRect = () => {
    const position = {
      x: (template.global.width - 200) / 2,
      y: (template.global.height - 200) / 2
    }
    const zIndex = layers.length ? layers[layers.length - 1].zIndex + 1 : 1
    const newLayer = createRect(200, 200, position, zIndex)

    resetSelectStatus()
    addLayer(newLayer)
  }

  // 拖拽
  const onDragStartCapture = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('rect', '1')
  }

  return <RectItem draggable="true" onClick={onUseRect} onDragStartCapture={onDragStartCapture} />
})

export const Circle = observer(() => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore
  const onUseCircle = () => {
    const position = {
      x: (template.global.width - 200) / 2,
      y: (template.global.height - 200) / 2
    }
    const zIndex = layers.length ? layers[layers.length - 1].zIndex + 1 : 1
    const newLayer = createCircle(200, 200, position, zIndex)

    resetSelectStatus()
    addLayer(newLayer)
  }

  // 拖拽
  const onDragStartCapture = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('circle', '1')
  }

  return <CircleItem draggable="true" onClick={onUseCircle} onDragStartCapture={onDragStartCapture} />
})

const RectItem = styled.div`
  position: relative;
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 4px solid #000;
  background-color: transparent;
  cursor: pointer;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #000;
    opacity: 0;
    transition: opacity 100ms;
  }

  &:hover::before {
    opacity: .15;
  }

  &:active::before {
    opacity: 0;
  }
`

const CircleItem = styled(RectItem)`
  border-radius: 50%;
  &::before {
    border-radius: 50%;
  }
`