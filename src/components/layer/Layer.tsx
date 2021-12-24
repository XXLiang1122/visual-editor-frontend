import { MouseEvent as MouseEventType, useContext } from "react";
import { createPortal } from "react-dom";
import styled from "@emotion/styled";
import { Layer as LayerType } from 'types';
import { ScaleContext, BackgroundContext } from 'store/context';
import { MouseEvents } from 'utils/mouseEvent';
import { helpLine } from 'utils/helpLine'
import Border from "./Border";
import HoverBorder from "./HoverBorder";
import { templateStore } from 'store/template';
import { observer } from 'mobx-react';
import { cloneDeep } from "lodash";

// 图层
export default observer(({ children, info }: { children: JSX.Element, info: LayerType }) => {
  const scale = useContext(ScaleContext)
  const { template, layers, setLayer, selectLayer, hoverLayer, isMoving, setIsMoving } = templateStore

  // 设置背景选中状态
  const { setIsSelectedBackground } = useContext(BackgroundContext)

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
    // 锁定了就不给拖动
    if (info.isLocked) return
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

  // 鼠标移入图层
  const onLayerMouseEnter = (e: MouseEventType<HTMLDivElement>) => {
    e.stopPropagation()
    hoverLayer(info.id)
  }

  // 鼠标移出图层
  const onLayerMouseOut = (e: MouseEventType<HTMLDivElement>) => {
    e.stopPropagation()
    hoverLayer()
  }

  return <LayerWrapper
    style={{
      width: info.width,
      height: info.height,
      transform: `translate(${info.position.x}px, ${info.position.y}px) rotate(${info.rotate}deg)`,
      zIndex: info.zIndex
    }}
    onMouseDown={onSelectLayer}
    onMouseEnter={onLayerMouseEnter}
    onMouseOut={onLayerMouseOut}
    className={[isMoving ? 'moving' : '', info.isEditing ? 'edit' : ''].join(' ')}
  >
    {/* 图层内容 */}
    <LayerContent style={{transform: `scale(${info.reverse?.x || 1}, ${info.reverse?.y || 1})`}}>
      { children }
    </LayerContent>
    {/* 拖拽边框 */}
    {info.isSelected && <TransportBorder>
      <Border info={info} />
    </TransportBorder>}
    {/* 鼠标移入边框 */}
    {!info.isSelected && !isMoving && info.isHover && <TransportBorder>
      <HoverBorder info={info} />
    </TransportBorder>}
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

const LayerContent = styled.div`
  width: 100%;
  height: 100%;
  transition: transform 250ms;
`