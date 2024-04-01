/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react"
import { getAllStrapiAlbums } from "../../api/strapi-api"
import { UserContext } from "../../context"
import Album from "./Album"

const UsersAlbums: React.FC = () => {
  const [albums, setAlbums] = React.useState<any[]>([])
  const { auth } = React.useContext(UserContext)

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
  }, [auth])

  const filteredAlbums = albums.filter(album => album.attributes.user_id === auth.user.id)


  const showUsersAlbums = () => {
    console.log(albums)
    console.log(auth.user.id)
    return (
      <div>
        <h2>Users Albums:</h2>
        <div className='album-card-container'> 
          <ul>
            {filteredAlbums.map((album) => (
              <Album key={album.id} id={album.attributes.album_id} link={album.attributes.image_link} name={album.attributes.title} artistName={album.attributes.artist} rating={album.attributes.rating}/>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div>
      {showUsersAlbums()}
    </div>
  )
}

export default UsersAlbums