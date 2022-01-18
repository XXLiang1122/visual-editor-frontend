import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'

// 图片裁剪
export default observer(() => {
  const { activeLayer, setEditStatus } = templateStore

  // 裁剪图片
  const clipImage = () => {
    setEditStatus(activeLayer?.id || '')
  }

  return (
    <ToolItem onClick={clipImage}>
      <span className="text">裁剪</span>
    </ToolItem>
  )
})