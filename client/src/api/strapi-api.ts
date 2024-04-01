import axios from 'axios'
import { STRAPI_TOKEN } from '../config'

export const getAllStrapiAlbums = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:1337/api/albums',
      headers: {}
    }

    const response = await axios.request(config)
    console.log(response.data)
    return response.data.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getStrapiAlbum = async (id: number) => {
  const {data} = await axios.get(`http://localhost:1337/api/albums/${id}`, {
    params: {}
  })
  console.log(data)
  return data.data 
}

export const putAlbum = async (album_id: string, user_id: number, link: string, title: string, rating?: number) => {
  const data = JSON.stringify({
    "data": {
      "album_id": album_id,
      "rating": rating,
      "user_id": user_id,
      "image_link": link,
      "title": title
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