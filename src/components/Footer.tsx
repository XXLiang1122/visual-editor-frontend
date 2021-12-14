import styled from "@emotion/styled";
import { Slider } from "antd";

export default function Footer ({ scale, setScale }: { scale: number; setScale: (n: number) => void }) {
  const scaleChange = (val: number) => {
    setScale(val / 100)
  }

  return <FooterBar>
    <Slider
      className="slider"
      tipFormatter={null}
      defaultValue={scale * 100}
      min={10} max={500}
      onChange={scaleChange}
    />
    <div className="scale">{Math.round(scale * 100)}%</div>
  </FooterBar>
}

const FooterBar = styled.footer`
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  height: 44px;
  padding-right: 40px;
  background-color: #fff;
  border-top: 1px solid #ddd;

  .slider {
    width: 240px;
  }

  .scale {
    width: 100px;
    padding-left: 20px;
  }
`
