import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { DeleteOutlined } from '@ant-design/icons'

// 删除图层
export default observer(() => {
  const { activeLayer, removeLayer } = templateStore

  // 删除图层
  const onRemove = () => {
    if (activeLayer) {
      removeLayer(activeLayer.id)
    }
  }

  return (
    <ToolItem onClick={onRemove}>
      <DeleteOutlined style={{ fontSize: 24 }} />
    </ToolItem>
  )
})