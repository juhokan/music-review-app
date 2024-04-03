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


export const postAlbum = async (
  album_id: string, user_id: number, link: string, title: string, artist: string, rating?: number) => {
  const data = JSON.stringify({
    "data": {
      "album_id": album_id,
      "rating": rating,
      "user_id": user_id,
      "image_link": link,
      "title": title,
      "artist": artist
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


export const putAlbum = async (id: number, rating: number) => {
  const data = JSON.stringify({
    "data": {
      "rating": rating
    }
  })
  
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `http://localhost:1337/api/albums/${id}`,
    headers: { 
      'Content-Type': 'application/json'
    },
    data : data
  }
  
  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log('put request not allowed:')
      console.error(error)
    })
  
}

export const deleteAlbum = async (id: number) => {
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `http://localhost:1337/api/albums/${id}`,
    headers: { }
  }
  
  axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data))
    })
    .catch((error) => {
      console.log(error)
    })
  
}

export const userScore = async (id: number, album: string) => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'http://localhost:1337/api/albums',
      headers: {}
    }
    const response = await axios.request(config)
    return checkAlbumsForScore(id, album, response.data.data)
    
  } catch (error) {
    console.error(error)
    throw error
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const checkAlbumsForScore = (id: number, album: string, data: any) => {
  for (const obj of data) {
    if (obj.attributes.user_id === id && obj.attributes.album_id === album) {
      return obj
    }
  }
  return null
}