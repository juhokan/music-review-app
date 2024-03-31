import React from "react"
import { AlbumContext } from "../../context"

const AlbumTest: React.FC = () => {
  const { albums } = React.useContext(AlbumContext)
  return (
    <>
      {albums?.length === 1 ? (
        <div>
          one Album
        </div>
      ) : (
        <div>
          no albums
        </div>
      )}
    </>
  )
}

export default AlbumTest
