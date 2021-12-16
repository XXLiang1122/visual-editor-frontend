import styled from "@emotion/styled";
import { ImageItem as ImageInfo } from "types/image";
import { templateStore } from 'store/template';
import { Layer } from 'types'

export default function ImageItem ({ image }: { image: ImageInfo }) {
  const { template, layers, addLayer, resetEditStatus } = templateStore

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
      source: {
        imageUrl: image.webformatURL
      },
      zIndex: layers.length ? layers[layers.length - 1].zIndex + 1 : 1,
      isEditing: true
    }
    resetEditStatus()
    addLayer(newLayer)
  }

  return <Image
    style={{
      flexBasis: `${100 * image.webformatWidth / image.webformatHeight}px`
    }}
    onClick={onUseImage}
  >
    <img src={image.webformatURL} alt="" />
  </Image>
}

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