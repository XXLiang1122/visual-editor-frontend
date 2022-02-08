import { useState } from 'react'
import { register as userRegister, login, getUserInfo } from 'services/user'
import { ResisterParams, UserInfo } from 'types/user'
import { useNavigate } from 'react-router'

export default function useAuth () {
  const [user, setUser] = useState<UserInfo | null>(null)

  const navigate = useNavigate()

  const register = (data: ResisterParams) => {
    return userRegister<{userInfo: UserInfo; token: string;}>(data).then(({ data }) => {
      setUser(data.userInfo)
      localStorage.setItem('token', data.token)
      return data
    })
  }

  const signIn = (data: ResisterParams) => {
    return login<{userInfo: UserInfo; token: string;}>(data).then(({ data }) => {
      setUser(data.userInfo)
      localStorage.setItem('token', data.token)
      return data
    })
  }

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('token')
    navigate('/login')
  }

  const auth = () => {
    return getUserInfo<UserInfo>().then(({ data }) => {
      setUser(data)
      return data
    })
  }

  return {
    user,
    signIn,
    signOut,
    register,
    auth
  }
}