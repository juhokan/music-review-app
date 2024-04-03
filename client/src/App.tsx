/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import './App.css'
import { ProfileContext, SearchContext, TokenContext, UserContext } from './context'
import AppContainer from './components/core/AppContainer'
import { StrapiProfile } from './strapi/model.strapi'
import strapi from './strapi/client.strapi'
import createAxiosResponseInterceptor from './api/spotify-api'

const TOKEN_KEY = 'token'
const AUTH_TOKEN = 'auth'
const REFRESH_TOKEN_KEY = 'refresh'

const App: React.FC = () => {
  const [token, setToken] = React.useState<string | null>(null)
  const [refreshToken, setRefreshToken] = React.useState<string | null>(null)
  const [expiresAt, setExpiresAt] = React.useState<string | null>(null)
  const [auth, setAuth] = React.useState<any | null>(null)
  const [profiles, setProfiles] = React.useState<StrapiProfile[] | null>(null)
  const [input, setInput] = React.useState<string | null>(null)


  const initToken = () => {
    const hash = window.location.hash
    const currentToken = window.localStorage.getItem(TOKEN_KEY)
    const currentRefresh = window.localStorage.getItem(REFRESH_TOKEN_KEY)

    const newTokenStr = hash.substring(1).split("&").find(e => e.startsWith("access_token"))
    const newRefreshStr = hash.substring(1).split("&").find(e => e.startsWith("refresh_token"))
    const newExpiresInStr = hash.substring(1).split("&").find(e => e.startsWith("expires_in"))

    if ( hash && newExpiresInStr && newTokenStr && newRefreshStr) {
      const newToken = newTokenStr.split("=")[1]
      const newRefresh = newRefreshStr.split("=")[1]
      const newExpiresIn = newExpiresInStr.split("=")[1]
      
      console.log(newToken)
      console.log(newRefresh)
      console.log(newExpiresIn)

      window.location.hash = ""

      if (newToken !== currentToken) {
        window.localStorage.removeItem(TOKEN_KEY)
        window.localStorage.setItem(TOKEN_KEY, newToken)
      }

      if (newRefresh !== currentRefresh) {
        window.localStorage.removeItem(REFRESH_TOKEN_KEY)
        window.localStorage.setItem(REFRESH_TOKEN_KEY, newRefresh)
      }
    }
    
    setToken(currentToken)
    setRefreshToken(currentRefresh)

  }

  const fetchProfiles = async () => {
    setProfiles(await strapi.profiles.getProfiles())
  }


  React.useEffect(() => {
    initToken()
    initAuth()
    fetchProfiles()
    if (refreshToken) {
      createAxiosResponseInterceptor(refreshToken, setToken)
    }
  }, [refreshToken])


  const setAndSaveToken = (token: string | null) => {
    if (token) {
      window.localStorage.setItem(TOKEN_KEY, token)
    } else {
      window.localStorage.removeItem(TOKEN_KEY)
    }
    initToken()
  }

  const setAndSaveRefreshToken = (refreshToken: string | null) => {
    if (refreshToken) {
      window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
    } else {
      window.localStorage.removeItem(REFRESH_TOKEN_KEY)
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
            value={{
              token, setToken: setAndSaveToken, 
              expiresAt, setExpiresAt, 
              refreshToken, setRefreshToken: setAndSaveRefreshToken
            }}>
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