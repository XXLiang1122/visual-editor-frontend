import styled from "@emotion/styled";
import { ImageItem as ImageInfo } from "types/image";
import { templateStore } from 'store/template';
import { Layer } from 'types';
import { observer } from 'mobx-react';
import { DragEvent } from 'react'

export default observer(({ image }: { image: ImageInfo }) => {
  const { template, layers, addLayer, resetSelectStatus } = templateStore

  // 使用图片
  const onUseImage = () => {
    const newLayer: Layer = {
      id: String(Date.now()),
      type: 'image',
      width: image.webformatWidth,
      height: image.webformatHeight,
      position: {
        x: (template.global.width - image.webformatWidth) / 2,
        y: (template.global.height - image.webformatHeight) / 2
      },
      rotate: 0,
      reverse: {
        x: 1,
        y: 1
      },
      source: {
        imageUrl: image.webformatURL
      },
      clip: {
        width: image.webformatWidth,
        height: image.webformatHeight,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        pre: {
          width: image.webformatWidth,
          height: image.webformatHeight,
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

  // 拖拽图片
  const onDragStartCapture = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData('image', JSON.stringify(image))
  }

  return <Image
    style={{
      flexBasis: `${100 * image.webformatWidth / image.webformatHeight}px`
    }}
    draggable="true"
    onClick={onUseImage}
    onDragStartCapture={onDragStartCapture}
  >
    <img src={image.webformatURL} alt="" draggable="false" />
  </Image>
})

const Image = styled.div`
  position: relative;
  margin: 0 10px 10px 0;
  background-color: #f0f1f4;
  overflow: hidden;
  flex-grow: 1;

  img {
    min-width: 100%;
    height: 100px;
    object-fit: cover;
  }
`