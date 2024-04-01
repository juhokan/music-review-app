import { Link } from 'react-router-dom'
import { UserContext } from '../context'
import React from 'react'
import UsersAlbums from '../components/albums/UsersAlbums'
import { VALIDATE_URL } from '../config'

const UserPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth } = React.useContext(UserContext)

  return (
    <div>
      {auth && (
        <>
          <div>User Id: {auth.user.id}</div>
          <div>Provider: {auth.user.provider}</div>
          <UsersAlbums/>
          <Link to={VALIDATE_URL}>Validate Token</Link>
        </>        
      )}
    </div>
  )
}

export default UserPage