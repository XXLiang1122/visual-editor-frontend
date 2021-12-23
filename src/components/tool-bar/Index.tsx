import styled from "@emotion/styled";
import { observer } from 'mobx-react';
import { templateStore } from 'store/template'
import { LAYER_TYPE, Align } from 'types'
import { Popover, Select, Dropdown, Menu } from 'antd';
import { DeleteOutlined, AlignLeftOutlined, AlignCenterOutlined, AlignRightOutlined, SwapOutlined } from '@ant-design/icons';
import { ChromePicker, ColorResult } from 'react-color';
import { cloneDeep } from "lodash";
import { FONT_LIST, FONTSIZE_LIST } from 'utils/const'

const { Option } = Select;

export default observer(() => {
  const {
    template,
    layerType,
    layers,
    setLayerType,
    setLayer,
    removeLayer,
    setBackgroundColor,
    setNeedUpdateLayerHeight
  } = templateStore

  const activeLayer = layers.find(l => l.isSelected)
  const layerScale = activeLayer?.scale || 1

  // 当前颜色
  let color = ''
  if (layerType === LAYER_TYPE.TEXT) {
    color = activeLayer?.style?.color || ''
  } else if (layerType === LAYER_TYPE.BACKGROUND) {
    color = template.background.color
  }

  // 当前字体
  const font = activeLayer?.style?.font || ''
  // 当前字体
  const fontSize = activeLayer?.style?.fontSize || 0
  // 文字水平对齐
  const textAlign = activeLayer?.style?.textAlign || 'left'

  // 选择颜色
  const onColorChange = (clr: ColorResult) => {
    const rgba = `rgba(${clr.rgb.r}, ${clr.rgb.g}, ${clr.rgb.b}, ${clr.rgb.a})`
    // 文本
    if (layerType === LAYER_TYPE.TEXT) {
      const layer = cloneDeep(activeLayer)
      if (layer?.type === 'text' && layer.style) {
        layer.style.color = rgba
        setLayer(layer)
      }
    }
    // 背景
    if (layerType === LAYER_TYPE.BACKGROUND) {
      setBackgroundColor(rgba)
    }
  }

  // 选择字体
  const onFontChange = (val: string) => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.font = val
      setLayer(layer)
    }
  }

  // 改变字体大小
  const onFontsizeChange = (val: string) => {
    const size = Number(val)
    if (!isNaN(size)) {
      const layer = cloneDeep(activeLayer)
      if (layer?.type === 'text' && layer.style) {
        layer.style.fontSize = size / layerScale
        setLayer(layer)
        setNeedUpdateLayerHeight(true)
      }
    }
  }

  // 改变文本水平对齐
  const onTextAlignChange = () => {
    let align: Align = 'left'
    if (textAlign === 'left') align = 'center'
    if (textAlign === 'center') align = 'right'
    if (textAlign === 'right') align = 'left'
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.textAlign = align
      setLayer(layer)
    }
  }

  // 翻转图片
  const onReverseImage = (direction: 'x' | 'y') => {
    const layer = cloneDeep(activeLayer)
    if (layer?.reverse) {
      if (direction === 'x') {
        layer.reverse.x = layer.reverse.x === 1 ? -1 : 1
      }
      if (direction === 'y') {
        layer.reverse.y = layer.reverse.y === 1 ? -1 : 1
      }
      setLayer(layer)
    }
  }

  // 删除图层
  const onRemove = () => {
    const layer = layers.find(layer => layer.isSelected)
    if (layer) {
      removeLayer(layer.id)
      setLayerType(LAYER_TYPE.EMPTY)
    }
  }

  return <ToolBarWrapper>
    <ItemGroup>
      {/* 颜色 */}
      {[LAYER_TYPE.BACKGROUND, LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem>
          <Popover
            content={<ChromePicker color={color} onChange={onColorChange} />}
            trigger="hover"
          >
            <ColorItem style={{ backgroundColor: color }} />
          </Popover>
        </ToolItem>
      }
      {/* 字体 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem>
          <Select
            value={font}
            // size="small"
            style={{ width: 140 }}
            placeholder="选择字体"
            onChange={onFontChange}
          >
            {FONT_LIST.map(f => <Option key={f.value} value={f.value}><span style={{ fontFamily: f.value }}>{f.name}</span></Option>)}
          </Select>
        </ToolItem>
      }
      {/* 字体大小 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem>
          <Select
            value={(fontSize * layerScale).toFixed(0)}
            // size="small"
            style={{ width: 100, textAlign: 'center' }}
            placeholder="字体大小"
            onChange={onFontsizeChange}
          >
            {FONTSIZE_LIST.map(size => <Option key={size} value={size}>{size}</Option>)}
          </Select>
        </ToolItem>
      }
      {/* 水平对齐 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem onClick={onTextAlignChange}>
          {textAlign === 'left' && <AlignLeftOutlined style={{ fontSize: 24 }} />}
          {textAlign === 'center' && <AlignCenterOutlined style={{ fontSize: 24 }} />}
          {textAlign === 'right' && <AlignRightOutlined style={{ fontSize: 24 }} />}
        </ToolItem>
      }
      {[LAYER_TYPE.IMAGE].includes(layerType) &&
        <ToolItem>
          <Dropdown 
            overlay={
              <Menu style={{ width: 120 }}>
                <Menu.Item
                  style={{ padding: '10px' }}
                  icon={<SwapOutlined />}
                  onClick={() => onReverseImage('x')}
                >
                  水平翻转
                </Menu.Item>
                <Menu.Item
                  style={{ padding: '10px' }}
                  icon={<SwapOutlined style={{ transform: 'rotate(90deg)' }} />}
                  onClick={() => onReverseImage('y')}
                >
                  垂直翻转
                </Menu.Item>
              </Menu>
            }
            trigger={['click']}
          >
            <span style={{ padding: '0 10px', fontSize: 16 }}>翻转</span>
          </Dropdown>
        </ToolItem>
      }
    </ItemGroup>
    <ItemGroup>
      {/* 删除 */}
      {[LAYER_TYPE.IMAGE, LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem onClick={onRemove}>
          <DeleteOutlined style={{ fontSize: 24 }} />
        </ToolItem>
      }
    </ItemGroup>
  </ToolBarWrapper>
})

const ToolBarWrapper = styled.div`
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
`

const ToolItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: rgba(64,87,109,.07);
  }

  input[type="search"] {
    text-align: center;
  }
`

const ColorItem = styled.div`
  width: 28px;
  height: 28px;
  border: 2px solid #666;
  border-radius: 4px;
`