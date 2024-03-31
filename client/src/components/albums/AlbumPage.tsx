import React, { useEffect, useState } from "react"
import { getAlbum } from "../../api"
import { TokenContext } from "../../context"

interface AlbumPageProps {
  id: string;
}

const AlbumPage: React.FC<AlbumPageProps> = ({ id }) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [album, setAlbum] = useState<any>(null)
  const { token } = React.useContext(TokenContext)

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (token) {
          const items = await getAlbum(token, id)
          console.log("Album response:", items)
          setAlbum(items)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
      }
    }

    fetchAlbum()
  }, [id, token])

  return (
    <div>
      {album && album.images && album.images.length > 0 && (
        <img width={"100%"} src={album.images[0].url} alt='' />
      )}
    </div>
  )
}

export default AlbumPage
