import { z } from "zod"
import { COUNTRY_CODES } from "../lib/countries"
import {
  ARGON2ID,
  AVI_KEY,
  NAME,
  PASSWORD,
  SHA256,
  USERNAME,
} from "../lib/regex"
import { MAX_TIME } from "../lib/timestamp"

const UPPER_BOUND = 128
const MIDDLE_BOUND = 64
const LOWER_BOUND = 32

export const zEmail = z.email().max(254)

export const zEnumCountryCodes = z.enum(COUNTRY_CODES)

export const zIntBool = z.int().min(0).max(1)

export const zIntPos = z.int().positive()

export const zIntUnixTime = z.int().min(1).max(MAX_TIME)

export const zStrArgon2 = z.string().regex(ARGON2ID)

export const zStrAviKey = z.string().regex(AVI_KEY)

export const zStrLogin = z.string().min(1).max(UPPER_BOUND)

export const zStrPassword = z.string().min(8).max(UPPER_BOUND).regex(PASSWORD)

export const zStrSha256 = z.string().regex(SHA256)

export const zStrUsername = z.string().min(2).max(LOWER_BOUND).regex(USERNAME)

export const zStrName = z.string().min(2).max(MIDDLE_BOUND).regex(NAME)

export function zNull<S extends z.ZodType>(schema: S) {
  return z.preprocess(
    (val) => (val === undefined || val === "" ? null : val),
    schema.nullable()
  )
}

export function zTrim<S extends z.ZodType<string, string>>(schema: S) {
  return z.string().trim().pipe(schema)
}
