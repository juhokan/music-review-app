import React, { useEffect } from "react"
import { TokenContext } from "../../context"
import createAxiosResponseInterceptor, { getNewReleases } from "../../api/spotify-api"
import Album from "./Album"
import { useNavigate } from "react-router-dom"
import { AppRoute } from "../../routes"
import RecentAlbums from "./RecentAlbums"

interface NewReleaseProps {
  limit: number
}

const HomePage: React.FC<NewReleaseProps> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
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
  }, [limit, refreshToken, token])

  
  const handleHeaderClickNew = () => {
    navigate(AppRoute.New)
  }


  

  return (
    <div>
      <h2 className='new-releases-header' onClick={handleHeaderClickNew}>New Releases</h2>
      <div className='album-card-container'> 
        {albums.map(album => (
          <Album key={album.id} id={album.id} link={album.images[0].url} name={album.name} artistName={album.artists[0].name} rating={null}/>
        ))}
      </div>
      <h2 className='new-releases-header'>Most Recent</h2>
      <RecentAlbums/>
    </div>
  )
}

export default HomePage
