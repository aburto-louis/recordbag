import { z } from "zod"
import {
  zEmail,
  zEnumCountryCodes,
  zIntBool,
  zIntPos,
  zIntUnixTime,
  zNull,
  zStrArgon2,
  zStrAviKey,
  zStrName,
  zStrPassword,
  zStrSha256,
  zStrUsername,
  zTrim,
} from "./z"

export const userRowSchema = z.object({
  id: zIntPos,
  name: zStrName,
  email: zEmail,
  username: zStrUsername,
  password_hash: zStrArgon2,
  country_code: zEnumCountryCodes.nullable(),
  avi_key: zStrAviKey.nullable(),
  admin: zIntBool,
  created_at: zIntUnixTime,
})

export type UserRow = z.infer<typeof userRowSchema>

export const userSchema = userRowSchema.omit({
  email: true,
  password_hash: true,
})

export type User = z.infer<typeof userSchema>
export type UserContext = User | null

export const userInsertSchema = userRowSchema
  .omit({
    id: true,
    password_hash: true,
    admin: true,
    created_at: true,
  })
  .extend({
    name: zTrim(userRowSchema.shape.name),
    email: zTrim(userRowSchema.shape.email),
    username: zTrim(userRowSchema.shape.username),
    password: zStrPassword,
    country_code: zNull(userRowSchema.shape.country_code.unwrap()),
    avi_key: zNull(userRowSchema.shape.avi_key.unwrap()),
  })

export type UserInsert = z.infer<typeof userInsertSchema>
export type UserInsertInput = z.input<typeof userInsertSchema>

export const userInsertDefault = {
  name: "",
  email: "",
  username: "",
  password: "",
  country_code: "",
  avi_key: "",
} satisfies UserInsertInput

export const userSessionSchema = z.object({
  token_hash: zStrSha256,
  user_id: userRowSchema.shape.id,
  expires_at: zIntUnixTime,
})

export type UserSession = z.infer<typeof userSessionSchema>
