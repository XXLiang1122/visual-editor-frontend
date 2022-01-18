import styled from '@emotion/styled'
import { ToolItem } from '../style';
import { Dropdown, Menu } from 'antd'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { cloneDeep } from 'lodash'
import { LAYER_TYPE } from 'types'
import borderStyleIcon from 'assets/border-style.svg'

// 形状边框样式
export default observer(() => {
  const { layerType, activeLayer, setLayer } = templateStore

  // 形状描边样式改变
  const onBorderStyleChange = (val: string) => {
    // 矩形
    if (layerType === LAYER_TYPE.RECT) {
      const layer = cloneDeep(activeLayer)
      if (layer?.rectInfo) {
        layer.rectInfo.borderStyle = val
        setLayer(layer)
      }
    }
    // 圆形
    if (layerType === LAYER_TYPE.CIRCLE) {
      const layer = cloneDeep(activeLayer)
      if (layer?.circleInfo) {
        layer.circleInfo.borderStyle = val
        setLayer(layer)
      }
    }
  }

  return (
    <ToolItem>
      <Dropdown 
        overlay={
          <Menu style={{ width: 120 }}>
            <Menu.Item
              key="1"
              style={{ padding: '20px 10px' }}
              onClick={() => onBorderStyleChange('solid')}
            >
              <BorderSolid />
            </Menu.Item>
            <Menu.Item
              key="2"
              style={{ padding: '20px 10px' }}
              onClick={() => onBorderStyleChange('dashed')}
            >
              <BorderDashed />
            </Menu.Item>
            <Menu.Item
              key="3"
              style={{ padding: '20px 10px' }}
              onClick={() => onBorderStyleChange('dotted')}
            >
              <BorderDotted />
            </Menu.Item>
          </Menu>
        }
        trigger={['click']}
      >
        <img src={borderStyleIcon} width="24" height="24" alt="" />
      </Dropdown>
    </ToolItem>
  )
})

const BorderSolid = styled.div`
  width: 100%;
  height: 0;
  border-top: 4px solid #000;
`

const BorderDashed = styled.div`
  width: 100%;
  height: 0;
  border-top: 4px dashed #000;
`

const BorderDotted = styled.div`
  width: 100%;
  height: 0;
  border-top: 4px dotted #000;
`