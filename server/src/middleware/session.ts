import { createMiddleware } from "hono/factory"
import { HTTPException } from "hono/http-exception"
import { userSchema, type User } from "store/server"
import { db } from "../db/sqlite"
import { clearSessionCookie, sessionToken } from "../lib/cookie"
import { hashToken } from "../lib/hash"

export type SessionEnv = {
  Variables: {
    user: User
  }
}

function sessionUser(token: string): User | null {
  const row = db
    .query(`
      SELECT
        users.id,
        users.name,
        users.username,
        users.country_code,
        users.avi_key,
        users.admin,
        users.created_at
      FROM users JOIN user_sessions ON user_sessions.user_id = users.id
      WHERE user_sessions.token_hash = ? AND user_sessions.expires_at > unixepoch()
    `)
    .get(hashToken(token))

  if (!row) return null

  const res = userSchema.safeParse(row)

  if (!res.success) {
    console.error("User Validation Failed", {
      issues: res.error.issues,
    })
    throw new HTTPException(500, { message: "Internal Server Error" })
  }

  return res.data
}

export const requireUser = createMiddleware<SessionEnv>(async (c, next) => {
  const token = sessionToken(c)
  const user = token ? sessionUser(token) : null

  if (!user) {
    if (token) clearSessionCookie(c)
    throw new HTTPException(401, { message: "Unauthorized" })
  }

  c.set("user", user)
  await next()
})
