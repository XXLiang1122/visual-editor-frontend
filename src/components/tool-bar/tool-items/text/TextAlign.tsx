import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined } from '@ant-design/icons'
import { cloneDeep } from 'lodash'
import { Align } from 'types'

// 文字水平对齐
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 文字水平对齐
  const textAlign = activeLayer?.style?.textAlign || 'left'

  // 改变文本水平对齐
  const onTextAlignChange = () => {
    let align: Align = 'left'
    if (textAlign === 'left') align = 'center'
    if (textAlign === 'center') align = 'right'
    if (textAlign === 'right') align = 'left'
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.textAlign = align
      setLayer(layer)
    }
  }

  return (
    <ToolItem onClick={onTextAlignChange}>
      {textAlign === 'left' && <AlignLeftOutlined style={{ fontSize: 24 }} />}
      {textAlign === 'center' && <AlignCenterOutlined style={{ fontSize: 24 }} />}
      {textAlign === 'right' && <AlignRightOutlined style={{ fontSize: 24 }} />}
    </ToolItem>
  )
})