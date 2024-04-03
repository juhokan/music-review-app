import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../albums/HomePage'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import NewReleasesPage from '../albums/NewReleasesPage'
import AlbumSearch from '../albums/AlbumSearch'
import UserPage from '../../profile/UserPage'
import GoogleAuthCallback from '../../api/GoogleAuthCallback'
import Header from './Header'
import { SearchContext } from '../../context'
import CallbackPage from './CallbackPage'

const AppContainer: React.FC = () => {
  const { input } = React.useContext(SearchContext)

  return (
    
    <Router>
      
      <Header/>

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
            <Route index element={<AlbumSearch inputValue={input}/>} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>

          <Route path='/auth/callback/google'>
            <Route index element={<GoogleAuthCallback/>}/>
          </Route>

          <Route path={AppRoute.Profile}>
            <Route index element={<UserPage/>}/>
          </Route>

          <Route path={AppRoute.Callback}>
            <Route index element={<CallbackPage/>}/>
          </Route>



        </Routes>
      </div>
    </Router>
  )
}

export default AppContainer
