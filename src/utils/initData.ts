import { TemplateInfo } from 'types'

export const defaultTemplate: TemplateInfo = {
  global: {
    width: 1280,
    height: 720
  },
  background: {
    color: '#fff'
  },
  layers: [
    {
      id: '1',
      type: 'image',
      width: 510,
      height: 340,
      position: {
        x: 100,
        y: 100
      },
      rotate: 0,
      reverse: {
        x: 1,
        y: 1
      },
      source: {
        imageUrl: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg'
      },
      zIndex: 1
    },
    {
      id: '2',
      type: 'text',
      width: 380,
      height: 72,
      position: {
        x: 100,
        y: 500
      },
      rotate: 0,
      source: {
        content: '双击编辑文字'
      },
      style: {
        font: 'Microsoft Yahei',
        fontSize: 60,
        lineHeight: 1.2,
        color: '#000',
        textAlign: 'left'
      },
      zIndex: 2
    }
  ]
}