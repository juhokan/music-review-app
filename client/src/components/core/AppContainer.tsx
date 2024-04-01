import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewReleases from '../albums/NewReleases'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import { VALIDATE_URL } from '../../config'
import NewReleasesPage from '../albums/NewReleasesPage'
import AlbumSearch from '../albums/AlbumSearch'
import GoogleAuthCallback from '../../profile/GoogleAuthCallback'
import UserPage from '../../profile/UserPage'
import { UserContext } from '../../context'

const AppContainer: React.FC = () => {
  const { auth: login } = React.useContext(UserContext)



  return (
    
    <Router>
      <Link to={AppRoute.Search}>Search</Link>
      <Link to='http://localhost:1337/api/connect/google/'>Log in</Link>

      <div>
        <Routes>

          <Route path={AppRoute.Home}>
            <Route index element={<NewReleases limit={10} />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>

          <Route path={AppRoute.New}>
            <Route index element={<NewReleasesPage limit={50} />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>

          <Route path={AppRoute.Search}>
            <Route index element={<AlbumSearch />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>

          <Route path='/auth/callback/google'>
            <Route index element={!login ? <GoogleAuthCallback/> : <UserPage/>}/>
          </Route>


        </Routes>
        <Link to={VALIDATE_URL}>Validate Token</Link>
      </div>
    </Router>
  )
}

export default AppContainer
