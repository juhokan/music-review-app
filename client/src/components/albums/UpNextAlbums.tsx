/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useEffect } from "react"
import { getAllStrapiupNext } from "../../api/strapi-api"
import Album from "./Album"
import { UserContext } from "../../context"

const UpNextAlbums: React.FC = () => {
  const [albums, setAlbums] = React.useState<any[]>([])
  const { auth } = React.useContext(UserContext)
  const [id, setId] = React.useState<number>()

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
        const items = await getAllStrapiupNext()
        setAlbums(items)
        console.log("Users albums:", items)
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }
    
    fetchAlbums()
  }, [auth])

  const filteredAlbums = albums.filter(album => album.attributes.user_id === id)
  filteredAlbums.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime())
    
  return (
    <div className='album-card-container'>
      {filteredAlbums.map((album) => (
        <Album key={album.id} user_id={null} id={album.attributes.album_id} link={album.attributes.image_link} name={album.attributes.title} artistName={album.attributes.artist} rating={album.attributes.rating}/>
      ))}
    </div>
  )
}

export default UpNextAlbums