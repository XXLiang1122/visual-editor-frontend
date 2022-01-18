import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { Popover, Slider } from 'antd'
import { cloneDeep } from 'lodash'
import opacityIcon from 'assets/opacity.svg'

// 图层透明度
export default observer(() => {
  const { activeLayer, setLayer } = templateStore

  // 透明度
  const opacity = activeLayer?.opacity

  const onOpacityChange = (val: number) => {
    const layer = cloneDeep(activeLayer)
    if (layer) {
      layer.opacity = val
      setLayer(layer)
    }
  }

  return (
    <ToolItem>
      <Popover
        content={
          <Slider
            value={opacity}
            min={0}
            max={1}
            step={0.01}
            style={{ width: 180 }}
            onChange={onOpacityChange}
          />
        }
        trigger="click"
        placement="bottomRight"
      >
        <img src={opacityIcon} width="24" height="24" alt="" />
      </Popover>
    </ToolItem>
  )
})