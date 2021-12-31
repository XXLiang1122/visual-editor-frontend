import { observer } from 'mobx-react';
import styled from "@emotion/styled";
import { Layer } from 'types';
import { templateStore } from 'store/template';
import { MouseEvent } from 'react';

export default observer(({ layer }: { layer: Layer }) => {
  const { editTextLayer } = templateStore

  const onClipImage = (e: MouseEvent) => {
    e.stopPropagation()
    editTextLayer(layer.id)

  }

  return (
    <ImgWrapper onDoubleClick={onClipImage}>
      <div style={{
        position: 'absolute',
        width: `${layer.clip?.width}px`,
        height: `${layer.clip?.height}px`,
        transform: `translate(-${layer.clip?.left}px, -${layer.clip?.top}px)`
      }}>
        <Img src={layer.source.imageUrl} draggable="false" />
      </div>
    </ImgWrapper>
  )
})

const ImgWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
`

const Img = styled.img`
  width: 100%;
  height: 100%;
`