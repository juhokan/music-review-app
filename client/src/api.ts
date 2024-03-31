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