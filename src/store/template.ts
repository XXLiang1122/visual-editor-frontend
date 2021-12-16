import { observable, action, reaction } from 'mobx'
import { defaultTemplate } from 'utils/initData'
import { TemplateInfo, Layer } from 'types'
import { cloneDeep } from 'lodash'

let template: TemplateInfo = Object.assign(defaultTemplate, {
  layers: defaultTemplate.layers.map(layer => { return {isEditing: false, ...layer} })
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

  // 重置所有图层选中状态
  resetEditStatus () {
    this.layers.forEach(layer => {
      layer.isEditing = false
    })
  }
}, {
  setTemplate: action.bound,
  setLayers: action.bound,
  setLayer: action.bound,
  addLayer: action.bound,
  removeLayer: action.bound,
  resetEditStatus: action.bound
})

// 保存到本地
const save = () => {
  const template = cloneDeep(templateStore.template)
  template.layers = template.layers.map(l => {
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