import React, { useContext, MouseEvent, DragEvent } from "react";
import styled from "@emotion/styled";
import { ScaleContext, BackgroundContext } from 'store/context';
import Layer from './layer/Layer';
import { LAYER_TYPE, Layer as LayerType } from 'types'
import { ImageItem } from "types/image";
import { templateStore } from 'store/template';
import { observer } from 'mobx-react';
import { toJS } from 'mobx';
import TextEditor from './layer/TextEditor';
import ImageLayer from './layer/Image'
import ClipImage from "./ClipImage";
import Rect from './layer/shapes/Rect'
import Circle from './layer/shapes/Circle'
import { createPortal } from "react-dom";

interface Props {
  width: number;
  height: number;
  scale: number;
}

// 拖拽图片时鼠标的位置
const dragCursorPosition = {
  x: 0,
  y: 0
}

// 画布
export default observer(() => {
  const { template, layers, addLayer, resetSelectStatus, setLayerType } = templateStore
  const { global, background } = template

  const scale = useContext(ScaleContext)
  const {isSelectedBackground, setIsSelectedBackground} = useContext<{
    isSelectedBackground: boolean;
    setIsSelectedBackground: React.Dispatch<React.SetStateAction<boolean>>
  }>(BackgroundContext)

  // 选中背景
  const selectBackground = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsSelectedBackground(true)
    resetSelectStatus()
    setLayerType(LAYER_TYPE.BACKGROUND)
  }

  // 图片拖拽释放
  const onDropCapture = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    const onUseImage = (width: number, height: number, url: string) => {
      const canvasRect = (document.querySelector('#layerControl') as HTMLElement)?.getBoundingClientRect()
      const x = dragCursorPosition.x - canvasRect.left
      const y = dragCursorPosition.y - canvasRect.top
      const newLayer: LayerType = {
        id: String(Date.now()),
        type: 'image',
        width: width,
        height: height,
        position: {
          x: x / scale - width / 2,
          y: y / scale - height / 2
        },
        rotate: 0,
        reverse: {
          x: 1,
          y: 1
        },
        source: {
          imageUrl: url
        },
        clip: {
          width: width,
          height: height,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pre: {
            width: width,
            height: height,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }
        },
        opacity: 1,
        zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
        isSelected: true,
        isEditing: false,
        isLocked: false,
        scale: 1
      }
      resetSelectStatus()
      addLayer(newLayer)
    }

    // 本地图片拖拽
    if (e.dataTransfer.files.length > 0) {
      const files = e.dataTransfer.files
      if (!/image\//.test(files[0].type)) return
      const reader = new FileReader()
      reader.readAsDataURL(files[0])
      reader.onload = el => {
        const url = el.target?.result
        if (typeof url === 'string') {
          const img = new Image()
          img.src = url
          img.onload = () => {
            onUseImage(img.width, img.height, url)
          }
        }
      }
    } else { // 侧边栏图片
      let image: ImageItem | null = null
      try {
        image = JSON.parse(e.dataTransfer?.getData('image'))
      } catch (e) {}
      // 使用图片
      if (image) {
        onUseImage(image.webformatWidth, image.webformatHeight, image.webformatURL)
      }
    }
  }

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    dragCursorPosition.x = e.pageX
    dragCursorPosition.y = e.pageY
  }

  return <Wrapper width={global.width} height={global.height} scale={scale}>
    <CanvasContent
      id="canvasContent"
      style={{ width: global.width, height: global.height, transform: `scale(${scale})` }}
      onDrop={onDropCapture} onDragOver={onDragOver}>
      <Background color={background.color} onClick={selectBackground} />
      {
        template.layers.map(layer => {
          // 图片
          if (layer.type === 'image') {
            return layer.isEditing ?
            <TransportImage key={layer.id}>
              <ClipImage info={toJS(layer)} />
            </TransportImage>
            :
            <Layer key={layer.id} info={layer}>
              <ImageLayer layer={toJS(layer)} />
            </Layer>
          }
          // 文字
          if (layer.type === 'text') {
            return layer.isEditing ?
            <TransportEditor key={layer.id}>
              <Layer info={layer}>
                <TextEditor layer={toJS(layer)} />
              </Layer>
            </TransportEditor>
            :
            <Layer key={layer.id} info={layer}>
              <TextEditor layer={toJS(layer)} />
            </Layer>
          }
          // 矩形
          if (layer.type === 'rect') {
            return <Layer key={layer.id} info={layer}>
              <Rect layer={toJS(layer)} />
            </Layer>
          }
          // 圆形
          if (layer.type === 'circle') {
            return <Layer key={layer.id} info={layer}>
              <Circle layer={toJS(layer)} />
            </Layer>
          }
          return <></>
        })
      }
    </CanvasContent>
    {/* 编辑框传送点 */}
    <LayerControl id="layerControl" width={global.width} height={global.height} scale={scale}>
        {isSelectedBackground && <BackgroundBorder />}
        {/* 垂直辅助线 */}
        <VLine id="verticalLine" />
        {/* 水平辅助线 */}
        <HLine id="horizontalLine" />
    </LayerControl>
    {/* 点前编辑的文本传送点 */}
    <TextControl id="textControl" style={{ width: global.width, height: global.height, transform: `scale(${scale})` }} />
  </Wrapper>
})

// 传送门
function TransportEditor ({ children }: { children: JSX.Element }) {
  return createPortal(
    children,
    document.querySelector('#textControl') as HTMLDivElement
  )
}

// 传送门
function TransportImage ({ children }: { children: JSX.Element }) {
  return createPortal(
    children,
    document.querySelector('#editorContainer') as HTMLDivElement
  )
}

const Background = styled.div<{ color: string; }>(
  {
    position: 'relative',
    zIndex: -1,
    width: '100%',
    height: '100%'
  },
  props => ({
    backgroundColor: props.color
  })
)

const Wrapper = styled.div<Props>(
  {
    flex: 'none',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    pointerEvents: 'none'
  },
  props => ({
    width: props.width * props.scale + 100,
    height: props.height * props.scale + 100
  })
)

const CanvasContent = styled.div`
  flex: none;
  position: relative;
  overflow: hidden;
  background-color: #fff;
  user-select: none;
  pointer-events: auto;
`

const TextControl = styled(CanvasContent)`
  position: absolute;
  top: 50;
  left: 50;
  z-index: 1;
  pointer-events: none;
  overflow: visible;
  background-color: transparent;
`

const LayerControl = styled.div<Props>(
  {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 2,
    pointerEvents: 'none'
  },
  props => ({
    width: props.width * props.scale,
    height: props.height * props.scale
  })
)

const BackgroundBorder = styled.div`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid #00c4cc;
  background: transparent;
  pointer-events: none;
`

const VLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  border-left: 1px dashed #c228ff;
  visibility: hidden;
  z-index: 2;
`

const HLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 0;
  border-top: 1px dashed #c228ff;
  visibility: hidden;
  z-index: 2;
`