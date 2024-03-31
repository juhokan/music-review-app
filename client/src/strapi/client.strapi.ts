import albumClient, { StrapiAlbumClient } from './albums.strapi'
import userClient, { StrapiUserClient } from './user.strapi'

export interface StrapiClient {
  readonly user: StrapiUserClient
  readonly albums: StrapiAlbumClient
}

const client: StrapiClient = {
  user: userClient,
  albums: albumClient
}

export default client
