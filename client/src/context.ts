import React from "react"
import { StrapiAlbum } from "./strapi/model.strapi"

interface AlbumCtx {
  readonly albums: StrapiAlbum[] | null
}

export const AlbumContext = React.createContext<AlbumCtx>({
  albums: null
})