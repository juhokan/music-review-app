import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import HomePage from '../albums/HomePage'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import NewReleasesPage from '../albums/NewReleasesPage'
import AlbumSearch from '../albums/AlbumSearch'
import UserPage from '../../profile/UserPage'
import GoogleAuthCallback from '../../api/GoogleAuthCallback'
import { UserContext } from '../../context'

const AppContainer: React.FC = () => {
  const { auth } = React.useContext(UserContext)

  return (
    
    <Router>
      <Link to={AppRoute.Home}>Home</Link>
      <Link to={AppRoute.Search}>Search</Link>
      {auth ? 
        (<Link to={AppRoute.Profile}>Profile</Link>) 
        : 
        (<Link to='http://localhost:1337/api/connect/google/'>Log In</Link>)}
      
      

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
            <Route index element={<GoogleAuthCallback/>}/>
          </Route>

          <Route path={AppRoute.Profile}>
            <Route index element={<UserPage/>}/>
          </Route>



        </Routes>
      </div>
    </Router>
  )
}

export default AppContainer
