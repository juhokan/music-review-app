import { randomSecret } from '../src/custom/utils'

export default ({ env }) => ({
  'users-permissions': {
    config: {
      jwtSecret: env('JWT_SECRET', randomSecret())
    }
  }
})