/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import { UserContext } from '../context'

const GoogleAuthCallback: React.FC = () => {
  const { auth, setAuth } = React.useContext(UserContext)
  const location = useLocation()

  useEffect(() => {
    if (!location) {
      return
    }
  
    const { search } = location
  
    axios({
      method: 'GET',
      url: `https://hifi-app.fly.dev/api/connect/google/callback?${search}`
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data)
        setAuth(data)
        window.localStorage.setItem('auth', JSON.stringify(data))
      })
      .catch((error) => {
        console.error('Error fetching authentication data:', error)
      })
  
  }, [location])

  return (
    <div>
      {auth && (
        <>
          <div>Jwt: {auth.jwt}</div>
          <div>User Id: {auth.user.id}</div>
          <div>Provider: {auth.user.provider}</div>
        </>
      )}
    </div>
  )
}

export default GoogleAuthCallback
