import { StrapiProfile } from './model.strapi'
import { StrapiRequest, strapiCollectionRequest } from './request.strapi'

export interface StrapiProfileClient {
  readonly getProfiles: () => Promise<StrapiProfile[]>
}

const getProfiles = async () => {
  const req: StrapiRequest = {
    method: 'GET',
    path: 'user-profiles',
    fields: ['display_name', 'user_id'],
    populate: [
      { path: ['profile_image', 'fields'], value: 'url' }
      
    ]
  }

  const response = await strapiCollectionRequest<StrapiProfile>(req)
  if (!response.data) {
    console.error('getProfiles  returned null data')
    return []
  }
  return response.data
}

const client: StrapiProfileClient = {
  getProfiles
}

export default client