import { cloneDeep } from 'lodash'
import { templateStore } from 'store/template'
import { TemplateInfo, LAYER_TYPE } from 'types'

const historyCache: TemplateInfo[] = []
let pointer = 0
let isUndoOrRedo = false

export default function undoRedo () {
  const { setCanUseUndo, setCanUseRedo } = templateStore

  const init = (template: TemplateInfo) => {
    historyCache.push(template)
  }

  // 缓存历史记录
  const pushHistory = () => {
    if (isUndoOrRedo) {
      isUndoOrRedo = false
      return
    }

    const _template = cloneDeep(templateStore.template)
    _template.layers = _template.layers.map(l => {
      l.isSelected = false
      l.isEditing = false
      l.isHover = false
      return l
    })
    pointer++
    historyCache[pointer] = _template
    historyCache.splice(pointer + 1, historyCache.length)
    setCanUseUndo(true)
    setCanUseRedo(false)
    if (historyCache.length > 50) {
      historyCache.shift()
      pointer--
    }
  }

  // 撤销
  const undo = () => {
    if (historyCache[pointer - 1]) {
      isUndoOrRedo = true
      pointer--
      const _template = historyCache[pointer]
      templateStore.setTemplate(cloneDeep(_template))
      templateStore.setLayerType(LAYER_TYPE.EMPTY)
      setCanUseRedo(true)
      if (!historyCache[pointer - 1]) {
        setCanUseUndo(false)
      }
    }
  }

  // 重做
  const redo = () => {
    if (historyCache[pointer + 1]) {
      isUndoOrRedo = true
      pointer++
      const _template = historyCache[pointer]
      templateStore.setTemplate(cloneDeep(_template))
      templateStore.setLayerType(LAYER_TYPE.EMPTY)
      setCanUseUndo(true)
      if (!historyCache[pointer + 1]) {
        setCanUseRedo(false)
      }
    }
  }

  return {
    init,
    pushHistory,
    undo,
    redo
  }
}