import { ToolItem } from '../style'
import { Select } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { FONTSIZE_LIST } from 'utils/const'
import { cloneDeep } from 'lodash'

const { Option } = Select

// 文字大小
export default observer(() => {
  const { activeLayer, setLayer, setNeedUpdateLayerHeight } = templateStore

  const layerScale = activeLayer?.scale || 1
  // 当前字体
  const fontSize = activeLayer?.style?.fontSize || 0

  // 改变字体大小
  const onFontsizeChange = (val: string) => {
    const size = Number(val)
    if (!isNaN(size)) {
      const layer = cloneDeep(activeLayer)
      if (layer?.type === 'text' && layer.style) {
        layer.style.fontSize = size / layerScale
        setLayer(layer)
        setNeedUpdateLayerHeight(true)
      }
    }
  }

  return (
    <ToolItem>
      <Select
        value={(fontSize * layerScale).toFixed(0)}
        style={{ width: 100, textAlign: 'center' }}
        placeholder="字体大小"
        onChange={onFontsizeChange}
      >
        {FONTSIZE_LIST.map(size => <Option key={size} value={size}>{size}</Option>)}
      </Select>
    </ToolItem>
  )
})