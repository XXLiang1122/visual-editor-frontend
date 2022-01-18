import { ToolItem } from './style'
import { Popover, Radio, Space, InputNumber, RadioChangeEvent } from 'antd'
import { isNumber } from 'lodash'
import { templateStore } from 'store/template'
import { useState, useEffect } from 'react'
import { CANVAS_SIZE_LIST } from 'utils/const'
import { observer } from 'mobx-react'

// 画布尺寸
export default observer(() => {
  const { template, setCanvasSize } = templateStore

  const canvasWidth = template.global.width
  const canvasHeight = template.global.height

  const [selectValue, setSelectValue] = useState('1')

  useEffect(() => {
    const res = CANVAS_SIZE_LIST.find(i => i.width === canvasWidth && i.height === canvasHeight && i.value !== selectValue)
    if (res) {
      setSelectValue(res.value)
    } else if (selectValue !== '6') {
      setSelectValue('6')
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  return (
    <ToolItem>
      <Popover
        content={CanvasSizeOptions}
        trigger="click"
        placement="bottomLeft"
      >
        <span className="text">画布尺寸</span>
      </Popover>
    </ToolItem>
  )
})