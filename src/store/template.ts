import { observable, action } from 'mobx'
import { defaultTemplate } from 'utils/initData'
import { TemplateInfo, Layer } from 'types'

const template: TemplateInfo = Object.assign(defaultTemplate, {
  layers: defaultTemplate.layers.map(layer => { return {isEditing: false, ...layer} })
})

export const templateStore = observable({
  template: template,

  get layers (): Layer[] {
    return this.template.layers
  },

  setTemplate (val: TemplateInfo) {
    this.template = val
  },

  setLayers (layers: Layer[]) {
    this.template.layers = layers
  },

  setLayer (layer: Layer) {
    const idx = this.layers.findIndex(l => l.id === layer.id)
    if (idx > -1) {
      this.layers[idx] = layer
    }
  },

  resetEditStatus () {
    this.layers.forEach(layer => {
      layer.isEditing = false
    })
  }
}, {
  setTemplate: action.bound,
  setLayers: action.bound,
  setLayer: action.bound,
  resetEditStatus: action.bound
})