import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context'
import React, { useEffect } from 'react'
import UsersAlbums from '../components/albums/UsersAlbums'

const UserPage: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { auth, setAuth} = React.useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    if (!location) {
      return
    }
  
    const { search } = location
  
    axios({
      method: 'GET',
      url: `http://localhost:1337/api/auth/google/callback?${search}`
    })
      .then((res) => res.data)
      .then((data) => {
        setAuth(data)
      })
      .catch((error) => {
        console.error('Error fetching authentication data:', error)
      })
  
  }, [location])

  return (
    <div>
      {auth && (
        <>
          <div>User Id: {auth.user.id}</div>
          <div>Provider: {auth.user.provider}</div>
          <UsersAlbums/>
        </>        
      )}
    </div>
  )
}

export default UserPage