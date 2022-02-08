import styled from '@emotion/styled'
import Avatar from 'assets/avatar.jpeg'
import { Button, message, Popover, Modal, Input } from 'antd'
import { getCoverImage } from 'utils'
import { useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { authContext } from 'store/context'
import { templateStore } from 'store/template'
import { updateTemplate } from 'services/templates'
import { setName, setAvatar } from 'services/user'
import { upload } from 'services/upload'
import LogoSvg from './svgs/LogoSvg'

interface Props {
  blank?: boolean;
}

export default function Nav (props: Props) {
  const [loading, setLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, signOut, auth } = useContext(authContext)
  let username = ''
  const { id } = useParams()
  const { getTemplate } = templateStore
  const navigate = useNavigate()

  // 导出图片
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

  // 保存
  const save = async () => {
    if (id) {
      setSaveLoading(true)
      await updateTemplate(id, {
        template: getTemplate()
      })
      setSaveLoading(false)
      message.success('保存成功')
    }
  }

  const toTemplates = () => {
    navigate('/templates')
  }

  // 登出
  const logout = () => {
    signOut()
  }

  // 重命名
  const rename = async () => {
    if (!username.length) {
      message.error('名字不能为空')
      return
    }
    await setName(username)
    message.success('修改成功')
    setShowModal(false)
    auth()
  }

  const onNameChange = (e: any) => {
    username = e.target.value
  }

  // 上传头像
  const uploadAvatar = (e: any) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    upload<{url: string}>(formData).then(async ({ data }) => {
      await setAvatar(data.url)
      auth()
    })
  }

  const Form = () => {
    return (
      <Modal
        title="修改用户名"
        visible={showModal}
        onOk={rename}
        onCancel={() => {setShowModal(false)}}
        okText="确认"
        cancelText="取消"
        centered
      >
        <Input defaultValue={user?.name} placeholder="请输入标题" onChange={onNameChange} />
      </Modal>
    )
  }

  const userPanel = (
    <Panel>
      <UserAvatar htmlFor="upload"><Img className='avatar' src={user?.avatar || Avatar} /></UserAvatar>
      <input type="file" accept='image/*' id="upload" style={{ display: 'none' }} onChange={uploadAvatar} />
      <div>
        <UserName>{user?.name}</UserName>
        <Options>
          <Button size='small' onClick={() => {setShowModal(true)}}>修改名字</Button>
          <Button size='small' danger onClick={logout}>退出登录</Button>
        </Options>
      </div>
    </Panel>
  )

  return <Header>
    <LogoSvg />
    <RightSide>
      { !props.blank &&
        <>
          <Button onClick={toTemplates}>模板列表</Button>
          <Button loading={loading} onClick={exportImage}>导出图片</Button>
          <Button loading={saveLoading} type="primary" onClick={save}>保存</Button>
        </>
      }
      <Popover content={userPanel} placement="bottomRight" trigger="hover">
        <Img src={user?.avatar || Avatar} />
      </Popover>
    </RightSide>
    <Form />
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

  &>button {
    margin-right: 15px;
  }
`

const Img = styled.img`
  flex: none;
  width: 36px;
  height: 36px;
  margin-left: 20px;
  object-fit: cover;
  cursor: pointer;
  border-radius: 50%;
`

const Panel = styled.div`
  display: flex;
  align-items: center;
  width: 260px;
  padding: 20px 0;
`

const UserAvatar = styled.label`
  position: relative;
  flex: none;
  margin-right: 20px;

  &::after {
    content: '上传';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    font-size: 14px;
    line-height: 72px;
    text-align: center;
    color: #fff;
    background: rgba(0,0,0,.3);
    border-radius: 50%;
    opacity: 0;
    pointer-events: none;
    transition: opacity 100ms;
  }

  &:hover::after {
    opacity: 1;
  }

  .avatar {
    width: 72px;
    height: 72px;
    margin-left: 0;
  }
`

const UserName = styled.b`
  font-size: 18px;
`

const Options = styled.div`
  display: flex;
  padding-top: 10px;

  button:first-of-type {
    margin-right: 8px;
  }
`