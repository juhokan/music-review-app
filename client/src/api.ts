import axios from 'axios'

export const searchArtists = async (token: string, key: string) => {
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: key,
      type: "artist"
    }
  })

  return data.artists.items
}

export const searchAlbums = async (token: string, key: string) => {
  const {data} = await axios.get("https://api.spotify.com/v1/search", {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      q: key,
      type: "album"
    }
  })

  return data.albums.items
}

export const getAlbum = async (token: string, id: string) => {
  const {data} = await axios.get(`https://api.spotify.com/v1/albums/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      id: id
    }
  })
  console.log(data)
  return data
}

export const getNewReleases = async (token: string) => {
  const {data} = await axios.get(`https://api.spotify.com/v1/browse/new-releases`, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    params: {
      limit: 50
    }
  })
  console.log(data)
  return data.albums.items
}