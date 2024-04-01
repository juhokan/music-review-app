import axios from 'axios'
import { STRAPI_TOKEN } from './config'

export const getAllStrapiAlbums = async () => {
  const {data} = await axios.get(`http://localhost:1337/api/albums`, {
    params: {}
  })
  console.log(data)
  return data
}

export const getStrapiAlbum = async (id: number) => {
  const {data} = await axios.get(`http://localhost:1337/api/albums/${id}`, {
    params: {}
  })
  console.log(data)
  return data
}

export const putAlbum = async (id: string, rating: number) => {
  const data = JSON.stringify({
    "data": {
      "album_id": id,
      "rating": rating
    }
  })
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'http://localhost:1337/api/albums/',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    },
    data : data
  }
  
  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
}