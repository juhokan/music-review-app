/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'

export interface AppUser {
  readonly auth: any | null
}

export interface ReactChildrenProps {
  readonly children: React.ReactNode
}

export interface ReactCssProps {
  readonly className?: string
  readonly style?: React.CSSProperties
}

export enum AlbumSort {
  Newest = 'new',
  Oldest = 'old',
  Highest = 'high',
  Lowest = 'low'
}