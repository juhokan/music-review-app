import React, { useEffect, useState, useContext } from "react"
import { Link, useParams } from "react-router-dom"
import { TokenContext } from "../../context"
import { getAlbum } from "../../api"
import { AppRoute } from "../../routes"

const AlbumPage: React.FC = () => {
  const { albumId } = useParams<{ albumId: string }>()
  const { token } = useContext(TokenContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [album, setAlbum] = useState<any>(null)

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        if (token && albumId) {
          const fetchedAlbum = await getAlbum(token, albumId)
          setAlbum(fetchedAlbum)
        }
      } catch (error) {
        console.error("Error fetching album:", error)
      }
    }

    fetchAlbum()
  }, [albumId, token])



  return (
    <div className='album-page-card'>
      {album && album.images && album.images.length > 0 && (
        <div>
          <img width={"600px"} src={album.images[0].url} alt='' />
          <h3>{album.name}</h3>
        </div>
      )}
      <Link to={AppRoute.Home}>&lt; Back to Albums</Link>
    </div>
  )
}

export default AlbumPage
