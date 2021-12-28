import html2canvas from 'html2canvas-stroke2'

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

/** 截取图片 */
export async function getCoverImage (selector: string): Promise<string> {
  const el = document.querySelector(selector) as HTMLElement
  const copyEl = el.cloneNode(true) as HTMLElement

  copyEl.style.transform = ''
  copyEl.style.position = 'fixed'
  copyEl.style.left = '-9999px'
  document.body.appendChild(copyEl)
  copyEl.querySelectorAll('img').forEach((img) => {
    // 图片跨域，服务端也要支持（图片服务器配置Access-Control-Allow-Origin）
    img.setAttribute('crossOrigin', 'anonymous')
  })
  const opt = {
    width: copyEl.offsetWidth, // canvas宽度
    height: copyEl.offsetHeight,
    backgroundColor: null, // 画出来的图片有白色的边框,不要可设置背景为透明色（null）
    useCORS: true // 支持图片跨域
  }

  return new Promise((resolve, reject) => {
    html2canvas(copyEl, opt).then((canvas: any) => {
      const res = canvas.toDataURL('image/png')
      resolve(res)
    }).catch((e: any) => {
      reject(e)
    }).finally(() => {
      document.body.removeChild(copyEl)
    })
  })
}
