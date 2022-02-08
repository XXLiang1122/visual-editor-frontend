import Nav from 'components/Nav'
import Editor from 'pages/TemplateEdit'
import SignIn from './pages/SignIn'
import Templates from './pages/Templates'
import Page404 from './pages/404'
import useAuth from 'hooks/useAuth'
import { authContext } from 'store/context'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'

export default function App () {
  return (
    <BrowserRouter>
      <ProvideAuth>
        <div className="App">
          <Routes>
            <Route path="/" element={<Navigate to='/templates' />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/templates" element={
              <RequireAuth redirectTo='/login'>
                <>
                  <Nav blank />
                  <Templates />
                </>
              </RequireAuth>
            }/>
            <Route path="/detail/:id" element={
              <RequireAuth redirectTo='/login'>
                <>
                  <Nav />
                  <Editor />
                </>
              </RequireAuth>
            }/>
            <Route path="*" element={<Page404 />} />
          </Routes>
        </div>
      </ProvideAuth>
    </BrowserRouter>
  )
}

const ProvideAuth = ({ children }: { children: JSX.Element }) => {
  const auth = useAuth()
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  )
}

const RequireAuth = ({ children, redirectTo }: { children: JSX.Element; redirectTo: string }) => {
  const { user, auth } = useContext(authContext)
  const [isLogin, setIsLogin] = useState(true)

  useEffect(() => {
    if (!user) {
      auth().then(() => {
        setIsLogin(true)
      }).catch(() => {
        setIsLogin(false)
      })
    }
  }, [auth, user])

  return (
    isLogin ? children : <Navigate to={redirectTo} />
  )
}