import styled from "@emotion/styled";
import { Slider } from "antd";
import UndoIcon from "assets/undo.png";
import RedoIcon from "assets/redo.png";
import undoRedo from 'utils/undoRedo'
import { templateStore } from 'store/template'
import { observer } from 'mobx-react';

const { undo, redo } = undoRedo()

export default observer(({ scale, setScale, responsive }: { scale: number; setScale: (n: number) => void; responsive: () => void }) => {
  const { canUseUndo, canUseRedo } = templateStore

  const scaleChange = (val: number) => {
    setScale(val / 100)
  }

  return <FooterBar>
    <SliderWrapper>
      <Slider
        className="slider"
        tipFormatter={null}
        value={scale * 100}
        min={10} max={500}
        onChange={scaleChange}
      />
      <ToolItem className="scale active" onClick={responsive}>{Math.round(scale * 100)}%</ToolItem>
    </SliderWrapper>
    <UndoRedo>
      <ToolItem className={ canUseUndo ? 'active' : '' } onClick={undo}><img src={UndoIcon} alt="" /></ToolItem>
      <ToolItem className={ canUseRedo ? 'active' : '' } onClick={redo}><img src={RedoIcon} alt="" /></ToolItem>
    </UndoRedo>
  </FooterBar>
})

const FooterBar = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 44px;
  padding: 0 40px;
  background-color: #fff;
  border-top: 1px solid #ddd;

  .slider {
    width: 240px;
  }

  .scale {
    /* width: 100px; */
    margin: 0 20px;
  }
`

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
`

const UndoRedo = styled.div`
  display: flex;
  justify-content: space-around;
  width: 120px;

  img {
    width: 22px;
    height: 22px;
    pointer-events: none;
    user-select: none;
  }
`

const ToolItem = styled.div`
  display: flex;
  align-items: center;
  padding: 6px 8px;
  border-radius: 4px;
  cursor: not-allowed;
  opacity: .5;

  &:hover {
    background-color: rgba(64,87,109,.07);
  }

  &.active {
    opacity: 1;
    cursor: pointer;
  }
`