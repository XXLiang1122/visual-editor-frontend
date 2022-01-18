import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { BoldOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

// 字体加粗
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 当前字体粗细
  const fontWeight = activeLayer?.style?.fontWeight || 400

  // 改变字体粗细
  const onWeightChange = () => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.fontWeight = layer.style.fontWeight === 700 ? 400 : 700
      setLayer(layer)
    }
  }

  return (
    <ToolItem className={fontWeight === 700 ? 'active' : ''} onClick={onWeightChange}>
      <BoldOutlined style={{ fontSize: 24 }} />
    </ToolItem>
  )
})