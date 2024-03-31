import React, { useContext, useState, useEffect } from "react"
import { AlbumContext, TokenContext } from "../../context"
import { searchAlbums } from "../../api"

const AlbumSearch: React.FC = () => {
  const { albums } = useContext(AlbumContext)
  const { token } = useContext(TokenContext)
  const [inputValue, setInputValue] = useState('') // State to hold the input value
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [spotifyAlbums, setSpotifyAlbums] = useState<any[]>([])

  useEffect(() => {
    fetchAlbums(inputValue)
  }, [inputValue])

  const fetchAlbums = async (v: string) => {
    try {
      if (token) {
        const items = await searchAlbums(token, v)
        setSpotifyAlbums(items)
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
      <div>
        {`strapi has info on ${albums?.length} albums`}
      </div>

      <div>
        {albums?.[0]?.attributes.album_id}
        {spotifyAlbums.map(album => (
          <div key={album.id}>
            {album.images.length ? <img width={"100%"} src={album.images[0].url} alt='' /> : <div>No Image</div>}
            {album.name}
            {album.id}
          </div>
        ))}
      </div>
    </div>
  )
}

export default AlbumSearch

