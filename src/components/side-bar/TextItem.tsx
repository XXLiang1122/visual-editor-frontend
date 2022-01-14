import { templateStore } from 'store/template';
import { Layer } from 'types';
import { Button } from 'antd';
import { observer } from 'mobx-react';

export default observer(() => {
  const { template, layers, addLayer, resetSelectStatus, setEditStatus } = templateStore

  // 新增文本
  const onUseText = () => {
    const newLayer: Layer = {
      id: String(Date.now()),
      type: 'text',
      width: 380,
      height: 72,
      position: {
        x: (template.global.width - 300) / 2,
        y: (template.global.height - 72) / 2
      },
      rotate: 0,
      source: {
        content: '双击编辑文字'
      },
      style: {
        font: '微软雅黑',
        fontSize: 60,
        lineHeight: 1.2,
        color: '#000',
        textAlign: 'left',
        fontWeight: 400,
        underline: false
      },
      opacity: 1,
      zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
      isSelected: true,
      isEditing: true,
      isLocked: false,
      scale: 1
    }
    resetSelectStatus()
    addLayer(newLayer)
    setEditStatus(newLayer.id)
  }

  return <Button size="large" style={{ width: '100%' }} onClick={onUseText}>
    添加文本
  </Button>
})