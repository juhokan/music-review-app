/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileContext, TokenContext, UserContext } from '../context'
import React, { useEffect } from 'react'
import { toStrapiUrl } from '../strapi/util.strapi'
import { StrapiProfile } from '../strapi/model.strapi'
import { getAllStrapiAlbums } from '../api/strapi-api'
import Album from '../components/albums/Album'
import { followers, listened } from '../components/data/UserData'
import { getUsersAlbums } from '../api/spotify-api'
import { AppRoute } from '../routes'
import { useNavigate } from 'react-router-dom'
import pageLinkImage from '../assets/icons/pageLink.svg'



const UserPage: React.FC = () => {
  const { auth, setAuth } = React.useContext(UserContext)
  const [id, setId] = React.useState<number>()
  const { profiles } = React.useContext(ProfileContext)
  const { token, setToken, setRefreshToken } = React.useContext(TokenContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)
  const [albums, setAlbums] = React.useState<any[]>([])
  const [strapiAlbums, setStrapiAlbums] = React.useState<any[]>([])
  const navigate = useNavigate()

  const TOKEN_KEY = 'token'
  const AUTH_TOKEN = 'auth'
  const REFRESH_TOKEN_KEY = 'refresh'

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    
    if (profiles && auth) {
      setId(parseJwt(auth).id)
      console.log('id: ', id)
      Object.values(profiles).forEach((profile) => {
        if (profile.attributes.user_id === id) {
          setCurrent(profile)
          return
        }
      })
    }

    const fetchStrapiAlbums = async () => {
      try {
        const items = await getAllStrapiAlbums()
        setStrapiAlbums(items)
        console.log("User page", items)
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }

    const fetchAlbums = async () => {
      try {
        if (token) {
          const items = await getUsersAlbums(token, 10)
          setAlbums(items)
          console.log("New release response:", items)
        }
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }

    fetchStrapiAlbums()
    fetchAlbums()

  }, [auth, id, profiles, token])

  const filteredAlbums = strapiAlbums.filter(album => album.attributes.user_id === id)
  filteredAlbums.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime())

  const profiledata = () => {
    return (
      <div className='profile-info'>
        {current && (
          <div className='profile-container'>
            {current.attributes.profile_image.data && (
              <img 
                className='profile-image'   
                src={toStrapiUrl(current.attributes.profile_image.data.attributes.url)}
              />
            )}
            <div className='profile-data-container'>
              <h2 className='profile-name'>{current.attributes.display_name}</h2>
              <div className='profile-data-fields-container'>
                <div>
                  <h3 className='profile-data-text'>{listened(filteredAlbums)}</h3>
                  <h4 className='profile-data-label'>Listened</h4>
                </div>
                <div>
                  <h3 className='profile-data-text'>{followers()}</h3>
                  <h4 className='profile-data-label'>Followers</h4>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  const handleHeaderClick = () => {
    navigate(AppRoute.UsersAlbums)
  }

  const recentActivity = () => {
    return (
      <div>
        <div className='new-releases-header' onClick={handleHeaderClick}>
          <h2 className='new-releases-header-text'>Recent Activity</h2>
          <img className='new-releases-image' src={pageLinkImage} />
        </div>
        <div className='album-card-container'> 
          {filteredAlbums.map((album) => (
            <Album 
              key={album.id} 
              id={album.attributes.album_id} 
              link={album.attributes.image_link} 
              name={album.attributes.title} 
              artistName={album.attributes.artist} 
              rating={album.attributes.rating}/>
          ))}
        </div>
      </div>
    )
  }

  const handleLogOut = () => {
    setAuth(null)
    setToken(null)
    setRefreshToken(null)
    window.localStorage.removeItem(AUTH_TOKEN)
    window.localStorage.removeItem(REFRESH_TOKEN_KEY)
    window.localStorage.removeItem(TOKEN_KEY)
  }
  const usersSavedAlbums = () => {
    return (
      <>
        {albums.length > 0 && (
          <div>
            <h2 className='new-releases-header'>Saved Albums</h2>
            <div className='album-card-container'> 
              {albums.map((album) => (
                <Album 
                  key={album.album.id} 
                  id={album.album.id} 
                  link={album.album.images[0].url} 
                  name={album.album.name} 
                  artistName={album.album.artists[0].name} 
                  rating={null}
                />
              ))}
            </div>
          </div>
        )}
      </>
    )
  }
  

  return (
    <div>
      <div>
        {current ? (
          <>
            {profiledata()}
            {recentActivity()}
            {usersSavedAlbums()}
          </>
        ) : (
          <h2>No Profile Found</h2>
        )}
      </div>
      <a href={AppRoute.Home} onClick={handleLogOut}>
        <h3>Log Out</h3>
      </a>
    </div>
  )
}

export default UserPage