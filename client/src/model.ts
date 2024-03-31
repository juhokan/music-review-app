import React from 'react'
import { StrapiAlbum } from './strapi/model.strapi'

export interface AppUser {
  readonly userId: number | null
  readonly albums: StrapiAlbum[] | null
}

export interface ReactChildrenProps {
  readonly children: React.ReactNode
}

export interface ReactCssProps {
  readonly className?: string
  readonly style?: React.CSSProperties
}