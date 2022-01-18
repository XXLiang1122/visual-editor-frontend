import { ToolItem, ColorItem } from './style'
import { Popover } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { ChromePicker, ColorResult } from 'react-color'

// 画布背景颜色
export default observer(() => {
  const { template, setBackgroundColor } = templateStore

  const color = template.background.color

  // 选择颜色
  const onColorChange = (clr: ColorResult) => {
    const rgba = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`
    setBackgroundColor(rgba)
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