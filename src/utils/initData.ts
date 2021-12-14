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
      source: {
        imageUrl: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg'
      },
      zIndex: 1
    },
    {
      id: '2',
      type: 'text',
      width: 300,
      height: 72,
      position: {
        x: 100,
        y: 500
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
      zIndex: 2
    },
    {
      id: '3',
      type: 'image',
      width: 300,
      height: 200,
      position: {
        x: 700,
        y: 400
      },
      rotate: 0,
      source: {
        imageUrl: 'https://cdn.pixabay.com/photo/2014/04/13/20/49/cat-323262__340.jpg'
      },
      zIndex: 3
    }
  ]
}