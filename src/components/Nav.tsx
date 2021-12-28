import styled from "@emotion/styled";
import Logo from 'assets/logo.png'
import { Button } from 'antd'
import { getCoverImage } from 'utils'
import { useState } from "react";

export default function Nav () {
  const [loading, setLoading] = useState(false)

  const exportImage = async () => {
    setLoading(true)
    try {
      const url = await getCoverImage('#canvasContent')
      const a = document.createElement('a')
      a.href = url
      a.setAttribute('download', `${Date.now()}.png`)
      a.click()
      a.remove()
    } catch (e) { console.error(e) }
    setLoading(false)
  }

  return <Header>
    <Img src={Logo} />
    <Button loading={loading} type="primary" onClick={exportImage}>导出图片</Button>
  </Header>
}

const Header = styled.header`
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  background-color: #fff;
  border-bottom: 1px solid #ddd;
`

const Img = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
`