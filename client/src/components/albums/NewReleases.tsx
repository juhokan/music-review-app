import React, { useEffect } from "react"
import { TokenContext } from "../../context"
import { getNewReleases } from "../../api"
import Album from "./Album"

const NewReleases: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [albums, setAlbums] = React.useState<any[]>([])
  const { token } = React.useContext(TokenContext)

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        if (token) {
          const items = await getNewReleases(token)
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
      {albums.map(album => (
        <Album key={album.id} id={album.id} link={album.images[0].url} name={album.name}/>
      ))}
    </div>
  )
}

export default NewReleases
