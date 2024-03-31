import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewReleases from '../albums/NewReleases'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'

const AppContainer: React.FC = () => {
  const CLIENT_ID = "d9cad2b46b2f47fe8168ea6456212665"
  const REDIRECT_URI = "http://localhost:5173"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  return (
    <Router>
      <div>
        <Routes>
          <Route path={AppRoute.Home}>
            <Route index element={<NewReleases />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>
        </Routes>
        <Link to={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>validate token</Link>
      </div>
    </Router>
  )
}

export default AppContainer
