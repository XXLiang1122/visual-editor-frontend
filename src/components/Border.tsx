import { Layer } from 'types';
import { MouseEvent, useContext, useState, useEffect, useCallback } from "react";
import styled from "@emotion/styled";
import { ScaleContext, LayersContext } from 'store/context';
import { Layer as LayerType } from 'types';
import { MouseEvents } from 'utils/mouseEvent';
import { getCenterCoords, calcRotatedCoords } from 'utils'
import rotateIcon from 'assets/rotate.svg';

enum POINT_TYPE {
  TL = 'topLeft',
  TR = 'topRight',
  BL = 'bottomLeft',
  BR = 'bottomRight',
  T = 'top',
  B = 'bottom',
  L = 'left',
  R = 'right'
}

interface Coords {
  x: number;
  y: number;
}

const MIN_SIZE = {
  width: 10,
  height: 10
}

// 初始的指针角度（左上、上、右上、右）
const INIT_ANGLE = [0, 45, 90, 135]
// 角度范围对应的指针样式
const ANGLE_TO_CURSOR = [
  { start: 0, end: 23, cursor: 'nwse-resize' },
  { start: 338, end: 360, cursor: 'nwse-resize' },
  { start: 23, end: 68, cursor: 'ns-resize' },
  { start: 68, end: 113, cursor: 'nesw-resize' },
  { start: 113, end: 158, cursor: 'ew-resize' },
  { start: 158, end: 203, cursor: 'nwse-resize' },
  { start: 203, end: 248, cursor: 'ns-resize' },
  { start: 248, end: 293, cursor: 'nesw-resize' },
  { start: 293, end: 338, cursor: 'ew-resize' }
]

// 编辑框
export default function Border ({ info, isMoving, setIsMoving }: { info: Layer; isMoving: boolean; setIsMoving: any }) {
  const scale = useContext(ScaleContext)
  const { layers, setLayers } = useContext<{
    layers: LayerType[],
    setLayers: React.Dispatch<React.SetStateAction<LayerType[]>>
  }>(LayersContext)

  // 鼠标样式
  const [cursors, setCursors] = useState<string[]>([])

  // 调整大小 无旋转
  const resizeNormal = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    const idx = layers.findIndex(layer => layer.id === info.id)
    const layer = layers[idx]

    if (idx > -1) {
      new MouseEvents(e, (payload) => {
        const { x, y } = payload.diff
        const whRatio = layer.width / layer.height
        let { x: newX, y: newY } = layer.position
        let { width: newWidth, height: newHeight } = layer
        switch (point) {
          case POINT_TYPE.TL: {
            const height = layer.height
            newWidth -= x / scale
            newX += x / scale
            newHeight = newWidth / whRatio
            newY -= newHeight - height
            break
          }
          case POINT_TYPE.TR: {
            const height = layer.height
            newWidth += x / scale
            newHeight = newWidth / whRatio
            newY -= newHeight - height
            break
          }
          case POINT_TYPE.BL: {
            newWidth -= x / scale
            newX += x / scale
            newHeight = newWidth / whRatio
            break
          }
          case POINT_TYPE.BR: {
            newWidth += x / scale
            newHeight = newWidth / whRatio
            break
          }
          case POINT_TYPE.T: {
            newHeight -= y / scale
            newY += y / scale
            break
          }
          case POINT_TYPE.B: {
            newHeight += y / scale
            break
          }
          case POINT_TYPE.L: {
            newWidth -= x / scale
            newX += x / scale
            break
          }
          case POINT_TYPE.R: {
            newWidth += x / scale
            break
          }
        }

        if ((newWidth > MIN_SIZE.width && newHeight > MIN_SIZE.height) || newWidth > layer.width || newHeight > layer.height) {
          layer.width = newWidth
          layer.height = newHeight
          layer.position.x = newX
          layer.position.y = newY
        }

        layers.splice(idx, 1, layer)
        setLayers([...layers])

        setIsMoving(true)
      }, () => {
        setIsMoving(false)
      })
    }
  }

  // 调整大小 有旋转
  const resizeWithRotate = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    // 图层相对于画布左上角的中心点
    const center = {
      x: (info.position.x + info.width / 2) * scale,
      y: (info.position.y + info.height / 2) * scale
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

    const whRatio = info.width / info.height
    const idx = layers.findIndex(layer => layer.id === info.id)
    const layer = layers[idx]

    new MouseEvents(e, ({ curCoords }: { curCoords: Coords }) => {
      const curPoint = {
        x: curCoords.x - Number(canvasRect.left),
        y: curCoords.y - Number(canvasRect.top)
      }

      switch (point) {
        case POINT_TYPE.TL: {
          // 根据鼠标当前位置和对称点获取最新中心点
          let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
          // 获取旋转前的左上角坐标
          let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
          // 获取旋转前的对称点坐标
          let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          let newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
          let newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
  
          // 获取等比缩放计算后的坐标
          if (newWidth / newHeight > whRatio) {
            newOriginCurPoint.x += Math.abs(newWidth - newHeight * whRatio)
          } else {
            newOriginCurPoint.y += Math.abs(newHeight - newWidth / whRatio)
          }
  
          // 由于现在求的未旋转前的坐标是以没按比例缩减宽高前的坐标来计算的
          // 所以缩减宽高后，需要按照原来的中心点旋转回去，获得缩减宽高并旋转后对应的坐标
          // 然后以这个坐标和对称点获得新的中心点，并重新计算未旋转前的坐标
          const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
          newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
          newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
          newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
          newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
  
          if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
            layer.width = newWidth / scale
            layer.height = newHeight / scale
            layer.position.y = newOriginCurPoint.y / scale
            layer.position.x = newOriginCurPoint.x / scale
          }
          break
        }

        case POINT_TYPE.TR: {
          let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
          // 获取旋转前的右上角坐标
          let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
          let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          let newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
          let newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
  
          if (newWidth / newHeight > whRatio) {
            newOriginCurPoint.x -= Math.abs(newWidth - newHeight * whRatio)
          } else {
            newOriginCurPoint.y += Math.abs(newHeight - newWidth / whRatio)
          }
  
          const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
          newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
          newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
          newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
          newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
  
          if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
            layer.width = newWidth / scale
            layer.height = newHeight / scale
            layer.position.y = newOriginCurPoint.y / scale
            layer.position.x = newOriginSymmetricPoint.x / scale
          }
          break
        }
  
        case POINT_TYPE.BR: {
          let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
          // 获取旋转前的右下角坐标
          let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
          let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          let newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
          let newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
  
          if (newWidth / newHeight > whRatio) {
            newOriginCurPoint.x -= Math.abs(newWidth - newHeight * whRatio)
          } else {
            newOriginCurPoint.y -= Math.abs(newHeight - newWidth / whRatio)
          }
  
          const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
          newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
          newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
          newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
          newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
  
          if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
            layer.width = newWidth / scale
            layer.height = newHeight / scale
            layer.position.y = newOriginSymmetricPoint.y / scale
            layer.position.x = newOriginSymmetricPoint.x / scale
          }
          break
        }
  
        case POINT_TYPE.BL: {
          let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
          // 获取旋转前的左下角坐标
          let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
          let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          let newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
          let newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
  
          if (newWidth / newHeight > whRatio) {
            newOriginCurPoint.x += Math.abs(newWidth - newHeight * whRatio)
          } else {
            newOriginCurPoint.y -= Math.abs(newHeight - newWidth / whRatio)
          }
  
          const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
          newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
          newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
          newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)
  
          newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
          newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
  
          if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
            layer.width = newWidth / scale
            layer.height = newHeight / scale
            layer.position.y = newOriginSymmetricPoint.y / scale
            layer.position.x = newOriginCurPoint.x / scale
          }
          break
        }
  
        case POINT_TYPE.T:
        case POINT_TYPE.B: {
          // 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 pointCenter 的。
          // 这个中心点（第二个参数）用 pointCenter, center, symmetricPoint 都可以，只要他们在一条直线上就行
          const newOriginCurPoint = calcRotatedCoords(curPoint, pointCenter, -info.rotate)
  
          // 算出旋转前 y 坐标，再用 initCurPoint 的 x 坐标，重新计算它们旋转后对应的坐标
          const latestCurPoint = calcRotatedCoords({
            x: pointCenter.x,
            y: newOriginCurPoint.y
          }, pointCenter, info.rotate)
  
          // 用旋转后的坐标和对称点算出新的高度（勾股定理）
          const newHeight = Math.sqrt((latestCurPoint.x - symmetricPoint.x) ** 2 + (latestCurPoint.y - symmetricPoint.y) ** 2)
  
          const newCenter = {
            x: latestCurPoint.x - (latestCurPoint.x - symmetricPoint.x) / 2,
            y: latestCurPoint.y + (symmetricPoint.y - latestCurPoint.y) / 2
          }
  
          // 是否反向拉伸了
          let isReverse = false
          const angle = (info.rotate + 360) % 360
          // 禁止反向拉伸
          if (point === POINT_TYPE.T) {
            if ((angle >= 0 && angle <= 90) || (angle >= 270 && angle <= 360)) {
              if (latestCurPoint.y >= symmetricPoint.y) {
                isReverse = true
              }
            } else if (latestCurPoint.y <= symmetricPoint.y) {
              isReverse = true
            }
          }
          if (point === POINT_TYPE.B) {
            if (angle >= 90 && angle <= 270) {
              if (latestCurPoint.y >= symmetricPoint.y) {
                isReverse = true
              }
            } else if (latestCurPoint.y <= symmetricPoint.y) {
              isReverse = true
            }
          }
  
          if (newHeight / scale > MIN_SIZE.height && !isReverse) {
            layer.height = newHeight / scale
            layer.position.y = (newCenter.y - (newHeight / 2)) / scale
            layer.position.x = newCenter.x / scale - (layer.width / 2)
          }
          break
        }
  
        case POINT_TYPE.L:
        case POINT_TYPE.R: {
          const newOriginCurPoint = calcRotatedCoords(curPoint, pointCenter, -info.rotate)
  
          const latestCurPoint = calcRotatedCoords({
            x: newOriginCurPoint.x,
            y: pointCenter.y
          }, pointCenter, info.rotate)
  
          const newWidth = Math.sqrt((latestCurPoint.x - symmetricPoint.x) ** 2 + (latestCurPoint.y - symmetricPoint.y) ** 2)
  
          const newCenter = {
            x: latestCurPoint.x - (latestCurPoint.x - symmetricPoint.x) / 2,
            y: latestCurPoint.y + (symmetricPoint.y - latestCurPoint.y) / 2
          }
  
          // 是否反向拉伸了
          let isReverse = false
          const angle = (info.rotate + 360) % 360
          // 禁止反向拉伸
          if (point === POINT_TYPE.L) {
            if ((angle >= 0 && angle <= 90) || (angle >= 270 && angle <= 360)) {
              if (latestCurPoint.x >= symmetricPoint.x) {
                isReverse = true
              }
            } else if (latestCurPoint.x <= symmetricPoint.x) {
              isReverse = true
            }
          }
          if (point === POINT_TYPE.R) {
            if (angle >= 90 && angle <= 270) {
              if (latestCurPoint.x >= symmetricPoint.x) {
                isReverse = true
              }
            } else if (latestCurPoint.x <= symmetricPoint.x) {
              isReverse = true
            }
          }
  
          if (newWidth / scale > MIN_SIZE.width && !isReverse) {
            layer.width = newWidth / scale
            layer.position.y = newCenter.y / scale - (layer.height / 2)
            layer.position.x = (newCenter.x - (newWidth / 2)) / scale
          }
          break
        }
      }
      layers.splice(idx, 1, layer)
      setLayers([...layers])

      setIsMoving(true)
    }, () => {
      setIsMoving(false)
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

  // 旋转
  const rotate = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    const borderEl = (e.target as HTMLElement).closest('.border-control')
    if (borderEl) {
      const rect = borderEl.getBoundingClientRect()
      const rotateCenterPoint = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      }
      new MouseEvents(e, ({ curCoords }: { curCoords: Coords }) => {
        const offsetY = curCoords.y - rotateCenterPoint.y
        const offsetX = curCoords.x - rotateCenterPoint.x
        // 当前距离x轴的角度(x轴起逆时针方向至该边)
        const angle = Math.atan2(offsetY, offsetX) * 180 / Math.PI

        const idx = layers.findIndex(layer => layer.id === info.id)
        const layer = layers[idx]
        layer.rotate = (angle - 90 + 360) % 360
        layers.splice(idx, 1, layer)
        setLayers([...layers])

        setIsMoving(true)
      }, () => {
        setIsMoving(false)
      })
    }
  }

  // 计算8个圆点的指针样式，按顺序分别为 左上（右下）、上（下）、右上（左下）、右（左）
  const calcCursors = useCallback(() => {
    let angle = info.rotate
    if (angle < 0) {
      angle += 360
    }
    const cursors: string[] = []
    INIT_ANGLE.forEach((a) => {
      const newAngle = (a + angle) % 360
      const item = ANGLE_TO_CURSOR.find(i => i.start <= newAngle && i.end >= newAngle)
      if (item) {
        cursors.push(item.cursor)
      }
    })
    setCursors(cursors)
  }, [info.rotate])

  useEffect(() => {
    calcCursors()
  }, [calcCursors])

  return <BorderEl 
    style={{
      width: info.width * scale,
      height: info.height * scale,
      transform: `translate(${info.position.x * scale}px, ${info.position.y * scale}px) rotate(${info.rotate}deg)`
    }}
    className={['border-control', isMoving ? 'moving' : ''].join(' ')}
  >
    <PointBR style={{ cursor: cursors[0] }} onMouseDown={e => resize(e, POINT_TYPE.BR)} />
    {info.width * scale > 30 && info.height * scale > 30 && <>
        <PointTL style={{ cursor: cursors[0] }} onMouseDown={e => resize(e, POINT_TYPE.TL)} />
        <PointTR style={{ cursor: cursors[2] }} onMouseDown={e => resize(e, POINT_TYPE.TR)} />
        <PointBL style={{ cursor: cursors[2] }} onMouseDown={e => resize(e, POINT_TYPE.BL)} />
        <PointL style={{ cursor: cursors[3] }} onMouseDown={e => resize(e, POINT_TYPE.L)} />
        <PointR style={{ cursor: cursors[3] }} onMouseDown={e => resize(e, POINT_TYPE.R)} />
        { info.type !== 'text' && <PointT style={{ cursor: cursors[1] }} onMouseDown={e => resize(e, POINT_TYPE.T)} /> }
        { info.type !== 'text' && <PointB style={{ cursor: cursors[1] }} onMouseDown={e => resize(e, POINT_TYPE.B)} /> }
      </>
    }
    <RotateIcon className='rotate-point' icon={rotateIcon} onMouseDown={rotate} />
  </BorderEl>
}

const BorderEl = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;

  &.moving .rotate-point {
    opacity: 0;
  }

  &.moving span {
    opacity: 0;
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

const Point = styled.span`
  position: absolute;
  display: block;
  background: transparent;
  z-index: 1;
  pointer-events: auto;
  width: 18px;
  height: 18px;
  user-select: none;
  transition: opacity 200ms;

  ::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 5px 1px rgb(57 76 96 / 15%), 0 0 0 1px rgb(53 71 90 / 20%);
  }
`

const PointTL = styled(Point)`
  top: -9px;
  left: -9px;
  cursor: nwse-resize;
`

const PointTR = styled(Point)`
  top: -9px;
  right: -9px;
  cursor: nesw-resize;
`

const PointBL = styled(Point)`
  bottom: -9px;
  left: -9px;
  cursor: nesw-resize;
`

const PointBR = styled(Point)`
  bottom: -9px;
  right: -9px;
  cursor: nwse-resize;
`

const PointT = styled(Point)`
  width: calc(100% - 24px);
  height: 12px;
  top: -6px;
  left: 12px;
  cursor: ns-resize;

  ::before {
    width: 16px;
    height: 4px;
  }
`

const PointB = styled(Point)`
  width: calc(100% - 24px);
  height: 12px;
  bottom: -6px;
  left: 12px;
  cursor: ns-resize;

  ::before {
    width: 16px;
    height: 4px;
  }
`

const PointL = styled(Point)`
  width: 12px;
  height: calc(100% - 24px);
  top: 12px;
  left: -6px;
  cursor: ew-resize;

  ::before {
    width: 4px;
    height: 16px;
  }
`

const PointR = styled(Point)`
  width: 12px;
  height: calc(100% - 24px);
  top: 12px;
  right: -6px;
  cursor: ew-resize;

  ::before {
    width: 4px;
    height: 16px;
  }
`

const RotateIcon = styled.div<{icon: string}>(
  {
    position: 'absolute',
    left: '50%',
    bottom: '-50px',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'translate(-50%, -50%)',
    pointerEvents: 'auto',
    borderRadius: '50%',
    boxShadow: '0 0 5px 1px rgb(57 76 96 / 15%), 0 0 0 1px rgb(57 76 96 / 15%)',
    userSelect: 'none',
    cursor: 'grab'
  },
  props => ({
    background: `#fff url(${props.icon}) no-repeat center / 18px 18px`
  })
)