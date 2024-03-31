import React, { useContext, useState, useEffect } from "react"
import { AlbumContext, TokenContext } from "../../context"
import { searchArtists } from "../../api"

const AlbumTest: React.FC = () => {
  const { albums } = useContext(AlbumContext)
  const { token } = useContext(TokenContext)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [artists, setArtists] = useState<any[]>([])

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        if (token) {
          const items = await searchArtists(token, 'pikakassa')
          setArtists(items)
        }
      } catch (error) {
        console.error("Error fetching artists:", error)
      }
    }

    fetchArtists()
  }, [token])

  return (
    <div>
      <div>
        {`strapi has info on ${albums?.length} albums`}
      </div>

      <div>
        {albums?.[0]?.attributes.album_id}
        {artists.map(artist => (
          <div key={artist.id}>
            {artist.images.length ? <img width={"100%"} src={artist.images[0].url} alt='' /> : <div>No Image</div>}
            {artist.name}
          </div>
        ))}
      </div>
    </div>
    
  )
}

export default AlbumTest
