import { observable, action, reaction } from 'mobx'
import { defaultTemplate } from 'utils/initData'
import { TemplateInfo, Layer, LAYER_TYPE } from 'types'
import { cloneDeep } from 'lodash'
import undoRedo from 'utils/undoRedo'

let template: TemplateInfo = Object.assign(defaultTemplate, {
  layers: defaultTemplate.layers.map(layer => { return {...layer, isSelected: false, isEditing: false, isHover: false, isLocked: false, scale: 1} })
})

// 初始化模板
export const initTemplate = (tpl: TemplateInfo) => {
  templateStore.setTemplate(Object.assign(tpl, {
    layers: tpl.layers.map(layer => { return {...layer, isSelected: false, isEditing: false, isHover: false, scale: 1} })
  }))
}

// const localTemplateCache = localStorage.getItem('TEMPLATE')
// if (localTemplateCache) {
//   template = JSON.parse(localTemplateCache)
// }

// 模板store
export const templateStore = observable({
  // 模板
  template: template,
  // 当前编辑图层类型
  layerType: LAYER_TYPE.EMPTY,
  // 是否需要重新计算图层的高度，比如改变字体大小时需要
  needUpdateLayerHeight: false,
  // 图层是否正在移动
  isMoving: false,
  canUseUndo: false,
  canUseRedo: false,

  get layers (): Layer[] {
    return this.template.layers
  },

  get activeLayer (): Layer | undefined {
    return this.layers.find(l => l.isSelected)
  },

  // 获取最新的模板
  getTemplate () {
    const _template = cloneDeep(templateStore.template)
    _template.layers = _template.layers.map(l => {
      if (l.type === 'text' && l.style && l.scale) {
        l.style.fontSize *= l.scale
      }
      delete l.isSelected
      delete l.isEditing
      delete l.isHover
      delete l.scale
      // @ts-ignore
      delete l.clip?.pre
      return l
    })
    return _template
  },

  // 修改整体模板
  setTemplate (val: TemplateInfo) {
    this.template = val
  },

  // 修改画布尺寸
  setCanvasSize (size: { width: number; height: number }) {
    this.template.global.width = size.width
    this.template.global.height = size.height
  },

  // 修改全部图层
  setLayers (layers: Layer[]) {
    this.template.layers = layers
  },

  // 修改单个图层
  setLayer (layer: Layer) {
    const idx = this.layers.findIndex(l => l.id === layer.id)
    if (idx > -1 && !this.layers[idx].isLocked) {
      this.layers[idx] = layer
    }
  },

  // 新增单个图层
  addLayer (layer: Layer) {
    this.layers.push(layer)
    this.updateLayerType(layer)
  },

  // 移除单个图层
  removeLayer (id: string) {
    const idx = this.layers.findIndex(l => l.id === id)
    if (idx > -1 && !this.layers[idx].isLocked) {
      this.layers.splice(idx, 1)
      this.setLayerType(LAYER_TYPE.EMPTY)
    }
  },

  // 设置图层层级
  setLayerLevel (id: string, level: number) {
    const idx = this.layers.findIndex(l => l.id === id)
    if (idx > -1) {
      this.layers[idx].zIndex = level
    }
  },

  // 选择图层
  selectLayer (id: string) {
    this.layers.forEach(layer => {
      layer.isSelected = layer.id === id
      if (layer.isSelected) {
        this.updateLayerType(layer)
      }
    })
    // 隐藏一些下拉组件
    document.dispatchEvent(new Event('mousedown'))
  },

  // 鼠标经过图层
  hoverLayer (id?: string) {
    this.layers.forEach(layer => {
      layer.isHover = id ? layer.id === id : false
    })
  },

  // 更新图层类型
  updateLayerType (layer: Layer) {
    switch (layer.type) {
      case 'image': this.setLayerType(LAYER_TYPE.IMAGE); break;
      case 'text': this.setLayerType(LAYER_TYPE.TEXT); break;
      case 'rect': this.setLayerType(LAYER_TYPE.RECT); break;
      case 'circle': this.setLayerType(LAYER_TYPE.CIRCLE); break;
    }
  },

  // 设置当前选择的图层类型
  setLayerType (type: LAYER_TYPE) {
    this.layerType = type
  },

  // 设置图层编辑状态(文字编辑、图片裁剪)
  setEditStatus (id: string) {
    if (this.layers.some(l => l.id === id && l.isLocked)) return
    this.layers.forEach(layer => {
      layer.isEditing = layer.id === id
    })
  },

  // 设置图层锁定状态
  setLayerLock (id: string, isLocked: boolean) {
    const idx = this.layers.findIndex(l => l.id === id)
    if (idx > -1) {
      this.layers[idx].isLocked = isLocked
      this.layers[idx].isEditing = false
    }
  },

  // 重置所有图层选中状态
  resetSelectStatus () {
    this.layers.forEach(layer => {
      layer.isSelected = false
    })
    this.setLayerType(LAYER_TYPE.EMPTY)
  },

  // 重置所有文字图层编辑状态
  resetEditStatus () {
    this.layers.forEach(layer => {
      layer.isEditing = false
    })
  },

  // 设置背景色
  setBackgroundColor (color: string) {
    this.template.background.color = color
  },

  // 设置needUpdateLayerHeight
  setNeedUpdateLayerHeight (val: boolean) {
    this.needUpdateLayerHeight = val
  },

  // 设置isMoving
  setIsMoving (val: boolean) {
    this.isMoving = val
  },

  setCanUseUndo (val: boolean) {
    this.canUseUndo = val
  },

  setCanUseRedo (val: boolean) {
    this.canUseRedo = val
  },
}, {
  setTemplate: action.bound,
  getTemplate: action.bound,
  setCanvasSize: action.bound,
  setLayers: action.bound,
  setLayer: action.bound,
  addLayer: action.bound,
  removeLayer: action.bound,
  selectLayer: action.bound,
  setLayerLevel: action.bound,
  hoverLayer: action.bound,
  updateLayerType: action.bound,
  setLayerType: action.bound,
  setEditStatus: action.bound,
  setLayerLock: action.bound,
  resetSelectStatus: action.bound,
  resetEditStatus: action.bound,
  setBackgroundColor: action.bound,
  setNeedUpdateLayerHeight: action.bound,
  setIsMoving: action.bound,
  setCanUseUndo: action.bound,
  setCanUseRedo: action.bound
})

// 撤销重做
const { init, pushHistory } = undoRedo()
init(template)

// 切换图层时重置文字编辑状态
// 清空空文字图层
reaction(
  () => templateStore.layers.map(l => l.isSelected).join(''),
  () => {
    templateStore.resetEditStatus()
    const idx = templateStore.layers.findIndex(l => l.type === 'text' && !l.source.content?.replaceAll(/\n/g, ''))
    if (idx > -1) {
      templateStore.removeLayer(templateStore.layers[idx].id)
    }
  }
)

// 保存到本地
// const save = () => {
//   const template = cloneDeep(templateStore.template)
//   template.layers = template.layers.map(l => {
//     l.isSelected = false
//     l.isEditing = false
//     l.isHover = false
//     return l
//   })
//   localStorage.setItem('TEMPLATE', JSON.stringify(template))
// }

// 侦听保存
reaction(
  () => {
    const template = cloneDeep(templateStore.template)
    template.layers = template.layers.map(l => {
      delete l.isSelected
      delete l.isEditing
      delete l.isHover
      return l
    })
    return JSON.stringify(template)
  },
  () => { /** save(); */ pushHistory() },
  {
    delay: 500
  }
)
