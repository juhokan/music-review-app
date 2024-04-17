import React, { useEffect } from "react"
import { TokenContext, UserContext } from "../../context"
import createAxiosResponseInterceptor, { getNewReleases } from "../../api/spotify-api"
import Album from "./Album"
import { Link, useNavigate } from "react-router-dom"
import { AppRoute } from "../../routes"
import RecentAlbums from "./RecentAlbums"
import { CLIENT_ID } from "../../config"
import pageLinkImage from '../../assets/icons/pageLink.svg'
import UpNextAlbums from "./UpNextAlbums"

interface NewReleaseProps {
  limit: number
}

const HomePage: React.FC<NewReleaseProps> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
  const { auth } = React.useContext(UserContext)
  const { token, setToken } = React.useContext(TokenContext)
  const { refreshToken } = React.useContext(TokenContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (token) {
          const items = await getNewReleases(token, limit)
          setAlbums(items)
        }
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }
    
    if (refreshToken) {
      createAxiosResponseInterceptor(refreshToken, setToken)
    }
    fetchAlbums()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [limit, refreshToken, token])

  
  const handleHeaderClickNew = () => {
    navigate(AppRoute.New)
  }

  const generateRandomString = (length: number) => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
  
    if (window.crypto && window.crypto.getRandomValues) {
      const values = new Uint32Array(length)
      window.crypto.getRandomValues(values)
  
      for (let i = 0; i < length; i++) {
        randomString += charset[values[i] % charset.length]
      }
    } else {
      // Fallback for browsers that do not support window.crypto
      for (let i = 0; i < length; i++) {
        randomString += charset.charAt(Math.floor(Math.random() * charset.length))
      }
    }
  
    return randomString
  }

  const authUrl = () => {
    const state = generateRandomString(16)
    const scope = 'user-read-private user-read-email user-library-read'
  
    const queryParams = new URLSearchParams({
      response_type: 'code',
      client_id: CLIENT_ID,
      scope: scope,
      redirect_uri: 'https://hifi-app.fly.dev/callback',
      state: state
    })
  
    return `https://accounts.spotify.com/authorize?` + queryParams.toString()
  }

  

  return (
    <div>
      {!refreshToken && <Link className='validate-token' to={authUrl()}>Validate Token</Link>}
      <div className='new-releases-header' onClick={handleHeaderClickNew}>
        <h2 className='new-releases-header-text'>New Releases</h2>
        <img className='new-releases-image' src={pageLinkImage} />
      </div>
      <div className='album-card-container'> 
        {albums.map(album => (
          <Album 
            user_id={null}
            key={album.id} 
            id={album.id} 
            link={album.images[0].url} 
            name={album.name} 
            artistName={album.artists[0].name} 
            rating={null}/>
        ))}
      </div>
      {auth && (
        <div>
          <h2 className='new-releases-header new-releases-header-text'>Up Next</h2>
          <UpNextAlbums/>
        </div>
      )}
      <h2 className='new-releases-header new-releases-header-text'>Most Recent</h2>
      <RecentAlbums/>
    </div>
  )
}

export default HomePage
