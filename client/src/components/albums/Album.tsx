import React from "react"
import { useNavigate } from 'react-router-dom'

interface AlbumPageProps {
  id: string;
  link: string;
  name: string
}

const Album: React.FC<AlbumPageProps> = ({ id, link, name }) => {
  const navigate = useNavigate()


  const handleAlbumClick = () => {
    navigate(`/${id}`)
  }

  return (
    <div className='album-card' onClick={handleAlbumClick}>
      <img width={"300px"} src={link} alt='' />
      <h3>{name}</h3>
    </div>
  )
}

export default Album
