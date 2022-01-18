import styled from '@emotion/styled'
import { observer } from 'mobx-react'
import { templateStore } from 'store/template'
import { LAYER_TYPE } from 'types'

import CanvasSize from './tool-items/CanvasSize'
import ClearCanvas from './tool-items/ClearCanvas'
import BackgroundColor from './tool-items/BackgroundColor'

import TextColor from './tool-items/text/TextColor'
import FontFamily from './tool-items/text/FontFamily'
import FontSize from './tool-items/text/FontSize'
import FontWeight from './tool-items/text/FontWeight'
import Underline from './tool-items/text/Underline'
import TextAlign from './tool-items/text/TextAlign'

import FlipImage from './tool-items/image/Flip'
import ClipImage from './tool-items/image/Clip'

import ShapeFillColor from './tool-items/shape/ShapeFillColor'
import ShapeBorderColor from './tool-items/shape/ShapeBorderColor'
import ShapeBorderWidth from './tool-items/shape/ShapeBorderWidth'
import ShapeBorderStyle from './tool-items/shape/ShapeBorderStyle'

import LayerOrder from './tool-items/common/LayerOrder'
import Opacity from './tool-items/common/Opacity'
import LockLayer from './tool-items/common/LockLayer'
import RemoveLayer from './tool-items/common/RemoveLayer'

export default observer(() => {
  const { layerType, activeLayer } = templateStore

  // 图层是否被锁定了
  const isLocked = activeLayer?.isLocked || false

  return <ToolBarWrapper id="toolBar">
    <ItemGroup className={isLocked ? 'locked' : ''}>
      {/* 画布尺寸 */}
      {[LAYER_TYPE.EMPTY].includes(layerType) && <CanvasSize />}
      {/* 背景颜色 */}
      {[LAYER_TYPE.BACKGROUND].includes(layerType) && <BackgroundColor />}

      {/* 文字相关 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <>
          {/* 文字颜色 */}
          <TextColor />
          {/* 字体 */}
          <FontFamily />
          {/* 字体大小 */}
          <FontSize />
          {/* 加粗 */}
          <FontWeight />
          {/* 下划线 */}
          <Underline />
          {/* 水平对齐 */}
          <TextAlign />
        </>
      }

      {/* 图片相关 */}
      {[LAYER_TYPE.IMAGE].includes(layerType) &&
        <>
          {/* 图片翻转 */}
          <FlipImage />
          {/* 图片裁剪 */}
          <ClipImage />
        </>
      }

      {/* 形状相关 */}
      {[LAYER_TYPE.RECT, LAYER_TYPE.CIRCLE].includes(layerType) &&
        <>
          {/* 填充颜色 */}
          <ShapeFillColor />
          {/* 边框颜色 */}
          <ShapeBorderColor />
          {/* 边框粗细 */}
          <ShapeBorderWidth />
          {/* 边框样式 */}
          <ShapeBorderStyle />
        </>
      }
    </ItemGroup>
    <ItemGroup className={isLocked ? 'locked' : ''}>
      {/* 右侧图层公共属性 */}
      {[LAYER_TYPE.IMAGE, LAYER_TYPE.TEXT, LAYER_TYPE.RECT, LAYER_TYPE.CIRCLE].includes(layerType) &&
        <>
          {/* 图层层级 */}
          <LayerOrder />
          {/* 透明度 */}
          <Opacity />
          {/* 图层锁定 */}
          <LockLayer />
          {/* 删除 */}
          <RemoveLayer />
        </>
      }
      {/* 清空画布 */}
      {[LAYER_TYPE.EMPTY].includes(layerType) && <ClearCanvas />}
    </ItemGroup>
  </ToolBarWrapper>
})

const ToolBarWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 46px;
  padding: 0 10px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
  user-select: none;
`

const ItemGroup = styled.div`
  display: flex;
  align-items: center;

  &.locked>div:not(.item-lock) {
    display: none;
  }
`