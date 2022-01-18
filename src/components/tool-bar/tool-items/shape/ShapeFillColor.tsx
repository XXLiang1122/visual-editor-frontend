import { ToolItem, ColorItem } from '../style'
import { Popover } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { ChromePicker, ColorResult } from 'react-color'
import { cloneDeep } from 'lodash'
import { LAYER_TYPE, RectShape } from 'types'

// 形状填充颜色
export default observer(() => {
  const { layerType, activeLayer, setLayer } = templateStore

  // 当前形状
  let shapeInfo: Partial<RectShape> = {}
  if (layerType === LAYER_TYPE.CIRCLE) {
    shapeInfo = activeLayer?.circleInfo as RectShape
  } else if (layerType === LAYER_TYPE.RECT) {
    shapeInfo = activeLayer?.rectInfo as RectShape
  }

  // 选择形状填充颜色
  const onFillColorChange = (clr: ColorResult) => {
    const rgba = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`
    // 矩形
    if (layerType === LAYER_TYPE.RECT) {
      const layer = cloneDeep(activeLayer)
      if (layer?.rectInfo) {
        layer.rectInfo.fill = rgba
        setLayer(layer)
      }
    }
    // 圆形
    if (layerType === LAYER_TYPE.CIRCLE) {
      const layer = cloneDeep(activeLayer)
      if (layer?.circleInfo) {
        layer.circleInfo.fill = rgba
        setLayer(layer)
      }
    }
  }

  return (
    <ToolItem>
      <Popover
        content={<ChromePicker color={shapeInfo.fill} onChange={onFillColorChange} />}
        trigger="click"
        placement="bottomLeft"
      >
        <ColorItem style={{ backgroundColor: shapeInfo.fill }} />
      </Popover>
    </ToolItem>
  )
})