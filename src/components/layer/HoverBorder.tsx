import { useContext } from 'react'
import styled from '@emotion/styled'
import { Layer } from 'types'
import { ScaleContext } from 'store/context'

export default function HoverBorder ({ info }: { info: Layer; }) {
  const scale = useContext(ScaleContext)

  return <BorderEl 
    style={{
      width: info.width * scale,
      height: info.height * scale,
      transform: `translate(${info.position.x * scale}px, ${info.position.y * scale}px) rotate(${info.rotate}deg)`
    }}
  />
}

const BorderEl = styled.div`
position: absolute;
top: 0;
left: 0;
pointer-events: none;

&:after {
  content: '';
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid #00c4cc;
}
`