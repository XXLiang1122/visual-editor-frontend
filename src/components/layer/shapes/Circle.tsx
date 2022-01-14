import { observer } from 'mobx-react';
import styled from "@emotion/styled";
import { Layer } from 'types';

export default observer(({ layer }: { layer: Layer }) => {
  return <Circle style={{
    borderWidth: layer.circleInfo?.borderWidth,
    borderColor: layer.circleInfo?.borderColor,
    borderStyle: layer.circleInfo?.borderStyle,
    backgroundColor: layer.circleInfo?.fill
  }}/>
})

const Circle = styled.div`
  width: 100%;
  height: 100%;
  border-style: solid;
  border-radius: 50%;
`
