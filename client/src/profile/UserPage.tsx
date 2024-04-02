/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from 'react-router-dom'
import { ProfileContext, UserContext } from '../context'
import React, { useEffect } from 'react'
import { VALIDATE_URL } from '../config'
import { toStrapiUrl } from '../strapi/util.strapi'
import { StrapiProfile } from '../strapi/model.strapi'
import { getAllStrapiAlbums } from '../api/strapi-api'
import Album from '../components/albums/Album'

const UserPage: React.FC = () => {
  const { auth } = React.useContext(UserContext)
  const { profiles } = React.useContext(ProfileContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)
  const [albums, setAlbums] = React.useState<any[]>([])

  useEffect(() => {
    
    if (profiles && auth) {
      Object.values(profiles).forEach((profile) => {
        console.log(profile)
        if (profile.attributes.user_id === auth.user.id) {
          setCurrent(profile)
          return
        }
      })
    }

    const fetchAlbums = async () => {
      try {
        const items = await getAllStrapiAlbums()
        setAlbums(items)
        console.log("User page", items)
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }

    fetchAlbums()

  }, [auth, profiles])

  const filteredAlbums = albums.filter(album => album.attributes.user_id === auth.user.id)
  filteredAlbums.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime())

  const recentActivity = () => {
    return (
      <div>
        <h2 className='new-releases-header'>Recent Activity</h2>
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

  return (
    <div>
      {current ? (
        <>
          { current.attributes.profile_image.data && (
            <img 
              className='profile-image'   
              src={toStrapiUrl(current.attributes.profile_image.data.attributes.url)}
            />
          )}
          <h2>{current.attributes.display_name}</h2>
          {recentActivity()}
          <Link to={VALIDATE_URL}>Validate Token</Link>
        </>
      ) : (
        <h2>No Profile Found</h2>
      )}
    </div>
  )
}

export default UserPage