import styled from '@emotion/styled'
import Avatar from 'assets/avatar.jpeg'
import { Button } from 'antd'
import { getCoverImage } from 'utils'
import { useState } from 'react'
import SvgAni from './SvgAni'

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
    <SvgAni />
    <RightSide>
      <Button loading={loading} type="primary" onClick={exportImage}>导出图片</Button>
      <Link href="https://github.com/XXLiang1122/visual-editor"><Img src={Avatar} /></Link>
    </RightSide>
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

const RightSide = styled.div`
  display: flex;
  align-items: center;
  height: 100%;
`

const Link = styled.a`
  flex: none;
  margin-left: 30px;
`

const Img = styled.img`
  width: 36px;
  height: 36px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
`