import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext, UserContext } from "../../context"
import { getAlbum } from "../../api/spotify-api.ts"
import { AppRoute } from "../../routes"
import { putAlbum } from "../../api/strapi-api.ts"

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { token } = useContext(TokenContext)
  const { auth } = useContext(UserContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [album, setAlbum] = useState<any>(null)
  const [inputValue, setInputValue] = useState('')

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (token && albumId) {
          const fetchedAlbum = await getAlbum(token, albumId)
          setAlbum(fetchedAlbum)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
      }
    }

    fetchAlbum()
  }, [albumId, token])

  const putNewAlbum = async (id: string, rating: number) => {
    if (auth) {
      putAlbum(id, auth.user.id, album.images[0].url, album.name, album.artists[0].name, rating)
    }
    else {
      console.log('no auth')
    }
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (albumId) {
      putNewAlbum(albumId, parseInt(inputValue))
    }
  }


  return (
    
    <div className='album-page-card'>
      {album && album.images && album.images.length > 0 && (
        <div>
          <img width={"600px"} src={album.images[0].url} alt='' />
          <h3>{album.name}</h3>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <label>
          Enter rating:
          <input
            type='text'
            value={inputValue}
            onChange={handleInputChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>
      
      <Link to={AppRoute.Home}>&lt; Back to Albums</Link>
    </div>
  )
}

export default AlbumPage
