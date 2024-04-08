import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import HomePage from '../albums/HomePage'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import NewReleasesPage from '../albums/NewReleasesPage'
import AlbumSearch from '../albums/AlbumSearch'
import UserPage from '../../profile/UserPage'
import Header from './Header'
import { SearchContext, UserContext } from '../../context'
import CallbackPage from './CallbackPage'
import LoginPage from '../../profile/LoginPage'
import RatedAlbums from '../albums/RatedAlbums'

const AppContainer: React.FC = () => {
  const { input } = React.useContext(SearchContext)
  const { auth } = React.useContext(UserContext)

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

          <Route path={AppRoute.Profile}>
            <Route index element={auth ? (<UserPage/>) : (<LoginPage/>)}/>
            <Route path={AppRoute.UsersAlbums} element={<RatedAlbums />} />
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
