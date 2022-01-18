import { ToolItem } from '../style'
import { Select } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { FONT_LIST } from 'utils/const'
import { cloneDeep } from 'lodash'

const { Option } = Select;

// 文字类型
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 当前字体
  const font = activeLayer?.style?.font || ''

  // 选择字体
  const onFontChange = (val: string) => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.font = val
      setLayer(layer)
    }
  }

  return (
    <ToolItem>
      <Select
        value={font}
        style={{ width: 140 }}
        placeholder="选择字体"
        onChange={onFontChange}
      >
        {FONT_LIST.map(f => <Option key={f.value} value={f.value}><span style={{ fontFamily: f.value }}>{f.name}</span></Option>)}
      </Select>
    </ToolItem>
  )
})