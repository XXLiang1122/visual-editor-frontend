import React, { MouseEvent, useCallback, useEffect, useRef, useState } from "react";
import styled from "@emotion/styled";
import Footer from "./Footer";
import Canvas from "./Canvas";
import { ScaleContext, BackgroundContext } from 'store/context';
import { templateStore } from 'store/template';
import { observer } from 'mobx-react';

// 编辑器
export default observer(() => {
  // 画布缩放值
  const [scale, setScale] = useState(1)
  // 画布父级容器dom ref
  const canvasWrapperRef = useRef<HTMLDivElement>(null)
  // 获取模板数据
  const { template, resetEditStatus, removeLayer } = templateStore

  // 是否选中背景
  const [isSelectedBackground, setIsSelectedBackground] = useState(false)

  // 首次渲染画布尺寸适配
  useEffect(() => {
    const wrapperEl = canvasWrapperRef.current
    const canvasWidth = template.global.width
    const canvasHeight = template.global.height
    let scale = 1
    if (wrapperEl && wrapperEl.clientWidth < canvasWidth + 100) {
      scale = (wrapperEl.clientWidth - 100) / canvasWidth
    }
    if (wrapperEl && wrapperEl.clientHeight < (canvasHeight * scale + 100)) {
      scale = (wrapperEl.clientHeight - 100) / canvasHeight
    }
    setScale(scale)
  }, [template.global.width, template.global.height])

  // 删除图层
  const onDeleteListener = useCallback((e: KeyboardEvent) => {
    // 页面失焦时才能删除
    if (document.activeElement === document.body || document.activeElement === null) {
      if (e.key === 'Backspace' || e.key === 'Delete') {
        const layer = template.layers.find(layer => layer.isEditing)
        if (layer) {
          removeLayer(layer.id)
        }
      }
    }
  }, [removeLayer, template.layers])

  useEffect(() => {
    document.addEventListener('keydown', onDeleteListener)
    return () => { document.removeEventListener('keydown', onDeleteListener) }
  }, [onDeleteListener])

  // 取消所有图层的选中状态包括背景
  const resetStatus = (e: MouseEvent<HTMLElement>) => {
    // self
    if ((e.target as HTMLElement).id === 'CanvasWrapper') {
      resetEditStatus()
      setIsSelectedBackground(false)
    }
  }

  return <Wrapper>
    <CanvasWrapper ref={canvasWrapperRef} id="CanvasWrapper" onMouseDown={resetStatus}>
      <BackgroundContext.Provider value={{ isSelectedBackground, setIsSelectedBackground }}>
        <ScaleContext.Provider value={scale}>
          <Canvas />
        </ScaleContext.Provider>
      </BackgroundContext.Provider>
    </CanvasWrapper>
    <Footer scale={scale} setScale={(num) => setScale(num)} />
  </Wrapper>
})

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
  overflow: scroll;

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