import { Hono } from "hono"
import { presignGet } from "../lib/r2"
import { requireUser } from "../middleware/session"

const users = new Hono().get("/avi", requireUser, async (c) => {
  const avi_key = c.get("user").avi_key

  if (!avi_key) {
    return c.json({ error: "No AVI" }, 404)
  }

  return c.json({ avi: presignGet(avi_key) }, 200)
})

export default users
