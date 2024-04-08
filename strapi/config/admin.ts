import { randomSecret } from '../src/custom/utils'

export default ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', randomSecret())
  },
  apiToken: {
    salt: env('API_TOKEN_SALT', randomSecret())
  },
  watchIgnoreFiles: ['**/tests/**']
})