import { observable, action, reaction } from 'mobx'
import { defaultTemplate } from 'utils/initData'
import { TemplateInfo, Layer } from 'types'
import { cloneDeep } from 'lodash'

let template: TemplateInfo = Object.assign(defaultTemplate, {
  layers: defaultTemplate.layers.map(layer => { return {...layer, isSelected: false, isEditing: false, scale: 1} })
})

const localTemplateCache = localStorage.getItem('TEMPLATE')
if (localTemplateCache) {
  template = JSON.parse(localTemplateCache)
}

// 模板store
export const templateStore = observable({
  template: template,

  get layers (): Layer[] {
    return this.template.layers
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
      delete l.scale
      return l
    })
    return _template
  },

  // 修改整体模板
  setTemplate (val: TemplateInfo) {
    this.template = val
  },

  // 修改全部图层
  setLayers (layers: Layer[]) {
    this.template.layers = layers
  },

  // 修改单个图层
  setLayer (layer: Layer) {
    const idx = this.layers.findIndex(l => l.id === layer.id)
    if (idx > -1) {
      this.layers[idx] = layer
    }
  },

  // 新增单个图层
  addLayer (layer: Layer) {
    this.layers.push(layer)
  },

  // 移除单个图层
  removeLayer (id: string) {
    const idx = this.layers.findIndex(l => l.id === id)
    if (idx > -1) {
      this.layers.splice(idx, 1)
    }
  },

  // 选择图层
  selectLayer (id: string) {
    this.layers.forEach(layer => {
      layer.isSelected = layer.id === id
    })
  },

  // 设置文字图层编辑状态
  editTextLayer (id: string) {
    this.layers.forEach(layer => {
      layer.isEditing = layer.id === id
    })
  },

  // 重置所有图层选中状态
  resetSelectStatus () {
    this.layers.forEach(layer => {
      layer.isSelected = false
    })
  },

  // 重置所有文字图层编辑状态
  resetEditStatus () {
    this.layers.forEach(layer => {
      layer.isEditing = false
    })
  }
}, {
  setTemplate: action.bound,
  getTemplate: action.bound,
  setLayers: action.bound,
  setLayer: action.bound,
  addLayer: action.bound,
  removeLayer: action.bound,
  selectLayer: action.bound,
  editTextLayer: action.bound,
  resetSelectStatus: action.bound,
  resetEditStatus: action.bound
})

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
const save = () => {
  const template = cloneDeep(templateStore.template)
  template.layers = template.layers.map(l => {
    l.isSelected = false
    l.isEditing = false
    return l
  })
  localStorage.setItem('TEMPLATE', JSON.stringify(template))
}

// 侦听保存
reaction(
  () => {
    const template = cloneDeep(templateStore.template)
    template.layers = template.layers.map(l => {
      delete l.isSelected
      delete l.isEditing
      return l
    })
    return JSON.stringify(template)
  },
  save,
  {
    delay: 500
  }
)