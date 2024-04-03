/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext, UserContext } from "../../context"
import { getAlbum } from "../../api/spotify-api.ts"
import { deleteAlbum, postAlbum, putAlbum, userScore } from "../../api/strapi-api.ts"
import listened from "../../assets/icons/listened.svg"
import spotifyIcon from "../../assets/icons/spotify.svg"


const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { token } = React.useContext(TokenContext)
  const { auth } = React.useContext(UserContext)
  const [album, setAlbum] = useState<any>(null)
  const [log, setLog] = useState<any>()
  const [currentRating, setCurrentRating] = useState<number | undefined>()

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
          setCurrentRating(l.attributes.rating)
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
    }
    else {
      console.log('no auth')
    }
  }

  
  const putExistingAlbum = async (rating: number) => {
    if (auth && log) {
      await putAlbum(log.id, rating)
    }
    else {
      console.log('no auth')
    }
  }
  


  const deleteExistingAlbum = async () => {
    if (auth && log) {
      await deleteAlbum(log.id)
      window.location.reload()
    }
    else {
      console.log('no auth')
    }
  }

  const handleDelete = () => {
    if (albumId && log) {
      console.log(log)
      deleteExistingAlbum()
    }
  }

  const handleInputChange = (input: string) => {
    console.log(input)
    if (albumId) {
      if (log) {
        setCurrentRating(parseInt(input))
        putExistingAlbum(parseInt(input))
        
      } else {
        setCurrentRating(parseInt(input))
        postNewAlbum(albumId, parseInt(input))
      }
    }
  }


  function msToMinSec(ms: number) {
    const totalSeconds = Math.floor(ms / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  const albumData = () => {
    return (
      <div className='rating-page'>
        <div className='rating-album-data-container'>
          {albumButtons()}
          <h2 className='rating-album-text'>{album.name}</h2>
          <h3 className='rating-artist-text'>{album.artists[0].name}</h3>
          <h4 className='rating-track-info'>Released: {album.release_date.split("-")[0]}</h4>
          <h4 className='rating-track-info'>Label: {album.label}</h4>
          <h3 className='rating-artist-text tracks'>Tracks</h3>
          {album.tracks.items.map((track: any) => (
            <div className='rating-track-container'>
              <h4 className='rating-track-name'>{track.name}</h4>
              <h4 className='rating-track-title'>({msToMinSec(track.duration_ms)})</h4>
            </div>
          ))}
          
        </div>
      </div>
    )
  }

  const albumButtons = () => {
    const albumButtons = []

    if (log) {
      albumButtons.push(
        <div className='listened-button listened-button-active' onClick={() => handleDelete()}>
          <img className='listened-icon' src={listened} />
        </div>
      )
    }
    else {
      albumButtons.push(
        <div className='listened-button listened-button-inactive' onClick={() => handleInputChange('')}>
          <img className='listened-icon listened-icon-inactive' src={listened} />
        </div>
      )
    }
    albumButtons.push(
      <Link className='spotify-button' to={album.external_urls.spotify}>
        <img className='spotify-icon' src={spotifyIcon} />
      </Link>
    )

    return (
      <div className='rating-album-buttons'>
        {albumButtons}
      </div>
    )
  }
  
  const rating = () => {
    const ratingComponents = []
    for (let i = 1; i <= 10; i++) {
      const str = i.toString()
      if (log && currentRating && i === currentRating) {
        ratingComponents.push(
          <div className='rating-component-active'>
            <h3 className='rating-text-active' onClick={() => handleInputChange('')}>{i}</h3>
          </div>)
      }
      else {
        ratingComponents.push(
          <div key={i} className='rating-component-inactive'>
            <h3 className='rating-text-inactive' onClick={() => handleInputChange(str)}>{i}</h3>
          </div>
        )
      }

    }
    return <div className='rating-component'>{ratingComponents}</div>
  }
  
  
  return (
    
    <div className='album-page-card'>
      {album && album.images && album.images.length > 0 && (
        <div>
          <img width={"600px"} src={album.images[0].url} alt='' />
          {rating()}
          {albumData()}
        </div>
      )}
    </div>
  )
}

export default AlbumPage
