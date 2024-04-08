/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import { UserContext } from "../../context"
import { getAllStrapiAlbums } from "../../api/strapi-api"
import Album from "./Album"
import { AlbumSort } from "../../model"

const RatedAlbums: React.FC = () => {
  const { auth } = React.useContext(UserContext)
  const [albums, setAlbums] = React.useState<any[]>([])
  const [id, setId] = React.useState<number>()
  const [sort, setSort] = React.useState<AlbumSort>(AlbumSort.Newest)

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split('.')[1]))
    } catch (e) {
      return null
    }
  }

  useEffect(() => {
    if (auth) {
      setId(parseJwt(auth).id)
    }

    const fetchAlbums = async () => {
      try {
        const items = await getAllStrapiAlbums()
        const filteredAlbums = items.filter(
          (album: { attributes: { user_id: number | undefined } }) => album.attributes.user_id === id)
        setAlbums(filteredAlbums.sort((a: any, b: any) => 
          new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()))
        setSort(AlbumSort.Newest)
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }

    fetchAlbums()

  }, [auth, id])

  useEffect(() => {
    const sortAlbums = () => {
      switch (sort) {
        case AlbumSort.Newest:
          setAlbums([...albums].sort((a, b) => 
            new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()))
          break
        case AlbumSort.Oldest:
          setAlbums([...albums].sort((a, b) => 
            new Date(a.attributes.updatedAt).getTime() - new Date(b.attributes.updatedAt).getTime()))
          break
        case AlbumSort.Highest:
          setAlbums([...albums].sort((a, b) => {
        
            const ratingComparison = b.attributes.rating - a.attributes.rating
            if (ratingComparison !== 0) {
              return ratingComparison
            }
            return new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()
          }))
          break
        case AlbumSort.Lowest:
          setAlbums([...albums].sort((a, b) => {
            const ratingComparison = a.attributes.rating - b.attributes.rating
            if (ratingComparison !== 0) {
              return ratingComparison
            }
            return new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()
          }))
          break
        default:
          break
      }
    }

    sortAlbums()
  }, [sort])


  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as AlbumSort)
  }

  return (
    <div>
      <div className='sort-container'>
        <h3 className='sort-header' >Sort:</h3>
        <select value={sort} onChange={handleSortChange}>
          <option value={AlbumSort.Newest}>Newest first</option>
          <option value={AlbumSort.Oldest}>Oldest first</option>
          <option value={AlbumSort.Highest}>Highest rating first</option>
          <option value={AlbumSort.Lowest}>Lowest rating first</option>
        </select>
      </div>

      <div className='album-card-page-container'>
        {albums.map((album) => (
          <Album
            key={album.id}
            id={album.attributes.album_id}
            link={album.attributes.image_link}
            name={album.attributes.title}
            artistName={album.attributes.artist}
            rating={album.attributes.rating}
          />
        ))}
      </div>
    </div>
  )
}

export default RatedAlbums