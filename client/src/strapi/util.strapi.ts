import { STRAPI_URL } from '../config'
import { StrapiError, StrapiImageUpdateData, StrapiResource } from './model.strapi'
import { strapiCollectionRequest, StrapiRequest, StrapiResponse } from './request.strapi'

export const STRAPI_API_URL = `${STRAPI_URL}/api`

export const apiUrlFromStrapiRequest =(req: Omit<StrapiRequest, 'method'>): string => {
  const urlBuilder: string[] = [STRAPI_API_URL, `/${req.path}`]

  let queryInserted = false
  const insertQuerySeparator = () => {
    if (queryInserted) {
      urlBuilder.push('&')
    } else {
      urlBuilder.push('?')
      queryInserted = true
    }
  }

  // Append ID?
  if (req.id) {
    urlBuilder.push(`/${req.id}`)
  }

  // Select fields?
  if (req.fields?.values) {
    req.fields.forEach(f => {
      insertQuerySeparator()
      urlBuilder.push(`fields=${f}`)
    })
  }

  // Populate relation/media fields?
  if (req.populate) {
    req.populate.forEach(p => {
      insertQuerySeparator()
      urlBuilder.push(`populate${p.path.map(f => `[${String(f)}]`).join('')}=${p.value}`)
    })
  }

  // Apply filters?
  if (req.filters) {
    req.filters.forEach(f => {
      insertQuerySeparator()
      urlBuilder.push(`filters${f.fields.map(p => `[${p}]`).join('')}[$${f.operator}]=${f.value}`)
    })
  }

  // Sorting?
  if (req.sort) {
    req.sort.forEach(s => {
      insertQuerySeparator()
      urlBuilder.push(`sort=${s}`)
    })
  }

  // Page?
  if (req.page) {
    insertQuerySeparator()
    urlBuilder.push(`pagination[page]=${req.page}`)
  }

  // Page size?
  if (req.pageSize) {
    insertQuerySeparator()
    urlBuilder.push(`pagination[pageSize]=${req.pageSize}`)
  }

  return urlBuilder.join('')
}

export const toStrapiUrl = (path: string, api = false): string => `${api ? STRAPI_API_URL : STRAPI_URL}${path}`

export const extractStrapiData = <T>(res: StrapiResponse<T>): T => {
  if (res.error) {
    throw new StrapiError(res.error.status, res.error.message)
  } else if (!res.data) {
    throw new Error('Could not extract Strapi data')
  }

  return res.data
}

export const errorFromStrapiResponse = <T>(res: StrapiResponse<T>) => {
  const { error } = res as StrapiResponse<null>
  return new StrapiError(error?.status ?? -1, error?.message ?? 'Strapi request failed')
}

export const multiPageStrapiRequest = async <T extends StrapiResource>(req: StrapiRequest): Promise<T[]> => {
  const values: T[] = []
  let response = await strapiCollectionRequest<T>(req)
  values.push(...extractStrapiData(response))

  // Request the rest of the pages
  while (response.meta?.pagination && response.meta.pagination.page < response.meta.pagination.pageCount) {
    const pageReq: StrapiRequest = { ...req, page: response.meta.pagination.page + 1 }
    response = await strapiCollectionRequest<T>(pageReq)
    values.push(...extractStrapiData(response))
  }

  return values
}

export const toStrapiUpdateBody = <T extends StrapiImageUpdateData>(data: T): object => {
  let body: object | undefined = undefined
  const { image, ...fields } = data
  if (image) {
    const formData = new FormData()
    formData.append('data', JSON.stringify(fields))
    formData.append('files.image', image, image.name)
    body = formData
  } else if (image === null) {
    // Image is also set as null -> Remove it from the organizer
    body = { data: { ...data } }
  } else {
    // Image is undefined -> Do not alter the image
    body = { data: { ...fields } }
  }

  return body
}
