interface Coords {
  x: number;
  y: number;
}

// 求两点之间的中点坐标
export const getCenterCoords = (p1: Coords, p2: Coords): Coords => {
  return {
    x: p1.x + ((p2.x - p1.x) / 2),
    y: p1.y + ((p2.y - p1.y) / 2)
  }
}

/**
 * 计算根据圆心旋转后的点的坐标
 * @param point 旋转前的点坐标
 * @param center 旋转中心
 * @param rotate 旋转的角度
 * @return 旋转后的坐标
 */
 export const calcRotatedCoords = (point: Coords, center: Coords, rotate: number): Coords => {
  rotate /= 180 / Math.PI
  return {
    x: (point.x - center.x) * Math.cos(rotate) - (point.y - center.y) * Math.sin(rotate) + center.x,
    y: (point.x - center.x) * Math.sin(rotate) + (point.y - center.y) * Math.cos(rotate) + center.y
  }
}