/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import './App.css'
import { ProfileContext, SearchContext, TokenContext, UserContext } from './context'
import AppContainer from './components/core/AppContainer'
import { StrapiProfile } from './strapi/model.strapi'
import strapi from './strapi/client.strapi'

const TOKEN_KEY = 'token'
const AUTH_TOKEN = 'auth'

const App: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [expiresAt, setExpiresAt] = React.useState<string | null>(null)
  const [auth, setAuth] = React.useState<any | null>(null)
  const [profiles, setProfiles] = React.useState<StrapiProfile[] | null>(null)
  const [input, setInput] = React.useState<string | null>(null)

  //TODO
  /*
  const initToken = () => {
    const hash = window.location.hash
    const token = window.localStorage.getItem(TOKEN_KEY)
    const currentRefresh = window.localStorage.getItem(REFRESH_TOKEN_KEY)
    const accessToken = hash.substring(1).split("&").find(e => e.startsWith("access_token"))
    console.log(currentRefresh)
    const refresh = hash.substring(1).split("&").find(e => e.startsWith("refresh_token"))
    const expires = hash.substring(1).split("&").find(e => e.startsWith("expires_in"))

    


    if ( hash && accessToken !== undefined && expires !== undefined && refresh !== undefined) {
      const newToken = accessToken.split("=")[1]
      const newRefreshToken = refresh.split("=")[1]
      const newExpires = expires.split("=")[1]
      setExpiresAt(newExpires)
      if (newToken !== token) {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.setItem(TOKEN_KEY, newToken)
      }
      if (newRefreshToken !== refreshToken) {
        window.localStorage.removeItem(REFRESH_TOKEN_KEY)
        window.localStorage.setItem(REFRESH_TOKEN_KEY, newRefreshToken)
      }
      setRefreshToken(window.localStorage.getItem(REFRESH_TOKEN_KEY))
      setToken(window.localStorage.getItem(TOKEN_KEY))
    }
  }
  */

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

  const fetchProfiles = async () => {
    setProfiles(await strapi.profiles.getProfiles())
  }


  React.useEffect(() => {
    initToken()
    initAuth()
    fetchProfiles()
  }, [])


  const setAndSaveToken = (token: string | null) => {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token)
    } else {
      window.localStorage.removeItem(TOKEN_KEY)
    }
    initToken()
  }

  const initAuth = () => {
    const t = window.localStorage.getItem(AUTH_TOKEN)
    if (t) {
      setAuth(JSON.parse(t))
    }
  }

  
  return (
    <>
      <UserContext.Provider value={{ auth, setAuth }}>
        <ProfileContext.Provider value={{ profiles }}>
          <TokenContext.Provider 
            value={{token, setToken: setAndSaveToken, expiresAt, setExpiresAt, refreshToken, setRefreshToken}}>
            <SearchContext.Provider value={{ input, setInput }}>
              <AppContainer/>
            </SearchContext.Provider>
          </TokenContext.Provider>
        </ProfileContext.Provider>
      </UserContext.Provider>
    </>
  )
}

export default App