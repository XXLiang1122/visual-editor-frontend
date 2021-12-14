import React, { useContext, useState, MouseEvent } from "react";
import styled from "@emotion/styled";
import { TemplateContext, ScaleContext, LayersContext, BackgroundContext } from 'store/context';
import Layer from './Layer';
import { TemplateInfo, FontStyle } from 'types';

interface Props {
  width: number;
  height: number;
  scale: number;
}

// 画布
export default function Canvas ({ cancelSelectLayers }: { cancelSelectLayers: () => void }) {
  const { template } = useContext<{ template: TemplateInfo; }>(TemplateContext)
  const scale = useContext(ScaleContext)

  const { global, background } = template
  const [layers, setLayers] = useState(template.layers)

  const {isSelectedBackground, setIsSelectedBackground} = useContext<{
    isSelectedBackground: boolean;
    setIsSelectedBackground: React.Dispatch<React.SetStateAction<boolean>>
  }>(BackgroundContext)

  // 选中背景
  const selectBackground = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation()
    setIsSelectedBackground(true)
    cancelSelectLayers()
  }

  return <Wrapper width={global.width} height={global.height} scale={scale}>
    <CanvasContent width={global.width} height={global.height} scale={scale}>
      <Background color={background.color} onClick={selectBackground} />
      <LayersContext.Provider value={{layers, setLayers}}>
        {
          layers.map(layer => {
            // 图片
            if (layer.type === 'image') {
              return <Layer key={layer.id} info={layer}>
                <Image src={layer.source.imageUrl} draggable="false" />
              </Layer>
            }
            // 文字
            if (layer.type === 'text') {
              return <Layer key={layer.id} info={layer}>
                <Text key={layer.id} style={layer.style as FontStyle}>{layer.source.content}</Text>
              </Layer>
            }
            return <></>
          })
        }
      </LayersContext.Provider>
    </CanvasContent>
    {/* 编辑框传送点 */}
    <LayerControl id="layerControl" width={global.width} height={global.height} scale={scale}>
        {isSelectedBackground && <BackgroundBorder />}
        {/* 垂直辅助线 */}
        <VLine id="verticalLine" />
        {/* 水平辅助线 */}
        <HLine id="horizontalLine" />
    </LayerControl>
  </Wrapper>
}

const Image = styled.img`
  width: 100%;
  height: 100%;
`

const Text = styled.div<{style: FontStyle}>(
  {},
  props => ({
    fontFamily: props.style.font,
    fontSize: props.style.fontSize,
    color: props.style.color,
    lineHeight: props.style.lineHeight,
    textAlign: props.style.textAlign
  })
)

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

const CanvasContent = styled.div<Props>(
  {
    flex: 'none',
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#fff',
    userSelect: 'none',
    pointerEvents: 'auto'
  },
  props => ({
    width: props.width,
    height: props.height,
    transform: `scale(${props.scale})`
  })
)

const LayerControl = styled.div<Props>(
  {
    position: 'absolute',
    top: 50,
    left: 50,
    zIndex: 1,
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