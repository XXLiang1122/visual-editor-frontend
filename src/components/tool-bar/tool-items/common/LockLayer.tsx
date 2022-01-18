import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { LockOutlined, UnlockOutlined } from '@ant-design/icons'

// 锁定图层
export default observer(() => {
  const { activeLayer, setLayerLock } = templateStore

  // 图层是否被锁定了
  const isLocked = activeLayer?.isLocked || false

  // 切换图层锁定状态
  const onToggleLayerLock = () => {
    if (activeLayer) {
      setLayerLock(activeLayer.id, !activeLayer.isLocked)
    }
  }

  return (
    <ToolItem className={["item-lock", isLocked ? 'active' : ''].join(' ')} onClick={onToggleLayerLock}>
      {isLocked ? <LockOutlined style={{ fontSize: 24 }} /> : <UnlockOutlined style={{ fontSize: 24 }} />}
    </ToolItem>
  )
})