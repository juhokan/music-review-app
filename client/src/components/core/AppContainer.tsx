import React from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import NewReleases from '../albums/NewReleases'
import { AppRoute } from '../../routes'
import AlbumPage from '../albums/AlbumPage'
import { VALIDATE_URL } from '../../config'

const AppContainer: React.FC = () => {


  return (
    <Router>
      <div>
        <Routes>
          <Route path={AppRoute.Home}>
            <Route index element={<NewReleases />} />
            <Route path=':albumId' element={<AlbumPage />} />
          </Route>
        </Routes>
        <Link to={VALIDATE_URL}>validate token</Link>
      </div>
    </Router>
  )
}

export default AppContainer
