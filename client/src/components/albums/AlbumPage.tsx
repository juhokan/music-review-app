/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext, UserContext } from "../../context"
import { getAlbum } from "../../api/spotify-api.ts"
import { 
  deleteAlbum, 
  deleteUpNext, 
  postAlbum, 
  postUpNext, 
  putAlbumFavourites, 
  putAlbumRating,
  userScore, 
  userUpNext 
} from "../../api/strapi-api.ts"
import listenedIcon from "../../assets/icons/listened.svg"
import favouriteIcon from "../../assets/icons/favourite.svg"
import spotifyIcon from "../../assets/icons/spotify.svg"
import upNextIcon from "../../assets/icons/upNext.svg"
import Tracks from "./Tracks.tsx"

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const [id, setId] = React.useState<number>()
  const { token } = React.useContext(TokenContext)
  const { auth } = React.useContext(UserContext)
  const [album, setAlbum] = useState<any>(null)
  const [log, setLog] = useState<any>()
  const [upNextlog, setUpNextLog] = useState<any>()
  const [listened, setListened] = useState<boolean>()
  const [isUpNext, setIsUpNext] = useState<boolean>()
  const [favourite, setFavourite] = useState<boolean>()
  const [currentRating, setCurrentRating] = useState<number | undefined>()
  const [loading, setLoading] = React.useState<boolean>(true)

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }


  useEffect(() => {
    if (auth) {
      setId(parseJwt(auth).id)
    }
  
    const fetchAlbum = async () => {
      setLoading(true)
      try {
        if (token && albumId) {
          const fetchedAlbum = await getAlbum(token, albumId)
          setAlbum(fetchedAlbum)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
        setLoading(false)
      }
    }
  
    const fetchScore = async () => {
      setLoading(true)
      try {
        if (id && albumId) {
          const l = await userScore(id, albumId)
          setLog(l)
          l ? setListened(true) : setListened(false)
          l ? setCurrentRating(l.attributes.rating) : setCurrentRating(undefined)
          l ? setFavourite(l.attributes.favourite) : setFavourite(false)

          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
        setLoading(false)
      }
    }

    const fetchUpNext = async () => {
      setLoading(true)
      try {
        if (id && albumId) {
          const l = await userUpNext(id, albumId)
          setUpNextLog(l)
          l ? setIsUpNext(true) : setIsUpNext(false)
          setLoading(false)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
        setLoading(false)
      }
    }
    
    fetchUpNext()
    fetchScore()
    fetchAlbum()
  }, [token, albumId, auth, listened, id, isUpNext])
  

  const postNewAlbum = async (aId: string, rating: number) => {
    if (id) {
      await postAlbum(aId, id, album.images[0].url, album.name, album.artists[0].name, false,rating)
      if (isUpNext) {
        await deleteUpNext(upNextlog.id)
        setIsUpNext(!isUpNext)
      }
    }
    else {
      console.log('no auth')
    }
  }

  const postNewUpNext = async (aId: string) => {
    if (id) {
      await postUpNext(aId, id, album.images[0].url, album.name, album.artists[0].name)
    }
    else {
      console.log('no auth')
    }
  }

  
  const putExistingAlbum = async (rating: number) => {
    if (auth && log) {
      await putAlbumRating(log.id, rating)
      if (isUpNext) {
        await deleteUpNext(upNextlog.id)
        setIsUpNext(!isUpNext)
      }
    }
    else {
      console.log('no auth')
    }
  }
  

  const deleteExistingAlbum = async () => {
    if (auth && listened) {
      await deleteAlbum(log.id)
      setLog(null)
    }
    else {
      console.log('no auth')
    }
  }

  const handleDelete = () => {
    if (albumId && log) {
      setListened(false)
      setCurrentRating(undefined)
      console.log(log)
      setCurrentRating(undefined)
      deleteExistingAlbum()
    }
  }

  const handleInputChange = (input: string) => {
    if (albumId) {
      if (log) {
        setCurrentRating(parseInt(input))
        putExistingAlbum(parseInt(input))
        
      } else {
        setListened(true)
        setCurrentRating(parseInt(input))
        postNewAlbum(albumId, parseInt(input))
      }
    }
  }

  const handleFavouriteChange = () => {
    if (log) {
      setFavourite(!favourite)
      putAlbumFavourites(log.id, !favourite)
    }
  }

  const handleUpNextChange = () => {
    if (upNextlog) {
      setIsUpNext(!isUpNext)
      deleteUpNext(upNextlog.id)
      setUpNextLog(null)
    }
    else {
      if (albumId && id) {
        postNewUpNext(albumId)
        setIsUpNext(!isUpNext)
      }
    }
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
          {<Tracks album={album}/>}
        </div>
      </div>
    )
  }

  const albumButtons = () => {
    const albumButtons = []

    if (listened) {
      albumButtons.push(
        <div className='listened-button listened-button-active' onClick={() => (!loading && handleDelete())}>
          <img className='listened-icon' src={listenedIcon} />
        </div>
      )
    }
    else {
      albumButtons.push(
        <div className='listened-button listened-button-inactive' onClick={() => (!loading && handleInputChange(''))}>
          <img className='listened-icon listened-icon-inactive' src={listenedIcon} />
        </div>
      )
    }
    if (favourite) {
      albumButtons.push(
        <div className='favourite-button favourite-button-active' onClick={() => (!loading && handleFavouriteChange())}>
          <img className='favourite-icon' src={favouriteIcon} />
        </div>
      )
    }
    else {
      albumButtons.push(
        <div className='favourite-button favourite-button-inactive' 
          onClick={() => (!loading && handleFavouriteChange())}>
          <img className='favourite-icon favourite-icon-inactive' src={favouriteIcon} />
        </div>
      )
    }
    if (isUpNext) {
      albumButtons.push(
        <div className='upnext-button upnext-button-active' onClick={() => (!loading && handleUpNextChange())}>
          <img className='upnext-icon' src={upNextIcon} />
        </div>
      )
    }
    else {
      albumButtons.push(
        <div className='upnext-button upnext-button-inactive' onClick={() => (!loading && handleUpNextChange())}>
          <img className='upnext-icon upnext-icon-inactive' src={upNextIcon} />
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
      if (currentRating && i === currentRating) {
        ratingComponents.push(
          <div className='rating-component-active'>
            <h3 className='rating-text-active' onClick={() => (!loading && handleInputChange(''))}>{i}</h3>
          </div>)
      }
      else {
        ratingComponents.push(
          <div className='rating-component-inactive'>
            <h3 className='rating-text-inactive' onClick={() => (!loading && handleInputChange(str))}>{i}</h3>
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
          <img className='album-page-cover' src={album.images[0].url} alt='' />
          {rating()}
          {albumData()}
        </div>
      )}
    </div>
  )
}

export default AlbumPage
