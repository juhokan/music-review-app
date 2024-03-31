import React from "react"
import { useNavigate } from 'react-router-dom'

interface AlbumPageProps {
  id: string;
  link: string;
  name: string
  artistName: string
}

const Album: React.FC<AlbumPageProps> = ({ id, link, name, artistName }) => {
  const navigate = useNavigate()


  const handleAlbumClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div className='album-card' onClick={handleAlbumClick}>
      <img width={"300px"} src={link} alt='' />
      <div className='album-info'>
       <h3 className='album-name'>{name}</h3>
        <h4 className='album-artist-name'>{artistName}</h4>
      </div>
    </div>
  )
}

export default Album
