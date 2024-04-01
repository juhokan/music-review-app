/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import './App.css'
import { TokenContext, UserContext } from './context'
import AppContainer from './components/core/AppContainer'

const TOKEN_KEY = 'token'

const App: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null)
  const [auth, setAuth] = React.useState<any | null>(null)


  const initToken = () => {
    const h = window.location.hash
    const t = window.localStorage.getItem("token")
    const s = h.substring(1).split("&").find(e => e.startsWith("access_token"))
    let tval

    if ( h && s !== undefined) {
      tval = s.split("=")[1]
      console.log(tval)
      window.location.hash = ""
      if (tval !== t) {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.setItem(TOKEN_KEY, tval)
      }
    }

    setToken(t)
  }


  React.useEffect(() => {
    initToken()
  }, [])


  const setAndSaveToken = (token: string | null) => {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token)
    } else {
      window.localStorage.removeItem(TOKEN_KEY)
    }
    initToken()
  }



  return (
    <>
      <UserContext.Provider value={{ auth, setAuth }}>
        <TokenContext.Provider value={{token, setToken: setAndSaveToken}}>
          <AppContainer/>
        </TokenContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App
