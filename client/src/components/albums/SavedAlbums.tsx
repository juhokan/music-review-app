/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react"
import { TokenContext } from "../../context"
import Album from "./Album"
import createAxiosResponseInterceptor, { getUsersAlbums } from "../../api/spotify-api"

const SavedAlbums: React.FC = () => {
  const { token, setToken, refreshToken } = React.useContext(TokenContext)
  const [albums, setAlbums] = React.useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [offset, setOffset] = React.useState<number>(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const pageHeight = document.body.scrollHeight

      if (scrollPosition >= pageHeight && !loading) {
        fetchAlbums()
      }
    }

    const fetchAlbums = async () => {
      try {
        if (token !== null) {
          setLoading(true)
          const items = await getUsersAlbums(token, 50, offset)
          const mergedAlbums = [...albums, ...items]
          setAlbums(mergedAlbums)
          console.log(items)
          if (items.length > 0) {
            setOffset((prevOffset) => prevOffset + 50)
          }
          if (items.length === 0 || items.next === null) {
            setLoading(false)
          }
        }
      } catch (error) {
        console.error("Error fetching albums:", error)
        setLoading(false)
      }
    }

    fetchAlbums()

    if (refreshToken) {
      createAxiosResponseInterceptor(refreshToken, setToken)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshToken, token, offset])

  return (
    <div>
      <div className='album-card-page-container'>
        {albums.map((album) => (
          <Album
            key={album.album.id}
            user_id={null}
            id={album.album.id}
            link={album.album.images[0].url}
            name={album.album.name}
            artistName={album.album.artists[0].name}
            rating={null}
          />
        ))}
        {!loading && albums.length === 0 && <h2>No albums found</h2>}
      </div>
      {loading && <h2>Loading...</h2>}
    </div>
  )
}

export default SavedAlbums
