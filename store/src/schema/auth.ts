import { z } from "zod"
import { zStrLogin, zTrim } from "./z"

export const loginSchema = z.object({
  username: zTrim(zStrLogin),
  password: zStrLogin,
})

export type Login = z.infer<typeof loginSchema>
