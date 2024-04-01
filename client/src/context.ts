/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react"
import { AppUser } from "./model"

interface TokenCtx {
  readonly token: string | null
  readonly setToken: (token: string | null) => void
}

interface UserCtx extends AppUser {
  readonly setAuth: (auth: any | null) => void
}

export const TokenContext = React.createContext<TokenCtx> ({
  token: null,
  setToken: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})

export const UserContext = React.createContext<UserCtx>({
  auth: null,
  setAuth: _ => { /* NOP */ } // eslint-disable-line @typescript-eslint/no-unused-vars
})