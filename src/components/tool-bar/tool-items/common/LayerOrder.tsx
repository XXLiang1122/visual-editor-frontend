import { ToolItem } from '../style'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react'
import { Popover, Slider } from 'antd'
import { cloneDeep } from 'lodash'

// 图层层级
export default observer(() => {
  const { activeLayer, layers, setLayerLevel, setLayers } = templateStore

  // 图层的层级关系
  const levelInfo = {
    min: 1,
    max: 100,
    current: 1
  }
  if (activeLayer) {
    levelInfo.current = layers.findIndex(l => l.id === activeLayer.id) + 1
    levelInfo.max = layers.length
  }

  // 改变层级
  const onLevelChange = (val: number) => {
    // 下 -> 上
    if (val > levelInfo.current) {
      layers.forEach((l, idx) => {
        if (idx + 1 > levelInfo.current && idx + 1 <= val) {
          setLayerLevel(l.id, l.zIndex - 1)
        }
      })
      activeLayer && setLayerLevel(activeLayer.id, activeLayer.zIndex + (val - levelInfo.current))
    } else { // 上 -> 下
      layers.forEach((l, idx) => {
        if (idx + 1 >= val && idx + 1 < levelInfo.current) {
          setLayerLevel(l.id, l.zIndex + 1)
        }
      })
      activeLayer && setLayerLevel(activeLayer.id, activeLayer.zIndex - (levelInfo.current - val))
    }
    setLayers(cloneDeep(layers).sort((a, b) => a.zIndex - b.zIndex))
  }

  return (
    <ToolItem>
      <Popover
        content={
          <Slider
            value={levelInfo.current}
            min={levelInfo.min}
            max={levelInfo.max}
            style={{ width: 180 }}
            onChange={onLevelChange}
          />
        }
        trigger="click"
        placement="bottomRight"
      >
        <span className="text">层级调整</span>
      </Popover>
    </ToolItem>
  )
})