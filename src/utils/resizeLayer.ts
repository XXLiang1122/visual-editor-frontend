import { Layer, POINT_TYPE, Coords } from 'types'
import { getCenterCoords, calcRotatedCoords } from 'utils'

const MIN_SIZE = {
  width: 10,
  height: 10
}

/**
 * 无旋转处理
 * @param layer 图层信息
 * @param point 拖动的点类型
 * @param diff 鼠标上次和当前移动的xy差值
 * @param scale 画布缩放
 * @param lockRatio 是否锁定比例
 * @returns 
 */
export function normalResize (layer: Layer, point: POINT_TYPE, diff: Coords, scale: number, lockRatio: boolean): Layer {
  const whRatio = layer.width / layer.height
  let { x: newX, y: newY } = layer.position
  let { width: newWidth, height: newHeight } = layer
  const { x, y } = diff
  switch (point) {
    case POINT_TYPE.TL: {
      const height = layer.height
      newWidth -= x / scale
      newX += x / scale
      if (lockRatio) {
        newHeight = newWidth / whRatio
      } else {
        newHeight -= y / scale
      }
      newY -= newHeight - height
      break
    }
    case POINT_TYPE.TR: {
      const height = layer.height
      newWidth += x / scale
      if (lockRatio) {
        newHeight = newWidth / whRatio
      } else {
        newHeight -= y / scale
      }
      newY -= newHeight - height
      break
    }
    case POINT_TYPE.BL: {
      newWidth -= x / scale
      newX += x / scale
      if (lockRatio) {
        newHeight = newWidth / whRatio
      } else {
        newHeight += y / scale
      }
      break
    }
    case POINT_TYPE.BR: {
      newWidth += x / scale
      if (lockRatio) {
        newHeight = newWidth / whRatio
      } else {
        newHeight += y / scale
      }
      break
    }
    case POINT_TYPE.T: {
      newHeight -= y / scale
      newY += y / scale
      break
    }
    case POINT_TYPE.B: {
      newHeight += y / scale
      break
    }
    case POINT_TYPE.L: {
      newWidth -= x / scale
      newX += x / scale
      break
    }
    case POINT_TYPE.R: {
      newWidth += x / scale
      break
    }
  }

  if ((newWidth > MIN_SIZE.width && newHeight > MIN_SIZE.height) || newWidth > layer.width || newHeight > layer.height) {
    if (newWidth > MIN_SIZE.width) {
      layer.width = newWidth
      layer.position.x = newX
    }
    if (newHeight > MIN_SIZE.height) {
      layer.height = newHeight
      layer.position.y = newY
    }
  }

  return layer
}

/**
 * 有旋转处理
 * @param point 拖动的点类型
 * @param curPoint 鼠标相对于画布左上角的坐标
 * @param symmetricPoint 对称点
 * @param pointCenter 当前拖动的点/边元素的中心位置
 * @param info 图层信息props
 * @param layer 最新的图层信息
 * @param whRatio 宽高比
 * @param scale 画布缩放值
 * @param lockRatio 是否锁定比例
 * @returns 返回调整后的图层信息
 */
export function rotateResize (point: POINT_TYPE, curPoint: Coords, symmetricPoint: Coords, pointCenter: Coords, info: Layer, layer: Layer, whRatio: number, scale: number, lockRatio: boolean): Layer {
  switch (point) {
    case POINT_TYPE.TL: {
      // 根据鼠标当前位置和对称点获取最新中心点
      let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
      // 获取旋转前的左上角坐标
      let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
      // 获取旋转前的对称点坐标
      let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

      let newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
      let newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y

      if (lockRatio) {
        // 获取等比缩放计算后的坐标
        if (newWidth / newHeight > whRatio) {
          newOriginCurPoint.x += Math.abs(newWidth - newHeight * whRatio)
        } else {
          newOriginCurPoint.y += Math.abs(newHeight - newWidth / whRatio)
        }

        // 由于现在求的未旋转前的坐标是以没按比例缩减宽高前的坐标来计算的
        // 所以缩减宽高后，需要按照原来的中心点旋转回去，获得缩减宽高并旋转后对应的坐标
        // 然后以这个坐标和对称点获得新的中心点，并重新计算未旋转前的坐标
        const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
        newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
        newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
        newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

        newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
        newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
      }

      if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
        layer.width = newWidth / scale
        layer.height = newHeight / scale
        layer.position.y = newOriginCurPoint.y / scale
        layer.position.x = newOriginCurPoint.x / scale
      }
      break
    }

    case POINT_TYPE.TR: {
      let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
      // 获取旋转前的右上角坐标
      let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
      let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

      let newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
      let newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y

      if (lockRatio) {
        if (newWidth / newHeight > whRatio) {
          newOriginCurPoint.x -= Math.abs(newWidth - newHeight * whRatio)
        } else {
          newOriginCurPoint.y += Math.abs(newHeight - newWidth / whRatio)
        }

        const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
        newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
        newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
        newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

        newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
        newHeight = newOriginSymmetricPoint.y - newOriginCurPoint.y
      }

      if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
        layer.width = newWidth / scale
        layer.height = newHeight / scale
        layer.position.y = newOriginCurPoint.y / scale
        layer.position.x = newOriginSymmetricPoint.x / scale
      }
      break
    }

    case POINT_TYPE.BR: {
      let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
      // 获取旋转前的右下角坐标
      let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
      let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

      let newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
      let newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y

      if (lockRatio) {
        if (newWidth / newHeight > whRatio) {
          newOriginCurPoint.x -= Math.abs(newWidth - newHeight * whRatio)
        } else {
          newOriginCurPoint.y -= Math.abs(newHeight - newWidth / whRatio)
        }

        const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
        newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
        newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
        newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

        newWidth = newOriginCurPoint.x - newOriginSymmetricPoint.x
        newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
      }

      if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
        layer.width = newWidth / scale
        layer.height = newHeight / scale
        layer.position.y = newOriginSymmetricPoint.y / scale
        layer.position.x = newOriginSymmetricPoint.x / scale
      }
      break
    }

    case POINT_TYPE.BL: {
      let newCenterPoint = getCenterCoords(curPoint, symmetricPoint)
      // 获取旋转前的左下角坐标
      let newOriginCurPoint = calcRotatedCoords(curPoint, newCenterPoint, -info.rotate)
      let newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

      let newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
      let newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y

      if (lockRatio) {
        if (newWidth / newHeight > whRatio) {
          newOriginCurPoint.x += Math.abs(newWidth - newHeight * whRatio)
        } else {
          newOriginCurPoint.y -= Math.abs(newHeight - newWidth / whRatio)
        }

        const latestOriginCurPoint = calcRotatedCoords(newOriginCurPoint, newCenterPoint, info.rotate)
        newCenterPoint = getCenterCoords(latestOriginCurPoint, symmetricPoint)
        newOriginCurPoint = calcRotatedCoords(latestOriginCurPoint, newCenterPoint, -info.rotate)
        newOriginSymmetricPoint = calcRotatedCoords(symmetricPoint, newCenterPoint, -info.rotate)

        newWidth = newOriginSymmetricPoint.x - newOriginCurPoint.x
        newHeight = newOriginCurPoint.y - newOriginSymmetricPoint.y
      }

      if (newWidth / scale > MIN_SIZE.width && newHeight / scale > MIN_SIZE.height) {
        layer.width = newWidth / scale
        layer.height = newHeight / scale
        layer.position.y = newOriginSymmetricPoint.y / scale
        layer.position.x = newOriginCurPoint.x / scale
      }
      break
    }

    case POINT_TYPE.T:
    case POINT_TYPE.B: {
      // 由于用户拉伸时是以任意角度拉伸的，所以在求得旋转前的坐标时，只取 y 坐标（这里的 x 坐标可能是任意值），x 坐标用 pointCenter 的。
      // 这个中心点（第二个参数）用 pointCenter, center, symmetricPoint 都可以，只要他们在一条直线上就行
      const newOriginCurPoint = calcRotatedCoords(curPoint, pointCenter, -info.rotate)

      // 算出旋转前 y 坐标，再用 initCurPoint 的 x 坐标，重新计算它们旋转后对应的坐标
      const latestCurPoint = calcRotatedCoords({
        x: pointCenter.x,
        y: newOriginCurPoint.y
      }, pointCenter, info.rotate)

      // 用旋转后的坐标和对称点算出新的高度（勾股定理）
      const newHeight = Math.sqrt((latestCurPoint.x - symmetricPoint.x) ** 2 + (latestCurPoint.y - symmetricPoint.y) ** 2)

      const newCenter = {
        x: latestCurPoint.x - (latestCurPoint.x - symmetricPoint.x) / 2,
        y: latestCurPoint.y + (symmetricPoint.y - latestCurPoint.y) / 2
      }

      // 是否反向拉伸了
      let isReverse = false
      const angle = (info.rotate + 360) % 360
      // 禁止反向拉伸
      if (point === POINT_TYPE.T) {
        if ((angle >= 0 && angle <= 90) || (angle >= 270 && angle <= 360)) {
          if (latestCurPoint.y >= symmetricPoint.y) {
            isReverse = true
          }
        } else if (latestCurPoint.y <= symmetricPoint.y) {
          isReverse = true
        }
      }
      if (point === POINT_TYPE.B) {
        if (angle >= 90 && angle <= 270) {
          if (latestCurPoint.y >= symmetricPoint.y) {
            isReverse = true
          }
        } else if (latestCurPoint.y <= symmetricPoint.y) {
          isReverse = true
        }
      }

      if (newHeight / scale > MIN_SIZE.height && !isReverse) {
        layer.height = newHeight / scale
        layer.position.y = (newCenter.y - (newHeight / 2)) / scale
        layer.position.x = newCenter.x / scale - (layer.width / 2)
      }
      break
    }

    case POINT_TYPE.L:
    case POINT_TYPE.R: {
      const newOriginCurPoint = calcRotatedCoords(curPoint, pointCenter, -info.rotate)

      const latestCurPoint = calcRotatedCoords({
        x: newOriginCurPoint.x,
        y: pointCenter.y
      }, pointCenter, info.rotate)

      const newWidth = Math.sqrt((latestCurPoint.x - symmetricPoint.x) ** 2 + (latestCurPoint.y - symmetricPoint.y) ** 2)

      const newCenter = {
        x: latestCurPoint.x - (latestCurPoint.x - symmetricPoint.x) / 2,
        y: latestCurPoint.y + (symmetricPoint.y - latestCurPoint.y) / 2
      }

      // 是否反向拉伸了
      let isReverse = false
      const angle = (info.rotate + 360) % 360
      // 禁止反向拉伸
      if (point === POINT_TYPE.L) {
        if ((angle >= 0 && angle <= 90) || (angle >= 270 && angle <= 360)) {
          if (latestCurPoint.x >= symmetricPoint.x) {
            isReverse = true
          }
        } else if (latestCurPoint.x <= symmetricPoint.x) {
          isReverse = true
        }
      }
      if (point === POINT_TYPE.R) {
        if (angle >= 90 && angle <= 270) {
          if (latestCurPoint.x >= symmetricPoint.x) {
            isReverse = true
          }
        } else if (latestCurPoint.x <= symmetricPoint.x) {
          isReverse = true
        }
      }

      if (newWidth / scale > MIN_SIZE.width && !isReverse) {
        layer.width = newWidth / scale
        layer.position.y = newCenter.y / scale - (layer.height / 2)
        layer.position.x = (newCenter.x - (newWidth / 2)) / scale
      }
      break
    }
  }

  return layer
}