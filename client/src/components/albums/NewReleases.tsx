import React, { useEffect } from "react"
import { TokenContext } from "../../context"
import { getNewReleases } from "../../api/spotify-api"
import Album from "./Album"
import { useNavigate } from "react-router-dom"
import { AppRoute } from "../../routes"

interface NewReleaseProps {
  limit: number
}

const NewReleases: React.FC<NewReleaseProps> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
  const { token } = React.useContext(TokenContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (token) {
          const items = await getNewReleases(token, limit)
          setAlbums(items)
          console.log("New release response:", items)
        }
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }

    fetchAlbums()
  }, [token])

  


  const handleAlbumClick = () => {
    navigate(AppRoute.New)
  }

  return (
    <div>
     <h2 className='new-releases-header' onClick={handleAlbumClick}>New Releases</h2>
      <div className='album-card-container'> 
        {albums.map(album => (
          <Album key={album.id} id={album.id} link={album.images[0].url} name={album.name} artistName={album.artists[0].name}/>
        ))}
      </div>
    </div>
  )
}

export default NewReleases
