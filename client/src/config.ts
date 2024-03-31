const CLIENT_ID = "d9cad2b46b2f47fe8168ea6456212665"
const REDIRECT_URI = "http://localhost:5173"
const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
const RESPONSE_TYPE = "token"

export const STRAPI_URL = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'
export const VALIDATE_URL = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`
