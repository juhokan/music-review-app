import { Link } from 'react-router-dom'
import { ProfileContext, UserContext } from '../context'
import React, { useEffect } from 'react'
import UsersAlbums from '../components/albums/UsersAlbums'
import { VALIDATE_URL } from '../config'
import { toStrapiUrl } from '../strapi/util.strapi'
import { StrapiProfile } from '../strapi/model.strapi'

const UserPage: React.FC = () => {
  const { auth } = React.useContext(UserContext)
  const { profiles } = React.useContext(ProfileContext)
  const [current, setCurrent] = React.useState<StrapiProfile | null>(null)

  useEffect(() => {
    
    if (profiles && auth) {
      Object.values(profiles).forEach((profile) => {
        console.log(profile)
        if (profile.attributes.user_id === auth.user.id) {
          setCurrent(profile)
          return // exit loop early once a matching profile is found
        }
      })
    }
  }, [auth, profiles])

  return (
    <div>
      {current ? (
        <>
          { current.attributes.profile_image.data && (
            <img height='100' src={toStrapiUrl(current.attributes.profile_image.data.attributes.url)} alt='' />
          )}
          <h2>{current.attributes.display_name}</h2>
          <UsersAlbums />
          <Link to={VALIDATE_URL}>Validate Token</Link>
        </>
      ) : (
        <h2>No Profile Found</h2>
      )}
    </div>
  )
}

export default UserPage