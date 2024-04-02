import albumClient, { StrapiAlbumClient } from './albums.strapi'
import profileClient, { StrapiProfileClient } from './profiles.strapi'
import userClient, { StrapiUserClient } from './user.strapi'

export interface StrapiClient {
  readonly user: StrapiUserClient
  readonly albums: StrapiAlbumClient
  readonly profiles: StrapiProfileClient
}

const client: StrapiClient = {
  user: userClient,
  albums: albumClient,
  profiles: profileClient
}

export default client
