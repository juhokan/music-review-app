import React, { useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { ProfileContext } from "../../context"
import { toStrapiUrl } from "../../strapi/util.strapi"
import { StrapiProfile } from "../../strapi/model.strapi"

interface AlbumPageProps {
  user_id: string | null;
  id: string;
  link: string;
  name: string
  artistName: string
  rating: number | null
}

const Album: React.FC<AlbumPageProps> = ({ user_id, id, link, name, artistName, rating }) => {
  const navigate = useNavigate()
  const { profiles } = React.useContext(ProfileContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)

  useEffect(() => {
    
    if (profiles && user_id) {
      Object.values(profiles).forEach((profile) => {
        if (profile.attributes.user_id === parseInt(user_id)) {
          setCurrent(profile)
          return
        }
      })
    }

  }, [id, profiles, user_id])


  const handleAlbumClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div className='album-card' onClick={handleAlbumClick}>
      {rating && (
        <div className='rating-block'>
          {current && current.attributes && current.attributes.profile_image && (
            <div>
              <img className='rating-block-image' 
                src={toStrapiUrl(current.attributes.profile_image.data?.attributes.url || '')} alt='' />
            </div>
          )}
          <div className='rating-block-number'>
            {rating}
          </div>
        </div>
      )}
      <img width={"300px"} src={link} alt='' />
      <div className='album-info'>
        <h3 className='album-name'>{name}</h3>
        <h4 className='album-artist-name'>{artistName}</h4>
      </div>
    </div>

  )
}

export default Album
