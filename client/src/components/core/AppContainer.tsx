import React from 'react'
import AlbumCard from '../albums/AlbumCard'
import AlbumPage from '../albums/AlbumPage'



const AppContainer: React.FC = () => {

  return (
    <div>
      <AlbumPage id='48D1hRORqJq52qsnUYZX56'/>
      <a href={`${process.env.AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}`}>validate token</a>
      <AlbumCard/>
    </div>
  )
}

export default AppContainer