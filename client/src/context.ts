import React from "react"
import { StrapiAlbum } from "./strapi/model.strapi"

interface AlbumCtx {
  readonly albums: StrapiAlbum[] | null
}

interface TokenCtx {
  readonly token: string | null
  readonly setToken: (token: string | null) => void
}

export const AlbumContext = React.createContext<AlbumCtx>({
  albums: null
})

export const TokenContext = React.createContext<TokenCtx> ({
  token: null,
  setToken: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})