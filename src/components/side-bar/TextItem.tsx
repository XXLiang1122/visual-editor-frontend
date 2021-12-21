import { templateStore } from 'store/template';
import { Layer } from 'types'
import { Button } from 'antd'

export default function TextItem () {
  const { template, layers, addLayer, resetSelectStatus, editTextLayer } = templateStore

  // 新增文本
  const onUseImage = () => {
    const newLayer: Layer = {
      id: String(Date.now()),
      type: 'text',
      width: 300,
      height: 72,
      position: {
        x: (template.global.width - 300) / 2,
        y: (template.global.height - 72) / 2
      },
      rotate: 0,
      source: {
        content: '编辑文字'
      },
      style: {
        font: '微软雅黑',
        fontSize: 60,
        lineHeight: 1.2,
        color: '#000',
        textAlign: 'left'
      },
      zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
      isSelected: true,
      isEditing: true,
      scale: 1
    }
    resetSelectStatus()
    addLayer(newLayer)
    editTextLayer(newLayer.id)
  }

  return <Button size="large" style={{ width: '100%' }} onClick={onUseImage}>
    添加文本
  </Button>
}