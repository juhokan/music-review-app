/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileContext, TokenContext, UserContext } from '../context'
import React, { useEffect } from 'react'
import { toStrapiUrl } from '../strapi/util.strapi'
import { StrapiProfile } from '../strapi/model.strapi'
import { getAllStrapiAlbums } from '../api/strapi-api'
import Album from '../components/albums/Album'
import { getUsersAlbums } from '../api/spotify-api'
import { AppRoute } from '../routes'
import { useNavigate } from 'react-router-dom'
import pageLinkImage from '../assets/icons/pageLink.svg'
import AlbumRatingData from '../components/data/AlbumRatingData'


const UserPage: React.FC = () => {
  const { auth } = React.useContext(UserContext)
  const [id, setId] = React.useState<number>()
  const { profiles } = React.useContext(ProfileContext)
  const { token } = React.useContext(TokenContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)
  const [albums, setAlbums] = React.useState<any[]>([])
  const [strapiAlbums, setStrapiAlbums] = React.useState<any[]>([])
  const navigate = useNavigate()

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
          const items = await getUsersAlbums(token, 10, 0)
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
  const favouriteAlbums = filteredAlbums.filter(album => album.attributes.favourite === true)


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
            <div>
              <h2 className='profile-name' style={{padding: '16px'}}>{current.attributes.display_name}</h2>    
              <AlbumRatingData albums={filteredAlbums}/>
            </div>
          </div>
        )}
      </div>
    )
  }
  
  const handleRecentHeaderClick = () => {
    navigate(AppRoute.UsersAlbums)
  }

  const handleSavedHeaderClick = () => {
    navigate(AppRoute.SavedAlbums)
  }

  const recentActivity = () => {
    return (
      <div>
        <div className='new-releases-header' onClick={handleRecentHeaderClick}>
          <h2 className='new-releases-header-text'>Recent Activity</h2>
          <img className='new-releases-image' src={pageLinkImage} />
        </div>
        <div className='album-card-container'> 
          {filteredAlbums.length > 10 ? (
            filteredAlbums.slice(0, 10).map((album) => (
              <Album 
                key={album.id} 
                user_id={null}
                id={album.attributes.album_id} 
                link={album.attributes.image_link} 
                name={album.attributes.title} 
                artistName={album.attributes.artist} 
                rating={album.attributes.rating}
              />
            ))
          ) : (
            filteredAlbums.map((album) => (
              <Album
                user_id={null}
                key={album.id} 
                id={album.attributes.album_id} 
                link={album.attributes.image_link} 
                name={album.attributes.title} 
                artistName={album.attributes.artist} 
                rating={album.attributes.rating}
              />
            ))
          )}
        </div>
      </div>
    )
  }

  const favourites = () => {
    return (
      <div>
        <div className='new-releases-header'>
          <h2 className='new-releases-header-text'>Favourites</h2>
          <img className='new-releases-image' src={pageLinkImage} />
        </div>
        <div className='album-card-container'> 
          {favouriteAlbums.length > 10 ? (
            favouriteAlbums.slice(0, 10).map((album) => (
              <Album 
                key={album.id} 
                user_id={null}
                id={album.attributes.album_id} 
                link={album.attributes.image_link} 
                name={album.attributes.title} 
                artistName={album.attributes.artist} 
                rating={album.attributes.rating}
              />
            ))
          ) : (
            favouriteAlbums.map((album) => (
              <Album 
                key={album.id} 
                user_id={null}
                id={album.attributes.album_id} 
                link={album.attributes.image_link} 
                name={album.attributes.title} 
                artistName={album.attributes.artist} 
                rating={album.attributes.rating}
              />
            ))
          )}
        </div>
      </div>
    )
  }

  const usersSavedAlbums = () => {
    return (
      <>
        {albums.length > 0 && (
          <div>
            <div className='new-releases-header' onClick={handleSavedHeaderClick}>
              <h2 className='new-releases-header-text'>Saved Albums</h2>
              <img className='new-releases-image' src={pageLinkImage} />
            </div>
            <div className='album-card-container'> 
              {albums.map((album) => (
                <Album 
                  key={album.album.id} 
                  user_id={null}
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
            {favourites()}
            {usersSavedAlbums()}
          </>
        ) : (
          <h2>No Profile Found</h2>
        )}
      </div>
      
    </div>
  )
}

export default UserPage