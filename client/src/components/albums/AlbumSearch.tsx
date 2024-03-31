import React, { useContext, useState, useEffect } from "react"
import { TokenContext } from "../../context"
import { searchAlbums } from "../../api"
import Album from "./Album"

const AlbumSearch: React.FC = () => {
  const { token } = useContext(TokenContext)
  const [inputValue, setInputValue] = useState('') // State to hold the input value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = useState<any[]>([])

  useEffect(() => {
    fetchAlbums(inputValue)
  }, [inputValue])

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
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    fetchAlbums(inputValue)
  }
  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter album name:
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
      <div className='album-card-page-container'> 
        {albums.map(album => (
          <Album key={album.id} id={album.id} link={album.images[0].url} name={album.name} artistName={album.artists[0].name}/>
        ))}
      </div>
    </div>
  )
}

export default AlbumSearch

