import styled from "@emotion/styled";
import { templateStore } from 'store/template';
import { Layer } from 'types';
import { observer } from 'mobx-react';

export const Rect = observer(() => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore
  const onUseRect = () => {
    const width = 200
    const height = 200
    const newLayer: Layer = {
      id: String(Date.now()),
      type: 'rect',
      width: width,
      height: height,
      position: {
        x: (template.global.width - width) / 2,
        y: (template.global.height - height) / 2
      },
      source: {},
      rotate: 0,
      opacity: 1,
      rectInfo: {
        fill: '#fff',
        borderWidth: 5,
        borderColor: '#000',
        borderStyle: 'solid'
      },
      zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
      isSelected: true,
      isEditing: false,
      isLocked: false
    }
    resetSelectStatus()
    addLayer(newLayer)
  }
  return <RectItem onClick={onUseRect} />
})

export const Circle = observer(() => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore
  const onUseCircle = () => {
    const width = 200
    const height = 200
    const newLayer: Layer = {
      id: String(Date.now()),
      type: 'circle',
      width: width,
      height: height,
      position: {
        x: (template.global.width - width) / 2,
        y: (template.global.height - height) / 2
      },
      source: {},
      rotate: 0,
      opacity: 1,
      circleInfo: {
        fill: '#fff',
        borderWidth: 5,
        borderColor: '#000',
        borderStyle: 'solid'
      },
      zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
      isSelected: true,
      isEditing: false,
      isLocked: false
    }
    resetSelectStatus()
    addLayer(newLayer)
  }
  return <CircleItem onClick={onUseCircle} />
})

const RectItem = styled.div`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border: 4px solid #000;
  background-color: #fff;
`

const CircleItem = styled(RectItem)`
  border-radius: 50%;
`