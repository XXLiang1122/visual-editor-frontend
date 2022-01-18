import { observer } from 'mobx-react'
import styled from '@emotion/styled'
import { Layer } from 'types'

export default observer(({ layer }: { layer: Layer }) => {
  return <Rect style={{
    borderWidth: layer.rectInfo?.borderWidth,
    borderColor: layer.rectInfo?.borderColor,
    borderStyle: layer.rectInfo?.borderStyle,
    backgroundColor: layer.rectInfo?.fill
  }}/>
})

const Rect = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
`
