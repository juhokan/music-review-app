/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { AppUser } from "./model"
import { StrapiProfile } from "./strapi/model.strapi"

interface TokenCtx {
  readonly token: string | null
  readonly setToken: (token: string | null) => void
  readonly refreshToken: string | null
  readonly setRefreshToken: (token: string | null) => void
  readonly expiresAt: string | null
  readonly setExpiresAt: (expireAt: string | null) => void
}

interface UserCtx extends AppUser {
  readonly setAuth: (auth: any | null) => void
}

interface ProfileCtx {
  readonly profiles: StrapiProfile[] | null
}

interface SearchCtx {
  readonly input: string | null
  readonly setInput: (input: string | null) => void
}

export const TokenContext = React.createContext<TokenCtx> ({
  token: null,
  setToken: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  refreshToken: null,
  setRefreshToken: _ => { /* NOP */ }, // eslint-disable-line @typescript-eslint/no-unused-vars
  expiresAt: null,
  setExpiresAt: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const UserContext = React.createContext<UserCtx>({
  auth: null,
  setAuth: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const ProfileContext = React.createContext<ProfileCtx>({
  profiles: null
})

export const SearchContext = React.createContext<SearchCtx>({
  input: null,
  setInput: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})