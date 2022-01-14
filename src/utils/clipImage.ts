import { Layer, POINT_TYPE } from 'types';

// 计算处理图片裁剪
export const clipImage = (layer: Layer, point: POINT_TYPE, oldWidth: number, oldHeight: number): Layer => {
  // 判断是否有翻转，翻转后方向互换
  if (layer.reverse?.x === -1) {
    if (point === POINT_TYPE.L) {
      point = POINT_TYPE.R
    } else if (point === POINT_TYPE.R) {
      point = POINT_TYPE.L
    }
  }
  if (layer.reverse?.y === -1) {
    if (point === POINT_TYPE.T) {
      point = POINT_TYPE.B
    } else if (point === POINT_TYPE.B) {
      point = POINT_TYPE.T
    }
  }
  if (layer.clip) {
    const imageWhRatio = layer.clip.pre.width / layer.clip.pre.height
    switch (point) {
      case POINT_TYPE.BR:
      case POINT_TYPE.BL:
      case POINT_TYPE.TL:
      case POINT_TYPE.TR: {
        // 全部等比例伸缩
        const ratio = layer.width / oldWidth
        layer.clip.width *= ratio
        layer.clip.height *= ratio
        layer.clip.top *= ratio
        layer.clip.left *= ratio
        layer.clip.right *= ratio
        layer.clip.bottom *= ratio
        break
      }
      case POINT_TYPE.R: {
        // 伸缩
        if (layer.width + layer.clip.left > layer.clip.pre.width) {
          layer.clip.left *= layer.width / oldWidth
          layer.clip.top *= layer.width / oldWidth
          const newWidth = layer.clip.left + layer.width
          layer.clip.width = newWidth
          layer.clip.height = newWidth / imageWhRatio
        // 裁剪
        } else {
          layer.clip.left = layer.clip.pre.left
          layer.clip.top = layer.clip.pre.top
          layer.clip.width = layer.clip.pre.width
          layer.clip.height = layer.clip.pre.height
        }
        break
      }
      case POINT_TYPE.L: {
        // 伸缩
        if (layer.width + layer.clip.right > layer.clip.pre.width) {
          layer.clip.right *= layer.width / oldWidth
          const newWidth = layer.clip.right + layer.width
          layer.clip.width = newWidth
          layer.clip.left = 0
          layer.clip.top *= layer.width / oldWidth
          layer.clip.height = newWidth / imageWhRatio
        // 裁剪
        } else {
          layer.clip.left = layer.clip.pre.width - layer.clip.pre.right - layer.width
          layer.clip.top = layer.clip.pre.top
          layer.clip.width = layer.clip.pre.width
          layer.clip.height = layer.clip.pre.height
          layer.clip.right = layer.clip.pre.right
          layer.clip.bottom = layer.clip.pre.bottom
        }
        break
      }
      case POINT_TYPE.B: {
        // 伸缩
        if (layer.height + layer.clip.top > layer.clip.pre.height) {
          layer.clip.top *= layer.height / oldHeight
          layer.clip.left *= layer.height / oldHeight
          const newHeight = layer.clip.top + layer.height
          layer.clip.height = newHeight
          layer.clip.width = newHeight * imageWhRatio
        // 裁剪
        } else {
          layer.clip.left = layer.clip.pre.left
          layer.clip.top = layer.clip.pre.top
          layer.clip.width = layer.clip.pre.width
          layer.clip.height = layer.clip.pre.height
        }
        break
      }
      case POINT_TYPE.T: {
        // 伸缩
        if (layer.height + layer.clip.bottom > layer.clip.pre.height) {
          layer.clip.bottom *= layer.height / oldHeight
          const newHeight = layer.clip.bottom + layer.height
          layer.clip.height = newHeight
          layer.clip.top = 0
          layer.clip.left *= layer.height / oldHeight
          layer.clip.width = newHeight * imageWhRatio
        // 裁剪
        } else {
          layer.clip.top = layer.clip.pre.height - layer.clip.pre.bottom - layer.height
          layer.clip.left = layer.clip.pre.left
          layer.clip.width = layer.clip.pre.width
          layer.clip.height = layer.clip.pre.height
          layer.clip.right = layer.clip.pre.right
          layer.clip.bottom = layer.clip.pre.bottom
        }
        break
      }
    }
  }
  return layer
}

// 更新上一次的图片的裁剪信息，保存在pre对象里
export const updateImageClip = (layer: Layer): Layer => {
  if (layer.clip) {
    layer.clip.pre.left = layer.clip.left
    layer.clip.pre.top = layer.clip.top
    layer.clip.pre.right = layer.clip.width - layer.clip.left - layer.width
    layer.clip.pre.bottom = layer.clip.height - layer.clip.top - layer.height
    layer.clip.pre.width = layer.clip.width
    layer.clip.pre.height = layer.clip.height
    layer.clip.right = layer.clip.pre.right
    layer.clip.bottom = layer.clip.pre.bottom
  }
  return layer
}