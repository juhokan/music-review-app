/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import { UserContext } from "../../context"
import { getAllStrapiAlbums } from "../../api/strapi-api"
import Album from "./Album"
import { AlbumFilter, AlbumSort } from "../../model"

const RatedAlbums: React.FC = () => {
  const { auth } = React.useContext(UserContext)
  const [albums, setAlbums] = React.useState<any[]>([])
  const [filteredAlbums, setFilteredAlbums] = React.useState<any[]>([])
  const [id, setId] = React.useState<number>()
  const [sort, setSort] = React.useState<AlbumSort>(AlbumSort.Newest)
  const [Filter, setFilter] = React.useState<AlbumFilter>(AlbumFilter.None)

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
        setFilteredAlbums(filteredAlbums.sort((a: any, b: any) => 
          new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()))
        setSort(AlbumSort.Newest)
        setFilter(AlbumFilter.None)
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
          setFilteredAlbums([...filteredAlbums].sort((a, b) => 
            new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()))
          break
        case AlbumSort.Oldest:
          setFilteredAlbums([...filteredAlbums].sort((a, b) => 
            new Date(a.attributes.updatedAt).getTime() - new Date(b.attributes.updatedAt).getTime()))
          break
        case AlbumSort.Highest:
          setFilteredAlbums([...filteredAlbums].sort((a, b) => {
        
            const ratingComparison = b.attributes.rating - a.attributes.rating
            if (ratingComparison !== 0) {
              return ratingComparison
            }
            return new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime()
          }))
          break
        case AlbumSort.Lowest:
          setFilteredAlbums([...filteredAlbums].sort((a, b) => {
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

  useEffect(() => {
    const filterAlbums = () => {
      let filtered = [...albums]
  
      switch (Filter) {
        case AlbumFilter.None:
          // Do nothing if the filter is set to None
          break
        case AlbumFilter.One:
          filtered = albums.filter(album => album.attributes.rating === 1)
          break
        case AlbumFilter.Two:
          filtered = albums.filter(album => album.attributes.rating === 2)
          break
        case AlbumFilter.Three:
          filtered = albums.filter(album => album.attributes.rating === 3)
          break
        case AlbumFilter.Four:
          filtered = albums.filter(album => album.attributes.rating === 4)
          break
        case AlbumFilter.Five:
          filtered = albums.filter(album => album.attributes.rating === 5)
          break
        case AlbumFilter.Six:
          filtered = albums.filter(album => album.attributes.rating === 6)
          break
        case AlbumFilter.Seven:
          filtered = albums.filter(album => album.attributes.rating === 7)
          break
        case AlbumFilter.Eight:
          filtered = albums.filter(album => album.attributes.rating === 8)
          break
        case AlbumFilter.Nine:
          filtered = albums.filter(album => album.attributes.rating === 9)
          break
        case AlbumFilter.Ten:
          filtered = albums.filter(album => album.attributes.rating === 10)
          break
        default:
          break
      }
  
      setFilteredAlbums(filtered)
    }
  
    filterAlbums()
  }, [Filter])


  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as AlbumSort)
  }

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilter(event.target.value as AlbumFilter)
  }

  return (
    <div>
      <div className='sort-container'>
        <h3 className='sort-header' >Sort:</h3>
        <select className='sort-select' value={sort} onChange={handleSortChange}>
          <option value={AlbumSort.Newest}>Newest first</option>
          <option value={AlbumSort.Oldest}>Oldest first</option>
          <option value={AlbumSort.Highest}>Highest first</option>
          <option value={AlbumSort.Lowest}>Lowest first</option>
        </select>
        <h3 className='sort-header' >Filter:</h3>
        <select className='sort-select' value={Filter} onChange={handleFilterChange}>
          <option value={AlbumFilter.None}>None</option>
          <option value={AlbumFilter.One}>1s</option>
          <option value={AlbumFilter.Two}>2s</option>
          <option value={AlbumFilter.Three}>3s</option>
          <option value={AlbumFilter.Four}>4s</option>
          <option value={AlbumFilter.Five}>5s</option>
          <option value={AlbumFilter.Six}>6s</option>
          <option value={AlbumFilter.Seven}>7s</option>
          <option value={AlbumFilter.Eight}>8s</option>
          <option value={AlbumFilter.Nine}>9s</option>
          <option value={AlbumFilter.Ten}>10s</option>
        </select>
      </div>

      <div className='album-card-page-container'>
        {filteredAlbums.length > 0 ? (filteredAlbums.map((album) => (
          <Album
            key={album.id}
            user_id={null}
            id={album.attributes.album_id}
            link={album.attributes.image_link}
            name={album.attributes.title}
            artistName={album.attributes.artist}
            rating={album.attributes.rating}
          />
        ))) : (<h2>No albums found</h2>)}
      </div>
    </div>
  )
}

export default RatedAlbums