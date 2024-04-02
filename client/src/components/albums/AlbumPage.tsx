import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext, UserContext } from "../../context"
import { getAlbum } from "../../api/spotify-api.ts"
import { AppRoute } from "../../routes"
import { putAlbum, userScore } from "../../api/strapi-api.ts"


const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { token } = React.useContext(TokenContext)
  const { auth } = React.useContext(UserContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [album, setAlbum] = useState<any>(null)
  const [score, setScore] = useState<number>()
  const [logId, setLogId] = useState<number>()
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

    const fetchScore = async () => {
      try {
        if (auth && albumId) {
          const score = await userScore(auth.user.id, albumId)
          setScore(score.attributes.rating)
          setLogId(score.id)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
      }
    }
    fetchScore()
    fetchAlbum()
  }, [token, albumId])

  const putNewAlbum = async (id: string, rating: number) => {
    if (auth) {
      putAlbum(id, auth.user.id, album.images[0].url, album.name, album.artists[0].name, rating)
    }
    else {
      console.log('no auth')
    }
  }

  const patchAlbum = async (id: string, rating: number) => {
    //TODO
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
          <h3>{score}</h3>
          <h3>{album.name}</h3>
          <h4>{album.artists[0].name}</h4>
          <h4>Released: {album.release_date.split("-")[0]}</h4>
          <h4>Label: {album.label}</h4>
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
