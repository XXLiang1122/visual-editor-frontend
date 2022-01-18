import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { cloneDeep } from 'lodash'
import { Dropdown, Menu } from 'antd'
import { SwapOutlined } from '@ant-design/icons'

// 图片翻转
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 翻转图片
  const onReverseImage = (direction: 'x' | 'y') => {
    const layer = cloneDeep(activeLayer)
    if (layer?.reverse) {
      if (direction === 'x') {
        layer.reverse.x = layer.reverse.x === 1 ? -1 : 1
      }
      if (direction === 'y') {
        layer.reverse.y = layer.reverse.y === 1 ? -1 : 1
      }
      setLayer(layer)
    }
  }

  return (
    <ToolItem>
      <Dropdown 
        overlay={
          <Menu style={{ width: 120 }}>
            <Menu.Item
              key="x"
              style={{ padding: '20px' }}
              icon={<SwapOutlined />}
              onClick={() => onReverseImage('x')}
            >
              水平翻转
            </Menu.Item>
            <Menu.Item
              key="y"
              style={{ padding: '20px' }}
              icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
              onClick={() => onReverseImage('y')}
            >
              垂直翻转
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <span className="text">翻转</span>
      </Dropdown>
    </ToolItem>
  )
})