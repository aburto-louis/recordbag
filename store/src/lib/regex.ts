export const ARGON2ID =
  /^\$argon2id\$v=19\$m=\d+,t=\d+,p=\d+\$[A-Za-z0-9+/]+\$[A-Za-z0-9+/]+$/

const UUID_V4 =
  /[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/

export const AVI_KEY = new RegExp(
  `^users/avi/${UUID_V4.source}\\.(?:jpe?g|png|webp)$`
)

const NAME_WORD = /[A-Za-z]+(?:[.'-][A-Za-z]+)*\.?/

export const NAME = new RegExp(
  `^${NAME_WORD.source}(?:(?:,? )${NAME_WORD.source})*$`
)

export const PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/

export const SHA256 = /^[0-9a-f]{64}$/

export const USERNAME = /^[A-Za-z0-9]+(?:[-_][A-Za-z0-9]+)*$/
