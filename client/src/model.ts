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

export enum AlbumFilter {
  None = 'none',
  One = '1',
  Two = '2',
  Three = '3',
  Four = '4',
  Five = '5',
  Six = '6',
  Seven = '7',
  Eight = '8',
  Nine = '9',
  Ten = '10'
}