import { Hono } from "hono"
import {
  loginSchema,
  unixPlus,
  userRowSchema,
  userSchema,
  userSessionSchema,
  MAX_AGE,
} from "store/server"
import { db } from "../db/sqlite"
import {
  clearSessionCookie,
  sessionToken,
  setSessionCookie,
} from "../lib/cookie"
import { hashToken, verifyPassword, DUMMY_ARGON2 } from "../lib/hash"
import { requireUser } from "../middleware/session"

const auth = new Hono()

  .get("/me", requireUser, (c) => {
    return c.json({ user: c.get("user") }, 200)
  })

  .post("/login", async (c) => {
    const data = await c.req.json()
    const { username, password } = loginSchema.parse(data)

    const row = db.query(`SELECT * FROM users WHERE username = ?`).get(username)
    const match = row ? userRowSchema.safeParse(row) : null

    if (match && !match.success) {
      console.error("User Row Validation Failed", {
        issues: match.error.issues,
      })
      return c.json({ error: "Internal Server Error" }, 500)
    }

    const ok = await verifyPassword(
      password,
      match?.data.password_hash ?? DUMMY_ARGON2
    )

    if (!match || !ok) {
      return c.json({ error: "Unauthorized" }, 401)
    }

    const user = userSchema.parse(match.data)

    const token = crypto.randomUUID()

    const session = userSessionSchema.safeParse({
      token_hash: hashToken(token),
      user_id: user.id,
      expires_at: unixPlus(MAX_AGE),
    })

    if (!session.success) {
      console.error("User Session Validation Failed", {
        issues: session.error.issues,
      })
      return c.json({ error: "Internal Server Error" }, 500)
    }

    const { token_hash, user_id, expires_at } = {
      token_hash: session.data.token_hash,
      user_id: session.data.user_id,
      expires_at: session.data.expires_at,
    }

    db.run(
      `
      INSERT INTO user_sessions (token_hash, user_id, expires_at)
      VALUES (?, ?, ?)
      `,
      [token_hash, user_id, expires_at]
    )

    setSessionCookie(c, token)
    return c.json({ user }, 200)
  })

  .post("/logout", async (c) => {
    const token = sessionToken(c)

    if (token) {
      db.run(`DELETE FROM user_sessions WHERE token_hash = ?`, [
        hashToken(token),
      ])
    }

    clearSessionCookie(c)
    return c.json({ ok: true }, 200)
  })

export default auth
