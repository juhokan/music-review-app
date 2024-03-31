import React, { useEffect } from "react"
import { TokenContext } from "../../context"
import { getNewReleases } from "../../spotify-api"
import Album from "./Album"

interface NewReleasesPageProps {
  limit: number
}

const NewReleasesPage: React.FC<NewReleasesPageProps> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
  const { token } = React.useContext(TokenContext)

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

  return (
    <div>
      <div className='album-card-page-container'> 
        {albums.map(album => (
          <Album key={album.id} id={album.id} link={album.images[0].url} name={album.name} artistName={album.artists[0].name}/>
        ))}
      </div>
    </div>
  )
}

export default NewReleasesPage