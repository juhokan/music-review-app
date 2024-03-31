import React from 'react'
import AlbumCard from '../albums/AlbumCard'



const AppContainer: React.FC = () => {


  const CLIENT_ID = "d9cad2b46b2f47fe8168ea6456212665"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  return (
    <div>
      <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login to Spotify</a>
      <AlbumCard/>
    </div>
  )
}

export default AppContainer