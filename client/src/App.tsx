import React from 'react'
import './App.css'
import { AlbumContext, TokenContext } from './context'
import { StrapiAlbum } from './strapi/model.strapi'
import strapi from './strapi/client.strapi'
import AppContainer from './components/core/AppContainer'

const TOKEN_KEY = 'token'

const App: React.FC = () => {

  const [token, setToken] = React.useState<string | null>(null)
  const [albums, setAlbums] = React.useState<StrapiAlbum[] | null>(null)

  const initToken = () => {
    const h = window.location.hash
    let t = window.localStorage.getItem("token")
    const s = h.substring(1).split("&").find(e => e.startsWith("access_token"))

    if (!t && h && s !== undefined) {
      t = s.split("=")[1]

      window.location.hash = ""
      window.localStorage.setItem("token", t)
    }

    setToken(t)
  }

  const fetchAlbums = async() => {
    setAlbums(await strapi.albums.getAlbums())
  }

  React.useEffect(() => {
    initToken()
    fetchAlbums()
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
      <AlbumContext.Provider value={{ albums }}>
        <TokenContext.Provider value={{token, setToken: setAndSaveToken}}>
          <AppContainer/>
        </TokenContext.Provider>
      </AlbumContext.Provider>
    </>
  )
}

export default App
