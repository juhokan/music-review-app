export interface StrapiResource<T = object> extends StrapiIdentifier {
  readonly attributes: T
}

export interface StrapiDataWrapper<T> {
  readonly data: T | null
}

export interface StrapiRequiredDataWrapper<T> {
  readonly data: T
}

export interface StrapiPaged<T> {
  readonly data: T[]
  readonly page: {
    readonly current: number
    readonly count: number
    readonly size: number
    readonly total: number
  }
}

export interface StrapiAlbum extends StrapiResource<StrapiAlbumAttributes> {}

export interface StrapiUser {
  readonly id: number
  readonly username: string
  readonly email: string
  readonly confirmed: boolean
  readonly blocked: boolean
  readonly profile: {
    readonly id: number
  }
  readonly albums: StrapiAlbum[]
}

export interface StrapiLogin {
  readonly jwt: string
  readonly user: StrapiUser
}

export class StrapiError {
  constructor(public readonly status: number, public readonly message: string) {}
}

interface StrapiAlbumAttributes {
  readonly album_id: string
  readonly rating: number | null
}

export interface StrapiUpdateAlbum extends Pick<StrapiAlbumAttributes, 'rating'> {}


interface StrapiIdentifier {
  readonly id: number
}

export interface StrapiImageUpdateData {
  /**
   * - `File` -> Update
   * - `null` -> Remove
   * - `undefined` -> Do not modify
   */
  readonly image?: File | null
}
