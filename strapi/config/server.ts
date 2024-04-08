import { randomSecret } from '../src/custom/utils'

export default ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  proxy: true,
  port: env.int('PORT', 1337),
  app: {
    keys: env.array('APP_KEYS', [...Array(3).keys()].map(randomSecret))
  }
})