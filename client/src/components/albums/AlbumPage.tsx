/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext, UserContext } from "../../context"
import { getAlbum } from "../../api/spotify-api.ts"
import { AppRoute } from "../../routes"
import { postAlbum, putAlbum, userScore } from "../../api/strapi-api.ts"


const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { token } = React.useContext(TokenContext)
  const { auth } = React.useContext(UserContext)
  const [album, setAlbum] = useState<any>(null)
  const [log, setLog] = useState<any>()
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
          const l = await userScore(auth.user.id, albumId)
          setLog(l)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
      }
    }
    fetchScore()
    fetchAlbum()
  }, [token, albumId, auth])

  const postNewAlbum = async (id: string, rating: number) => {
    if (auth) {
      await postAlbum(id, auth.user.id, album.images[0].url, album.name, album.artists[0].name, rating)
      window.location.reload()
    }
    else {
      console.log('no auth')
    }
  }

  const putExistingAlbum = async (rating: number) => {
    if (auth && log) {
      await putAlbum(log.id, rating)
      window.location.reload()
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
      if (log) {
        putExistingAlbum(parseInt(inputValue))
      }
      else {
        postNewAlbum(albumId, parseInt(inputValue))
      }
    }
  }


  return (
    
    <div className='album-page-card'>
      {album && album.images && album.images.length > 0 && (
        <div>
          <img width={"600px"} src={album.images[0].url} alt='' />
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
          {log && log.attributes.rating && (<h3>Current rating: {log.attributes.rating}</h3>)}
          <h3>{album.name}</h3>
          <h4>{album.artists[0].name}</h4>
          <h4>Released: {album.release_date.split("-")[0]}</h4>
          <h4>Label: {album.label}</h4>
          <h3>Tracks</h3>
          {album.tracks.items.map((track: any) => (
            <h4>{track.name}</h4>
          ))}
          <Link to={album.external_urls.spotify}>Listen</Link>
        </div>
      )}
      
      
      <Link to={AppRoute.Home}>&lt; Back to Albums</Link>
    </div>
  )
}

export default AlbumPage
