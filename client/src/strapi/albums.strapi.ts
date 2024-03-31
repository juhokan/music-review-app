import { StrapiAlbum } from "./model.strapi"
import { StrapiRequest, strapiCollectionRequest } from "./request.strapi"

export interface StrapiAlbumClient {
  readonly getAlbums: () => Promise<StrapiAlbum[]>
}

const getAlbums = async () => {
  const req: StrapiRequest = {
    method: 'GET',
    path: 'albums',
    fields: ['rating', 'image_link'],
    populate: [
      { path: ['album_id'], value: 'true' }
    ]
  }

  const response = await strapiCollectionRequest<StrapiAlbum>(req)
  console.log(response.data)
  if (!response.data) {
    console.error('getAlbums returned null data')
    return []
  }
  return response.data
}

const client: StrapiAlbumClient = {
  getAlbums
}

export default client

