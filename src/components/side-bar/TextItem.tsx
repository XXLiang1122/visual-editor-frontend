import { templateStore } from 'store/template'
import { Button } from 'antd'
import { observer } from 'mobx-react'
import { createText } from 'utils/createNewLayer'

export default observer(() => {
  const { template, layers, addLayer, resetSelectStatus, setEditStatus } = templateStore

  // 新增文本
  const onUseText = (type: 'title' | 'text' | 'subTitle') => {
    let style = {
      width: 600,
      height: 114,
      fontWeight: 700,
      fontSize: 95
    }

    if (type === 'subTitle') {
      style = {
        width: 380,
        height: 72,
        fontWeight: 700,
        fontSize: 60
      }
    }

    if (type === 'text') {
      style = {
        width: 300,
        height: 48,
        fontWeight: 400,
        fontSize: 40
      }
    }

    const position = {
      x: (template.global.width - style.width) / 2,
      y: (template.global.height - style.height) / 2
    }
    const zIndex = layers.length ? layers[layers.length - 1].zIndex + 1 : 1
    const newLayer = createText(position, zIndex, style)

    resetSelectStatus()
    addLayer(newLayer)
    setEditStatus(newLayer.id)
  }

  return <>
    <Button size="large" style={{ width: '100%', height: 40, fontWeight: 700 }} onClick={() => onUseText('title')}>
      添加标题
    </Button>
    <Button size="middle" style={{ width: '100%', height: 36, fontWeight: 500, marginTop: 20 }} onClick={() => onUseText('subTitle')}>
      添加副标题
    </Button>
    <Button size="small" style={{ width: '100%', height: 32, marginTop: 20 }} onClick={() => onUseText('text')}>
      添加正文
    </Button>
  </>
})
