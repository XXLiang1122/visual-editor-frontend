import React, { MouseEvent as MouseEventType, useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { Layer as LayerType, TemplateInfo } from 'types';
import { ScaleContext, LayersContext, BackgroundContext, TemplateContext } from 'store/context';
import { MouseEvents } from 'utils/mouseEvent';
import { helpLine } from 'utils/helpLine'
import Border from "./Border";

// 图层
export default function Layer ({ children, info }: { children: JSX.Element, info: LayerType }) {
  const scale = useContext(ScaleContext)
  const { template } = useContext<{ template: TemplateInfo; }>(TemplateContext)

  // 图层state
  const { layers, setLayers } = useContext<{
    layers: LayerType[],
    setLayers: React.Dispatch<React.SetStateAction<LayerType[]>>
  }>(LayersContext)

  // 设置背景选中状态
  const { setIsSelectedBackground} = useContext(BackgroundContext)

  // 是否正在拖拽图层
  const [isMoving, setIsMoving] = useState(false)

  // 辅助线
  const { getRect: helpLineRect, init: initHelpLine, move: helpLinePipe } = helpLine()

  // 更新图层位置
  const updatePosition = ({ diff }: { diff: { x: number; y: number; } }) => {
    const idx = layers.findIndex(layer => info.id === layer.id)
    const layer = layers[idx]

    const newPosition = helpLinePipe({
      x: helpLineRect().x + diff.x / scale,
      y: helpLineRect().y + diff.y / scale
    })

    layer.position = newPosition
    layers.splice(idx, 1, layer)
    setLayers([...layers])

    setIsMoving(true)
  }

  // 隐藏辅助线
  const hideLine = () => {
    const vLineEl = document.querySelector('#verticalLine') as HTMLElement
    vLineEl.style.visibility = 'hidden'
    const hLineEl = document.querySelector('#horizontalLine') as HTMLElement
    hLineEl.style.visibility = 'hidden'
    setIsMoving(false)
  }

  // 选中图层
  const onSelectLayer = (e: MouseEventType<HTMLDivElement>) => {
    e.stopPropagation()
    const _layers = layers.map(layer => {
      layer.isEditing = info.id === layer.id
      return layer
    })
    setLayers(_layers)
    setIsSelectedBackground(false)
    // 初始化拖拽事件
    new MouseEvents(e, updatePosition, hideLine)
    // 初始化辅助线数据
    initHelpLine({
      ...info.position,
      width: info.width,
      height: info.height,
      rotate: info.rotate
    }, info.id, layers, scale, { ...template.global })
  }

  return <LayerWrapper
    style={{
      width: info.width,
      height: info.height,
      transform: `translate(${info.position.x}px, ${info.position.y}px) rotate(${info.rotate}deg)`,
      zIndex: info.zIndex
    }}
    onMouseDown={onSelectLayer}
  >
    { children }
    {info.isEditing && <RenderBorder>
      <Border info={info} isMoving={isMoving} setIsMoving={setIsMoving} />
    </RenderBorder>}
  </LayerWrapper>
}

// 传送门
function RenderBorder ({ children }: { children: JSX.Element }) {
  return createPortal(
    children,
    document.querySelector('#layerControl') as HTMLDivElement
  )
}

const LayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`