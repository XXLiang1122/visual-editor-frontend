import React, { MouseEvent as MouseEventType, useContext, useState } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { Layer as LayerType } from 'types';
import { ScaleContext, BackgroundContext, MovingContext } from 'store/context';
import { MouseEvents } from 'utils/mouseEvent';
import { helpLine } from 'utils/helpLine'
import Border from "./Border";
import { templateStore } from 'store/template';
import { observer } from 'mobx-react';
import { cloneDeep } from "lodash";

// 图层
export default observer(({ children, info }: { children: JSX.Element, info: LayerType }) => {
  const scale = useContext(ScaleContext)
  const { template } = templateStore

  const { layers, setLayer, selectLayer } = templateStore

  // 设置背景选中状态
  const { setIsSelectedBackground } = useContext(BackgroundContext)

  // 是否正在拖拽图层
  const [isMoving, setIsMoving] = useState(false)

  // 辅助线
  const { getRect: helpLineRect, init: initHelpLine, move: helpLinePipe } = helpLine()

  // 更新图层位置
  const updatePosition = ({ diff }: { diff: { x: number; y: number; } }) => {
    const layer = cloneDeep(info)

    const newPosition = helpLinePipe({
      x: helpLineRect().x + diff.x / scale,
      y: helpLineRect().y + diff.y / scale
    })

    layer.position = newPosition

    setLayer(layer)
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
    if (info.isEditing) return
    selectLayer(info.id)
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
    className={[isMoving ? 'moving' : '', info.isEditing ? 'edit' : ''].join(' ')}
  >
    <MovingContext.Provider value={{ isMoving, setIsMoving }}>
      { children }
      {info.isSelected && <TransportBorder>
        <Border info={info} />
      </TransportBorder>}
    </MovingContext.Provider>
  </LayerWrapper>
})

// 传送门
function TransportBorder ({ children }: { children: JSX.Element }) {
  return createPortal(
    children,
    document.querySelector('#layerControl') as HTMLDivElement
  )
}

const LayerWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: auto;
  user-select: none;
  cursor: default;

  &.moving {
    cursor: all-scroll;
  }

  &.edit {
    cursor: text;
  }
`