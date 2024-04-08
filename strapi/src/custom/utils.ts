import { randomBytes } from 'crypto'

export type StrapiCrudMethod = 'find' | 'findOne' | 'create' | 'update' | 'delete'
export const CRUD_METHODS: StrapiCrudMethod[] = ['find', 'findOne', 'create', 'update', 'delete']

export const idFromCtx = (ctx: any) => {
  const url: string = ctx.req._parsedUrl.pathname
  const [id] = url.split('/').slice(-1)
  return id
}

export const randomSecret = () => randomBytes(16).toString('base64')