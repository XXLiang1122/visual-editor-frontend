import styled from '@emotion/styled'
import ArrowIcon from 'assets/arrow-icon.png'
import { useContext, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { authContext } from 'store/context'
import { useNavigate } from 'react-router'
import backImg from 'assets/form-bg-img.png'
import { Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'
import 'pages/animation.css'

let lock = false

export default function SignIn () {
  const [isSignIn, setIsSignIn] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, register } = useContext(authContext)
  const navigate = useNavigate()

  // 登录/注册
  const handleSignIn = () => {
    if (lock) return
    lock = true
    const fn = isSignIn ? signIn : register
    fn({
      username,
      password
    }).then((data: any) => {
      navigate('/templates')
    }).catch((e: unknown) => {
      console.error(e)
    }).finally(() => {
      lock = false
    })
  }

  const onNameChange = (e: any) => {
    setUsername(e.target.value)
  }

  const onPassChange = (e: any) => {
    setPassword(e.target.value)
  }

  const toggleForm = (val: boolean) => {
    setIsSignIn(val)
    setUsername('')
    setPassword('')
  }

  return (
    <Wrapper className={isSignIn ? 'sign-in' : ''}>
      <DirectionButton className='left-arrow' onClick={() => toggleForm(true)}><img src={ArrowIcon} alt='' />登陆</DirectionButton>
      <DirectionButton className='right-arrow' onClick={() => toggleForm(false)}><img src={ArrowIcon} alt='' />注册</DirectionButton>
        <CSSTransition
          in={isSignIn}
          timeout={500}
          classNames="slide-left"
          unmountOnExit
        >
          <Form>
            <FormContent>
              <h1>登录</h1>
              <Input value={username} size="large" placeholder="请输入账号" prefix={<UserOutlined />} onChange={onNameChange} />
              <Input.Password value={password} size="large" placeholder="请输入密码" style={{ marginTop: 20 }} prefix={<LockOutlined />} onChange={onPassChange} onPressEnter={handleSignIn} />
              <Button type="primary" size="large" style={{ width: '100%', marginTop: 20, backgroundColor: '#1e1f6e' }} onClick={handleSignIn}>登录</Button>
            </FormContent>
          </Form>
        </CSSTransition>
        <CSSTransition
          in={!isSignIn}
          timeout={500}
          classNames="slide-right"
          unmountOnExit
        >
          <Form className='register'>
            <FormContent>
              <h1>注册</h1>
              <Input size="large" placeholder="请输入账号" prefix={<UserOutlined />} onChange={onNameChange} />
              <Input.Password size="large" placeholder="请输入密码" style={{ marginTop: 20 }} prefix={<LockOutlined />} onChange={onPassChange} onPressEnter={handleSignIn} />
              <Button type="primary" size="large" style={{ width: '100%', marginTop: 20, backgroundColor: '#1e1f6e' }} onClick={handleSignIn}>注册</Button>
            </FormContent>
          </Form>
        </CSSTransition>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100vh;
  overflow: hidden;
  background-color: transparent;

  &::before {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 150%;
    z-index: -1;
    transform: translateX(0);
    background: linear-gradient(to right, #1e1f6e 33.33%, #cce4ff 33.33%, #cce4ff 66.66%, #1e1f6e 66.66%);
    transition: transform 500ms;
  }

  &.sign-in {
    &::before {
      transform: translateX(-33.33%);
    }

    .left-arrow {
      visibility: hidden;
    }

    .right-arrow {
      visibility: visible;
    }
  }
`

const Form = styled.div`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 68vw;
  height: 42vw;
  min-width: 600px;
  min-height: 500px;
  max-width: 1200px;
  max-height: 700px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0,0,0,.1);
  background: #fff;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    right: 0;
    bottom: 0;
    background: #fff url(${backImg}) no-repeat 30% / cover;
  }

  &.register {
    display: flex;
    justify-content: flex-end;
  }

  &.register::after {
    left: 0;
    right: 50%;
    background-position: 100%;
  }
`

const FormContent = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 10%;

  h1 {
    font-size: 26px;
    color: #1e1f6e;
  }
`

const DirectionButton = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 22px;
  color: #cce4ff;
  white-space: nowrap;
  font-weight: 700;
  cursor: pointer;
  opacity: .3;
  user-select: none;
  overflow: hidden;
  animation: bounce 500ms linear infinite alternate;

  img {
    width: 60px;
  }

  &.left-arrow {
    left: 3%;
    visibility: visible;

    img {
      transform: rotate(180deg);
    }
  }

  &.right-arrow {
    right: 3%;
    visibility: hidden;
  }

  &:hover {
    opacity: 1;
  }
`