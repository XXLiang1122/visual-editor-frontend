import styled from "@emotion/styled";
import { observer } from 'mobx-react';
import { templateStore } from 'store/template'
import { LAYER_TYPE, Align } from 'types'
import { Popover, Select, Dropdown, Menu, Slider, Popconfirm, Radio, Space, InputNumber, Button, RadioChangeEvent } from 'antd';
import {
  DeleteOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  SwapOutlined,
  BoldOutlined,
  UnderlineOutlined,
  LockOutlined,
  UnlockOutlined
} from '@ant-design/icons';
import { ChromePicker, ColorResult } from 'react-color';
import { cloneDeep, isNumber } from "lodash";
import { FONT_LIST, FONTSIZE_LIST, CANVAS_SIZE_LIST } from 'utils/const'
import { useEffect, useState } from "react";

const { Option } = Select;

export default observer(() => {
  const {
    template,
    layerType,
    layers,
    setCanvasSize,
    setLayer,
    setLayers,
    setLayerLevel,
    removeLayer,
    setLayerLock,
    setBackgroundColor,
    setNeedUpdateLayerHeight
  } = templateStore

  const [selectValue, setSelectValue] = useState('1')

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
  // 当前字体粗细
  const fontWeight = activeLayer?.style?.fontWeight || 400
  // 当前字体是否有下划线
  const hasUnderline = activeLayer?.style?.underline || false
  
  // 图层是否被锁定了
  const isLocked = activeLayer?.isLocked || false
  // 图层的层级关系
  const levelInfo = {
    min: 1,
    max: 100,
    current: 1
  }
  if (activeLayer) {
    levelInfo.current = layers.findIndex(l => l.id === activeLayer.id) + 1
    levelInfo.max = layers.length
  }

  const canvasWidth = template.global.width
  const canvasHeight = template.global.height

  useEffect(() => {
    const res = CANVAS_SIZE_LIST.find(i => i.width === canvasWidth && i.height === canvasHeight && i.value !== selectValue)
    if (res) {
      setSelectValue(res.value)
    } else if (selectValue !== '6') {
      setSelectValue('6')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // 改变字体粗细
  const onWeightChange = () => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.fontWeight = layer.style.fontWeight === 700 ? 400 : 700
      setLayer(layer)
    }
  }

  // 设置下划线
  const onUnderlineChange = () => {
    const layer = cloneDeep(activeLayer)
    if (layer?.type === 'text' && layer.style) {
      layer.style.underline = !layer.style.underline
      setLayer(layer)
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

  // 改变层级
  const onLevelChange = (val: number) => {
    // 下 -> 上
    if (val > levelInfo.current) {
      layers.forEach((l, idx) => {
        if (idx + 1 > levelInfo.current && idx + 1 <= val) {
          setLayerLevel(l.id, l.zIndex - 1)
        }
      })
      activeLayer && setLayerLevel(activeLayer.id, activeLayer.zIndex + (val - levelInfo.current))
    } else { // 上 -> 下
      layers.forEach((l, idx) => {
        if (idx + 1 >= val && idx + 1 < levelInfo.current) {
          setLayerLevel(l.id, l.zIndex + 1)
        }
      })
      activeLayer && setLayerLevel(activeLayer.id, activeLayer.zIndex - (levelInfo.current - val))
    }
    setLayers(cloneDeep(layers).sort((a, b) => a.zIndex - b.zIndex))
  }

  // 切换图层锁定状态
  const onToggleLayerLock = () => {
    if (activeLayer) {
      setLayerLock(activeLayer.id, !activeLayer.isLocked)
    }
  }

  // 删除图层
  const onRemove = () => {
    const layer = layers.find(layer => layer.isSelected)
    if (layer) {
      removeLayer(layer.id)
    }
  }

  // 清空画布
  const onClear = () => {
    setLayers([])
  }

  // 选择画布尺寸
  const onCanvasSizeChange = (e: RadioChangeEvent) => {
    setSelectValue(e.target.value)
    const res = CANVAS_SIZE_LIST.find(i => i.value === e.target.value)
    if (res) {
      setCanvasSize({
        width: res.width,
        height: res.height
      })
    }
  }

  // 画布宽度修改
  const onChangeWidth = (val: number) => {
    if (isNumber(val) && val > 0) {
      setCanvasSize({
        width: val,
        height: canvasHeight
      })
    }
  }

  // 画布高度修改
  const onChangeHeight = (val: number) => {
    if (isNumber(val) && val > 0) {
      setCanvasSize({
        width: canvasWidth,
        height: val
      })
    }
  }

  // 画布尺寸列表
  const CanvasSizeOptions = (
    <>
      <Radio.Group onChange={onCanvasSizeChange} value={selectValue}>
        <Space direction="vertical">
          {CANVAS_SIZE_LIST.map(i => <Radio key={i.value} value={i.value}>{i.label}</Radio>)}
          <Radio value={'6'}>
            自定义
            {selectValue === '6' ? <div style={{ marginTop: 10 }}>
              <InputNumber value={canvasWidth} size="small" placeholder="宽" style={{ width: 100, marginRight: 10 }} onChange={onChangeWidth} />×
              <InputNumber value={canvasHeight} size="small" placeholder="高" style={{ width: 100, marginLeft: 10, marginRight: 10 }} onChange={onChangeHeight} /> 像素
            </div> : null}
          </Radio>
        </Space>
      </Radio.Group>
    </>
  )

  return <ToolBarWrapper>
    <ItemGroup className={isLocked ? 'locked' : ''}>
      {/* 画布尺寸 */}
      {[LAYER_TYPE.EMPTY].includes(layerType) &&
        <ToolItem>
          <Popover
            content={CanvasSizeOptions}
            trigger="click"
            placement="bottomLeft"
          >
            <span className="text">画布尺寸</span>
          </Popover>
        </ToolItem>
      }
      {/* 颜色 */}
      {[LAYER_TYPE.BACKGROUND, LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem>
          <Popover
            content={<ChromePicker color={color} onChange={onColorChange} />}
            trigger="click"
            placement="bottomLeft"
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
            style={{ width: 100, textAlign: 'center' }}
            placeholder="字体大小"
            onChange={onFontsizeChange}
          >
            {FONTSIZE_LIST.map(size => <Option key={size} value={size}>{size}</Option>)}
          </Select>
        </ToolItem>
      }
      {/* 加粗 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem className={fontWeight === 700 ? 'active' : ''} onClick={onWeightChange}>
          <BoldOutlined style={{ fontSize: 24 }} />
        </ToolItem>
      }
      {/* 下划线 */}
      {[LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem className={hasUnderline ? 'active' : ''} onClick={onUnderlineChange}>
          <UnderlineOutlined style={{ fontSize: 24 }} />
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
      {/* 图片翻转 */}
      {[LAYER_TYPE.IMAGE].includes(layerType) &&
        <ToolItem>
          <Dropdown 
            overlay={
              <Menu style={{ width: 120 }}>
                <Menu.Item
                  key="x"
                  style={{ padding: '10px' }}
                  icon={<SwapOutlined />}
                  onClick={() => onReverseImage('x')}
                >
                  水平翻转
                </Menu.Item>
                <Menu.Item
                  key="y"
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
            <span className="text">翻转</span>
          </Dropdown>
        </ToolItem>
      }
    </ItemGroup>
    <ItemGroup className={isLocked ? 'locked' : ''}>
      {/* 图层层级 */}
      {[LAYER_TYPE.IMAGE, LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem>
          <Popover
            content={
              <Slider
                value={levelInfo.current}
                min={levelInfo.min}
                max={levelInfo.max}
                style={{ width: 180 }}
                onChange={onLevelChange}
              />
            }
            trigger="click"
            placement="bottomRight"
          >
            <span className="text">层级调整</span>
          </Popover>
        </ToolItem>
      }
      {/* 图层锁定 */}
      {[LAYER_TYPE.TEXT, LAYER_TYPE.IMAGE].includes(layerType) &&
        <ToolItem className={["item-lock", isLocked ? 'active' : ''].join(' ')} onClick={onToggleLayerLock}>
          {isLocked ? <LockOutlined style={{ fontSize: 24 }} /> : <UnlockOutlined style={{ fontSize: 24 }} />}
        </ToolItem>
      }
      {/* 删除 */}
      {[LAYER_TYPE.IMAGE, LAYER_TYPE.TEXT].includes(layerType) &&
        <ToolItem onClick={onRemove}>
          <DeleteOutlined style={{ fontSize: 24 }} />
        </ToolItem>
      }
      {/* 清空画布 */}
      {[LAYER_TYPE.EMPTY].includes(layerType) &&
        <ToolItem>
          <Popconfirm
            placement="bottomRight"
            title="确定清空画布？"
            onConfirm={onClear}
            okText="清空"
            cancelText="取消"
          >
            <span className="text">清空画布</span>
          </Popconfirm>
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

  &.locked>div:not(.item-lock) {
    display: none;
  }
`

const ToolItem = styled.div`
  display: flex;
  align-items: center;
  margin-right: 10px;
  padding: 4px;
  border-radius: 4px;
  cursor: pointer;

  &.active {
    background-color: rgba(57,76,96,.15);
  }

  &:hover {
    background-color: rgba(64,87,109,.07);
  }

  .text {
    padding: 0 10px;
    font-size: 16px;
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