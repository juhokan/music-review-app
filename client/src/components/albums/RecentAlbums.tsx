/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { useEffect } from "react"
import { getAllStrapiAlbums } from "../../api/strapi-api"
import Album from "./Album"

const RecentAlbums: React.FC = () => {

  const [albums, setAlbums] = React.useState<any[]>([])
    
  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const items = await getAllStrapiAlbums()
        setAlbums(items)
        console.log("Users albums:", items)
      } catch (error) {
        console.error("Error fetching albums:", error)
      }
    }
    
    fetchAlbums()
  }, [])

  albums.sort((a, b) => new Date(b.attributes.updatedAt).getTime() - new Date(a.attributes.updatedAt).getTime())
    
  return (
    <div className='album-card-container'>
      {albums.map((album) => (
        <Album 
          key={album.id} 
          user_id={album.attributes.user_id}
          id={album.attributes.album_id}
          link={album.attributes.image_link} 
          name={album.attributes.title} 
          artistName={album.attributes.artist} 
          rating={album.attributes.rating}/>
      ))}
    </div>
  )
}

export default RecentAlbums