import React, { useContext, useState, useEffect } from "react"
import { TokenContext } from "../../context"
import { searchAlbums } from "../../api/spotify-api"
import Album from "./Album"

interface AlbumSearchProps {
  readonly inputValue: string | null
}

const AlbumSearch: React.FC<AlbumSearchProps> = ({ inputValue }) => {
  const { token } = useContext(TokenContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = useState<any[]>([])
  const [pageInput, setPageInput] = useState('')

  useEffect(() => {
    if (inputValue) {
      setPageInput(inputValue)
      fetchAlbums(inputValue)
    }
  }, [])

  const fetchAlbums = async (v: string) => {
    try {
      if (token) {
        const items = await searchAlbums(token, v)
        setAlbums(items)
      }
    } catch (error) {
      console.error("Error fetching albums:", error)
    }
  }


  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageInput(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchAlbums(pageInput)
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type='text' value={pageInput} className='search-page' onChange={handleInputChange}/>
      </form>

      <div className='album-card-page-container'> 
        {albums.map(album => (
          <Album 
            key={album.id} 
            id={album.id} 
            link={album.images[0].url} 
            name={album.name} 
            artistName={album.artists[0].name} 
            rating={null}/>
        ))}
      </div>
    </div>
  )
}

export default AlbumSearch

