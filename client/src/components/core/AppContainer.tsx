import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HomePage from '../albums/HomePage'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import { VALIDATE_URL } from '../../config'
import NewReleasesPage from '../albums/NewReleasesPage'
import AlbumSearch from '../albums/AlbumSearch'
import UserPage from '../../profile/UserPage'

const AppContainer: React.FC = () => {



  return (
    
    <Router>
      <Link to={AppRoute.Home}>Home</Link>
      <Link to={AppRoute.Search}>Search</Link>
      <Link to='http://localhost:1337/api/connect/google/'>Log in</Link>
      

      <div>
        <Routes>

          <Route path={AppRoute.Home}>
            <Route index element={<HomePage limit={10} />} />
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
            <Route index element={<UserPage/>}/>
          </Route>


        </Routes>
        <Link to={VALIDATE_URL}>Validate Token</Link>
      </div>
    </Router>
  )
}

export default AppContainer
