import React from "react"
import { StrapiAlbum } from "./strapi/model.strapi"
import { AppUser } from "./model"

interface AlbumCtx {
  readonly albums: StrapiAlbum[] | null
}

interface TokenCtx {
  readonly token: string | null
  readonly setToken: (token: string | null) => void
}

interface UserCtx extends AppUser {
  readonly setAlbums: (albums: StrapiAlbum[] | null) => void
}

export const AlbumContext = React.createContext<AlbumCtx>({
  albums: null
})

export const TokenContext = React.createContext<TokenCtx> ({
  token: null,
  setToken: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const UserContext = React.createContext<UserCtx>({
  albums: null,
  setAlbums: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  userId: null
})