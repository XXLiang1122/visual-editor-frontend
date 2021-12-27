import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import Quill from 'quill';
import { observer } from 'mobx-react';
import styled from "@emotion/styled";
import { FontStyle } from 'types';
import { Layer } from 'types';
import { useCallback, useEffect, useRef, useState, useContext } from 'react';
import { templateStore } from 'store/template';
import { cloneDeep } from 'lodash';
import { ScaleContext } from 'store/context';

export default observer(({ layer }: { layer: Layer }) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const { editTextLayer, setLayer, needUpdateLayerHeight, setNeedUpdateLayerHeight, isMoving } = templateStore
  const scale = useContext(ScaleContext)

  // quill实例
  let [editor, setEditor] = useState<Quill | null>(null)

  // 画布的DOM信息
  const canvasRect = (document.querySelector('#textControl') as HTMLElement)?.getBoundingClientRect()

  // 文本内容变化
  const onTextChange = useCallback(() => {
    if (editor) {
      const _layer = cloneDeep(layer)
      const text = editor.getText()
      _layer.source.content = text

      if (editorRef.current) {
        // 文本换行了，更新图层最新高度和位置
        const rect = editorRef.current.getBoundingClientRect()
        const rad = (layer.rotate % 180) * Math.PI / 180
        const newHeight = Math.abs((rect.height - layer.width * scale * Math.sin(rad)) / Math.cos(rad))

        // 高度不一致表示换行/减行
        if (newHeight / scale !== layer.height) {
          _layer.height = newHeight / scale

          const center = {
            x: rect.left + rect.width / 2 - canvasRect.left,
            y: rect.top + rect.height / 2 - canvasRect.top
          }
          const newX = center.x / scale - (layer.width / 2)
          const newY = (center.y - (newHeight / 2)) / scale

          _layer.position = {
            x: newX,
            y: newY
          }
        }
      }
      setLayer(_layer)
    }
  }, [editor, layer, setLayer, scale, canvasRect])

  // 字体大小改变了，高度也要更新
  useEffect(() => {
    if (needUpdateLayerHeight && editorRef.current) {
      const _layer = cloneDeep(layer)
      const rect = editorRef.current.getBoundingClientRect()
      const rad = (layer.rotate % 180) * Math.PI / 180
      const newHeight = Math.abs((rect.height - layer.width * scale * Math.sin(rad)) / Math.cos(rad))

      // 高度不一致表示换行/减行
      if (newHeight / scale !== layer.height) {
        _layer.height = newHeight / scale

        const center = {
          x: rect.left + rect.width / 2 - canvasRect.left,
          y: rect.top + rect.height / 2 - canvasRect.top
        }
        const newX = center.x / scale - (layer.width / 2)
        const newY = (center.y - (newHeight / 2)) / scale

        _layer.position = {
          x: newX,
          y: newY
        }
        setLayer(_layer)
      }
      setNeedUpdateLayerHeight(false)
    }
  }, [canvasRect, layer, needUpdateLayerHeight, scale, setLayer, setNeedUpdateLayerHeight])

  // 拖拽改变文本框宽度时，更新图层最新高度
  // TODO: 位置会偏移
  useEffect(() => {
    // isMoving表示拖拽
    if (isMoving && editorRef.current) {
      const rect = editorRef.current.getBoundingClientRect()
      const rad = (layer.rotate % 180) * Math.PI / 180
      const newHeight = Math.abs((rect.height - layer.width * scale * Math.sin(rad)) / Math.cos(rad))

      // 高度不一致表示换行/减行
      if (Math.abs(newHeight / scale - layer.height) > 1) {
        const _layer = cloneDeep(layer)
        _layer.height = newHeight / scale
        setLayer(_layer)
      }
    }
  }, [layer, scale, isMoving, canvasRect, setLayer])

  // 进入编辑状态
  const onEditText = () => {
    editTextLayer(layer.id)
  }

  // 初始化quill实例
  useEffect(() => {
    if (editorRef.current && !editor) {
      const instance = new Quill(editorRef.current)
      setEditor(instance)
    }
  }, [editor])

  // 设置文本内容
  useEffect(() => {
    if (editor && layer.source.content && editor.getText() !== layer.source.content) {
      editor.setText(layer.source.content)
    }
  }, [editor, layer.source.content])

  // 设置编辑状态
  useEffect(() => {
    if (editor) {
      editor.enable(layer.isEditing)
      layer.isEditing && editor.setSelection(0, 1000)
    }
  }, [editor, layer.isEditing])

  useEffect(() => {
    if (editor) {
      editor.on('text-change', onTextChange)
    }
    return () => {
      editor?.off('text-change', onTextChange)
    }
  }, [editor, onTextChange])

  return <TextWrapper
    style={{
      transform: `scale(${layer.scale})`,
      width: `${layer.width / (layer.scale || 1)}px`,
      height: `${layer.height / (layer.scale || 1)}px`
    }}
  >
    <Text
      data={layer.style as FontStyle}
      onDoubleClick={onEditText}
    >
      <Editor ref={editorRef} spellCheck="false" />
    </Text>
  </TextWrapper>
})

const TextWrapper = styled.div`
  transform-origin: 0 0;
`

const Text = styled.div<{data: FontStyle}>(
  {},
  props => ({
    fontFamily: `"${props.data.font}"`,
    fontSize: props.data.fontSize,
    color: props.data.color,
    lineHeight: props.data.lineHeight,
    textAlign: props.data.textAlign,
    fontWeight: props.data.fontWeight,
    textDecorationLine: props.data.underline ? 'underline' : 'none'
  })
)

const Editor = styled.div`
  font-family: inherit;
  font-size: inherit;

  .ql-editor {
    padding: 0;
    overflow: visible;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    white-space: break-spaces;
    /* user-select: text; */
    line-break: anywhere;

    &>* {
      cursor: inherit;
    }
  }
`