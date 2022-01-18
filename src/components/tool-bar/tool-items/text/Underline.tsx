import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { UnderlineOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'

// 文字下划线
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 当前字体是否有下划线
  const hasUnderline = activeLayer?.style?.underline || false

  // 设置下划线
  const onUnderlineChange = () => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.underline = !layer.style.underline
      setLayer(layer)
    }
  }

  return (
    <ToolItem className={hasUnderline ? 'active' : ''} onClick={onUnderlineChange}>
      <UnderlineOutlined style={{ fontSize: 24 }} />
    </ToolItem>
  )
})