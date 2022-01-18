import { ToolItem, ColorItem } from '../style'
import { Popover } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { ChromePicker, ColorResult } from 'react-color'
import { cloneDeep } from 'lodash'
import { LAYER_TYPE, RectShape } from 'types'

// 形状边框颜色
export default observer(() => {
  const { layerType, activeLayer, setLayer } = templateStore

  // 当前形状
  let shapeInfo: Partial<RectShape> = {}
  if (layerType === LAYER_TYPE.CIRCLE) {
    shapeInfo = activeLayer?.circleInfo as RectShape
  } else if (layerType === LAYER_TYPE.RECT) {
    shapeInfo = activeLayer?.rectInfo as RectShape
  }

  // 选择形状描边颜色
  const onBorderColorChange = (clr: ColorResult) => {
    const rgba = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`
    // 矩形
    if (layerType === LAYER_TYPE.RECT) {
      const layer = cloneDeep(activeLayer)
      if (layer?.rectInfo) {
        layer.rectInfo.borderColor = rgba
        setLayer(layer)
      }
    }
    // 圆形
    if (layerType === LAYER_TYPE.CIRCLE) {
      const layer = cloneDeep(activeLayer)
      if (layer?.circleInfo) {
        layer.circleInfo.borderColor = rgba
        setLayer(layer)
      }
    }
  }

  return (
    <ToolItem>
      <Popover
        content={<ChromePicker color={shapeInfo.borderColor} onChange={onBorderColorChange} />}
        trigger="click"
        placement="bottomLeft"
      >
        <ColorItem style={{ backgroundColor: shapeInfo.borderColor }} />
      </Popover>
    </ToolItem>
  )
})