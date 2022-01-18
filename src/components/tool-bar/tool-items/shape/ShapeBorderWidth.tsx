import { ToolItem } from '../style'
import { Popover, Slider } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { cloneDeep } from 'lodash'
import { LAYER_TYPE, RectShape } from 'types'
import borderWidthIcon from 'assets/border-weight.svg'

// 形状边框粗细
export default observer(() => {
  const { layerType, activeLayer, setLayer } = templateStore

  // 当前形状
  let shapeInfo: Partial<RectShape> = {}
  if (layerType === LAYER_TYPE.CIRCLE) {
    shapeInfo = activeLayer?.circleInfo as RectShape
  } else if (layerType === LAYER_TYPE.RECT) {
    shapeInfo = activeLayer?.rectInfo as RectShape
  }

  // 形状描边粗细改变
  const onBorderWidthChange = (val: number) => {
    // 矩形
    if (layerType === LAYER_TYPE.RECT) {
      const layer = cloneDeep(activeLayer)
      if (layer?.rectInfo) {
        layer.rectInfo.borderWidth = val
        setLayer(layer)
      }
    }
    // 圆形
    if (layerType === LAYER_TYPE.CIRCLE) {
      const layer = cloneDeep(activeLayer)
      if (layer?.circleInfo) {
        layer.circleInfo.borderWidth = val
        setLayer(layer)
      }
    }
  }

  return (
    <ToolItem>
      <Popover
        content={
          <Slider
            value={shapeInfo.borderWidth}
            min={0}
            max={50}
            step={1}
            style={{ width: 180 }}
            onChange={onBorderWidthChange}
          />
        }
        trigger="click"
        placement="bottomRight"
      >
        <img src={borderWidthIcon} width="24" height="24" alt="" />
      </Popover>
    </ToolItem>
  )
})