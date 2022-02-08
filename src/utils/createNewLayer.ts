import { Layer, Coords } from 'types'

// 创建图片图层
export const createImage = (width: number, height: number, url: string, position: Coords, zIndex: number): Layer => {
  return {
    id: String(Date.now()),
    type: 'image',
    width: width,
    height: height,
    position,
    rotate: 0,
    reverse: {
      x: 1,
      y: 1
    },
    source: {
      imageUrl: url
    },
    clip: {
      width: width,
      height: height,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      pre: {
        width: width,
        height: height,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }
    },
    opacity: 1,
    zIndex,
    isSelected: true,
    isEditing: false,
    isLocked: false,
    scale: 1
  }
}

// 创建文字图层
export const createText = (position: Coords, zIndex: number, style: any): Layer => {
  const {
    width,
    height,
    fontWeight,
    fontSize
  } = style

  return {
    id: String(Date.now()),
    type: 'text',
    width,
    height,
    position,
    rotate: 0,
    source: {
      content: '双击编辑文字'
    },
    style: {
      font: '微软雅黑',
      fontSize,
      lineHeight: 1.2,
      color: '#000',
      textAlign: 'left',
      fontWeight,
      underline: false
    },
    opacity: 1,
    zIndex,
    isSelected: true,
    isEditing: true,
    isLocked: false,
    scale: 1
  }
}

// 创建矩形图层
export const createRect = (width: number = 200, height: number = 200, position: Coords, zIndex: number): Layer => {
  return {
    id: String(Date.now()),
    type: 'rect',
    width: width,
    height: height,
    position,
    source: {},
    rotate: 0,
    opacity: 1,
    rectInfo: {
      fill: 'rgba(0,0,0,0)',
      borderWidth: 6,
      borderColor: '#000',
      borderStyle: 'solid'
    },
    zIndex,
    isSelected: true,
    isEditing: false,
    isLocked: false
  }
}

// 创建圆形图层
export const createCircle = (width: number = 200, height: number = 200, position: Coords, zIndex: number): Layer => {
  return {
    id: String(Date.now()),
    type: 'circle',
    width: width,
    height: height,
    position,
    source: {},
    rotate: 0,
    opacity: 1,
    circleInfo: {
      fill: 'rgba(0,0,0,0)',
      borderWidth: 6,
      borderColor: '#000',
      borderStyle: 'solid'
    },
    zIndex,
    isSelected: true,
    isEditing: false,
    isLocked: false
  }
}