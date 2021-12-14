import React, { MouseEvent, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Footer from "./Footer";
import Canvas from "./Canvas";
import { defaultTemplate } from 'utils/initData';
import { TemplateInfo } from 'types';
import { TemplateContext, ScaleContext, BackgroundContext } from 'store/context';

// 编辑器
export default function Editor () {
  // 画布缩放值
  const [scale, setScale] = useState(1)
  // 画布父级容器dom ref
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  // 初始化模板数据
  const [template, setTemplate] = useState<TemplateInfo>(() => Object.assign(defaultTemplate, {
    layers: defaultTemplate.layers.map(layer => { return {isEditing: false, ...layer} })
  }))

  // 是否选中背景
  const [isSelectedBackground, setIsSelectedBackground] = useState(false)

  // 首次渲染画布尺寸适配
  useEffect(() => {
    const wrapperEl = canvasWrapperRef.current
    const { width: canvasWidth, height: canvasHeight } = template.global
    let scale = 1
    if (wrapperEl && wrapperEl.clientWidth < canvasWidth + 100) {
      scale = (wrapperEl.clientWidth - 100) / canvasWidth
    }
    if (wrapperEl && wrapperEl.clientHeight < (canvasHeight * scale + 100)) {
      scale = (wrapperEl.clientHeight - 100) / canvasHeight
    }
    setScale(scale)
  }, [template.global])

  // 取消所有图层的选中状态
  const cancelSelectLayers = () => {
    const newTemplate = Object.assign({}, template, {
      layers: template.layers.map(layer => {
        layer.isEditing = false
        return layer
      })
    })
    setTemplate(newTemplate)
  }

  // 取消所有图层的选中状态包括背景
  const resetStatus = (e: MouseEvent<HTMLElement>) => {
    // self
    if ((e.target as HTMLElement).id === 'CanvasWrapper') {
      cancelSelectLayers()
      setIsSelectedBackground(false)
    }
  }

  return <Wrapper>
    <CanvasWrapper ref={canvasWrapperRef} id="CanvasWrapper" onMouseDown={resetStatus}>
      <TemplateContext.Provider value={{ template, setTemplate}}>
        <BackgroundContext.Provider value={{ isSelectedBackground, setIsSelectedBackground }}>
          <ScaleContext.Provider value={scale}>
            <Canvas cancelSelectLayers={cancelSelectLayers} />
          </ScaleContext.Provider>
        </BackgroundContext.Provider>
      </TemplateContext.Provider>
    </CanvasWrapper>
    <Footer scale={scale} setScale={(num) => setScale(num)} />
  </Wrapper>
}

const Wrapper = styled.div`
  position: relative;
  flex: 1;
  overflow: hidden;
`

const CanvasWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: calc(100% - 44px);
  overflow: auto;

  ::-webkit-scrollbar {
    width: 8px;
    background: #eef2f8;

    &:horizontal {
      height: 8px;
    }
  }

  ::-webkit-scrollbar-track {
    background: #eef2f8;
  }

  ::-webkit-scrollbar-corner {
    background: #eef2f8;
  }

  ::-webkit-scrollbar-thumb {
    background: #c4c4c4;
    border: 8px solid rgba(0, 0, 0, 0);
    border-radius: 9999px;

    &:hover {
      background: #adadad;
    }
  }
`