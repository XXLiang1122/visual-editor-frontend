import { Layer } from 'types';

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
  rotate: number;
}

interface RealRect extends Omit<Rect, 'rotate'> {}

interface Size {
  width: number;
  height: number;
}

interface Coord {
  x: number;
  y: number;
}

export function helpLine () {
  // 当前图层位置信息
  let rect: Rect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    rotate: 0
  }

  // 当前图层实际DOM的位置信息
  let realRect: RealRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }

  // 当前图层ID
  let layerId = ''
  // 所有的图层数据
  let allLayers: Layer[] = []
  // 缩放值
  let scale = 1
  // 画布尺寸
  let canvasSize: Size = {
    width: 0,
    height: 0
  }
  // 吸附距离
  let diff = 4

  const vLineEl = document.querySelector('#verticalLine') as HTMLElement
  const hLineEl = document.querySelector('#horizontalLine') as HTMLElement
  let vType: 0 | 1 | 2 = 0 // 垂直线位置-0左1中2右
  let hType: 0 | 1 | 2 = 0 // 水平线位置-0上1中2下

  // 初始化数据
  const init = (data: Rect, id: string, layers: Layer[], scl: number, size: Size) => {
    rect = data
    layerId = id
    allLayers = layers
    scale = scl
    diff = 4 / scale
    canvasSize = size

    // 获取旋转后的真实元素位置信息
    const rad = rect.rotate * Math.PI / 180
    const newWidth = Math.abs(rect.width * Math.cos(rad)) + Math.abs(rect.height * Math.sin(rad))
    const newHeight = Math.abs(rect.height * Math.cos(rad)) + Math.abs(rect.width * Math.sin(rad))
    realRect.width = newWidth
    realRect.height = newHeight
    realRect.x = rect.x + (rect.width - newWidth) / 2
    realRect.y = rect.y - (newHeight - rect.height) / 2
  }

  // 移动吸附
  const move = ({ x, y }: Coord): Coord => {
    rect.x = x
    rect.y = y

    const res: Coord = {
      x: rect.x,
      y: rect.y
    }

    // 更新真实元素位置信息
    realRect.x = rect.x + (rect.width - realRect.width) / 2
    realRect.y = rect.y - (realRect.height - rect.height) / 2

    // 遍历所有图层，与当前图层两两对比
    allLayers.forEach(l => {
      // 获取其他图层真实的元素定位
      const rad = l.rotate * Math.PI / 180
      const newWidth = Math.abs(l.width * Math.cos(rad)) + Math.abs(l.height * Math.sin(rad))
      const newHeight = Math.abs(l.height * Math.cos(rad)) + Math.abs(l.width * Math.sin(rad))
      const newX = l.position.x + (l.width - newWidth) / 2
      const newY = l.position.y - (newHeight - l.height) / 2

      if (l.id !== layerId) {
        // x 垂直线
        vLineHandle(newX + newWidth, res) // 对象图层右
        vLineHandle(newX + newWidth / 2, res) // 对象图层中
        vLineHandle(newX, res) // 对象图层左

        // y 水平线
        hLineHandle(newY + newHeight, res) // 对象图层下
        hLineHandle(newY + newHeight / 2, res) // 对象图层中
        hLineHandle(newY, res) // 对象图层上
      }
    })

    // 与画布对齐
    // x 垂直线
    vLineHandle(canvasSize.width, res) // 画布右
    vLineHandle(canvasSize.width / 2, res) // 画布中
    vLineHandle(0, res) // 画布左
    // y 水平线
    hLineHandle(canvasSize.height, res) // 画布下
    hLineHandle(canvasSize.height / 2, res) // 画布中
    hLineHandle(0, res) // 画布上

    // 渲染辅助线DOM
    renderLine(res)

    return res
  }

  // 垂直线
  const vLineHandle = (targetX: number, res: Coord) => {
    // 右
    if (Math.abs(targetX - (realRect.x + realRect.width)) <= diff) {
      res.x = targetX - rect.width 
      res.x += (rect.width - realRect.width) / 2
      vType = 2
    }
    // 中
    if (Math.abs(targetX - (realRect.x + realRect.width / 2)) <= diff) {
      res.x = targetX - rect.width / 2
      vType = 1
    }
    // 左
    if (Math.abs(targetX - realRect.x) <= diff) {
      res.x = targetX
      res.x -= (rect.width - realRect.width) / 2
      vType = 0
    }
  }

  // 水平线
  const hLineHandle = (targetY: number, res: Coord) => {
    // 下
    if (Math.abs(targetY - (realRect.y + realRect.height)) <= diff) {
      res.y = targetY - rect.height
      res.y -= (realRect.height - rect.height) / 2
      hType = 2
    }
    // 中
    if (Math.abs(targetY - (realRect.y + realRect.height / 2)) <= diff) {
      res.y = targetY - rect.height / 2
      hType = 1
    }
    // 上
    if (Math.abs(targetY - realRect.y) <= diff) {
      res.y = targetY
      res.y += (realRect.height - rect.height) / 2
      hType = 0
    }
  }

  // 渲染辅助线DOM
  const renderLine = (res: Coord) => {
    if (vLineEl && hLineEl) {
      // TODO: 当前位置刚好在线上，条件不满足
      if (res.x !== rect.x) {
        let vLine = 0
        if (vType === 0) vLine = res.x + (rect.width - realRect.width) / 2
        if (vType === 1) vLine = res.x + rect.width / 2
        if (vType === 2) vLine = res.x + (rect.width - realRect.width) / 2 + realRect.width
        vLineEl.style.transform = `translateX(${vLine * scale}px)`
        vLineEl.style.visibility = 'visible'
      } else {
        vLineEl.style.visibility = 'hidden'
      }
      if (res.y !== rect.y) {
        let hLine = 0
        if (hType === 0) hLine = res.y - (realRect.height - rect.height) / 2
        if (hType === 1) hLine = res.y + rect.height / 2
        if (hType === 2) hLine = res.y - (realRect.height - rect.height) / 2 + realRect.height
        hLineEl.style.transform = `translateY(${hLine * scale}px)`
        hLineEl.style.visibility = 'visible'
      } else {
        hLineEl.style.visibility = 'hidden'
      }
    }
  }

  const getRect = () => {
    return rect
  }

  return {
    getRect,
    init,
    move
  }
}