import React from 'react'
import './App.css'
import AlbumTest from './components/albums/AlbumTest'
import { AlbumContext } from './context'
import { StrapiAlbum } from './strapi/model.strapi'
import strapi from './strapi/client.strapi'

const App: React.FC = () => {
  const [albums, setAlbums] = React.useState<StrapiAlbum[] | null>(null)

  const fetchAlbums = async() => {
    setAlbums(await strapi.albums.getAlbums())
  }

  React.useEffect(() => {
    fetchAlbums()

  }, [])

  return (
    <>
      <AlbumContext.Provider value={{ albums }}>
        <AlbumTest/>
      </AlbumContext.Provider>
    </>
  )
}

export default App
