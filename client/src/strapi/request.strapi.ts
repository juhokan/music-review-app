import { StrapiDataWrapper, StrapiLogin, StrapiResource } from './model.strapi'
import { apiUrlFromStrapiRequest } from './util.strapi'

export interface StrapiRequest {
  readonly token?: string
  readonly method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  readonly path: string
  readonly id?: number
  readonly fields?: string[]
  readonly populate?: {
    readonly path: (string | number)[]
    readonly value: string
  }[]
  readonly filters?: {
    readonly fields: string[]
    readonly operator: 'eq' | 'gt' | 'gte' | 'lt' | 'lte'
    readonly value: string | number
  }[]
  readonly sort?: string[]
  readonly page?: number
  readonly pageSize?: number
  readonly body?: object
  readonly cache?: string
}

export interface StrapiCollectionMeta {
  readonly pagination: {
    readonly page: number
    readonly pageSize: number
    readonly pageCount: number
    readonly total: number
  }
}

export interface StrapiError {
  readonly status: number
  readonly name: string
  readonly message: string
}

export interface StrapiResponse<T> extends StrapiDataWrapper<T> {
  readonly meta?: object
  readonly error?: StrapiError
}

export interface StrapiCollectionResponse<T> {
  readonly data: T[] | null
  readonly meta?: StrapiCollectionMeta
  readonly error?: StrapiError
}

export interface StrapiAuthResponse extends StrapiDataWrapper<StrapiLogin> {
  readonly error?: StrapiError
}

export const STRAPI_TIMESTAMP_FIELDS: string[] = ['createdAt', 'updatedAt']
export const JSON_HEADERS = {
  'Content-Type': 'application/json',
  Accept: 'application/json'
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const strapiRequest = async <T = any>(req: StrapiRequest): Promise<T> => {
  const url = apiUrlFromStrapiRequest(req)
  const isFormData = req.body instanceof FormData
  const dataHeaders = isFormData ? {} : JSON_HEADERS
  const body = isFormData ? req.body : stringifyIfDefined(req.body)

  const response = await fetch(url, {
    method: req.method,
    headers: { ...dataHeaders, Authorization: req.token ? `Bearer ${req.token}` : '' },
    body,
    cache: req.cache as RequestCache | undefined
  })

  return response.json()
}

export const strapiSingleRequest = async <T extends StrapiResource>(
  req: StrapiRequest
): Promise<StrapiResponse<T>> => strapiRequest(req)

export const strapiCollectionRequest = async <T extends StrapiResource>(
  req: StrapiRequest
): Promise<StrapiCollectionResponse<T>> => strapiRequest(req)

const stringifyIfDefined = (obj?: object): string | undefined => obj ? JSON.stringify(obj) : undefined
