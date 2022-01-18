import { Layer, POINT_TYPE, Coords } from 'types'
import { MouseEvent, useContext, useState, useEffect, useCallback } from 'react'
import styled from '@emotion/styled'
import { ScaleContext } from 'store/context'
import { MouseEvents } from 'utils/mouseEvent'
import { normalResize, rotateResize } from 'utils/resizeLayer'
import { clipImage, updateImageClip } from 'utils/clipImage'
import rotateIcon from 'assets/rotate.svg'
import lockIcon from 'assets/lock.svg'
import { templateStore } from 'store/template'
import { cloneDeep } from 'lodash'
import { observer } from 'mobx-react'

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
export default observer(({ info }: { info: Layer; }) => {
  const scale = useContext(ScaleContext)

  const { layers, setLayer, isMoving, setIsMoving } = templateStore

  // 鼠标样式
  const [cursors, setCursors] = useState<string[]>([])

  // 调整大小 无旋转
  const resizeNormal = (e: MouseEvent<HTMLElement>, point: POINT_TYPE) => {
    const idx = layers.findIndex(layer => layer.id === info.id)

    if (idx > -1) {
      new MouseEvents(e, (payload) => {
        const layer = cloneDeep(layers[idx])

        const oldHeight = layer.height
        const oldWidth = layer.width

        // 普通拖拽框大小
        let res = normalResize(layer, point, payload.diff, scale, true)

        // 处理文本框缩放
        if (res.type === 'text') {
          if (res.height !== oldHeight && res.scale) {
            res.scale *= res.height / oldHeight
          }
        }
        // 处理图片裁剪
        if (res.type === 'image') {
          res = clipImage(res, point, oldWidth, oldHeight)
        }

        setLayer(res)
        setIsMoving(true)
      }, () => {
        let layer = cloneDeep(layers[idx])
        if (layer.type === 'image') {
          // 更新图片裁剪信息
          layer = updateImageClip(layer)
          setLayer(layer)
        }
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

    new MouseEvents(e, ({ curCoords }: { curCoords: Coords }) => {
      const layer = cloneDeep(layers[idx])

      const curPoint = {
        x: curCoords.x - Number(canvasRect.left),
        y: curCoords.y - Number(canvasRect.top)
      }

      const oldHeight = layer.height
      const oldWidth = layer.width

      // 处理旋转的拖拽
      let res = rotateResize(point, curPoint, symmetricPoint, pointCenter, info, layer, whRatio, scale, true)

      // 处理文本框缩放
      if (res.type === 'text') {
        if (res.height !== oldHeight && res.scale) {
          res.scale *= res.height / oldHeight
        }
      }
      // 处理图片裁剪
      if (res.type === 'image') {
        res = clipImage(res, point, oldWidth, oldHeight)
      }

      setLayer(res)
      setIsMoving(true)
    }, () => {
      let layer = cloneDeep(layers[idx])
      if (layer.type === 'image') {
        // 更新图片裁剪信息
        layer = updateImageClip(layer)
        setLayer(layer)
      }
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
        const layer = cloneDeep(layers[idx])
        layer.rotate = (angle - 90 + 360) % 360

        setLayer(layer)
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
    {info.isLocked ?
      <LockIcon icon={lockIcon} rotate={info.rotate} /> :
      <>
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
      </>
    }
  </BorderEl>
})

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

const LockIcon = styled.div<{icon: string; rotate: number}>(
  {
    position: 'absolute',
    right: '0',
    bottom: '0',
    width: '20px',
    height: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
    borderRadius: '50%',
    boxShadow: '0 0 5px 1px rgb(57 76 96 / 15%), 0 0 0 1px rgb(57 76 96 / 15%)',
    userSelect: 'none',
    zIndex: '1'
  },
  props => ({
    background: `#fff url(${props.icon}) no-repeat center / 13px 13px`,
    transform: `translate(50%, 50%) rotate(${-props.rotate}deg)`
  })
)