import { StrapiAlbum } from "./model.strapi"
import { StrapiRequest, StrapiResponse, strapiCollectionRequest, strapiRequest } from "./request.strapi"
import { extractStrapiData } from "./util.strapi"

export interface StrapiAlbumClient {
  readonly getAlbums: () => Promise<StrapiAlbum[]>
  readonly update: (data: StrapiAlbum, id?: number) => Promise<StrapiAlbum>
  readonly remove: (token: string, id: number) => Promise<void>
}

const getAlbums = async () => {
  const req: StrapiRequest = {
    method: 'GET',
    path: 'albums',
    fields: ['rating'],
    populate: [
      { path: ['album_id'], value: 'true' },
      { path: ['user_id'], value: 'true' }
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

const update = async (data: StrapiAlbum, id?: number): Promise<StrapiAlbum> => {
  const req: StrapiRequest = {
    method: id ? 'PUT' : 'POST',
    path: 'albums',
    body: data,
    fields: ['rating'],
    populate: [
      { path: ['album_id'], value: 'true' }
    ]
  }

  const response = await strapiRequest<StrapiResponse<StrapiAlbum>>(req)
  return extractStrapiData(response)
}

const remove = async (token: string, id: number) => {
  const req: StrapiRequest = {
    method: 'DELETE',
    path: 'events',
    id,
    token
  }

  extractStrapiData(await strapiRequest(req))
}

const client: StrapiAlbumClient = {
  getAlbums,
  update,
  remove
}

export default client

