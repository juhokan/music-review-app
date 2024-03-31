import axios from 'axios'

const token = '0ff34ee27b44bbe62389370dd40728cb0d24119ef8b04353b41ca835c0babde62061037cfb7630175a17703cd98a898ead23aa14e18d34242aa38f5698c1568285d8ee776dfc95a8fe4d05a3ff04d10c35884207d3cc3f3778ec9ce0d2d967caf9dbe73b2bb22189ff209323aafcadf1c4530c2e6340dba0b7afd36f52c2b37a'

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
      'Authorization': `Bearer ${token}`
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