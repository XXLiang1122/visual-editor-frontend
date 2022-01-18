import { ToolItem, ColorItem } from '../style'
import { Popover } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { ChromePicker, ColorResult } from 'react-color'
import { cloneDeep } from 'lodash'

// 文字颜色
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  const color = activeLayer?.style?.color || ''

  // 选择颜色
  const onColorChange = (clr: ColorResult) => {
    const rgba = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.color = rgba
      setLayer(layer)
    }
  }

  return (
    <ToolItem>
      <Popover
        content={<ChromePicker color={color} onChange={onColorChange} />}
        trigger="click"
        placement="bottomLeft"
      >
        <ColorItem style={{ backgroundColor: color }} />
      </Popover>
    </ToolItem>
  )
})