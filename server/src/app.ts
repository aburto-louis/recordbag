import { Hono } from "hono"
import { HTTPException } from "hono/http-exception"
import { prettifyError, ZodError } from "zod"
import { toHttpError } from "./db/errors"
import auth from "./api/auth"
import users from "./api/users"

const app = new Hono()

  .route("auth", auth)

  .route("users", users)

  .onError((err, c) => {
    if (err instanceof HTTPException) {
      return c.json({ error: err.message }, err.status)
    }

    if (err instanceof ZodError) {
      return c.json(
        { error: "Validation failed", message: prettifyError(err) },
        400
      )
    }

    console.error(err)

    const dbErr = toHttpError(err)

    if (dbErr) {
      return c.json(dbErr.body, dbErr.status, dbErr.headers)
    }

    return c.json({ error: "Internal server error" }, 500)
  })

export default app
