export const CLIENT_ID = import.meta.env.VITE_CLIENT_ID
export const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET


export const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI
export const AUTH_ENDPOINT = import.meta.env.VITE_AUTH_ENDPOINT
export const RESPONSE_TYPE = import.meta.env.VITE_RESPONSE_TYPE

export const STRAPI_TOKEN = import.meta.env.VITE_STRAPI_TOKEN
export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

export const VALIDATE_URL = `${AUTH_ENDPOINT}?`

//client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
