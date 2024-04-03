import React, { useEffect } from "react"
import { TokenContext } from "../../context"
import createAxiosResponseInterceptor, { getNewReleases } from "../../api/spotify-api"
import Album from "./Album"

interface NewReleasesPageProps {
  limit: number
}

const NewReleasesPage: React.FC<NewReleasesPageProps> = ({ limit }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
  const { token, setToken } = React.useContext(TokenContext)
  const { refreshToken } = React.useContext(TokenContext)

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

    if (refreshToken) {
      createAxiosResponseInterceptor(refreshToken, setToken)
    }

    fetchAlbums()
  }, [refreshToken, token])

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
