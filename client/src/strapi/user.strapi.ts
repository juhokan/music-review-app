import { StrapiLogin, StrapiUser } from './model.strapi'
import { StrapiRequest, strapiRequest, StrapiResponse } from './request.strapi'
import { errorFromStrapiResponse } from './util.strapi'

export interface StrapiUserClient {
  readonly logIn: (credentials: UserCredentials) => Promise<StrapiLogin>
  readonly me: (token: string) => Promise<StrapiUser>
  readonly changePassword: (
    token: string,
    currentPassword: string,
    password: string,
    passwordConfirmation: string
  ) => Promise<StrapiLogin>
}

interface UserCredentials {
  readonly username: string
  readonly password: string
}

const logIn = async (credentials: UserCredentials): Promise<StrapiLogin> => {
  const { username, password } = credentials

  const req: StrapiRequest = {
    method: 'POST',
    path: 'auth/local',
    body: { identifier: username, password }
  }

  const response = await strapiRequest(req)

  // Successful response contains a JWT
  if (Object.hasOwn(response, 'jwt')) {
    return response as StrapiLogin
  }

  throw errorFromStrapiResponse(response as StrapiResponse<null>)
}

const me = async (token: string): Promise<StrapiUser> => {
  const req: StrapiRequest = {
    method: 'GET',
    path: 'users/me',
    token,
    fields: ['username', 'email', 'confirmed']
  }

  const response = await strapiRequest(req)

  // Successful response contains the user ID
  if (Object.hasOwn(response, 'id')) {
    return response as StrapiUser
  }

  throw errorFromStrapiResponse(response as StrapiResponse<null>)
}

const changePassword = async (
  token: string,
  currentPassword: string,
  password: string,
  passwordConfirmation: string
) => {
  const req: StrapiRequest = {
    method: 'POST',
    path: 'auth/change-password',
    token,
    body: { currentPassword, password, passwordConfirmation }
  }

  const response = await strapiRequest(req)

  // Successful response contains a JWT
  if (Object.hasOwn(response, 'jwt')) {
    return response as StrapiLogin
  }

  throw errorFromStrapiResponse(response as StrapiResponse<null>)
}

const client: StrapiUserClient = { logIn, me, changePassword }
export default client
