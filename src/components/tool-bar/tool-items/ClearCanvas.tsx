import { ToolItem } from './style'
import { Popconfirm } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'

// 清空画布
export default observer(() => {
  const { setLayers } = templateStore

  // 清空画布
  const onClear = () => {
    setLayers([])
  }

  return (
    <ToolItem>
      <Popconfirm
        placement="bottomRight"
        title="确定清空画布？"
        onConfirm={onClear}
        okText="清空"
        cancelText="取消"
      >
        <span className="text">清空画布</span>
      </Popconfirm>
    </ToolItem>
  )
})