import { observer } from 'mobx-react'
import styled from '@emotion/styled'
import { Layer, POINT_TYPE, Coords } from 'types'
import { templateStore } from 'store/template'
import { ScaleContext } from 'store/context'
import { MouseEvent, useContext, useEffect, useState } from 'react'
import { MouseEvents } from 'utils/mouseEvent'
import { normalResize, rotateResize } from 'utils/resizeLayer'
import resizeIcon from 'assets/resize.svg'
import { cloneDeep } from 'lodash'
import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { createPortal } from 'react-dom'

let preLayer: Partial<Layer> = {}

export default observer(({ info }: { info: Layer }) => {
  const { template, setLayer, resetEditStatus } = templateStore
  const scale = useContext(ScaleContext)

  const [layer, setLayerInfo] = useState(info)

  const confirm = (e: MouseEvent) => {
    e.stopPropagation()
    setLayer(layer)
    resetEditStatus()
  }

  const cancel = (e: MouseEvent) => {
    e.stopPropagation()
    resetEditStatus()
  }

  const onMaskClick = (e: MouseEvent) => {
    e.stopPropagation()
    if ((e.target as HTMLElement).id === 'clipImageMask') {
      confirm(e)
    }
  }

  useEffect(() => {
    setLayerInfo(info)
  }, [info])

  const clipHandle = (newLayer: Layer, point: POINT_TYPE) => {
    const handleTop = () => {
      if (newLayer.clip) {
        const clipTop = newLayer.clip.height - newLayer.height - newLayer.clip.bottom
        if (clipTop >= 0) {
          newLayer.clip.top = clipTop
          newLayer.clip.pre.top = clipTop
        } else {
          newLayer.height = preLayer.height as number
          newLayer.position.y = preLayer.position?.y as number
        }
      }
    }
    const handleLeft = () => {
      if (newLayer.clip) {
        const clipLeft = newLayer.clip.width - newLayer.width - newLayer.clip.right
        if (clipLeft >= 0) {
          newLayer.clip.left = clipLeft
          newLayer.clip.pre.left = clipLeft
        } else {
          newLayer.width = preLayer.width  as number
          newLayer.position.x = preLayer.position?.x  as number
        }
      }
    }
    const handleRight = () => {
      if (newLayer.clip) {
        const clipRight = newLayer.clip.width - newLayer.width - newLayer.clip.left
        if (clipRight >= 0) {
          newLayer.clip.right = clipRight
          newLayer.clip.pre.right = clipRight
        } else {
          newLayer.width = newLayer.clip.width - newLayer.clip.left
        }
      }
    }
    const handleBottom = () => {
      if (newLayer.clip) {
        const clipBottom = newLayer.clip.height - newLayer.height - newLayer.clip.top
        if (clipBottom >= 0) {
          newLayer.clip.bottom = clipBottom
          newLayer.clip.pre.bottom = clipBottom
        } else {
          newLayer.height = newLayer.clip.height - newLayer.clip.top
        }
      }
    }
    if (newLayer.clip) {
      switch (point) {
        case POINT_TYPE.BR: {
          handleBottom()
          handleRight()
          break
        }
        case POINT_TYPE.BL: {
          handleBottom()
          handleLeft()
          break
        }
        case POINT_TYPE.TL: {
          handleTop()
          handleLeft()
          break
        }
        case POINT_TYPE.TR: {
          handleTop()
          handleRight()
          break
        }
      }
    }
    return newLayer
  }

  // 调整大小 无旋转
  const resizeNormal = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    const _layer = cloneDeep(layer)
    new MouseEvents(e, (payload) => {
      preLayer = cloneDeep(_layer)

      // 普通拖拽框大小
      const newLayer = normalResize(_layer, point, payload.diff, scale, false)
      const res = clipHandle(newLayer, point)

      setLayerInfo(Object.assign({}, res))
    }, () => {

    })
  }

  // 调整大小 有旋转
  // TODO: 拖拽优化
  const resizeWithRotate = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    const _layer = cloneDeep(layer)

    // 图层相对于画布左上角的中心点
    const center = {
      x: (_layer.position.x + _layer.width / 2) * scale,
      y: (_layer.position.y + _layer.height / 2) * scale
    }

    // 获取边框圆点中心点
    const pointRect = (e.target as HTMLElement)?.getBoundingClientRect()
    const canvasRect = (document.querySelector('#layerControl') as HTMLElement)?.getBoundingClientRect()
    const pointCenter = {
      x: pointRect.left - Number(canvasRect.left) + pointRect.width / 2,
      y: pointRect.top - Number(canvasRect.top) + pointRect.height / 2
    }

    // 获取对称点
    const symmetricPoint = {
      x: center.x - (pointCenter.x - center.x),
      y: center.y - (pointCenter.y - center.y)
    }

    const whRatio = _layer.width / _layer.height

    new MouseEvents(e, ({ curCoords }: { curCoords: Coords; }) => {
      const curPoint = {
        x: curCoords.x - Number(canvasRect.left),
        y: curCoords.y - Number(canvasRect.top)
      }

      preLayer = cloneDeep(layer)

      // 处理旋转的拖拽
      const newLayer = rotateResize(point, curPoint, symmetricPoint, pointCenter, _layer, layer, whRatio, scale, false)

      const res = clipHandle(newLayer, point)

      setLayerInfo(Object.assign({}, res))
    }, () => {

    })
  }

  // 调整大小
  const resize = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    e.stopPropagation()
    if (info.rotate === 0) {
      resizeNormal(e, point)
    } else {
      resizeWithRotate(e, point)
    }
  }

  // 拖拽图片位置
  // TODO: 旋转后拖拽优化
  const onDragImage = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    // 初始化拖拽事件
    new MouseEvents(e, ({ diff }: { diff: Coords }) => {
      const { clip } = layer
      if (clip) {
        const newTop = clip.top - diff.y / scale * (layer.reverse?.y || 1)
        const newLeft = clip.left - diff.x / scale * (layer.reverse?.x || 1)
        const newRight = clip.right + diff.x / scale * (layer.reverse?.x || 1)
        const newBottom = clip.bottom + diff.y / scale * (layer.reverse?.y || 1)

        if (newTop >= 0 && newBottom >= 0) {
          clip.top = newTop
          clip.bottom = newBottom
          clip.pre.top = newTop
          clip.pre.bottom = newBottom
          setLayerInfo(Object.assign({}, layer))
        }
        if (newRight >= 0 && newLeft >= 0) {
          clip.left = newLeft
          clip.right = newRight
          clip.pre.left = newLeft
          clip.pre.right = newRight
          setLayerInfo(Object.assign({}, layer))
        }
      }
    })
  }

  return (
    <>
      <Mask id="clipImageMask" onMouseDown={onMaskClick}>
        <Wrapper style={{
          width: template.global.width * scale,
          height: template.global.height * scale
        }}>
          <CanvasContent style={{
            width: template.global.width,
            height: template.global.height,
            transform: `scale(${scale})`
          }}>
            {/* 裁剪效果层 */}
            <LayerWrapper style={{
              width: layer.width,
              height: layer.height,
              transform: `translate(${layer.position.x}px, ${layer.position.y}px) rotate(${layer.rotate}deg) scale(${layer.reverse?.x || 1}, ${layer.reverse?.y || 1})`
            }}>
              <ImgWrapper>
                <div style={{
                  position: 'absolute',
                  width: `${layer.clip?.width}px`,
                  height: `${layer.clip?.height}px`,
                  transform: `translate(-${layer.clip?.left}px, -${layer.clip?.top}px)`
                }}>
                  <Img src={layer.source.imageUrl} draggable="false" />
                </div>
              </ImgWrapper>
            </LayerWrapper>
          </CanvasContent>
          {/* 编辑层 */}
          <LayerControl style={{
            width: template.global.width * scale,
            height: template.global.height * scale
          }}>
            {/* 裁剪边框 */}
            <BorderEl 
              className={layer.reverse?.x === -1 || layer.reverse?.y === -1 ? 'hidden' : ''}
              style={{
                width: layer.width * scale,
                height: layer.height * scale,
                transform: `translate(${layer.position.x * scale}px, ${layer.position.y * scale}px) rotate(${layer.rotate}deg)`
              }}>
              {(layer.reverse?.x !== -1 && layer.reverse?.y !== -1) && <>
                  <AngleTL onMouseDown={e => resize(e, POINT_TYPE.TL)}><img src={resizeIcon} alt="" /></AngleTL>
                  <AngleTR onMouseDown={e => resize(e, POINT_TYPE.TR)}><img src={resizeIcon} alt="" /></AngleTR>
                  <AngleBL onMouseDown={e => resize(e, POINT_TYPE.BL)}><img src={resizeIcon} alt="" /></AngleBL>
                  <AngleBR onMouseDown={e => resize(e, POINT_TYPE.BR)}><img src={resizeIcon} alt="" /></AngleBR>
                </>
              }
              <Line1 /><Line2 /><Line3 /><Line4 />
            </BorderEl>

            {/* 背景拖动层 */}
            <LayerWrapper
              style={{
                width: layer.width * scale,
                height: layer.height * scale,
                transform: `translate(${layer.position.x * scale}px, ${layer.position.y * scale}px) rotate(${layer.rotate}deg) scale(${layer.reverse?.x || 1}, ${layer.reverse?.y || 1})`
              }}
              onMouseDown={onDragImage}
            >
              <ImgWrapper style={{ overflow: 'visible' }}>
                <div style={{
                  position: 'absolute',
                  width: `${layer.clip && layer.clip.width * scale}px`,
                  height: `${layer.clip && layer.clip.height * scale}px`,
                  transform: `translate(-${layer.clip && layer.clip.left * scale}px, -${layer.clip && layer.clip.top * scale}px)`,
                  border: '2px dashed #00c4cc',
                  cursor: 'move'
                }}>
                  <Img src={layer.source.imageUrl} draggable="false" style={{ opacity: 0.5 }} />
                </div>
              </ImgWrapper>
            </LayerWrapper>
          </LayerControl>
        </Wrapper>
      </Mask>
      {/* 传送工具栏 */}
      <TransportToolBar>
        <ToolBar>
          <ToolItem onMouseDown={confirm}><CheckOutlined />完成</ToolItem>
          <ToolItem onMouseDown={cancel}><CloseOutlined />取消</ToolItem>
        </ToolBar>
      </TransportToolBar>
    </>
  )
})

// 传送门
function TransportToolBar ({ children }: { children: JSX.Element }) {
  return createPortal(
    children,
    document.querySelector('#toolBar') as HTMLDivElement
  )
}

const Mask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0,0,0,.3);
`

const Wrapper = styled.div`
  flex: none;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
`

const CanvasContent = styled.div`
  flex: none;
  position: relative;
  overflow: visible;
  background-color: transparent;
  user-select: none;
  pointer-events: none;
`

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
`

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const LayerControl = styled(CanvasContent)`
 position: absolute;
 top: 0;
 left: 0;
`

const BorderEl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  z-index: 1;

  &.hidden {
    &:after {
      opacity: 0;
    }
  }

  &:after {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    border: 2px solid #00c4cc;
  }
`

const Line = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 100%;
  background-color: #fff;
`

const Line1 = styled(Line)`
  left: 33%;
  transform: scaleX(.7);
`

const Line2 = styled(Line)`
  left: 66%;
  transform: scaleX(.7);
`

const Line3 = styled(Line)`
  top: 33%;
  width: 100%;
  height: 1px;
  transform: scaleY(.7);
`

const Line4 = styled(Line)`
  top: 66%;
  width: 100%;
  height: 1px;
  transform: scaleY(.7);
`

const ResizeAngle = styled.span`
  position: absolute;
  display: block;
  background: transparent;
  z-index: 1;
  pointer-events: auto;
  width: 22px;
  height: 22px;
  user-select: none;

  img {
    width: 14px;
    height: 14px;
    pointer-events: none;
  }
`

const AngleTL = styled(ResizeAngle)`
  top: -11px;
  left: -11px;
  transform: rotate(180deg);
  cursor: nwse-resize;
`

const AngleTR = styled(ResizeAngle)`
  top: -11px;
  right: -11px;
  transform: rotate(-90deg);
  cursor: nesw-resize;
`

const AngleBL = styled(ResizeAngle)`
  left: -11px;
  bottom: -11px;
  transform: rotate(90deg);
  cursor: nesw-resize;
`

const AngleBR = styled(ResizeAngle)`
  bottom: -11px;
  right: -11px;
  cursor: nwse-resize;
`

const ToolBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  padding-left: 10px;
  z-index: 1;
  background-color: #fff;
`

const ToolItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 4px 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(64,87,109,.07);
  }

  span {
    margin-right: 8px;
  }
`