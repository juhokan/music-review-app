import React from "react"
import { TokenContext, UserContext } from "../context"
import { AppRoute } from "../routes"

const SettingsPage: React.FC = () => {
  const { setAuth } = React.useContext(UserContext)
  const {  setToken, setRefreshToken} = React.useContext(TokenContext)

  const handleSpotifyLogout = () => {
    setToken(null)
    setRefreshToken(null)
  }

  const handleAppLogout = () => {
    setAuth(null)
  }

  return (
    <div>
      <a href={AppRoute.Profile} onClick={handleSpotifyLogout}>
        <h3>Log out of Spotify</h3>
      </a>
      <a href={AppRoute.Profile} onClick={handleAppLogout}>
        <h3>Log out of app</h3>
      </a>
    </div>
  )
}

export default SettingsPage