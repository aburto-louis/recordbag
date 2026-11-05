import type { Context } from "hono"
import { deleteCookie, getCookie, setCookie } from "hono/cookie"
import { MAX_AGE } from "store/server"

const COOKIE = "session"

export const cookieBase = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "Lax",
  path: "/",
} as const

export function sessionToken(c: Context): string | undefined {
  return getCookie(c, COOKIE)
}

export function setSessionCookie(c: Context, token: string) {
  setCookie(c, COOKIE, token, { ...cookieBase, maxAge: MAX_AGE })
}

export function clearSessionCookie(c: Context) {
  deleteCookie(c, COOKIE, cookieBase)
}
