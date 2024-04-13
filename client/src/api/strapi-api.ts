import axios from 'axios'
import { STRAPI_TOKEN } from '../config'


export const getStrapiUser = async (user: string, password: string) => {
  try {
    const data = JSON.stringify({
      "identifier": user,
      "password": password
    })

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'https://hifi-app-strapi.fly.dev/api/auth/local',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    }

    const response = await axios.request(config)
    console.log(JSON.stringify(response.data))
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}


export const getAllStrapiAlbums = async () => {
  try {
    const config = {
      method: 'get',
      maxBodyLength: Infinity,
      url: 'https://hifi-app-strapi.fly.dev/api/albums',
      headers: { 
        'Content-Type': 'application/json'
      }
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
  const {data} = await axios.get(`https://hifi-app-strapi.fly.dev/albums/${id}`, {
    params: {}
  })
  console.log(data)
  return data.data 
}


export const postAlbum = async (
  album_id: string, 
  user_id: number, 
  link: string, 
  title: string, 
  artist: string, 
  favourite: boolean, 
  rating?: number) => {
  const data = JSON.stringify({
    "data": {
      "album_id": album_id,
      "rating": rating,
      "user_id": user_id,
      "image_link": link,
      "title": title,
      "artist": artist,
      "favourite": favourite
    }
  })
  
  const config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://hifi-app-strapi.fly.dev/api/albums/',
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


export const putAlbumRating = async (id: number, rating: number) => {
  const data = JSON.stringify({
    "data": {
      "rating": rating
    }
  })
  
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://hifi-app-strapi.fly.dev/api/albums/${id}`,
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
      console.log('put request not allowed:')
      console.error(error)
    })
  
}

export const putAlbumFavourites = async (id: number, favourite: boolean) => {
  const data = JSON.stringify({
    "data": {
      "favourite": favourite
    }
  })
  
  const config = {
    method: 'put',
    maxBodyLength: Infinity,
    url: `https://hifi-app-strapi.fly.dev/api/albums/${id}`,
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
      console.log('put request not allowed:')
      console.error(error)
    })
  
}

export const deleteAlbum = async (id: number) => {
  const config = {
    method: 'delete',
    maxBodyLength: Infinity,
    url: `https://hifi-app-strapi.fly.dev/api/albums/${id}`,
    headers: { 
      'Authorization': `Bearer ${STRAPI_TOKEN}`
    }
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
      url: 'https://hifi-app-strapi.fly.dev/api/albums',
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